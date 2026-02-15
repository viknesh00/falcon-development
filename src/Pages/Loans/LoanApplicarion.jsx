import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/common/InputField';
import Dropdown from '../../components/common/Dropdown';
import DatePicker from '../../components/common/DatePicker';
import Button from '../../components/common/Button';
import AddressLookup from '../../components/common/AddressLookup';
import { loanFormConfig } from './loanFormConfig';
import { IoArrowBack } from 'react-icons/io5';
import PageStyles from './styles/LoanApplication.module.css';
import { Link } from 'react-router-dom';
import { StepIndicator } from '../../components';

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const initialValues = {};
  loanFormConfig.forEach((section) => {
    section.fields.forEach((field) => {
      initialValues[field.name] = '';
    });
  });

  const isLastStep = currentStep === loanFormConfig.length - 1;

  const handleSubmit = (values, { setSubmitting }) => {
    if (isLastStep) {
      console.log('Form Submitted:', values);
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

  const currentStepValidationSchema = Yup.object().shape(
    currentSection.fields.reduce((acc, field) => {
      if (field.required) {
        acc[field.name] = Yup.string().required(`${field.label} is required`);
      }
      return acc;
    }, {})
  );

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
              <div style={{ marginBottom: '2rem' }}>
                <h3 className={PageStyles.sectionTitle}>{currentSection.sectionTitle}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {currentSection.fields.map((field) => {
                    const commonProps = {
                      key: field.name,
                      name: field.name,
                      placeholder: field.placeholder,
                      error: errors[field.name],
                      touched: touched[field.name],
                      style: { flex: field.width === 'half' ? '1 1 45%' : '1 1 100%' },
                    };

                    // Wrapper for layout - logic moved here but structure remains
                    const wrapperStyle = {
                      flex: field.width === 'half' ? '1 1 calc(50% - 1rem)' : '1 1 100%',
                      maxWidth: field.width === 'half' ? 'calc(50% - 1rem)' : '100%',
                    };

                    if (field.type === 'dropdown') {
                      return (
                        <div key={field.name} style={wrapperStyle}>
                          <label
                            style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              fontSize: '0.9rem',
                              color: '#333',
                            }}
                          >
                            {field.label}{' '}
                            {field.required && <span style={{ color: 'red' }}>*</span>}
                          </label>
                          <Dropdown
                            {...commonProps}
                            options={field.options}
                            value={values[field.name]}
                            onChange={(val) => setFieldValue(field.name, val)}
                            onBlur={handleBlur}
                          />
                        </div>
                      );
                    }

                    if (field.type === 'date') {
                      return (
                        <div key={field.name} style={wrapperStyle}>
                          <label
                            style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              fontSize: '0.9rem',
                              color: '#333',
                            }}
                          >
                            {field.label}{' '}
                            {field.required && <span style={{ color: 'red' }}>*</span>}
                          </label>
                          <DatePicker
                            {...commonProps}
                            value={values[field.name]}
                            onChange={(name, val) => setFieldValue(name, val)}
                            setFieldTouched={() => {}}
                          />
                        </div>
                      );
                    }

                    if (field.type === 'addressLookup') {
                      return (
                        <div key={field.name} style={wrapperStyle}>
                          <label
                            style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              fontSize: '0.9rem',
                              color: '#333',
                            }}
                          >
                            {field.label}{' '}
                            {field.required && <span style={{ color: 'red' }}>*</span>}
                          </label>
                          <AddressLookup
                            {...commonProps}
                            value={values[field.name]}
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
                        </div>
                      );
                    }

                    return (
                      <div key={field.name} style={wrapperStyle}>
                        <label
                          style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            color: '#333',
                          }}
                        >
                          {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                        </label>
                        <InputField {...commonProps} type={field.type} activeField={null} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
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
                <div style={{ marginLeft: 'auto' }}>
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
    </div>
  );
};

export default LoanApplication;
