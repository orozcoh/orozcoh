import PropTypes from "prop-types";
import env from "../../../../global/var";
//require("dotenv").config();
//import { useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

// ---------------------------- IP Endpoint config ------------------------------
const API2_URL = env.API2_URL;
// -------------------------------------------------------------------------------

const itemTemplate = {
  _id: "--- WAITING FOR DATA ---",
  device_name: "",
  unix_time: 0,
  light: 0,
  temp: 0,
  soil_humidity: 0,
  air_humidity: 0,
  __v: 0,
};

export const LoggerData = ({ deviceName }) => {
  //const [updateCount, setUpdateCount] = useState(0);
  const [lastItem, setLastItem] = useState(itemTemplate);

  useEffect(() => {
    axios
      .get(`http://${API2_URL}/dataLogger/${deviceName}/data/last/3/days`)
      .then((response) => {
        setLastItem(response.data[response.data.length - 1]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); //[updateCount]);

  const prettyData = JSON.stringify(lastItem, null, 2);

  const lastTimeUpdated = moment(lastItem.unix_time * 1000).format(
    "MMM DD, YYYY - HH:mm:ss"
  );

  const timeAgoMin = moment().diff(
    moment(lastItem.unix_time * 1000),
    "minutes"
  );

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
            alignItems: windowWidth < 600 ? "center" : "unset",
          }}
        >
          <div style={{ minWidth: "305px" }}>
            <h4 style={{ margin: "20px 20px 20px 0px" }}>Last time updated:</h4>
            {timeAgoMin > 1000000 ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Spinner animation="border" />
              </div>
            ) : (
              <pre>
                <span>{lastTimeUpdated}</span>
                <br />
                <br />
                <span>{timeAgoMin} min ago.</span>
              </pre>
            )}
          </div>
          <div style={{ minWidth: "305px" }}>
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
  deviceName: PropTypes.string,
};
