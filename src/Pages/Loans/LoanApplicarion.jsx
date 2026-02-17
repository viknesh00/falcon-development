import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/common/InputField';
import Dropdown from '../../components/common/Dropdown';
import DatePicker from '../../components/common/DatePicker';
import Button from '../../components/common/Button';
import AddressLookup from '../../components/common/AddressLookup';
import { loanFormConfig } from '../../config/loanFormConfig';
import { IoArrowBack } from 'react-icons/io5';
import PageStyles from './styles/LoanApplication.module.css';
import { Link } from 'react-router-dom';
import { StepIndicator } from '../../components';
import EstimatedFinanceSummary from './EstimatedFinanceSummary';
import { UploadIcon } from '../../assets';
import ApplicationSubmittedModal from './ApplicationSubmittedModal';

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showFinanceSummary, setShowFinanceSummary] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const initialValues = {};
  loanFormConfig.forEach((section) => {
    if (section.groups) {
      section.groups.forEach((group) => {
        group.fields.forEach((field) => {
          initialValues[field.name] = '';
        });
      });
    } else {
      section.fields.forEach((field) => {
        initialValues[field.name] = '';
      });
    }
  });

  const isLastStep = currentStep === loanFormConfig.length - 1;

  const handleSubmit = (values, { setSubmitting }) => {
    if (isLastStep) {
      console.log('Form Submitted:', values);
      setShowModal(true);
      setSubmitting(false);
    } else {
      setCurrentStep(currentStep + 1);
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentSection = loanFormConfig[currentStep];

  const buildValidationSchema = (section) => {
    const fields = section.groups
      ? section.groups.flatMap((group) => group.fields)
      : section.fields;

    return Yup.object().shape(
      fields.reduce((acc, field) => {
        if (field.required) {
          acc[field.name] = Yup.string().required(`${field.label} is required`);
        }
        return acc;
      }, {})
    );
  };

  const currentStepValidationSchema = buildValidationSchema(currentSection);

  return (
    <div className={PageStyles.pageContainer}>
      <div className={PageStyles.headerSection}>
        <Link to="/" className={PageStyles.backLink}>
          <IoArrowBack size={20} />
          <span>Back</span>
        </Link>
        <div className={PageStyles.stepperWrapper}>
          <StepIndicator totalSteps={loanFormConfig.length} currentStep={currentStep + 1} />
        </div>
        <h1 className={PageStyles.mainTitle}>Loan Application - {currentSection.sectionTitle}</h1>
      </div>

      <section className={PageStyles.formSection}>
        <Formik
          initialValues={initialValues}
          validationSchema={currentStepValidationSchema}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({ errors, touched, setFieldValue, values, handleBlur, isSubmitting }) => (
            <Form>
              <div className={PageStyles.sectionWrapper}>
                <h3 className={PageStyles.sectionTitle}>{currentSection.sectionTitle}</h3>

                {(currentSection.groups || [{ title: null, fields: currentSection.fields }]).map(
                  (group, groupIndex) => (
                    <div key={groupIndex} className={PageStyles.fieldGroup}>
                      {group.title && (
                        <h4 className={PageStyles.groupTitle}>
                          {group.title.includes('(') ? (
                            <>
                              {group.title.split('(')[0]}
                              <span className={PageStyles.bracketText}>
                                ({group.title.split('(')[1]}
                              </span>
                            </>
                          ) : (
                            group.title
                          )}
                        </h4>
                      )}

                      <div className={PageStyles.fieldsGrid}>
                        {group.fields.map((field) => {
                          const isHalf = field.width === 'half';

                          return (
                            <div
                              key={field.name}
                              className={`${PageStyles.fieldWrapper} ${
                                isHalf ? PageStyles.fieldHalf : PageStyles.fieldFull
                              }`}
                            >
                              <label className={PageStyles.fieldLabel}>
                                {field.label}
                                {field.required && <span className={PageStyles.required}> *</span>}
                              </label>

                              {field.type === 'dropdown' && (
                                <Dropdown
                                  name={field.name}
                                  options={field.options}
                                  value={values[field.name]}
                                  error={errors[field.name]}
                                  touched={touched[field.name]}
                                  onChange={(val) => setFieldValue(field.name, val)}
                                  onBlur={handleBlur}
                                />
                              )}

                              {field.type === 'date' && (
                                <DatePicker
                                  name={field.name}
                                  value={values[field.name]}
                                  error={errors[field.name]}
                                  touched={touched[field.name]}
                                  onChange={(name, val) => setFieldValue(name, val)}
                                  setFieldTouched={() => {}}
                                />
                              )}

                              {field.type === 'addressLookup' && (
                                <AddressLookup
                                  name={field.name}
                                  value={values[field.name]}
                                  error={errors[field.name]}
                                  touched={touched[field.name]}
                                  onAddressSelect={(address) => {
                                    setFieldValue('postalCode', address.postalCode);
                                    setFieldValue(
                                      'selectedAddress',
                                      `${address.buildingAddress ? address.buildingAddress + ', ' : ''}${address.street}, ${address.city}`
                                    );
                                    setFieldValue('houseStreet', address.street);
                                    setFieldValue('locality', address.city);
                                    setFieldValue('country', address.country);
                                  }}
                                  onManualEntry={(val) => setFieldValue(field.name, val)}
                                />
                              )}
                              {field.type === 'checkbox' && (
                                <label className={PageStyles.checkboxWrapper}>
                                  <input
                                    type="checkbox"
                                    name={field.name}
                                    checked={values[field.name] || false}
                                    onChange={(e) => {
                                      setFieldValue(field.name, e.target.checked);
                                    }}
                                  />

                                  <span className={PageStyles.checkboxLabel}>{field.label}</span>
                                </label>
                              )}

                              {field.type === 'file' && (
                                <div className={PageStyles.fileUploadWrapper}>
                                  <label className={PageStyles.fileUploadBox}>
                                    <input
                                      type="file"
                                      name={field.name}
                                      className={PageStyles.fileInput}
                                      onChange={(event) => {
                                        setFieldValue(field.name, event.currentTarget.files[0]);
                                      }}
                                    />

                                    <div className={PageStyles.fileUploadContent}>
                                      <span className={PageStyles.filePlaceholder}>
                                        {values[field.name]?.name || field.label}
                                      </span>

                                      <div className={PageStyles.iconWrapper}>
                                        <img src={UploadIcon} alt="" className={PageStyles.icon} />
                                      </div>
                                    </div>
                                  </label>

                                  {errors[field.name] && touched[field.name] && (
                                    <div className={PageStyles.errorText}>{errors[field.name]}</div>
                                  )}
                                </div>
                              )}

                              {!['dropdown', 'date', 'addressLookup', 'checkbox', 'file'].includes(
                                field.type
                              ) && (
                                <>
                                  <InputField
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    error={errors[field.name]}
                                    touched={touched[field.name]}
                                  />

                                  {/* helper text always visible */}
                                  {field.helperText && (
                                    <div
                                      className={PageStyles.helperText}
                                      onClick={() => setShowFinanceSummary(true)}
                                    >
                                      {field.helperText}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className={PageStyles.formFooter}>
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    style={{ width: '150px' }}
                  >
                    Back
                  </Button>
                )}

                <div className={PageStyles.submitWrapper}>
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: '200px' }}
                    disabled={isSubmitting}
                  >
                    {isLastStep ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
      {showModal && <ApplicationSubmittedModal onClose={() => setShowModal(false)} />}

      {showFinanceSummary && (
        <EstimatedFinanceSummary onClose={() => setShowFinanceSummary(false)} />
      )}
    </div>
  );
};

export default LoanApplication;
