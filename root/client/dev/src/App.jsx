import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";

import { Home } from "./views/home";
import { LoggerHome } from "./views/dataLogger/views/LoggerHome";
import { Logger1 } from "./views/dataLogger/views/Logger1";

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
            <Route
              path="/dataLogger"
              element={<LoggerHome colorTheme={colorTheme} />}
            />
            <Route
              path="/dataLogger/logger1"
              element={<Logger1 colorTheme={colorTheme} />}
            />

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
