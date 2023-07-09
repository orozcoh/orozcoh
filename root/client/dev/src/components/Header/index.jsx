import PropTypes from "prop-types";
import { Container, Navbar, Nav } from "react-bootstrap";
import { DarkModeIcon } from "../DarkModeIcon";
import { WalletIcon } from "../WalletIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./style.scss";

export const Header = ({ colorTheme, setColorTheme }) => {
  const tabNum = GetTabFromUrl();
  return (
    <Navbar
      //collapseOnSelect
      className="sticky-top oh-main-header"
      expand="sm"
      bg={colorTheme || "dark"}
      variant={colorTheme || "dark"}
    >
      <Container fluid>
        <Navbar.Brand style={{ marginLeft: "10px" }} className="order-0">
          <Link className={"oh-header-logo"} to="/">
            <img
              alt="favicon"
              src="/icons/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span style={{ marginLeft: "10px" }}>dev.orozcoh</span>
          </Link>
          {/*           <span
            style={{
              marginLeft: "5px",
              color: "#97c93e",
            }}
          >
            dev.orozcoh
          </span> */}
        </Navbar.Brand>
        <Navbar.Toggle className="ms-auto " aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto"
            style={{ style: "flex", alignItems: "flex-end" }}
            navbarScroll
          >
            <Link
              className={tabNum === 1 ? "active-link" : ""}
              onClick={() => {}}
              to="/datalogger"
            >
              DataLogger
            </Link>
            <Link
              className={tabNum === 2 ? "active-link" : ""}
              onClick={() => {}}
              to="/memory"
            >
              Memory DB
            </Link>
            <Link
              className={tabNum === 3 ? "active-link" : ""}
              onClick={() => {}}
              to="/crypto"
            >
              Crypto
            </Link>
            <Link onClick={() => {}}>
              <WalletIcon />
            </Link>
            <Link>
              <DarkModeIcon setColorTheme={setColorTheme} />
            </Link>
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

const GetTabFromUrl = () => {
  const location = useLocation();
  const pathName = location.pathname;

  if (pathName.startsWith("/datalogger")) {
    return 1;
  } else if (pathName.startsWith("/memory")) {
    return 2;
  } else if (pathName.startsWith("/crypto")) {
    return 3;
  } else {
    return 0;
  }
};
