import "../styles/globals.css";
import ThemeProvider from '../theme/ThemeProvider'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default App;
