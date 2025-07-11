import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import '../style/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token, role } = await loginUser(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/participant/home');
      }
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Participant Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="footer">
          <p>New User? <button onClick={() => navigate('/register')}>Register</button></p>
          <button className='footer-button' style={{backgroundColor: 'green', color: 'white', padding: '8px', borderRadius: '6px'}} onClick={handleLogin}>Login</button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
