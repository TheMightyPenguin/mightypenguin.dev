import Link from 'next/link';
import React from 'react';

type Props = {
  href: React.ComponentProps<typeof Link>['href'];
};

const BackToLink: React.FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a>
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: 'auto',
            height: '44px',
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: 'Vollkorn',
            fontSize: 24,
            color: 'black',
            overflow: 'hidden',
            zIndex: 10,
            backgroundColor: 'white',
            paddingTop: 10,
            bottom: 0,
            borderBottomRightRadius: 4,
            boxShadow: '0px -1px 17px 1px rgba(90,90,90,0.65)',
            userSelect: 'none',
          }}
        >
          {children}
        </div>
      </a>
    </Link>
  );
};

export default BackToLink;
