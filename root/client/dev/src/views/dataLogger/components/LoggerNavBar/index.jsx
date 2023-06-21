import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./style.scss";

export const LoggerNavBar = ({ colorTheme }) => {
  return (
    <div className="SecondNavBar-wrap">
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
            <Nav.Link href="/datalogger/logger1">Esp32-MED</Nav.Link>
            <Nav.Link disabled href="#action2">
              Esp32-PEI
            </Nav.Link>
            <Nav.Link href="#action3">Config</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

LoggerNavBar.propTypes = {
  colorTheme: PropTypes.string,
  setColorTheme: PropTypes.func,
};
