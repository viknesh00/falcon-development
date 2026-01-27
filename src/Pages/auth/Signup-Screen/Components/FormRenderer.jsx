import React, { useState } from 'react';
import Styles from '../Styles/authStyles.module.css';
import {
  Button,
  InputField,
  PhoneInputField,
  Dropdown,
  DatePicker,
  AddressLookup,
  PhotoIdUpload,
  SelfieCheck,
} from '../../../../components';
import * as Icons from '../../../../assets';
import { isStepValid, ICON_MAPPER } from '../config/formConfig';

const FormRenderer = ({ step, stepConfig, formikProps, extraHandlers, isSubmitting }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched, handleChange } = formikProps;

  // Render individual field
  const renderField = (field) => {
    // Resolve Icon
    const IconComponent = field.icon ? Icons[ICON_MAPPER[field.icon]] : null;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        // Special logic for password fields (toggle, virtual keyboard)
        // We'll use extraHandlers to pass down state for these if needed,
        // or keep local state here if it's purely UI.
        // For now, let's keep it simple and assume standard text input,
        // adding advanced props if passed via extraHandlers.

        // Check if this field needs password toggling or virtual keyboard
        const isPassword = field.type === 'password';
        const showToggle = field.features?.includes('passwordToggle');
        const useVirtual = field.features?.includes('virtualKeyboard');

        // Props from extraHandlers for password visibility/virtual keyboard
        const showPassword = extraHandlers?.passwordVisibilities?.[field.name];
        const onTogglePassword = extraHandlers?.onTogglePassword;
        const activeVirtualField = extraHandlers?.activeVirtualField;
        const setActiveVirtualField = extraHandlers?.setActiveVirtualField;
        const showVirtualKeyboard = extraHandlers?.showVirtualKeyboard;
        const onToggleVirtualKeyboard = extraHandlers?.onToggleVirtualKeyboard;

        return (
          <div key={field.name} style={{ flex: field.flex || 'unset' }}>
            <label className={Styles.inputLabel}>
              {field.label}
              {field.required && <span className={Styles.requiredIndicator}>*</span>}
            </label>
            <InputField
              iconAsset={IconComponent}
              type={isPassword && showPassword ? 'text' : field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              touched={touched[field.name]}
              // Password specific
              showPasswordToggle={showToggle}
              isPasswordVisible={showPassword}
              onTogglePassword={() => onTogglePassword && onTogglePassword(field.name)}
              // Virtual Keyboard specific
              useVirtualKeyboard={useVirtual}
              activeField={activeVirtualField}
              setActiveField={setActiveVirtualField}
              onToggleVirtualKeyboard={onToggleVirtualKeyboard}
              showVirtualKeyboard={showVirtualKeyboard}
              onVirtualKeyPress={(fieldName, key) => {
                const currentVal = values[fieldName] || '';
                if (key === 'BACKSPACE') {
                  setFieldValue(fieldName, currentVal.slice(0, -1));
                } else {
                  setFieldValue(fieldName, currentVal + key);
                }
              }}
            />
          </div>
        );

      case 'phone':
        return (
          <div key={field.name}>
            <label className={Styles.inputLabel}>
              {field.label}
              {field.required && <span className={Styles.requiredIndicator}>*</span>}
            </label>
            <PhoneInputField
              iconAsset={IconComponent}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(val) => setFieldValue(field.name, val)}
              error={errors[field.name]}
              touched={touched[field.name]}
            />
          </div>
        );

      case 'date':
        return (
          <div key={field.name}>
            <label className={Styles.inputLabel}>
              {field.label}
              {field.required && <span className={Styles.requiredIndicator}>*</span>}
            </label>
            <DatePicker
              name={field.name}
              value={values[field.name]}
              onChange={setFieldValue}
              setFieldTouched={setFieldTouched}
              error={errors[field.name]}
              touched={touched[field.name]}
              placeholder={field.placeholder}
            />
          </div>
        );

      case 'dropdown':
        return (
          <div key={field.name}>
            <label className={Styles.inputLabel}>
              {field.label}
              {field.required && <span className={Styles.requiredIndicator}>*</span>}
            </label>
            <Dropdown
              iconAsset={IconComponent}
              name={field.name}
              placeholder={field.placeholder}
              options={field.options}
              value={values[field.name]}
              onChange={(val) => setFieldValue(field.name, val)}
              error={errors[field.name]}
              touched={touched[field.name]}
            />
          </div>
        );

      case 'address': // Special case for AddressLookup which isn't a simple input
        // This type isn't explicitly in config yet (config uses 'text' for postalCode),
        // but checking if name is 'postalCode' might be safer or adding type='addressLookup' to config.
        // For now, let's implement the specific postalCode check within the 'text' case or handle logic below.
        return null;

      case 'file':
        if (field.name === 'photoId') {
          return (
            <div key={field.name}>
              <PhotoIdUpload
                value={values[field.name]}
                onChange={(file) => setFieldValue(field.name, file)}
                error={errors[field.name]}
                touched={touched[field.name]}
              />
            </div>
          );
        }
        return null;

      case 'camera':
        if (field.name === 'selfie') {
          return (
            <div key={field.name}>
              <SelfieCheck
                value={values[field.name]}
                onChange={(val) => setFieldValue(field.name, val)}
                error={errors[field.name]}
                touched={touched[field.name]}
              />
            </div>
          );
        }
        return null;

      default:
        // Fallback to text input for unknown types
        return (
          <div key={field.name}>
            <label className={Styles.inputLabel}>
              {field.label}
              {field.required && <span className={Styles.requiredIndicator}>*</span>}
            </label>
            <InputField
              iconAsset={IconComponent}
              type={'text'}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              touched={touched[field.name]}
            />
          </div>
        );
    }
  };

  // Render Sections recursively or flat list
  const renderLayout = () => {
    // If step has 'sections', render them
    if (stepConfig.sections) {
      return stepConfig.sections.map((section, sIdx) => (
        <React.Fragment key={sIdx}>
          {section.title && (
            <h3 className={Styles.sectionTitle}>
              {section.title}
              <span className={Styles.requiredIndicator}>*</span>
            </h3>
          )}

          {/* Special Logic for Step 2 Address Section Grouping */}
          {section.name === 'address' ? (
            // Grouping logic for Grid styling in Step 2 needs specific care
            // We can map fields, but we also have the AddressLookup logic separately
            renderAddressSection(section)
          ) : (
            // Default Section with flex logic
            <div className={Styles.formGrid} style={{ marginTop: 10 }}>
              {/* We can group pairs if we want 'flex: 1' items to be side by side */}
              {/* Simple implementation: Just map and let CSS Grid/Flex handle it roughly */}
              {/* Advanced: Check 'flex: 1' props and group them in rows */}
              {renderRowGrouping(section.fields)}
            </div>
          )}
        </React.Fragment>
      ));
    }

    // Flat fields (Step 1, Step 1.5, Step 3)
    return (
      <div className={Styles.formGrid}>
        {stepConfig.fields.map((field) => {
          // Check for "OTP" Section title simulation
          if (field.section) {
            return (
              <div key={field.name} className={Styles.otpSection}>
                <p className={Styles.otpTitle}>
                  {field.section}
                  <span className={Styles.requiredIndicator}>*</span>
                </p>
                {renderField({ ...field, label: null })} {/* Don't re-render label inside */}
              </div>
            );
          }
          return renderField(field);
        })}
      </div>
    );
  };

  // Helper to group 'flex: 1' fields into rows
  const renderRowGrouping = (fields) => {
    const rows = [];
    let currentRow = [];

    fields.forEach((field, index) => {
      if (field.flex) {
        currentRow.push(field);
        // If we have 2 flex items, close the row
        if (currentRow.length === 2) {
          rows.push({ type: 'row', items: currentRow });
          currentRow = [];
        }
      } else {
        // Push any pending row first
        if (currentRow.length > 0) {
          rows.push({ type: 'row', items: currentRow }); // Or handle single flex item?
          currentRow = [];
        }
        rows.push({ type: 'single', item: field });
      }
    });
    // Final pending row
    if (currentRow.length > 0) {
      rows.push({ type: 'row', items: currentRow });
    }

    return rows.map((row, idx) => {
      if (row.type === 'row') {
        return (
          <div key={idx} className={Styles.formRow}>
            {row.items.map((item) => (
              <React.Fragment key={item.name}>{renderField(item)}</React.Fragment>
            ))}
          </div>
        );
      }
      return <React.Fragment key={idx}>{renderField(row.item)}</React.Fragment>;
    });
  };

  // Specialized Address Section Renderer
  const renderAddressSection = (section) => {
    // Find PostalCode field to render AddressLookup
    const postalField = section.fields.find((f) => f.name === 'postalCode');
    const otherFields = section.fields.filter((f) => f.name !== 'postalCode');

    return (
      <div className={Styles.formGrid}>
        {/* Postal Code Lookup */}
        {postalField && (
          <div key={postalField.name}>
            <label className={Styles.inputLabel}>
              {postalField.label}
              {postalField.required && <span className={Styles.requiredIndicator}>*</span>}
            </label>
            <AddressLookup
              value={values[postalField.name]}
              onAddressSelect={extraHandlers.handleAddressSelect}
              onManualEntry={extraHandlers.handleManualEntry}
              error={errors[postalField.name]}
              touched={touched[postalField.name]}
            />
          </div>
        )}

        {/* Conditional rendering for other address fields */}
        {extraHandlers.showAddressFields && renderRowGrouping(otherFields)}
      </div>
    );
  };

  return (
    <>
      {renderLayout()}

      {stepConfig.nextButtonText && (
        <div style={{ marginTop: 20 }}>
          <Button
            variant="primary"
            className={Styles.continueBtn}
            disabled={isSubmitting || !isStepValid(step, values)}
            type="submit"
          >
            {isSubmitting ? 'Processing...' : stepConfig.nextButtonText}
          </Button>
          {step === 1 && (
            <p className={Styles.termsText}>
              By continuing, you agree to Falcon’s Terms and Conditions. We’ll handle your data in
              line with our Privacy Policy.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default FormRenderer;
