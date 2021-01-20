import { TreatProvider } from 'react-treat';

import threatTheme from './theme.treat';

const ThemeProvider: React.FC = ({ children }) => {
  return <TreatProvider theme={threatTheme}>{children}</TreatProvider>;
};

export default ThemeProvider;
