import React from 'react';
import PageStyles from './styles/ApplicationPreview.module.css';
import { Edit } from '../../assets';

const ApplicationPreview = ({ values, config, onEditSection }) => {
  if (!config?.previewSections) return null;

  const calculateTotal = (keys = []) => {
    return keys.reduce((sum, key) => {
      const val = Number(values[key]) || 0;
      return sum + val;
    }, 0);
  };

  return (
    <div className={PageStyles.previewContainer}>
      {config.previewSections.map((section, index) => (
        <div key={index} className={PageStyles.previewSection}>
          {/* HEADER */}
          <div className={PageStyles.sectionHeader}>
            <h3 className={PageStyles.previewTitle}>{section.title}</h3>
          </div>

          {/* GRID */}
          <div className={PageStyles.previewGrid}>
            {section.fields.map((field, i) => (
              <div key={i} className={PageStyles.previewItem}>
                <span className={PageStyles.previewLabel}>{field.label}</span>

                <span className={PageStyles.previewValue}>
                  {field.prefix || ''}
                  {values[field.key] || '-'}
                </span>
              </div>
            ))}

            {/* EDIT BUTTON */}
            <div className={PageStyles.editGridItem}>
              <div className={PageStyles.iconCircle} onClick={() => onEditSection(section.title)}>
                <img src={Edit} alt="edit" className={PageStyles.icon} />
                <span className={PageStyles.editText}>Edit</span>
              </div>
            </div>
          </div>

          {/* TOTAL */}
          {section.total && (
            <div className={PageStyles.previewTotal}>
              <span>{section.total.label}</span>
              <span>
                {section.total.prefix}
                {calculateTotal(section.total.keys)}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* TERMS */}
      <div className={PageStyles.termsRow}>
        <input type="checkbox" />
        <span>
          I agree to the <a href="#">Terms and Conditions</a> and confirm that all information
          provided is accurate and complete.
        </span>
      </div>
    </div>
  );
};

export default ApplicationPreview;
