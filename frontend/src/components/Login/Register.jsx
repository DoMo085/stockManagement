import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s()+-]{10,20}$/;


  const containsSpace = (value) => /\s/.test(value);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (containsSpace(formData.username)) newErrors.username = 'Username must not contain spaces';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    else if (containsSpace(formData.email)) newErrors.email = 'Email must not contain spaces';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (containsSpace(formData.password)) newErrors.password = 'Password must not contain spaces';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    else if (containsSpace(formData.confirmPassword)) newErrors.confirmPassword = 'Confirm password must not contain spaces';

    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const cleanedValue = type === 'checkbox' ? checked : value.trimStart();
    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));

    if (name === 'password') {
      const strength = zxcvbn(value);
      setPasswordScore(strength.score);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone.trim(),
        acceptTerms: formData.acceptTerms,
      });

      if (response.status === 201) {
        toast.success('Registration successful!');
        console.log(response.data);
        alert("Registration successful!");
        navigate('/Login');
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      } else {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStrengthMeter = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

    return (
        <div className="password-strength">
          <div className="strength-meter">
            <div
                className="strength-bar"
                style={{
                  width: `${(passwordScore + 1) * 20}%`,
                  backgroundColor: colors[passwordScore],
                }}
            ></div>
          </div>
          <small style={{ color: colors[passwordScore] }}>{labels[passwordScore]}</small>
        </div>
    );
  };

  return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            {['firstName', 'lastName', 'username', 'email', 'phone'].map((field) => (
                <div className="form-group" key={field}>
                  <label htmlFor={field}>{field.replace(/([A-Z])/, ' $1')}*</label>
                  <input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      value={formData[field]}
                      onChange={handleChange}
                      className={errors[field] ? 'error' : ''}
                  />
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </div>
            ))}

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <div className="password-input">
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {formData.password && renderStrengthMeter()}
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className={errors.acceptTerms ? 'error' : ''}
                />
                I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
              </label>
              {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <div className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
  );
};

export default Register;
