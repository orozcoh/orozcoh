import PropTypes from "prop-types";
//import { useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { LoggerNavBar } from "../../components/LoggerNavBar";
import { LineGraph } from "../../components/LineGraph";

//import { dataLog } from "./data";

//import { useEffect, useRef, useState } from "react";
//import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default LineGraph;

// ---------------------------- IP Endpoint config ------------------------------

//const URL_ROOT = "192.168.1.200:3000"; // Local - Raspberry
//const URL_ROOT = "192.168.1.2:3000"       // Local - PC
const URL_ROOT = "api2.orozcoh.com"; //cloud production

// -------------------------------------------------------------------------------

export const Logger1 = ({ colorTheme }) => {
  const dataReal = useRef([]);
  //const [updateCount, setUpdateCount] = useState(0);
  const [dataGraph, setDataGraph] = useState([]);
  const [lastItem, setLastItem] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    axios
      .get(`http://${URL_ROOT}/dataLogger/aguacate/data/last/3/days`)
      .then((response) => {
        // Handle the response data
        let data = [
          {
            id: "Light",
            color: "hsl(352, 70%, 50%)",
          },
          {
            id: "Temperature",
            color: "rgb(250, 70, 250)",
          },
        ];
        setLastItem(response.data[response.data.length - 1]);
        data[0].data = response.data.map((obj) => ({
          x: new Date(parseInt(obj.unix_time) * 1000),
          y: obj.light,
        }));

        //data[0].data = refData.current;

        data[1].data = response.data.map((obj) => ({
          x: new Date(parseInt(obj.unix_time) * 1000),
          y: obj.temp,
        }));
        //data[1].data = tempRef.current;
        dataReal.current = data;
        setDataGraph(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });

    axios
      .get(`http://${URL_ROOT}/dataLogger/aguacate/data/latest-timestamp`)
      .then((response) => {
        // ---- Need to fix to time zone based on browser HARDCODED TO UTC -5 -------
        //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tempDate = moment(response.data.date, "MMM DD, YYYY - HH:mm:ss")
          .subtract(5, "hour")
          .format("MMM DD, YY - HH:mm:ss");
        let dat = response.data;
        dat.date = tempDate;
        setLastUpdate(dat);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching data:", error);
      });
  }, []); //[updateCount]);

  const prettyData = JSON.stringify(lastItem, null, 2);

  var windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  return (
    <>
      <LoggerNavBar colorTheme={colorTheme} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column-reverse",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Time vs Light and Temperature</h2>
          </div>
        </div>

        <LineGraph data={dataGraph} />
        {/*         <button onClick={() => setUpdateCount(updateCount + 1)}>
          Update data
        </button> */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: windowWidth > 600 ? "row" : "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <h4 style={{ margin: "20px" }}>Last time updated:</h4>
            <pre>
              <code>{JSON.stringify(lastUpdate, null, 2)}</code>
            </pre>
          </div>
          <div>
            <h4 style={{ margin: "20px" }}>Last item added:</h4>
            <pre>
              <code>{prettyData}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

LineGraph.propTypes = {
  data: PropTypes.array,
};

Logger1.propTypes = {
  colorTheme: PropTypes.string,
};
