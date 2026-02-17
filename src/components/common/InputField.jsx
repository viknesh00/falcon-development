import React from 'react';
import { Field } from 'formik';
import VirtualKeyboard from './VirtualKeyboard';
import Styles from './Styles/inputStyles.module.css';
import { EyeIcon, EyeOffIcon, KeyboardIcon } from '../../assets';

const InputField = ({
  icon,
  type,
  name,
  placeholder,
  error,
  touched,
  isReactIcon = false,
  iconAsset,
  showPasswordToggle = false,
  isPasswordVisible,
  onTogglePassword,
  useVirtualKeyboard = false,
  onVirtualKeyPress,
  activeField,
  setActiveField,
  onToggleVirtualKeyboard,
  showVirtualKeyboard,
  required = false,
  onKeyDown,
}) => (
  <div className={Styles.formGroup}>
    <div className={`${Styles.inputWrapper} ${error && touched ? Styles.error : ''}`}>
      {iconAsset !== null &&
        (isReactIcon ? (
          <div className={Styles.reactIconWrapper}>{icon}</div>
        ) : iconAsset ? (
          <div className={Styles.icon}>
            <img src={iconAsset} alt="" className={Styles.iconAsset} />
          </div>
        ) : icon ? (
          <img src={icon} alt="" className={Styles.icon} />
        ) : null)}
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={Styles.input}
        readOnly={useVirtualKeyboard && showVirtualKeyboard}
        onFocus={() => setActiveField && setActiveField(name)}
        onKeyDown={onKeyDown}
        style={{
          placeholderColor: '#FFFFFFB2',
          // Note: placeholderColor isn't a valid CSS property in JS/React usually,
          // and might have been a residue or for React Native. Retaining it as per original.
        }}
      />
      {useVirtualKeyboard && (
        <div
          className={`${Styles.keyboardToggle} ${showVirtualKeyboard === name ? Styles.active : ''}`}
          onClick={() => {
            if (showVirtualKeyboard === name) {
              onToggleVirtualKeyboard(null);
            } else {
              onToggleVirtualKeyboard(name);
            }
          }}
          title="Toggle Virtual Keyboard"
        >
          <img src={KeyboardIcon} alt="Virtual Keyboard" />
        </div>
      )}
      {showPasswordToggle && (
        <div className={Styles.eyeIcon} onClick={onTogglePassword}>
          <img src={isPasswordVisible ? EyeIcon : EyeOffIcon} alt="Toggle Password" />
        </div>
      )}
    </div>
    {error && touched && <div className={Styles.errorText}>{error}</div>}
    {useVirtualKeyboard && showVirtualKeyboard === name && (
      <VirtualKeyboard onKeyPress={(key) => onVirtualKeyPress(name, key)} />
    )}
  </div>
);

export default InputField;
