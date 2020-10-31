import Head from "next/head";

import "../styles/globals.css";
import ThemeProvider from '../theme/ThemeProvider'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default App;
