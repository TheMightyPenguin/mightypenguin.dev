import Link from 'next/link';
import React, { Suspense } from 'react';

import Footer from '@/components/Footer/Footer';
import Stack from '@/components/Stack/Stack';
import { SteamCurrentlyPlaying } from '@/components/SteamCurrentlyPlaying/SteamCurrentlyPlaying';
import Text from '@/components/Text/Text';

export default function Home() {
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
            ! I&apos;m Victor, a proactive Software Engineer that loves doing
            front-end. I make beats with hardware synthetizers, and enjoy making{' '}
            <Link href="/igloo/node-particles">art with code</Link>!
          </Text>
          <div style={{ height: 30 }} />
          <Text style={{ fontSize: 18 }}>
            I created{' '}
            <a
              href="https://github.com/TheMightyPenguin/dessert-box"
              target="_blank"
              rel="noreferrer"
            >
              dessert-box
            </a>
            , a library to create a Zero-CSS runtime <code>Box</code> component
            with Vanilla Extract.
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
        </div>
      </Stack>
      <Suspense>
        <SteamCurrentlyPlaying />
      </Suspense>
      <Footer />
    </div>
  );
}
