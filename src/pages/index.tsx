import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Box from '@/components/Box/Box';
import FluidText from '@/components/FluidText/FluidText';
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
      }}
    >
      <Head>
        <link rel="icon" href={generateEmojiFavicon('🐧')} />
      </Head>

      <Stack space="medium" xAlign="center">
        <Stack space="xsmall" xAlign="center">
          <div style={{ fontSize: '64px' }}>
            <span role="img" aria-label="Penguin">
              🐧
            </span>
          </div>

          <Text
            size="large"
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
            marginTop: '1.5rem',
            fontFamily: "'Major Mono Display', monospace",
            fontSize: '16px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <Link href="/igloo">
            <a>
              <span role="img">❄</span>
              igloo
            </a>
          </Link>
        </div>
      </Stack>
    </div>
  );
};

export default Home;
