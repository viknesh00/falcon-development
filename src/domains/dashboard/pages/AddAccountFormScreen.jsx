import { Form, Formik } from 'formik';
import { ArrowRightIcon } from '../../../shared/assets';
import Styles from './styles/AddAccountForm.module.css';
import { ADD_ACCOUNT_FORM_CONFIG } from '../../../domains/accounts/config/addBankAccountFormConfig';
import * as Yup from 'yup';
import { InputField, Dropdown, Button, AddressLookup } from '../../../shared/components';

const AddAccountFormScreen = () => {
  const buildValidationSchema = () => {
    const allFields = [];

    // Collect all fields from all sections
    ADD_ACCOUNT_FORM_CONFIG.sections.forEach((section) => {
      if (section.fields) {
        allFields.push(...section.fields);
      }
    });

    return Yup.object().shape(
      allFields.reduce((acc, field) => {
        if (field.required) {
          switch (field.type) {
            case 'number':
              acc[field.name] = Yup.number()
                .typeError(`${field.label} must be a number`)
                .required(`${field.label} is required`);
              break;

            case 'email':
              acc[field.name] = Yup.string()
                .email('Enter a valid email')
                .required(`${field.label} is required`);
              break;

            case 'dropdown':
              acc[field.name] = Yup.string().required(`${field.label} is required`);
              break;

            default:
              acc[field.name] = Yup.string().required(`${field.label} is required`);
          }
        }
        return acc;
      }, {})
    );
  };

  const getAllFields = () => {
    const allFields = [];
    ADD_ACCOUNT_FORM_CONFIG.sections.forEach((section) => {
      if (section.fields) {
        allFields.push(...section.fields);
      }
    });
    return allFields;
  };

  const allFields = getAllFields();

  // Create initial values for all fields
  const initialValues = allFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form Submitted:', values);
    // Add your API call or submission logic here
    setSubmitting(false);
  };

  return (
    <div className={Styles.container}>
      {/* back icons */}
      <div onClick={() => window.history.back()} className={Styles.backIcon}>
        <img src={ArrowRightIcon} alt="" />
        <span>Back</span>
      </div>
      <h1 className={Styles.title}>Add Your Bank Account</h1>

      {/* form */}
      <Formik
        initialValues={initialValues}
        validationSchema={buildValidationSchema()}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ errors, touched, setFieldValue, values, handleBlur, isSubmitting }) => {
          return (
            <Form className={Styles.form}>
              {ADD_ACCOUNT_FORM_CONFIG.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={Styles.section}>
                  {section.title && <h2 className={Styles.sectionTitle}>{section.title}</h2>}
                  <div className={Styles.formGrid}>
                    {section.fields.map((field) => {
                      const isHalf = field.width === 'half';
                      const isFull = field.width === 'full';

                      return (
                        <div
                          key={field.name}
                          className={`${Styles.fieldWrapper} ${
                            isFull ? Styles.fieldFull : isHalf ? Styles.fieldHalf : ''
                          }`}
                        >
                          <label className={Styles.fieldLabel}>
                            {field.label}
                            {field.required && <span className={Styles.required}> *</span>}
                          </label>

                          {field.isAddressLookup ? (
                            <AddressLookup
                              value={values.postalCode}
                              disabled={!values.postalCode}
                              onAddressSelect={(addr) => {
                                setFieldValue('postalCode', addr.postalCode || '');
                                setFieldValue('selectedAddress', addr.displayName || '');
                                setFieldValue('houseNumberStreet', addr.street || '');
                                setFieldValue('locality', addr.city || '');
                                setFieldValue('country', addr.country || 'United Kingdom');
                              }}
                              // error={errors[field.name]}
                              touched={touched[field.name]}
                              diableIcon
                              isFullAddress={true}
                              placeholder={field.placeholder}
                            />
                          ) : field.type === 'dropdown' ? (
                            <Dropdown
                              name={field.name}
                              placeholder={field.placeholder}
                              options={field.options}
                              value={values[field.name]}
                              onChange={(value) => setFieldValue(field.name, value)}
                              onBlur={handleBlur}
                              error={errors[field.name]}
                              touched={touched[field.name]}
                            />
                          ) : (
                            <InputField
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              error={errors[field.name]}
                              touched={touched[field.name]}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className={Styles.buttonContainer}>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className={Styles.submitButton}
                >
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddAccountFormScreen;
