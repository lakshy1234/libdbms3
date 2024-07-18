import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeLogin = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/employee/login', {
        employee_id: id,
        first_name: name
      });

      if (response.data.success) {
        navigate('/books');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <h1 className="welcome-text">Welcome!</h1>
      <div className="login-header">
        <h2>Employee Login</h2>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input 
              type="text" 
              id="id" 
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;

