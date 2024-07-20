import Link from 'next/link';
import React, { Suspense } from 'react';

import Footer from '@/components/Footer/Footer';
import Stack from '@/components/Stack/Stack';
import { SteamCurrentlyPlaying } from '@/components/SteamCurrentlyPlaying/SteamCurrentlyPlaying';
import Text from '@/components/Text/Text';
import dynamic from 'next/dynamic';
import * as styles from './page.css';
import Inline from '@/components/Inline/Inline';

const ColorParallels = dynamic(
  () => import('@/canvas/colorParallels/Component'),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <div className={styles.backgroundCanvas}>
        <ColorParallels width="full" height="full" />
      </div>
      <div className={styles.mainContent}>
        <Stack space="6x">
          <Stack space="1x">
            <Inline space="16px">
              <div style={{ fontSize: '64px' }}>
                <span role="img" aria-label="Penguin">
                  🐧
                </span>
              </div>
              <Stack space="16px">
                <Text
                  size="title"
                  style={{
                    position: 'relative',
                    // fontFamily: "'Major Mono Display', monospace",
                    fontFamily: '"Permanent Marker", cursive',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    // letterSpacing: '1px',
                  }}
                >
                  TheMightyPenguin
                </Text>
                <Text>Victor Tortolero</Text>
              </Stack>
            </Inline>
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
              front-end. I make beats with hardware synthetizers, and enjoy
              making <Link href="/igloo/node-particles">art with code</Link>!
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
              , a library to create a Zero-CSS runtime <code>Box</code>{' '}
              component with Vanilla Extract. Curious about the background art?{' '}
              <Link href="/igloo/color-parallels">Check this out</Link>.
            </Text>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              fontFamily: '"Permanent Marker", cursive',
              letterSpacing: '2px',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href="/igloo">
              <>
                <span role="img">❄️</span>
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
    </>
  );
}
