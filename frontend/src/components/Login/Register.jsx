import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';

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

    const [showPassword, setShowPassword] = useState(false);
    const [passwordScore, setPasswordScore] = useState(0);
    const navigate = useNavigate();  // Use the navigate hook for redirection

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'password') {
            const strength = zxcvbn(value);
            setPasswordScore(strength.score);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            phone,
            acceptTerms,
        } = formData;

        console.log(formData);  // Debug: check form data

        if (
            !firstName ||
            !lastName ||
            !username ||
            !email ||
            !password ||
            !confirmPassword ||
            !phone
        ) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        if (!acceptTerms) {
            toast.error('You must accept the terms and conditions.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/api/auth/register', {  // Update URL for your backend
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword,
                phone,
                acceptTerms,
            });

            if (res.status === 200) {
                toast.success('Registered successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    acceptTerms: false,
                });
                setPasswordScore(0);
                navigate('/login');  // Redirect to the login page after successful registration
            }
        } catch (err) {
            console.error(err); // Debug: check error
            toast.error(err.response?.data || 'Registration failed!');
        }
    };

    const renderStrengthMeter = () => {
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

        return (
            <div>
                <div
                    style={{
                        height: '8px',
                        width: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        marginTop: '8px',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${(passwordScore + 1) * 20}%`,
                            backgroundColor: colors[passwordScore],
                            borderRadius: '4px',
                            transition: 'width 0.3s ease-in-out',
                        }}
                    ></div>
                </div>
                <small style={{ color: colors[passwordScore] }}>
                    {labels[passwordScore]}
                </small>
            </div>
        );
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields for first name, last name, username, email, phone, etc. */}
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {formData.password && renderStrengthMeter()}
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        />{' '}
                        Show Password
                    </label>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                        />{' '}
                        I accept the terms and conditions
                    </label>
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                    Register
                </button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Register;
