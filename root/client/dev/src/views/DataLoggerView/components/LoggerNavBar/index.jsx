import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./style.scss";

export const LoggerNavBar = ({ colorTheme, tabNum }) => {
  return (
    <div className="SecondNavBar-wrap">
      <Navbar bg={colorTheme || "dark"} variant={colorTheme || "dark"}>
        <Container fluid className="justify-content-center">
          <Nav>
            <Nav.Link active={tabNum === 1} href="/datalogger/Logger_Dev">
              Logger_Dev
            </Nav.Link>
            <Nav.Link active={tabNum === 2} href="/datalogger/Logger_Hass">
              Logger_Hass
            </Nav.Link>
            <Nav.Link active={tabNum === 3} href="/datalogger/Logger_Avo">
              Logger_Avo
            </Nav.Link>
            <span
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              |
            </span>
            <Nav.Link disabled href="#action3">
              Admin
            </Nav.Link>
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
