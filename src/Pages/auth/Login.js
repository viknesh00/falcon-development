import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Formik, Form } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './GeneralAuth.css';
import { ToastSuccess } from '../../api/ToastMsg';
import { Button, InputField } from '../../components/index';
import { MailIcon, LockIcon } from '../../assets/index';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = { email: '', password: '' };

  const validate = (values) => {
    const errors = {};
    if (!values.email || values.email.trim() === '') {
      errors.email = 'Required';
    } else if (values.email.trim().length < 3) {
      errors.email = 'Please enter a valid email or username';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      ToastSuccess('Logged in successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Enter your credentials to access your ethical banking portal."
    >
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched }) => (
          <Form className="auth-form">
            <div className="form-group-custom">
              <label>Email Address / Username</label>
              <InputField
                name="email"
                type="text"
                placeholder="e.g. name@example.com or username"
                iconAsset={MailIcon}
                error={errors.email}
                touched={touched?.email}
              />
            </div>

            <div className="form-group-custom">
              <div className="label-row">
                <label>Passcode</label>
                <Link
                  to="/forgot-password"
                  style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}
                >
                  Forgot?
                </Link>
              </div>
              <InputField
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                iconAsset={LockIcon}
                showPasswordToggle
                isPasswordVisible={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                passwordToggleReactIcon={<FiEye />}
                passwordToggleReactIconOff={<FiEyeOff />}
                error={errors.password}
                touched={touched?.password}
              />
            </div>

            <Button variant="primary" type="submit" disabled={isSubmitting} fullWidth>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="auth-footer-text">
              New to Falcon? <Link to="/signup">Create an account</Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
