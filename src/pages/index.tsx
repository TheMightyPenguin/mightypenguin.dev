import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Footer from '@/components/Footer/Footer';
import Stack from '@/components/Stack/Stack';
import Text from '@/components/Text/Text';

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        padding: 20,
      }}
    >
      <Head>
        <link rel="icon" href={generateEmojiFavicon('🐧')} />
      </Head>

      <Stack space="4x" xAlign="center">
        <Stack space="1x" xAlign="center">
          <div style={{ fontSize: '64px' }}>
            <span role="img" aria-label="Penguin">
              🐧
            </span>
          </div>

          <Text
            size="title"
            style={{
              position: 'relative',
              fontFamily: "'Major Mono Display', monospace",
              letterSpacing: '1px',
            }}
          >
            TheMightyPenguin
          </Text>
        </Stack>

        <div
          style={{
            fontFamily: "'Vollkorn', serif",
            paddingLeft: 12,
            paddingRight: 12,
            maxWidth: 600,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Hi there
            <span role="img" aria-label="wave">
              👋
            </span>
            ! I&apos;m a proactive Software Engineer that loves doing front-end.
            I also{' '}
            <Link href="/open-source">
              <a>contribute to open source</a>
            </Link>{' '}
            from time to time, and enjoy making{' '}
            <Link href="/igloo/node-particles">
              <a>art with code</a>
            </Link>
            !
          </Text>
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            fontFamily: "'Vollkorn', monospace",
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href="/igloo">
            <a>
              <span role="img">❄</span>
              igloo
            </a>
          </Link>
          <div style={{ marginLeft: 16 }}>
            <Link href="/open-source">
              <a>open source</a>
            </Link>
          </div>
        </div>
      </Stack>
      <Footer />
    </div>
  );
};

export default Home;
