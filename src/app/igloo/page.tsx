import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import React from 'react';

import Box from '@/components/Box/Box';
import Footer from '@/components/Footer/Footer';
import Text from '@/components/Text/Text';

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

export default async function Igloo() {
  const filesDirectory = path.join(process.cwd(), 'src/app/igloo');
  const filenames = fs
    .readdirSync(filesDirectory)
    .filter((filename) => !filename.endsWith('.tsx'));

  const links = filenames.map((filename) => {
    return {
      href: filename.replace(/\.tsx/, ''),
    };
  });

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
        <link rel="icon" href={generateEmojiFavicon('❄ igloo')} />
      </Head>

      <Text
        size="large"
        style={{
          position: 'relative',
          top: '-10px',
          fontFamily: "'Major Mono Display', monospace",
          letterSpacing: '1px',
        }}
      >
        Igloo
      </Text>

      <Box paddingLeft="3x">
        Igloo is a space where I post web experiments and art with creative
        coding
      </Box>

      <div
        style={{
          marginTop: '1.5rem',
          fontFamily: 'monospace',
          fontSize: '16px',
          display: 'flex',
          gap: '16px',
        }}
      >
        {links.map(({ href }, index) => (
          <Link
            key={href}
            href={`/igloo/${href}`}
            style={{
              marginLeft: index > 0 ? 16 : 0,
            }}
          >
            {href}
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
