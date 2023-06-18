import PropTypes from "prop-types";
import { LoggerNavBar } from "../../components/LoggerNavBar";

export function Logger1({ colorTheme }) {
  //const [colorTheme, setColorTheme] = useState("dark");
  return (
    <>
      <LoggerNavBar colorTheme={colorTheme} />
      <h1>/Logger ESP-MED</h1>
    </>
  );
}

Logger1.propTypes = {
  colorTheme: PropTypes.string,
};
