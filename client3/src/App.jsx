import React, { useState, useEffect } from 'react';
import axios from 'axios'; // HTTP client for API requests
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './pages/Add.jsx';
import Update from './pages/Update.jsx';
import Books from './pages/Books.jsx';
import EmployeeLogin from './pages/Employees.jsx';
import WelcomePage from './pages/Welcomepage.jsx';
import UserLogin from './pages/UserLogin.jsx';
import Signin from './pages/Signin.jsx';
import Userdata from './pages/Userdata.jsx';
import UserView from './pages/userviewdata.jsx';
import Adminview from './pages/adminviewdata.jsx';
import "./Books.css";
import "./EmployeesLogin.css";
import "./userlogin.css";
import "./Add.css"
import "./Userdata.css"
import "./adminview.css"
import "./Welcomepage.css"


console.log("Base URL: ",import.meta.env.VITE_API_URL);
const baseURL = import.meta.env.VITE_API_URL; 




function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      setError(null);
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/books" element={<Books data={data} />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signin" element={<Signin/>} />
        <Route path="/user/data" element={<Userdata/>} />
        <Route path="/user/view" element={<UserView/>} />
        <Route path="/books/admview" element={<Adminview/>} />




      </Routes>
    </Router>
  );
}

export default App;
