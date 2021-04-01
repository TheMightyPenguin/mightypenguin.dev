import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import Footer from '@/components/Footer/Footer';
import Stack from '@/components/Stack/Stack';
import Text from '@/components/Text/Text';

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const contributions = [
  { href: 'https://github.com/storybookjs/storybook/pull/14251' },
  { href: 'https://github.com/apollographql/apollo-client/pull/3725' },
  { href: 'https://github.com/withspectrum/spectrum/pull/3072' },
  { href: 'https://github.com/google/WebFundamentals/pull/6739' },
  { href: 'https://github.com/wesbos/Advanced-React/pull/109' },
];

const OpenSource = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
        height: '100vh',
      }}
    >
      <Head>
        <link rel="icon" href={generateEmojiFavicon('🐧')} />
      </Head>
      <Stack space="medium">
        <Link href="/">
          <a>
            <Text>&larr; Back to home</Text>
          </a>
        </Link>
        <Text>Open Source contributions I have made:</Text>
        <ul>
          <Stack space="small">
            {contributions.map((item) => {
              return (
                <li key={item.href} style={{ wordBreak: 'break-word' }}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <Text>{item.href}</Text>
                  </a>
                </li>
              );
            })}
          </Stack>
        </ul>
      </Stack>
      <Footer />
    </div>
  );
};

export default OpenSource;
