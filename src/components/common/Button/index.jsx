import React from 'react';
import clsx from 'clsx';
import styles from './Styles/buttonStyle.module.css';

const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      type = 'button',
      disabled = false,
      fullWidth = false,
      className,
      style,
      onClick,
      onPress,
      children,
      ...rest
    },
    ref
  ) => {
    //
    const handleKeyDown = (e) => {
      if (disabled) return;
      // Accessibility: Enter & Space trigger press
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPress?.(e);
      }
    };

    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
    };
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
          styles.button,
          styles[variant],
          {
            [styles.fullWidth]: fullWidth,
            [styles.disabled]: disabled,
          },
          className
        )}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
