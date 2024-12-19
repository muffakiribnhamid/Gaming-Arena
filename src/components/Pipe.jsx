import React from 'react';
import '../styles/Pipe.css';

const Pipe = ({ position, height, isTop }) => {
  return (
    <div
      className={`pipe ${isTop ? 'top' : 'bottom'}`}
      style={{
        left: `${position}px`,
        height: `${height}px`,
        top: isTop ? 0 : 'auto',
        bottom: isTop ? 'auto' : 0,
      }}
    >
      <div className="pipe-head"></div>
    </div>
  );
};

export default Pipe;
