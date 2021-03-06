import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import ThemeProvider from '../theme/ThemeProvider';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
};

export default App;
