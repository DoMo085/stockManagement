    import { useState } from 'react';
    import axios from 'axios';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { useNavigate, Link } from 'react-router-dom';
    import { Eye, EyeOff } from 'react-feather'; // For password visibility toggle
    import '../css/Login.css';

    export default function Login() {
        const [identifier, setIdentifier] = useState('');
        const [password, setPassword] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const [forgotPasswordEmail] = useState('');
        const navigate = useNavigate();

        // Basic email validation
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };

        // Sanitize input
        const sanitizeInput = (input) => {
            return input.replace(/[<>"'`;]/g, '');
        };

        async function handleLogin(e) {
            e.preventDefault();

            // Validate inputs
            if (!identifier || !password) {
                toast.error('Please fill in all fields');
                return;
            }

            if (!validateEmail(identifier)) {
                toast.error('Please enter a valid email address or username');
                return;
            }

            // Sanitize inputs
            const sanitizedIdentifier = sanitizeInput(identifier);
            const sanitizedPassword = sanitizeInput(password);

            setIsLoading(true);

            try {
                const loginData = {
                    identifier: sanitizedIdentifier,
                    password: sanitizedPassword,
                };

                const response = await axios.post('http://localhost:8080/api/auth/login', loginData);

                toast.success('Login successful!');
                const { accessToken, refreshToken, user } = response.data;

                // Store tokens and user data
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(user));

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } catch (error) {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            toast.error('Invalid email or password.');
                            break;
                        case 400:
                            toast.error('Bad request. Please check your input.');
                            break;
                        case 429:
                            toast.error('Too many attempts. Please try again later.');
                            break;
                        default:
                            toast.error('Login failed. Please try again.');
                    }
                } else if (error.request) {
                    toast.error('Network error. Please check your connection.');
                } else {
                    toast.error('An unexpected error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        }

        async function handleForgotPassword() {
            if (!forgotPasswordEmail || !validateEmail(forgotPasswordEmail)) {
                toast.error('Please enter a valid email address');
                return;
            }

            try {
                await axios.post('http://localhost:8080/api/auth/forgot-password', {
                    email: sanitizeInput(forgotPasswordEmail)
                });
                toast.success('Password reset link sent to your email!');
                // setShowForgotPasswordModal(false);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to send reset link');
            }
        }


            return (
                <div className="login-container">
                    <form onSubmit={handleLogin} className='login-form'>
                        <h1>Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your account</p>

                        {/* Rest of your form elements remain the same */}
                        <div className="form-group">
                            <label htmlFor="email">Email Or Username</label>
                            <input
                                type="identifier"
                                id="identifier"
                                placeholder="Enter your email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group password-input-container">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            className="login-btn"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Sign In'}
                        </button>

                        <div className="form-footer">
                            <div className="remember-forgot">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="forgot-password"
                                    // onClick={() => setShowForgotPasswordModal(true)}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <p className="no-account">
                                Don't have an account?{' '}
                                <Link to="/register" className='register-link'>Sign up</Link>
                            </p>
                        </div>
                    </form>

                    {/* Forgot Password Modal (keep existing) */}

                    <ToastContainer position="top-center" />
                </div>
            );
        }