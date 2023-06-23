//import { useState } from "react";
//import { MainNavbar } from "./components/Navbar";
//import { SecondNavBar } from "../../components/SecondNavBar";

export function Home() {
  //const [colorTheme, setColorTheme] = useState("dark");
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <img
          alt="favicon"
          src="/img/orozcoh-arch.jpg"
          className="d-inline-block align-top"
          style={{
            width: "100%",
            maxWidth: "100vh",
          }}
        />
      </div>
    </>
  );
}
