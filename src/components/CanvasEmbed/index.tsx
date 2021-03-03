/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import useToggle from '../../hooks/useToggle';

const CanvasEmbed: React.FC<{ height?: number }> = ({ children, height }) => {
  const [show, toggle] = useToggle(true);

  const handleClick = () => {
    toggle(undefined);
    window.setTimeout(() => toggle(true), 30);
  };

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
        height: height,
      }}
    >
      {show ? children : false}
      <div
        onClick={handleClick}
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1.5rem',
          backgroundColor: 'gray',
          padding: '4px',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        Refresh
      </div>
    </div>
  );
};

export default CanvasEmbed;