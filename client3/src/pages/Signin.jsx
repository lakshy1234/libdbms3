import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button,Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
  } from '@mui/material';
  import '../../ace-admin/assets/css/bootstrap.min.css';
  import '../../ace-admin/assets/css/ace-ie.min.css';
  import '../../ace-admin/assets/css/ace.min.css';
  import '../../ace-admin/assets/css/ace-rtl.min.css';
  import '../../ace-admin/assets/css/ace-skins.min.css';  

const Signin = ()=>{
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_no:"",
        password: "",
      });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
      
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);  // Open the confirmation dialog
    };
    
    const handleConfirm = async () => {
        try {
          await axios.post(`${baseURL}/user/signin`, user);
          navigate("/books");
    } catch (err) {
          console.log(err);
    }
        setOpen(false);  // Close the confirmation dialog
      };
    
    const handleClose = () => {
        setOpen(false);  // Close the confirmation dialog
      };
    return (
    <div className="form">
      <h1>Add New User</h1>
      <input type="text" placeholder="first name" onChange={handleChange} name="first_name" value={user.first_name}/>
      <input type="text" placeholder="last name" onChange={handleChange} name="last_name" value={user.last_name}/>
      <input type="email" placeholder="email" onChange={handleChange} name="email" value={user.email}/>
      <input type="tel" placeholder="phone no" onChange={handleChange} name="phone_no" value={user.phone_no}/>  
      <input type="text" placeholder="password" onChange={handleChange} name="password" value={user.password}/>

      <button onClick={handleClick}>Add</button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Add"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure about the details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        
        <h1>This is the user page.

          Here you will sign-in
        </h1>
     </div>   
    
      );
};

export default Signin;