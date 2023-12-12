import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5100/users/signup', {
        username,
        password,
        role
      });
      console.log("Server response:", response.data);
      const { token } = response.data;
      setSuccessMessage('Signup successfully!');
      setError('');
      console.log('Signup was successful! Now plase login');
    } catch (err) {
      setError('Invalid username or password');
      setSuccessMessage('');
      console.error('Signup failed:', err);
    }
  };

  return (
    <div>

      <h2>Signup</h2>
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
      <div className="mb-2">
        <input
          type="role"
          placeholder="Role (user/admin)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Signup;
