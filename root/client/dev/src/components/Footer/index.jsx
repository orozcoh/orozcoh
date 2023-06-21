import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
//import "./style.scss";

export const Footer = ({ colorTheme }) => {
  return (
    <div className="Footer-wrap footer mt-auto py-3">
      <Navbar
        //collapseOnSelect
        //expand="sm"
        bg={colorTheme || "dark"}
        variant={colorTheme || "dark"}
        fixed="bottom"
      >
        <Container fluid className="justify-content-center">
          <Nav
          //style={{ style: "flex" }}
          //navbarScroll
          >
            <Nav.Link href="#action1">GitHub</Nav.Link>
            <Nav.Link href="#action2">LinkedIn</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

Footer.propTypes = {
  colorTheme: PropTypes.string,
  setColorTheme: PropTypes.func,
};
