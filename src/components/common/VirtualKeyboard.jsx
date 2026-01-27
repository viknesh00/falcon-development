import React, { useState, useEffect } from 'react';
import Styles from './Styles/VirtualKeyboard.module.css';

const VirtualKeyboard = ({ onKeyPress }) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const chars = 'bcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()a';
    const shuffled = chars.split('').sort(() => Math.random() - 0.5);
    setKeys(shuffled);
  }, []);

  return (
    <div className={Styles.keyboardContainer}>
      <button
        type="button"
        className={`${Styles.keyButton} ${Styles.backspace}`}
        onClick={(e) => {
          e.preventDefault();
          onKeyPress('BACKSPACE');
        }}
      >
        ⌫
      </button>
      <div className={Styles.keysGrid}>
        {keys.map((char, index) => (
          <button
            key={index}
            type="button"
            className={Styles.keyButton}
            onClick={(e) => {
              e.preventDefault();
              onKeyPress(char);
            }}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
