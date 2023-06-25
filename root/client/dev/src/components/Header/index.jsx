import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
import { DarkModeIcon } from "../DarkModeIcon";
import { WalletIcon } from "../WalletIcon";

export const Header = ({ colorTheme, setColorTheme }) => {
  return (
    <Navbar
      //collapseOnSelect
      className="sticky-top"
      expand="sm"
      bg={colorTheme || "dark"}
      variant={colorTheme || "dark"}
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          style={{ marginLeft: "10px" }}
          className="order-0"
        >
          <img
            alt="favicon"
            src="/icons/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span
            style={{
              marginLeft: "5px",
              color: "#97c93e",
            }}
          >
            dev.orozcoh
          </span>
        </Navbar.Brand>
        <Navbar.Toggle className="ms-auto " aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto"
            style={{ style: "flex", alignItems: "flex-end" }}
            navbarScroll
          >
            <Nav.Link href="/datalogger">DataLogger</Nav.Link>
            <Nav.Link href="/memory">Memory DB</Nav.Link>
            <Nav.Link href="/crypto">Crypto</Nav.Link>
            <Nav.Link href="">
              <WalletIcon />
            </Nav.Link>
            <Nav.Link href="">
              <DarkModeIcon setColorTheme={setColorTheme} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  colorTheme: PropTypes.string,
  setColorTheme: PropTypes.func,
};
