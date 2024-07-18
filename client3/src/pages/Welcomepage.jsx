import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { styled } from '@mui/material/styles'; // Correct import for styled
import { ToastContainer } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import '../../ace-admin/assets/css/bootstrap.min.css';
import '../../ace-admin/assets/css/ace-ie.min.css';
import '../../ace-admin/assets/css/ace.min.css';
import '../../ace-admin/assets/css/ace-rtl.min.css';
import '../../ace-admin/assets/css/ace-skins.min.css';
import '../../ace-admin/assets/css/ace-fonts.css';
import '../../ace-admin/assets/css/bootstrap-editable.css';
import '../../ace-admin/assets/css/bootstrap-timepicker.css';
import '../../ace-admin/assets/css/chosen.css';
import '../../ace-admin/assets/css/chosen.min.css'
import '../../ace-admin/assets/css/colorbox.css'
import '../../ace-admin/assets/css/colorpicker.css'
import '../../ace-admin/assets/css/datepicker.css'
import '../../ace-admin/assets/css/daterangepicker.css'
import '../../ace-admin/assets/css/dropzone.css'
import '../../ace-admin/assets/css/font-awesome-ie7.min.css'
import '../../ace-admin/assets/css/font-awesome.min.css'
//import '../../ace-admin/assets/css/fullcalendar.css'
//import '../../ace-admin/assets/css/fullcalendar.print.css'
//import '../../ace-admin/assets/css/jquery-ui-1.10.3.custom.min.css'
//import '../../ace-admin/assets/css/jquery-ui-1.10.3.full.min.css'
//import '../../ace-admin/assets/css/jquery.gritter.css'
//import '../../ace-admin/assets/css/prettify.css'
//import '../../ace-admin/assets/css/select2.css'
//import '../../ace-admin/assets/css/ui.jqgrid.css'
//import'../../ace-admin/elements.html';

const WelcomePage = () => {
  return (
    <div className="root">
            <Typography variant="h3" className="welcomeText">
        Welcome to Lakshya's Library
      </Typography>
      <AppBar position="static" className="appBar">
        <Toolbar className="toolbar">
          <Typography variant="h6">
            Lakshya's Library
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>


      
      <Box>
        <Button
          component={Link}
          to="/employee/login"
          variant="contained"
          color="primary"
          className="button"
        >
          Employee Login
        </Button>
        <Button
          component={Link}
          to="/user/login"
          variant="contained"
          color="secondary"
          className="button"
        >
          User Login
        </Button>
      </Box>
    </div>
  );
}

export default WelcomePage;