import React from 'react';
import './Text.css';

const Text = ({ data }) => {
  return (
    <div className="text-gradient">
      <h1 key={data.text1}>{data.text1}</h1>
      <h1 key={data.text2}>{data.text2}</h1>
    </div>
  );
};

export default Text;
