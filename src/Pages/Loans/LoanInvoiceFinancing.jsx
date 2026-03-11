import React, { useMemo } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/common/InputField';
import Dropdown from '../../components/common/Dropdown';
import DatePicker from '../../components/common/DatePicker';
import Button from '../../components/common/Button';
import AddressLookup from '../../components/common/AddressLookup';
import { invoiceUploadConfig } from '../../config/invoiceUploadConfig';
import { IoArrowBack } from 'react-icons/io5';
import PageStyles from './styles/InvoiceFinancing.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components';
import EstimatedFinanceSummary from './EstimatedFinanceSummary';
import { UploadIcon } from '../../assets';
import ApplicationSubmittedModal from './ApplicationSubmittedModal';
import { loanData } from '../../data/loanData';
import UploadDocument from '../../components/common/UploadDocument';
import LoanConfiguration from './LoanConfiguration';
import ApplicationPreview from './ApplicationPreview';
import { InvoiceFinancingHelper } from './helper/LoanInvoiceFinancingHelper';

const LoanInvoiceFinancing = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const navigate = useNavigate();
  const helper = useMemo(() => new InvoiceFinancingHelper(navigate), [navigate]);

  const initialValues = {};
  invoiceUploadConfig.forEach((section) => {
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

  const isLastStep = currentStep === invoiceUploadConfig.length - 1;

  const handleSubmit = (values, { setSubmitting }) => {
    if (isLastStep) {
      helper.onApplicationSubmit({
        applicationId: 'FIN-UK-2026-0452',
        loanAmount: values.loanAmount,
        merchantName: values.merchantName,
        approvalTime: '5 Business Days',
      });
      setSubmitting(false);
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

  const currentSection = invoiceUploadConfig[currentStep];

  const buildValidationSchema = (section) => {
    const fields = section.groups
      ? section.groups.flatMap((group) => group.fields)
      : section.fields;

    return Yup.object().shape(
      fields.reduce((acc, field) => {
        if (field.required) {
          switch (field.type) {
            case 'number':
              acc[field.name] = Yup.number()
                .typeError(`${field.label} must be a number`)
                .required(`${field.label} is required`)
                .positive(`${field.label} must be greater than 0`);
              break;

            case 'email':
              acc[field.name] = Yup.string()
                .email('Enter a valid email')
                .required(`${field.label} is required`);
              break;

            case 'tel':
              acc[field.name] = Yup.string()
                .matches(/^[0-9+ ]+$/, 'Enter a valid phone number')
                .required(`${field.label} is required`);
              break;

            case 'date':
              acc[field.name] = Yup.date().required(`${field.label} is required`);
              break;

            case 'file':
            case 'fileUpload':
              acc[field.name] = Yup.mixed().required(`${field.label} is required`);
              break;

            default:
              acc[field.name] = Yup.string().required(`${field.label} is required`);
          }
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
          <StepIndicator totalSteps={invoiceUploadConfig.length} currentStep={currentStep + 1} />
        </div>
        <h1 className={PageStyles.mainTitle}>Invoice Finance Application</h1>
        <p className={PageStyles.subtitle}>
          Choose the financing option that best suits your business needs
        </p>
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

                {currentSection.type !== 'loanConfiguration' &&
                  currentSection.type !== 'preview' &&
                  (currentSection.groups || [{ title: null, fields: currentSection.fields }]).map(
                    (group, groupIndex) => (
                      <div key={groupIndex} className={PageStyles.fieldGroup}>
                        {group.title && (
                          <h4 className={PageStyles.groupTitle}>
                            {group.title.includes('(') ? (
                              <>
                                {group.title.split('(')[0]}
                                <span className={PageStyles.bracketText}>
                                  ({group.title.split('(')[1]})
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
                                  {field.required && (
                                    <span className={PageStyles.required}> *</span>
                                  )}
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
                                    placeholder={field.placeholder}
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
                                  <>
                                    <AddressLookup
                                      name={field.name}
                                      value={values[field.name]}
                                      error={errors[field.name] ? true : false}
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
                                    {errors[field.name] && touched[field.name] && (
                                      <div className={PageStyles.errorText}>
                                        {errors[field.name]}
                                      </div>
                                    )}
                                  </>
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
                                          <img
                                            src={UploadIcon}
                                            alt=""
                                            className={PageStyles.icon}
                                          />
                                        </div>
                                      </div>
                                    </label>

                                    {errors[field.name] && touched[field.name] && (
                                      <div className={PageStyles.errorText}>
                                        {errors[field.name]}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {field.type === 'fileUpload' && (
                                  <>
                                    <UploadDocument
                                      name={field.name}
                                      value={values[field.name]}
                                      error={errors[field.name]}
                                      touched={touched[field.name]}
                                      onFileChange={(name, file) => setFieldValue(name, file)}
                                      placeholder={field.placeholder}
                                      helperText={field.helperText}
                                    />
                                    {errors[field.name] && touched[field.name] && (
                                      <div className={PageStyles.errorText}>
                                        {errors[field.name]}
                                      </div>
                                    )}
                                  </>
                                )}

                                {![
                                  'dropdown',
                                  'date',
                                  'addressLookup',
                                  'checkbox',
                                  'file',
                                  'fileUpload',
                                ].includes(field.type) && (
                                  <>
                                    <InputField
                                      name={field.name}
                                      type={field.type}
                                      placeholder={field.placeholder}
                                      error={errors[field.name]}
                                      touched={touched[field.name]}
                                    />
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                {currentSection.type === 'loanConfiguration' && (
                  <LoanConfiguration
                    config={currentSection}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
                {currentSection.type === 'preview' && (
                  <ApplicationPreview
                    values={values}
                    config={currentSection}
                    onEditSection={(sectionTitle) => {
                      if (sectionTitle === 'Loan Details') {
                        setCurrentStep(2);
                      }
                      if (sectionTitle === 'Invoice Details') {
                        setCurrentStep(1);
                      }
                    }}
                  />
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
    </div>
  );
};

export default LoanInvoiceFinancing;
