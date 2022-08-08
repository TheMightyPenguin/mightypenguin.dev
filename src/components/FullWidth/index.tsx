import React, { PropsWithChildren } from 'react';

const FullWidth: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default FullWidth;
