import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";

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
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ------------------------------ dataLogger ----------------------------------- */}
            <Route
              path="dataLogger"
              element={<DataLoggerView colorTheme={colorTheme} />}
            >
              <Route
                path="Logger_Dev"
                element={<DeviceNavBar deviceName={"Logger_Dev"} />}
              >
                <Route path="about" element={<div>ABOUT</div>} />
                <Route path="api" element={<div>API</div>} />
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
                element={<DeviceNavBar deviceName={"Logger_Hass"} />}
              >
                <Route path="about" element={<div>ABOUT</div>} />
                <Route path="api" element={<div>API</div>} />
                <Route path="data" element={<div>DATA</div>} />
                <Route path="graph" element={<div>GRAPH</div>} />
                <Route path="graphs" element={<div>GRAPHS</div>} />
              </Route>
              <Route
                path="Logger_Avo"
                element={<DeviceNavBar deviceName={"Logger_Avo"} />}
              >
                <Route path="about" element={<div>ABOUT</div>} />
                <Route path="api" element={<div>API</div>} />
                <Route path="data" element={<div>DATA</div>} />
                <Route path="graph" element={<div>GRAPH</div>} />
                <Route path="graphs" element={<div>GRAPHS</div>} />
              </Route>
              <Route path="Admin" element={<div>ADMIN</div>} />
              <Route path="*" element={<div>WHUT</div>} />
            </Route>
            {/* ------------------------------ dataLogger ----------------------------------- */}

            {/* Add other routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <Footer colorTheme={colorTheme} />
    </>
  );
}

export default App;
