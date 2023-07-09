import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./views/home";
//import { LoggerHome } from "./views/DataLoggerView/views/LoggerHome";
import { DataLoggerView } from "./views/DataLoggerView";

import { DeviceNavBar } from "./views/DataLoggerView/components/DeviceNavBar";
import { LoggerData } from "./views/DataLoggerView/views/LoggerData";
import { LoggerGraphs } from "./views/DataLoggerView/views/LoggerGraphs";

function App() {
  const [colorTheme, setColorTheme] = useState("dark");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          //alignItems: "center",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <Header colorTheme={colorTheme} setColorTheme={setColorTheme} />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ------------------------------ dataLogger ----------------------------------- */}
          <Route
            path="dataLogger"
            element={<DataLoggerView colorTheme={colorTheme} />}
          >
            <Route
              path="Logger_Dev"
              element={
                <DeviceNavBar
                  colorTheme={colorTheme}
                  deviceName={"Logger_Dev"}
                />
              }
            >
              <Route path="about" element={<div>ABOUT</div>} />
              <Route
                path="data"
                element={<LoggerData deviceName={"Logger_Dev"} />}
              />
              <Route path="graph" element={<div>GRAPH</div>} />
              <Route
                path="graphs"
                element={<LoggerGraphs deviceName={"Logger_Dev"} />}
              />
            </Route>
            <Route
              path="Logger_Hass"
              element={
                <DeviceNavBar
                  colorTheme={colorTheme}
                  deviceName={"Logger_Hass"}
                />
              }
            >
              <Route path="about" element={<div>ABOUT</div>} />
              <Route
                path="data"
                element={<LoggerData deviceName={"Logger_Hass"} />}
              />
              <Route path="graph" element={<div>GRAPH</div>} />
              <Route
                path="graphs"
                element={<LoggerGraphs deviceName={"Logger_Hass"} />}
              />
            </Route>
            <Route
              path="Logger_Avo"
              element={
                <DeviceNavBar
                  colorTheme={colorTheme}
                  deviceName={"Logger_Avo"}
                />
              }
            >
              <Route path="about" element={<div>ABOUT</div>} />
              <Route
                path="data"
                element={<LoggerData deviceName={"Logger_Avo"} />}
              />
              <Route path="graph" element={<div>GRAPH</div>} />
              <Route
                path="graphs"
                element={<LoggerGraphs deviceName={"Logger_Avo"} />}
              />
            </Route>
            <Route path="Admin" element={<div>ADMIN</div>} />
            <Route path="*" element={<div>WHUuuT</div>} />
          </Route>
          {/* ------------------------------ dataLogger ----------------------------------- */}
          <Route
            path="memory"
            element={
              <div
                style={{
                  minHeight: "88vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "66px",
                  fontFamily: "fantasy",
                }}
              >
                In progress...
              </div>
            }
          />
          {/* Add other routes */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "88vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "66px",
                  fontFamily: "fantasy",
                }}
              >
                In progress...
              </div>
            }
          />
        </Routes>
      </div>
      <Footer colorTheme={colorTheme} />
    </>
  );
}

export default App;
