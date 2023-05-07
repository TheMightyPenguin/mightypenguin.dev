import Link from 'next/link';
import React from 'react';
import { GitHub, Home, Linkedin, Twitter } from 'react-feather';

import Inline from '@/components/Inline/Inline';

const links = [
  {
    icon: <Twitter size={32} color="black" />,
    link: 'https://twitter.com/mightypenguinv',
  },
  {
    icon: <GitHub size={32} color="black" />,
    link: 'https://github.com/TheMightyPenguin',
  },
  {
    icon: <Linkedin size={32} color="black" />,
    link: 'https://www.linkedin.com/in/victor-tortolero/',
  },
];

type Props = {
  overlay?: boolean;
};

const Footer: React.FC<Props> = ({ overlay }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        width: '100vw',
        paddingLeft: 20,
        paddingRight: 20,
        transform: 'translateX(-50%)',
        maxWidth: 420,
        fontFamily: 'Vollkorn',
        fontSize: 24,
        color: 'black',
        overflow: 'hidden',
        zIndex: 10,
        ...(overlay
          ? {
              backgroundColor: 'white',
              paddingTop: 10,
              bottom: 0,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              boxShadow: '0px -1px 17px 1px rgba(90,90,90,0.65)',
            }
          : undefined),
      }}
    >
      <Inline space="none" yAlign="center" xAlign="spaced">
        <Link href="/">
          <Home size={32} color="black" />
          <span className="visually-hidden">home</span>
        </Link>
        {links.map(({ link, icon }) => (
          <a href={link} key={link}>
            {icon}
            <span className="visually-hidden">{link}</span>
          </a>
        ))}
        <Link href="https://mightypenguin.dev/cv" style={{ color: 'black' }}>
          CV
        </Link>
      </Inline>
    </div>
  );
};

export default Footer;
