import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap'; // Ensure Tabs and Tab are imported correctly
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, AppBar, Toolbar, IconButton,
    Drawer, List, ListItem, ListItemIcon, ListItemText,Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
  } from '@mui/material';
  import AccountCircle from '@mui/icons-material/AccountCircle';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined'  

const UserLogin = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', {
        userid: id,
        first_name: name,
        password: password
      });

      if (response.data.success) {
        navigate('/user/view');
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
      <h2>User Login</h2>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="text" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div> 
    <Typography variant="body1" style={{ marginBottom: '10px' }}>
        Not already a member: <Link to={`/user/signin`}>Click here</Link> to sign-in
      </Typography>
    </div>        

  );
};

export default UserLogin;
