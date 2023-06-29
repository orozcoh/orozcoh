#include "Adafruit_VEML7700.h"
#include <Arduino.h>
#include <Wire.h>
#include <ArtronShop_SHT3x.h>
#include <WiFi.h>
#include <HTTPClient.h> 
#include <time.h>
#include <ArduinoJson.h>

#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  60 //60        /* Time ESP32 will go to sleep (in seconds) */

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 0;
const int   daylightOffset_sec = 3600;

const int MEASURE_INTERVAL = 300; //1min

Adafruit_VEML7700 veml = Adafruit_VEML7700();

ArtronShop_SHT3x sht3x(0x44, &Wire); // ADDR: 0 => 0x44, ADDR: 1 => 0x45

//const int LIGHTSENSORPIN = 1;
const int SOIL_PIN = 1;

// ------------------------------------------------------------------------------------------
// -------------------------------------- Variables -----------------------------------------
// ------------------------------------------------------------------------------------------
time_t currentTime;

// LIGHT
float light;
// SOIL HUMIDITY
float soil_read;
float soil_humidity;
// TEMPERATURE
float temp;
// AIR HUMIDITY
float air_humidity;

String answer_post;

// ------------------------------------------------------------------------------------------
// -------------------------------------- Secrets -------------------------------------------
// ------------------------------------------------------------------------------------------
const char* SSID        = "__SSID__";
const char* PASSWORD    = "__PASSWORD__";
const String API_KEY    = "__API_KEY__";
const String DEVICE_ID  = "Logger-Hass";

// local API
const char* LOCAL_API   = "http://192.168.1.2:3000/dataLogger/aguacate";

// Raspberrry API
const char* RASPBERRY_API   = "http://192.168.1.200:3000/dataLogger/aguacate";

// cloud API
const char* CLOUD_API   = "http://api2.orozcoh.com/dataLogger/aguacate";


// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// -------------------------------------- Setup ---------------------------------------------
// ------------------------------------------------------------------------------------------

void setup() {
  delay(1000);

  //pinMode(LIGHTSENSORPIN, INPUT);
  pinMode(SOIL_PIN, INPUT);

  Serial.begin(115200);

  Serial.println("\n\n--------------------------------------------------------------");
  Serial.println("--------------------------- CONFIG ---------------------------");
  Serial.println("--------------------------------------------------------------");

  Wire.begin();
  while (!sht3x.begin()) {
    Serial.println("SHT3x not found !");
    delay(1000);
  }
  Serial.println("SHT 30 was found !");

  if (!veml.begin()) {
    Serial.println("VEML - Sensor not found");
    while (1);
  }
  Serial.println("VEML - Sensor found");

  veml.setGain(VEML7700_GAIN_1_4) ; // set gain = 1/8
  veml.setIntegrationTime(VEML7700_IT_400MS); // set 25ms exposure time


  WiFi.begin(SSID, PASSWORD);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado a la red con la IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // Init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  while (time(nullptr) < 1617460172){ // minimum valid epoch
    Serial.println("Wainting NTP Server");
    delay(3000);
  }

 // Enable timer wakeup for 5 minutes  * 60s (300 seconds)
  esp_sleep_enable_timer_wakeup(0.1 * 60 * uS_TO_S_FACTOR);  // Multiply by 1000000 to convert seconds to microseconds

  Serial.println("-------------------------------------------------------------");
}

// ------------------------------------------------------------------------------------------
// ---------------------------------------- Loop --------------------------------------------
// ------------------------------------------------------------------------------------------

void loop() {
  DynamicJsonDocument bodyJson(300);
  String bodyString;

  Serial.println("-------------------- GETTING DATA ---------------------------");
    // GET UNIX TIME
    currentTime = getCurrentTime();
    int nowT = currentTime + MEASURE_INTERVAL; //measureInterval

    // GET LIGHT
    light = veml.readLux();
    //GET SOIL HUMIDITY
    soil_read = analogRead(SOIL_PIN);
    soil_humidity = 100 - ((soil_read / 4095) * 100);
    // SHT30 CHECK IF READ
    if (sht3x.measure()) {
      // GET TEMPERATURE
      temp = sht3x.temperature();
      // GET AIR HUMIDITY
      air_humidity = sht3x.humidity();
    } else {
      temp = -1;
      air_humidity = -1;
      Serial.println("SHT3x read error");
    }
  
    if(WiFi.status()== WL_CONNECTED ){ 
      //answer = getRequest(local_API);
      bodyJson["api_key"] = API_KEY;
      JsonObject data = bodyJson.createNestedObject("data");
      data["device_name"] = DEVICE_ID;
      data["unix_time"] = currentTime;
      data["light"] = String(light, 3);
      data["temp"] = String(temp, 3);
      data["air_humidity"] = String(air_humidity, 3);
      data["soil_humidity"] = String(soil_humidity, 3);

      serializeJson(bodyJson, bodyString);

      Serial.print("DATA:");
      Serial.println(bodyString);

      answer_post = Post(CLOUD_API, bodyString);
      Serial.print("answer:");
      Serial.println(answer_post);
      //count++;
      //bootCount++;
    } else {
      Serial.println("NOT CONNECTED");
    }
  Serial.println("-------------------------------------------------------------");

  // -------------------------------- SLEEP MODE SETUP --------------------------------------

  delay(100);

  while (currentTime < nowT){
    delay(1000);
    currentTime = getCurrentTime();
  }

  // Put the ESP32 into deep sleep mode
  //esp_deep_sleep_start();

  // Put the ESP32 into Light Sleep mode
  //esp_light_sleep_start();

  // Put the ESP32 into modem sleep mode
  //esp_modem_sleep_start();

}


// ------------------------------------------------------------------------------------------
// -------------------------------------- Functions -----------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------------ getCurrentTime --------------------------------------
time_t getCurrentTime() {
  struct timeval tv;
  gettimeofday(&tv, nullptr);
  return tv.tv_sec;
}
// -------------------------------------- getRequest ---------------------------------------
String getRequest(const char* serverName) {
  HTTPClient http;    
  http.begin(serverName);
  
  // Enviamos peticion HTTP
  int httpResponseCode = http.GET();
  
  String payload = "..."; 
  
  if (httpResponseCode > 0) {
    Serial.print("\nHTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // liberamos
  http.end();

  return payload;
}
// -------------------------------------- Post -------------------------------------------
int Post(const char* serverName, String _body){
  HTTPClient http; 
  http.begin(serverName);
  
  // If you need an HTTP request with a content type: application/json, use the following:
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(_body);
 
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
    
  // Free resources
  http.end();

  return httpResponseCode;
}