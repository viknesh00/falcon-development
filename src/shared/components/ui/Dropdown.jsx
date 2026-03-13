import React, { useState, useRef, useEffect } from 'react';
import Styles from './Styles/authStyles.module.css';

const Dropdown = ({
  iconAsset,
  name,
  placeholder,
  options,
  error,
  touched,
  value,
  onChange,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionSelect = (option) => {
    // Handle both string options and option objects with label and icon
    const selectedValue = typeof option === 'string' ? option : option.label;
    onChange(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find the selected option object if options contain icons
  const selectedOption = options.find(
    (opt) => (typeof opt === 'string' ? opt : opt.label) === value
  );
  const selectedIcon =
    selectedOption && typeof selectedOption !== 'string' ? selectedOption.icon : null;

  return (
    <div className={Styles.formGroup}>
      <div
        className={`${Styles.dropdownWrapper} ${error && touched ? Styles.error : ''}`}
        ref={dropdownRef}
      >
        {iconAsset && (
          <div className={Styles.icon}>
            <img src={iconAsset} alt="" className={Styles.iconAsset} />
          </div>
        )}
        <div className={Styles.dropdownInput} onClick={() => setIsOpen(!isOpen)} onBlur={onBlur}>
          <div className={Styles.dropdownInputContent}>
            {selectedIcon && (
              <div className={Styles.selectedIcon}>
                <img src={selectedIcon} alt="" className={Styles.optionIcon} />
              </div>
            )}
            <span className={value ? Styles.selectedValue : Styles.placeholder}>
              {value || placeholder}
            </span>
          </div>
          <div className={`${Styles.dropdownArrow} ${isOpen ? Styles.open : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className={Styles.dropdownMenu}>
            {options.map((option, index) => {
              const isString = typeof option === 'string';
              const label = isString ? option : option.label;
              const icon = !isString && option.icon ? option.icon : iconAsset;
              const isSelected = value === label;

              return (
                <div
                  key={index}
                  className={`${Styles.dropdownOption} ${isSelected ? Styles.selected : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {icon && (
                    <div className={Styles.optionIconWrapper}>
                      <img src={icon} alt="" className={Styles.optionIcon} />
                    </div>
                  )}
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {error && touched && <div className={Styles.errorText}>{error}</div>}
    </div>
  );
};

export default Dropdown;
