import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault(); // Prevent default form submission behavior
        if (username === 'admin' && password === 'admin@123') {
            toast.success('Login successful!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } else {
            toast.error('Invalid username or password.');
        }
    }

    return (
        <form onSubmit={handleLogin} className='register-form'>
            <h1>Login</h1>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="admin@123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <button className="loginBtn" type="submit">Login</button>
            </div>

            <div className="form-group">
                <p>Don't have an account?
                    <Link to="/register" className='underline'>Register</Link>
                </p>
            </div>

            <ToastContainer position="top-center" />
        </form>
    );
}