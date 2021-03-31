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

const Footer: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <Inline space="large" yAlign="center">
        <Link href="/">
          <a>
            <Home size={32} color="black" />
            <span className="visually-hidden">home</span>
          </a>
        </Link>
        {links.map(({ link, icon }) => (
          <a href={link} key={link}>
            {icon}
            <span className="visually-hidden">{link}</span>
          </a>
        ))}
        <Link href="https://mightypenguin.dev/cv">CV</Link>
      </Inline>
    </div>
  );
};

export default Footer;
