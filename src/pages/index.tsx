import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Footer from '@/components/Footer/Footer';
import Stack from '@/components/Stack/Stack';
import Box from '@/components/Box/Box';
import { SteamCurrentlyPlaying } from '@/components/SteamCurrentlyPlaying/SteamCurrentlyPlaying';
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

      <Stack space="6x" xAlign="center">
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
            I also <Link href="/open-source">contribute to open source</Link>{' '}
            from time to time, and enjoy making{' '}
            <Link href="/igloo/node-particles">art with code</Link>!
          </Text>
          <div style={{ height: 30 }} />
          <Text style={{ fontSize: 18 }}>
            Most recently I released{' '}
            <a
              href="https://github.com/TheMightyPenguin/dessert-box"
              target="_blank"
              rel="noreferrer"
            >
              dessert-box
            </a>
            , a library to create a Zero-CSS runtime <code>Box</code> component.
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
            <>
              <span role="img">❄</span>
              igloo
            </>
          </Link>
          <div style={{ marginLeft: 16 }}>
            <Link href="/open-source">open source</Link>
          </div>
        </div>
      </Stack>
      <SteamCurrentlyPlaying />
      <Footer />
    </div>
  );
};

export default Home;
