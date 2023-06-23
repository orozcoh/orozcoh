#include "Adafruit_VEML7700.h"
#include <WiFi.h>
#include <HTTPClient.h> 
#include "RTClib.h"
#include "DHT.h"
#include <ArduinoJson.h>

Adafruit_VEML7700 veml = Adafruit_VEML7700();
RTC_DS3231 rtc;

#define DHTPIN 0 

#define DHTTYPE DHT11   // DHT 11

#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  60 //60        /* Time ESP32 will go to sleep (in seconds) */

DHT dht(DHTPIN, DHTTYPE);

//int light_pin = 34;
float light = 0;
//float volt = 0;

// ------------------------------------------------------------------------------------------
// -------------------------------------- Secrets -------------------------------------------
// ------------------------------------------------------------------------------------------
const char* SSID        = "__SSID__";
const char* PASSWORD    = "__PASSWORD__";

// local API
const char* LOCAL_API   = "http://192.168.1.2:3000/dataLogger/aguacate";

// Raspberrry API
const char* RASPBERRY_API   = "http://192.168.1.200:3000/dataLogger/aguacate";

// cloud API
const char* CLOUD_API   = "http://api2.orozcoh.com/dataLogger/aguacate";

const String DEVICE_ID  = "esp32-aguacate";
const String API_KEY    = "__API-KEY__";
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

RTC_DATA_ATTR int bootCount = 0;

int count = 0;

String answer;
String answer_post;
String body;

//DynamicJsonDocument bodyJson(256);

const int measureInterval = 60 * 5;  // 600s = 10min

void setup(){
    Serial.begin(115200);

    // nos conectamos a la red
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

    if (! rtc.begin()) {
      Serial.println("Couldn't find RTC");
      Serial.flush();
      while (1) delay(10);
    }

    if (rtc.lostPower()) {
      Serial.println("RTC lost power, let's set the time!");
      rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

    }

    if (!veml.begin()) {
      Serial.println("VEML - Sensor not found");
      while (1);
    }
    Serial.println("VEML - Sensor found");

    veml.setGain(VEML7700_GAIN_1_8) ; // set gain = 1/8
    veml.setIntegrationTime(VEML7700_IT_25MS); // set 25ms exposure time
//
//    if (bootCount == 0 ){
//      public_ip = getRequest("https://api.my-ip.io/ip");
//      Serial.println(public_ip);
//      location_api = "http://ip-api.com/json/" + String(public_ip);
//      location_data = getRequest(location_api.c_str());
//      Serial.println("Location: " + location_data);
//    }
    dht.begin();
    Serial.println("DHT - Sensor found");

    Serial.println("------ SETUP FINISH ------");
//    DateTime dt(__DATE__, __TIME__);
//    rtc.adjust(dt);

//    int timezoneOffset = 5; 
//    rtc.adjust(DateTime(dt.unixtime() + (timezoneOffset * 3600)));

} // EOF setup

void loop(){

  DynamicJsonDocument bodyJson(300);
  String bodyString;

  Serial.println("\nPreparing new data...");
  int nowR = rtc.now().unixtime();
  int nowT = nowR + measureInterval; //measureInterval
  //Serial.print("unix_time now: ");
  //Serial.println(nowT);
  light = veml.readLux();
  //volt = (3.3/4095) * light;
  //Serial.print("light: ");
  //Serial.println(light);

  float air_humidity = dht.readHumidity();


  // Read temperature as Celsius (the default)
  float temp = dht.readTemperature();


  // Check if any reads failed and exit early (to try again).
  if (isnan(air_humidity) || isnan(temp)) {
    Serial.println(F("\nFailed to read from DHT sensor!"));
    esp_sleep_enable_timer_wakeup(10 * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
    return;
  }
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(temp, air_humidity, false);
  
   if(WiFi.status()== WL_CONNECTED ){ 
      //answer = getRequest(local_API);

      bodyJson["api_key"] = API_KEY;
      JsonObject data = bodyJson.createNestedObject("data");
      data["device_name"] = DEVICE_ID;
      data["unix_time"] = rtc.now().unixtime();
      data["light"] = String(light, 3);
      data["temp"] = String(temp, 3);
      data["air_humidity"] = String(air_humidity, 3);
      data["soil_humidity"] = 0;

      serializeJson(bodyJson, bodyString);

      Serial.print("DATA:");
      Serial.println(bodyString);

      answer_post = Post(CLOUD_API, bodyString);
      //count++;
      //bootCount++;
    }

    while (nowR < nowT){
      delay(1000);
      nowR = rtc.now().unixtime();
    }
//    esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
//    esp_deep_sleep_start();


} // EOF Loop


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