import { TreatProvider } from "react-treat";
import theme from "./theme.treat";

const ThemeProvider: React.FC = ({ children }) => {
  return <TreatProvider theme={theme}>{children}</TreatProvider>;
};

export default ThemeProvider;
