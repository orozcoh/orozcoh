import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.scss";

export const LoggerNavBar = ({ colorTheme, tabNum }) => {
  return (
    <div className="SecondNavBar-wrap">
      <Navbar bg={colorTheme || "dark"} variant={colorTheme || "dark"}>
        <Container fluid className="justify-content-center">
          <Nav>
            <Link
              className={tabNum === 1 ? "active-link" : ""}
              to="/datalogger/Logger_Dev"
            >
              Logger_Dev
            </Link>
            <Link
              className={tabNum === 2 ? "active-link" : ""}
              to="/datalogger/Logger_Hass"
            >
              Logger_Hass
            </Link>
            <Link
              className={tabNum === 3 ? "active-link" : ""}
              to="/datalogger/Logger_Avo"
            >
              Logger_Avo
            </Link>
            <span
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              |
            </span>
            <Link disabled to="/datalogger/Admin">
              Admin
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

LoggerNavBar.propTypes = {
  colorTheme: PropTypes.string,
  tabNum: PropTypes.number,
};
