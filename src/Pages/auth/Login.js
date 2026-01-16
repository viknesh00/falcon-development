import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { FiMail, FiLock, FiEye, FiEyeOff, FiChevronRight } from 'react-icons/fi';
import './GeneralAuth.css';
import { ToastSuccess } from '../../api/ToastMsg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      ToastSuccess('Logged in successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Enter your credentials to access your ethical banking portal."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group-custom">
          <label>Email Address / Username</label>
          <div className="input-with-icon">
            <FiMail className="input-icon" />
            <input
              type="text"
              placeholder="e.g. name@example.com or username"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
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
          <div className="input-with-icon">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary-custom" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'} <FiChevronRight />
        </button>

        <div className="auth-footer-text">
          New to Falcon? <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
