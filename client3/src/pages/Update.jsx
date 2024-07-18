import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  } from '@mui/material';
  import '../../ace-admin/assets/css/bootstrap.min.css';
  import '../../ace-admin/assets/css/ace-ie.min.css';
  import '../../ace-admin/assets/css/ace.min.css';
  import '../../ace-admin/assets/css/ace-rtl.min.css';
  import '../../ace-admin/assets/css/ace-skins.min.css';  

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        Author: "",
        Published_Year: "",
        Genre: "",
        Copies:"",
    });
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [dropdownOpenUI, setDropdownOpenUI] = useState(false); 
    const [tablesDropdownOpen, setTablesDropdownOpen] = useState(false);
    const [dropdownOpenForm, setDropdownOpenForm] = useState(false); 
    const [dropdownOpenMorePages, setDropdownOpenMorePages] = useState(false);
    const [dropdownOpenOtherPages, setDropdownOpenOtherPages] = useState(false);
  
    const handleDropdownToggleOtherPages = () => {
      setDropdownOpenOtherPages(prevOpen => !prevOpen);
      setDropdownOpenTables(false); // Close Tables dropdown when UI Elements dropdown toggles
      setSubmenuOpen(false);
    }
  
    const handleDropdownToggleMorePages = () => {
      setDropdownOpenMorePages(prevOpen => !prevOpen);
      setDropdownOpenTables(false); // Close Tables dropdown when UI Elements dropdown toggles
      setSubmenuOpen(false);
    }
  
    const handleDropdownToggleForm = () => {
      setDropdownOpenForm(prevOpen => !prevOpen);
      setDropdownOpenTables(false); // Close Tables dropdown when UI Elements dropdown toggles
      setSubmenuOpen(false);
    }
  
    const handleDropdownToggleUI = () => {
      setDropdownOpenUI(prevOpen => !prevOpen);
      setDropdownOpenTables(false); // Close Tables dropdown when UI Elements dropdown toggles
      setSubmenuOpen(false);
    }
     
    const handleDropdownToggle = () => {
      setDropdownOpen(prevOpen => !prevOpen); // Toggle the dropdownOpen state
      setSubmenuOpen(false); // Close the submenu when dropdown toggles
    };
  
    const handleSubmenuToggle = () => {
      setSubmenuOpen(prevOpen => !prevOpen); // Toggle the submenuOpen state
    };
    const navigate = useNavigate();
    

    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/data/${bookId}`);
                if (res.data) {
                    setBook({
                        title: res.data.title || "",
                        Author: res.data.Author || "",
                        Published_Year: res.data.Published_Year || "",
                        Genre: res.data.Genre || "",
                        Copies: res.data.Copies || "",
                    });
                }
            } catch (err) {
                console.error('Error fetching book:', err);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleConfirm = async () => {    
        try {
            await axios.put(`http://localhost:3001/api/data/${bookId}`, book);
            navigate("/books");
        } catch (err) {
            console.log(err);
        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="form">
                      <div className="container1" >
       <div className="navbar" >
         <script type="text/javascript">
         {`
          try{ace.settings.check('navbar' , 'fixed')}catch(e){}
        `}
       </script>

      <div className="navbar-container" id="navbar-container">
        <div className="navbar-header pull-left">
          <a href="#" className="navbar-brand">
            <small>
              <i className="icon-leaf"></i>
              Library Admin
            </small>
          </a>
        </div>

        <div className="navbar-header pull-right" role="navigation">
          <ul className="nav ace-nav">
            <li className="grey">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <i className="icon-tasks"></i>
                <span className="badge badge-grey">4</span>
              </a>
              <ul className="pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
                  <li className="dropdown-header">
                    <i className="icon-ok"></i>
                    4 Tasks to complete
                  </li>
                  <li>
                    <a href="#">
                      <div className="clearfix">
                        <span className="pull-left">Software Update</span>
                        <span className="pull-right">65%</span>
                      </div>
                      <div className="progress progress-mini ">
                        <div style={{ width: '65%' }} className="progress-bar "></div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="clearfix">
                        <span className="pull-left">Hardware Upgrade</span>
                        <span className="pull-right">35%</span>
                      </div>
                      <div className="progress progress-mini ">
                        <div style={{ width: '35%' }} className="progress-bar progress-bar-danger"></div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="clearfix">
                        <span className="pull-left">Unit Testing</span>
                        <span className="pull-right">15%</span>
                      </div>
                      <div className="progress progress-mini ">
                        <div style={{ width: '15%' }} className="progress-bar progress-bar-warning"></div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="clearfix">
                        <span className="pull-left">Bug Fixes</span>
                        <span className="pull-right">90%</span>
                      </div>
                      <div className="progress progress-mini progress-striped active">
                        <div style={{ width: '90%' }} className="progress-bar progress-bar-success"></div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      See tasks with details
                      <i className="icon-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              {/* Add your dropdown menu items here if needed */}
            </li>
            <li className="purple">
         <a data-toggle="dropdown" className="dropdown-toggle" href="#">
    <i className="icon-bell-alt icon-animated-bell"></i>
    <span className="badge badge-important">8</span>
  </a>

  <ul className="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">
    <li className="dropdown-header">
      <i className="icon-warning-sign"></i>
      8 Notifications
    </li>

    <li>
      <a href="#">
        <div className="clearfix">
          <span className="pull-left">
            <i className="btn btn-xs no-hover btn-pink icon-comment"></i>
            New Comments
          </span>
          <span className="pull-right badge badge-info">+12</span>
        </div>
      </a>
    </li>

    <li>
      <a href="#">
        <i className="btn btn-xs btn-primary icon-user"></i>
        Bob just signed up as an editor ...
      </a>
    </li>

    <li>
      <a href="#">
        <div className="clearfix">
          <span className="pull-left">
            <i className="btn btn-xs no-hover btn-success icon-shopping-cart"></i>
            New Orders
          </span>
          <span className="pull-right badge badge-success">+8</span>
        </div>
      </a>
    </li>
    <li>
        <a href="#">
          <div className="clearfix">
            <span className="pull-left">
              <i className="btn btn-xs no-hover btn-pink icon-comment"></i>
              New Comments
            </span>
            <span className="pull-right badge badge-info">+12</span>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <i className="btn btn-xs btn-primary icon-user"></i>
          Bob just signed up as an editor ...
        </a>
      </li>
      <li>
        <a href="#">
          <div className="clearfix">
            <span className="pull-left">
              <i className="btn btn-xs no-hover btn-success icon-shopping-cart"></i>
              New Orders
            </span>
            <span className="pull-right badge badge-success">+8</span>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div className="clearfix">
            <span className="pull-left">
              <i className="btn btn-xs no-hover btn-info icon-twitter"></i>
              Followers
            </span>
            <span className="pull-right badge badge-info">+11</span>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          See all notifications
          <i className="icon-arrow-right"></i>
        </a>
      </li>
    </ul>
  </li>
  <li className="green">
    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
      <i className="icon-envelope icon-animated-vertical"></i>
      <span className="badge badge-success">5</span>
    </a>
    <ul className="pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
      <li className="dropdown-header">
        <i className="icon-envelope-alt"></i>
        5 Messages
      </li>
      <li>
        <a href="#">
          <img src="assets/avatars/avatar.png" className="msg-photo" alt="Alex's Avatar" />
          <span className="msg-body">
            <span className="msg-title">
              <span className="blue">Alex:</span>
              Ciao sociis natoque penatibus et auctor ...
            </span>
            <span className="msg-time">
              <i className="icon-time"></i>
              <span>a moment ago</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="assets/avatars/avatar3.png" className="msg-photo" alt="Susan's Avatar" />
          <span className="msg-body">
            <span className="msg-title">
              <span className="blue">Susan:</span>
              Vestibulum id ligula porta felis euismod ...
            </span>
            <span className="msg-time">
              <i className="icon-time"></i>
              <span>20 minutes ago</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="assets/avatars/avatar4.png" className="msg-photo" alt="Bob's Avatar" />
          <span className="msg-body">
            <span className="msg-title">
              <span className="blue">Bob:</span>
              Nullam quis risus eget urna mollis ornare ...
            </span>
            <span className="msg-time">
              <i className="icon-time"></i>
              <span>3:15 pm</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="inbox.html">
          See all messages
          <i className="icon-arrow-right"></i>
        </a>
      </li>
    </ul>
  </li>
  <li className="light-blue">
    <a data-toggle="dropdown" href="#" className="dropdown-toggle">
      <img className="nav-user-photo" src="assets/avatars/user.jpg" alt="" />
      <span className="user-info">
        <small>Welcome,</small>
        Jason
      </span>
      <i className="icon-caret-down"></i>
    </a>
    <ul className="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
      <li>
        <a href="#">
          <i className="icon-cog"></i>
          Settings
        </a>
      </li>
      <li>
        <a href="#">
          <i className="icon-user"></i>
          Profile
        </a>
      </li>
      <li className="divider"></li>
      <li>
        <a href="#">
          <i className="icon-off"></i>
          Logout
        </a>
      </li>
    </ul>
  </li>
    

          </ul>
        </div>
      </div>
      </div>
      </div>
                  <div className="sidebar1" id="sidebar">
        <div className="sidebar-shortcuts1" id="sidebar-shortcuts">
          <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            <button className="btn btn-success">
              <i className="icon-signal"></i>
            </button>
            <button className="btn btn-info">
              <i className="icon-pencil"></i>
            </button>
            <button className="btn btn-warning">
              <i className="icon-group"></i>
            </button>
            <button className="btn btn-danger">
              <i className="icon-cogs"></i>
            </button>
          </div>

          <div className="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
            <span className="btn btn-success"></span>
            <span className="btn btn-info"></span>
            <span className="btn btn-warning"></span>
            <span className="btn btn-danger"></span>
          </div>
        </div>

        <ul className="nav nav-list">
          <li>
            <a href="/books">
              <i className="icon-dashboard"></i>
              <span className="menu-text"> Books </span>
            </a>
          </li>
          <li>
            <a href="/user/data">
              <i className="icon-text-width"></i>
              <span className="menu-text"> User's Data </span>
            </a>
          </li>
          <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggleUI}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> Login </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpenUI ? 'show' : ''}`}>
        <li>
          <a href="/user/login">
            <i className="icon-double-angle-right"></i>
            User Login
          </a>
        </li>
        <li>
          <a href="/employee/login">
            <i className="icon-double-angle-right"></i>
            Employee Login
          </a>
        </li>
        <li>
          <a href="/">
            <i className="icon-double-angle-right"></i>
            Welcome
          </a>
        </li>
      </ul>
     </li>
     <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggle}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> Tables </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpen ? 'show' : ''}`}>
        <li>
          <a href="http://localhost:5173/user/login">
            <i className="icon-double-angle-right"></i>
            Simple and Dynamic
          </a>
        </li>
        <li>
          <a href="buttons.html">
            <i className="icon-double-angle-right"></i>
            jqGrid plugin
          </a>
        </li>
      </ul>
     </li>
          <li>
            <a href="/books/admview">
              <i className="icon-picture"></i>
              <span className="menu-text"> Issue/Return </span>
            </a>
          </li>
        </ul>

        <div className="sidebar-collapse" id="sidebar-collapse">
          <i className="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
        </div>
      </div>
            <h1>Update The Book</h1>
            <input
                type="text"
                placeholder="Title"
                value={book.title}
                onChange={handleChange}
                name="title"
            />
            <input
                type="text"
                placeholder="Author"
                value={book.Author}
                onChange={handleChange}
                name="Author"
            />
            <input
                type="number"
                placeholder="Published Year"
                value={book.Published_Year}
                onChange={handleChange}
                name="Published_Year"
            />
            <input
                type="text"
                placeholder="Genre"
                value={book.Genre}
                onChange={handleChange}
                name="Genre"
            />
            <input
                type="number"
                placeholder="Copies"
                value={book.Copies}
                onChange={handleChange}
                name="Copies"
            />
            <button onClick={handleClick}>Update</button>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Update"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to update this book?
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
            <div className="sidebar1" id="sidebar">
        <div className="sidebar-shortcuts1" id="sidebar-shortcuts">
          <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            <button className="btn btn-success">
              <i className="icon-signal"></i>
            </button>
            <button className="btn btn-info">
              <i className="icon-pencil"></i>
            </button>
            <button className="btn btn-warning">
              <i className="icon-group"></i>
            </button>
            <button className="btn btn-danger">
              <i className="icon-cogs"></i>
            </button>
          </div>

          <div className="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
            <span className="btn btn-success"></span>
            <span className="btn btn-info"></span>
            <span className="btn btn-warning"></span>
            <span className="btn btn-danger"></span>
          </div>
        </div>

        <ul className="nav nav-list">
         <li>
            <a href="index.html">
              <i className="icon-dashboard"></i>
              <span className="menu-text"> Dashboard </span>
            </a>
          </li>
          <li>
            <a href="typography.html">
              <i className="icon-text-width"></i>
              <span className="menu-text"> Typography </span>
            </a>
          </li>
          <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggleUI}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> UI Elements </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpenUI ? 'show' : ''}`}>
        <li>
          <a href="http://localhost:5173/user/login">
            <i className="icon-double-angle-right"></i>
            Elements
          </a>
        </li>
        <li>
          <a href="buttons.html">
            <i className="icon-double-angle-right"></i>
            Buttons & Icons
          </a>
        </li>
        <li>
          <a href="treeview.html">
            <i className="icon-double-angle-right"></i>
            Treeview
          </a>
        </li>
        <li>
          <a href="jquery-ui.html">
            <i className="icon-double-angle-right"></i>
            jQuery UI
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Nestable Lists
          </a>
        </li>
        <li>
          <a href="#" className="dropdown-toggle" onClick={handleSubmenuToggle}>
            <i className="icon-double-angle-right"></i>
            Three Level Menu
            <b className="arrow icon-angle-down"></b>
          </a>
          <ul className={`submenu ${submenuOpen ? 'show' : ''}`}>
            <li>
              <a href="#">
                <i className="icon-leaf"></i>
                Item #1
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-toggle">
                <i className="icon-pencil"></i>
                4th level
                <b className="arrow icon-angle-down"></b>
              </a>
              <ul className="submenu">
                <li>
                  <a href="#">
                    <i className="icon-leaf"></i>
                    Item #1
                  </a>
                </li>
                {/* Add more nested items as needed */}
              </ul>
            </li>
          </ul>
        </li>
      </ul>
     </li>
     <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggle}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> Tables </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpen ? 'show' : ''}`}>
        <li>
          <a href="http://localhost:5173/user/login">
            <i className="icon-double-angle-right"></i>
            Simple and Dynamic
          </a>
        </li>
        <li>
          <a href="buttons.html">
            <i className="icon-double-angle-right"></i>
            jqGrid plugin
          </a>
        </li>
      </ul>
     </li>
     <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggleForm}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> Forms </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpenForm ? 'show' : ''}`}>
        <li>
          <a href="http://localhost:5173/user/login">
            <i className="icon-double-angle-right"></i>
            Form Elements
          </a>
        </li>
        <li>
          <a href="buttons.html">
            <i className="icon-double-angle-right"></i>
            Form Elements 2
          </a>
        </li>
        <li>
          <a href="treeview.html">
            <i className="icon-double-angle-right"></i>
            Wizard & Validation
          </a>
        </li>
        <li>
          <a href="jquery-ui.html">
            <i className="icon-double-angle-right"></i>
            Wysiwyg & Markdown
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Dropzone File Upload
          </a>
        </li>
      </ul>
     </li>


          <li>
            <a href="widgets.html">
              <i className="icon-list-alt"></i>
              <span className="menu-text"> Widgets </span>
            </a>
          </li>
          <li>
            <a href="calendar.html">
              <i className="icon-calendar"></i>
              <span className="menu-text">
                Calendar <span className="badge badge-transparent tooltip-error" title="2 Important Events">
                  <i className="icon-warning-sign red bigger-130"></i>
                </span>
              </span>
            </a>
          </li>
          <li>
            <a href="gallery.html">
              <i className="icon-picture"></i>
              <span className="menu-text"> Gallery </span>
            </a>
          </li>
          <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggleMorePages}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> More Pages </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpenMorePages ? 'show' : ''}`}>
        <li>
          <a href="http://localhost:5173/user/login">
            <i className="icon-double-angle-right"></i>
            User Profile
          </a>
        </li>
        <li>
          <a href="buttons.html">
            <i className="icon-double-angle-right"></i>
            Inbox
          </a>
        </li>
        <li>
          <a href="treeview.html">
            <i className="icon-double-angle-right"></i>
            Pricing Validation
          </a>
        </li>
        <li>
          <a href="jquery-ui.html">
            <i className="icon-double-angle-right"></i>
            Invoice
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Timeline
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Search Results
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Email Templates
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Login And Register
          </a>
        </li>
      </ul>
     </li>
     <li>
          <a href="#" className="dropdown-toggle" onClick={handleDropdownToggleOtherPages}>
        <i className="icon-desktop"></i>
        <span className="menu-text"> Other Pages </span>
        <b className="arrow icon-angle-down"></b>
      </a>
      <ul className={`submenu ${dropdownOpenOtherPages ? 'show' : ''}`}>
        <li>
          <a href="http://localhost:5173/user/login">
            <i className="icon-double-angle-right"></i>
            FAQ
          </a>
        </li>
        <li>
          <a href="buttons.html">
            <i className="icon-double-angle-right"></i>
            Error 404
          </a>
        </li>
        <li>
          <a href="treeview.html">
            <i className="icon-double-angle-right"></i>
            Error 500
          </a>
        </li>
        <li>
          <a href="jquery-ui.html">
            <i className="icon-double-angle-right"></i>
            Grid
          </a>
        </li>
        <li>
          <a href="nestable-list.html">
            <i className="icon-double-angle-right"></i>
            Blank Page
          </a>
        </li>
      </ul>
     </li>
        </ul>

        <div className="sidebar-collapse" id="sidebar-collapse">
          <i className="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
        </div>
      </div>
        </div>
    );
};

export default Update;
