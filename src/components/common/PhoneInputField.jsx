import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Styles from './Styles/inputStyles.module.css';

const PhoneInputField = ({
  iconAsset,
  name,
  placeholder,
  error,
  touched,
  value,
  onChange,
  onBlur,
}) => (
  <div className={Styles.formGroup}>
    <div className={`${Styles.phoneInputWrapper} ${error && touched ? Styles.error : ''}`}>
      <div className={Styles.icon}>
        <img src={iconAsset} alt="" className={Styles.iconAsset} />
      </div>
      <PhoneInput
        international
        defaultCountry="GB"
        countries={['GB']}
        countryCallingCodeEditable={false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={Styles.phoneInput}
        name={name}
      />
    </div>
    {error && touched && <div className={Styles.errorText}>{error}</div>}
  </div>
);

export default PhoneInputField;
