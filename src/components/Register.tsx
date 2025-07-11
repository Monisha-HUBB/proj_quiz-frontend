// Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PARTICIPANT');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8085/auth/signup', {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
     },
        body: JSON.stringify({ email, password, role }),
      });

      const message = await response.text();
      alert(message);
      if (message === 'Signup successful!') {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="PARTICIPANT">Participant</option>
          <option value="ADMIN">Admin</option>
        </select>
        <div className='login-button'>
          <button style={{backgroundColor: 'green', color: 'white', padding: '8px', borderRadius: '6px'}} onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
