import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Moon, Sun } from 'react-feather';
import { useAuthStore } from '../../middleware/authStore';
import '../css/login.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes in ms

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [lockoutEndTime, setLockoutEndTime] = useState(null);
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [theme, setTheme] = useState('light');

    const navigate = useNavigate();

    // Initialize theme and check lockout
    useEffect(() => {
        // Theme initialization
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Lockout check
        const storedLockout = localStorage.getItem('loginLockout');
        if (storedLockout) {
            const { endTime } = JSON.parse(storedLockout);
            if (Date.now() < endTime) {
                setIsLockedOut(true);
                setLockoutEndTime(endTime);
            } else {
                localStorage.removeItem('loginLockout');
            }
        }
    }, []);

    // Theme toggle function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Validate email/username in real-time
    useEffect(() => {
        if (identifier && !validateIdentifier(identifier)) {
            setIdentifierError('Please enter a valid email or username');
        } else {
            setIdentifierError('');
        }
    }, [identifier]);

    // Validate password in real-time
    useEffect(() => {
        if (password && password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    }, [password]);

    const validateIdentifier = (value) => {
        // Check if it's an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;

        // Check if it's a valid username (alphanumeric with underscores)
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        return usernameRegex.test(value);
    };

    const sanitizeInput = (input) => {
        return input.replace(/[<>"'`;]/g, '');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check if account is locked
        if (isLockedOut) {
            const remainingTime = Math.ceil((lockoutEndTime - Date.now()) / 60000);
            toast.error(`Account temporarily locked. Try again in ${remainingTime} minutes.`);
            return;
        }

        // Validate inputs
        if (!identifier || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!validateIdentifier(identifier)) {
            toast.error('Please enter a valid email or username');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                identifier: sanitizeInput(identifier),
                password: sanitizeInput(password),
            });

            toast.success('Login successful!');
            const { accessToken, refreshToken, user } = response.data;

            if (rememberMe) {
                localStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('accessToken', accessToken);
            } else {
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
            }

            useAuthStore.getState().setTokens({ accessToken });
            useAuthStore.getState().setUser(user);

            // Optional: use state management
            useAuthStore.getState().setUser(user);

            // Reset login attempts on success
            setLoginAttempts(0);

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (error) {
            // Increment failed login attempts
            const attempts = loginAttempts + 1;
            setLoginAttempts(attempts);

            if (attempts >= MAX_LOGIN_ATTEMPTS) {
                const lockoutTime = Date.now() + LOCKOUT_TIME;
                setIsLockedOut(true);
                setLockoutEndTime(lockoutTime);
                localStorage.setItem('loginLockout', JSON.stringify({ endTime: lockoutTime }));
                toast.error(`Too many attempts. Account locked for 5 minutes.`);
                return;
            }

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Invalid credentials');
                        break;
                    case 403:
                        toast.error('Account not verified. Please check your email.');
                        break;
                    case 429:
                        toast.error('Too many requests. Please slow down.');
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
    };

    return (
        <div className="login-container">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <form onSubmit={handleLogin} className='login-form' noValidate>
                <h1>Welcome Back</h1>
                <p className="login-subtitle">Sign in to your account</p>

                <div className="form-group">
                    <label htmlFor="identifier">Email or Username</label>
                    <input
                        type="text"
                        id="identifier"
                        placeholder="Enter your email or username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        autoComplete="username"
                        className={identifierError ? 'input-error' : ''}
                    />
                    {identifierError && <span className="error-message">{identifierError}</span>}
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
                            className={passwordError ? 'input-error' : ''}
                            minLength="6"
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
                    {passwordError && <span className="error-message">{passwordError}</span>}
                </div>

                <button
                    className="login-btn"
                    type="submit"
                    disabled={isLoading || isLockedOut}
                >
                    {isLoading ? 'Logging in...' : 'Sign In'}
                </button>

                <div className="form-footer">
                    <div className="remember-forgot">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <p className="no-account">
                        Don't have an account?{' '}
                        <Link to="/register" className='register-link'>Sign up</Link>
                    </p>
                </div>
            </form>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === 'dark' ? 'dark' : 'light'}
            />
        </div>
    );
}