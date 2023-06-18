import PropTypes from "prop-types";
import { LoggerNavBar } from "../../components/LoggerNavBar";

export function LoggerHome({ colorTheme }) {
  //const [colorTheme, setColorTheme] = useState("dark");
  return (
    <>
      <LoggerNavBar colorTheme={colorTheme} />
      <h1>/LoggerHome</h1>
    </>
  );
}

LoggerHome.propTypes = {
  colorTheme: PropTypes.string,
};
