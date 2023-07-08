import PropTypes from "prop-types";
//import { useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

// ---------------------------- IP Endpoint config ------------------------------

//const URL_ROOT = "192.168.1.200:3000"; // Local - Raspberry
//const URL_ROOT = "192.168.1.2:3000"       // Local - PC
const URL_ROOT = "api2.orozcoh.com"; //cloud production

// -------------------------------------------------------------------------------

export const LoggerData = ({ deviceName }) => {
  //const [updateCount, setUpdateCount] = useState(0);
  const [lastItem, setLastItem] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    axios
      .get(`http://${URL_ROOT}/dataLogger/aguacate/data/last/3/days`)
      .then((response) => {
        setLastItem(response.data[response.data.length - 1]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`http://${URL_ROOT}/dataLogger/aguacate/data/latest-timestamp`)
      .then((response) => {
        const tempDate = moment(response.data.date, "MMM DD, YYYY - HH:mm:ss")
          .subtract(5, "hour")
          .format("MMM DD, YY - HH:mm:ss");
        let dat = response.data;
        dat.date = tempDate;
        setLastUpdate(dat);
      })
      .catch((error) => {
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
            flexDirection: windowWidth > 600 ? "row" : "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <h4 style={{ margin: "20px 20px 20px 0px" }}>Last time updated:</h4>
            <pre>
              <code>{JSON.stringify(lastUpdate, null, 2)}</code>
            </pre>
          </div>
          <div>
            <h4 style={{ margin: "20px 20px 20px 0px" }}>Last item added:</h4>
            <pre>
              <code>{prettyData}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

LoggerData.propTypes = {
  colorTheme: PropTypes.string,
};
