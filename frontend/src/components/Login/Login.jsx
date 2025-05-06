import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    if (username === 'admin' && password === 'admin@123') {
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/dashboard'); // 🔁 Push to Dashboard after toast
      }, 1000); // delay for user to see the toast
    } else {
      toast.error('Invalid username or password.');
    }
  }

  return (
    <div className='register-form'>
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
        <button className="loginBtn" type="button" onClick={handleLogin}>Login</button>
      </div>

      <div className="form-group">
        <p>Don't have an account? <span className='underline'>Register</span></p>
      </div>

      {/* Toast container for alerts */}
      <ToastContainer position="top-center" />
    </div>
  );
}
