import PropTypes from "prop-types";
import env from "../../../../global/var";

import axios from "axios";
import { LineGraph } from "../../components/LineGraph";
import { useEffect, useRef, useState } from "react";

export default LineGraph;

// ---------------------------- IP Endpoint config ------------------------------
const API2_URL = env.API2_URL;
// -------------------------------------------------------------------------------

export const LoggerGraphs = ({ deviceName }) => {
  const dataReal = useRef([]);
  const [dataLight, setDataLight] = useState([]);
  const [dataAirH, setDataAirH] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [dataSoil, setDataSoil] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${API2_URL}/dataLogger/${deviceName}/data/last/3/days`)
      .then((response) => {
        let data = [
          {
            id: "Light (Lux)",
            //color: "hsl(352, 70%, 50%)",
          },
          {
            id: "Air Humidity (%HR)",
            //color: "rgb(250, 70, 250)",
          },
          {
            id: "Temperature (ºC)",
            //color: "rgb(250, 70, 250)",
          },
          {
            id: "Soil Humidity (%)",
            //color: "rgb(250, 70, 250)",
          },
        ];
        data[0].data = response.data.map((obj) => ({
          x: new Date(parseInt(obj.unix_time) * 1000),
          y: obj.light,
        }));

        data[1].data = response.data.map((obj) => ({
          x: new Date(parseInt(obj.unix_time) * 1000),
          y: obj.air_humidity,
        }));

        data[2].data = response.data.map((obj) => ({
          x: new Date(parseInt(obj.unix_time) * 1000),
          y: obj.temp,
        }));

        data[3].data = response.data.map((obj) => ({
          x: new Date(parseInt(obj.unix_time) * 1000),
          y: obj.soil_humidity,
        }));

        dataReal.current = data;
        setDataLight([data[0]]);
        setDataAirH([data[1]]);
        setDataTemp([data[2]]);
        setDataSoil([data[3]]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); //[updateCount]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Time vs Light</h2>
        </div>
        <LineGraph data={dataLight} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Time vs Air Humidity</h2>
        </div>
        <LineGraph data={dataAirH} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Time vs Temperature</h2>
        </div>
        <LineGraph data={dataTemp} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Time vs Soil Humidity</h2>
        </div>
        <LineGraph data={dataSoil} />
      </div>
    </>
  );
};

LineGraph.propTypes = {
  data: PropTypes.array,
};

LoggerGraphs.propTypes = {
  colorTheme: PropTypes.string,
  deviceName: PropTypes.string,
};
