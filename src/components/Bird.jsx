import React from 'react';
import '../styles/Bird.css';

const Bird = ({ position }) => {
  return (
    <div 
      className="bird"
      style={{
        top: `${position}px`,
      }}
    >
      <div className="bird-body">
        <div className="bird-wing"></div>
        <div className="bird-eye"></div>
      </div>
    </div>
  );
};

export default Bird;
