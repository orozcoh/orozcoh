import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./style.scss";
import { Link, Outlet, useLocation } from "react-router-dom";

export const DeviceNavBar = ({ colorTheme, deviceName }) => {
  const [tabNum, setTabNum] = useState(0);

  return (
    <div className="device-navbar-wrap">
      <Navbar
        //collapseOnSelect
        //expand="sm"

        bg={colorTheme || "dark"}
        variant={colorTheme || "dark"}
      >
        <Container fluid className="justify-content-center">
          <Nav
          //style={{ style: "flex" }}
          //navbarScroll
          >
            <Link
              className={tabNum === 0 ? "active-link" : ""}
              onClick={() => {
                setTabNum(0);
              }}
              to={`/datalogger/${deviceName}`}
            >
              About
            </Link>
            <Link
              className={tabNum === 1 ? "active-link" : ""}
              onClick={() => {
                setTabNum(1);
              }}
              to={`/datalogger/${deviceName}/data`}
            >
              Data
            </Link>
            <Link
              className={tabNum === 2 ? "active-link" : ""}
              onClick={() => {
                setTabNum(2);
              }}
              to={`/datalogger/${deviceName}/graph`}
            >
              Graph
            </Link>
            <Link
              className={tabNum === 3 ? "active-link" : ""}
              onClick={() => {
                setTabNum(3);
              }}
              to={`/datalogger/${deviceName}/graphs`}
            >
              Graphs
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

DeviceNavBar.propTypes = {
  colorTheme: PropTypes.string,
  deviceName: PropTypes.string,
};

const GetTabFromUrl = ({ deviceName }) => {
  console.log("Checking tab");
  const location = useLocation();
  const pathName = location.pathname;
  if (pathName.startsWith(`/datalogger/${deviceName}/about`)) {
    return 0;
  } else if (pathName.startsWith(`/datalogger/${deviceName}/api`)) {
    return 1;
  } else if (pathName.startsWith(`/datalogger/${deviceName}/data`)) {
    return 2;
  } else if (pathName.startsWith(`/datalogger/${deviceName}/graph`)) {
    return 3;
  } else if (pathName.startsWith(`/datalogger/${deviceName}/graphs`)) {
    return 4;
  } else {
    return 0;
  }
};

GetTabFromUrl.propTypes = {
  deviceName: PropTypes.string,
};
