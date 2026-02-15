import React from 'react';
import './Styles/Switch.css';

const Switch = ({ checked, onChange, id }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} id={id} />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
