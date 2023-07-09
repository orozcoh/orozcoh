//import { useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { LoggerNavBar } from "./components/LoggerNavBar";
import { useLocation } from "react-router-dom";

export const DataLoggerView = ({ colorTheme }) => {
  return (
    <>
      <LoggerNavBar tabNum={GetTabFromUrl()} colorTheme={colorTheme} />
      <Outlet />
    </>
  );
};

DataLoggerView.propTypes = {
  colorTheme: PropTypes.string,
  deviceName: PropTypes.string,
};

const GetTabFromUrl = () => {
  const location = useLocation();
  const pathName = location.pathname;
  if (pathName.startsWith("/datalogger/Logger_Dev")) {
    return 1;
  } else if (pathName.startsWith("/datalogger/Logger_Hass")) {
    return 2;
  } else if (pathName.startsWith("/datalogger/Logger_Avo")) {
    return 3;
  } else {
    return 0;
  }
};
