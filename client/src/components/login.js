import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {

    console.log('In handleLogin()');

    let response = null;
    try {
      response = await axios.post('http://localhost:5100/users/login', {
        username,
        password
      });
      console.log("Server response:", response.data);
      const { token } = response.data;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role);
      setSuccessMessage('Logged in successfully!');
      setError('');
      console.log('Logged in successfully!');
    } catch (err) {
      setError('Login failed. [1] ' + err.message + " - " + err.response.data );
      setSuccessMessage('');
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Login;
