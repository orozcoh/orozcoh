import PropTypes from "prop-types";
import { useState } from "react";

export const DarkModeIcon = ({ setColorTheme }) => {
  const [theme, setTheme] = useState("dark");

  return theme === "dark" ? (
    <span
      className="material-icons"
      style={{ color: "white", cursor: "pointer" }}
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        if (setColorTheme) {
          setColorTheme(newTheme);
        }
      }}
    >
      dark_mode
    </span>
  ) : (
    <span
      className="material-icons"
      style={{ color: "black", cursor: "pointer" }}
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        if (setColorTheme) {
          setColorTheme(newTheme);
        }
      }}
    >
      light_mode
    </span>
  );
};

DarkModeIcon.propTypes = {
  colorTheme: PropTypes.string,
  setColorTheme: PropTypes.func,
};
