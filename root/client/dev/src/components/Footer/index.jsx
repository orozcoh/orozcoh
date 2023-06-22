import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
//import "./style.scss";

export const Footer = ({ colorTheme }) => {
  return (
    <Navbar
      //collapseOnSelect
      //expand="sm"
      bg={colorTheme || "dark"}
      variant={colorTheme || "dark"}
      //fixed="bottom"
    >
      <Container fluid className="justify-content-center">
        <Nav
        //style={{ style: "flex" }}
        //navbarScroll
        >
          <Nav.Link href="https://github.com/orozcoh/">GitHub</Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/santiago-orozcoh/">
            LinkedIn
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

Footer.propTypes = {
  colorTheme: PropTypes.string,
  setColorTheme: PropTypes.func,
};
