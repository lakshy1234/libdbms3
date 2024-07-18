<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../ace-admin/assets/css/bootstrap.min.css';
import '../../ace-admin/assets/css/ace-ie.min.css';
import '../../ace-admin/assets/css/ace.min.css';
import '../../ace-admin/assets/css/ace-rtl.min.css';
import '../../ace-admin/assets/css/ace-skins.min.css';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, CircularProgress, Typography, AppBar, Toolbar, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { Add, Delete, Edit, MenuBook, Home } from '@mui/icons-material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

const CustomButton = styled(Button)({
  marginLeft: '10px',
});

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        setBooks(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/data/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      toast.success('Book deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete book.');
    }
    closeDeleteDialog();
  };

  const handleCheckboxChange = (bookId) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId)
        ? prevSelectedBooks.filter((id) => id !== bookId)
        : [...prevSelectedBooks, bookId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
    setSelectAll(!selectAll);
  };

  const openDeleteDialog = (id) => {
    setDeleteBookId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteBookId(null);
    setDeleteDialogOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

  return (
    <Box display="flex" sx={{ backgroundColor: '#f5f5f5' }}>
        
      <Drawer
        variant="permanent"
        sx={{
          width: 150,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#f0dada',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ fontSize: '1.5rem' }}
              sx={{ color: 'blue' }} // Change this color as needed
            />
          </ListItem>
          <ListItem component={Link} to="/books">
            <ListItemIcon><MenuBook /></ListItemIcon>
            <ListItemText
              primary="Books"
              primaryTypographyProps={{ fontSize: '1.5rem' }}
              sx={{ color: 'blue' }} // Change this color as needed
            />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container>
          <AppBar position="static" sx={{ marginBottom: '20px' , backgroundColor: '#4caf50' }}></AppBar>

          <div className="page-content">
            <div className="page-header custom-header">
              <h1>BOOK SHOP</h1>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h4">Books</Typography>
              <CustomButton
                variant="contained"
                color="primary"
                startIcon={<Add />}
                component={Link}
                to="/add"
                sx={{ fontSize: '1.3rem' }}  
              >
                Add new books
              </CustomButton>
            </Box>

            <div className="row">
              <div className="col-xs-12">
                <div className="table-responsive">
                  <table id="sample-table-1" className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="center">
                          <label>
                            <input
                              type="checkbox"
                              className="ace"
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                            <span className="lbl"></span>
                          </label>
                        </th>
                        <th className="custom-th" width="150">S.No</th>
                        <th className="custom-th" width="250">Title</th>
                        <th className="hidden-480 custom-th" width="250">Description</th>
                        <th className="custom-th" width="250">Author</th>
                        <th className="custom-th" width="150">Price</th>
                        <th className="custom-th" width="150">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book, index) => (
                        <tr key={book.id}>
                          <td className="center">
                            <label>
                              <input
                                type="checkbox"
                                className="ace"
                                checked={selectedBooks.includes(book.id)}
                                onChange={() => handleCheckboxChange(book.id)}
                              />
                              <span className="lbl"></span>
                            </label>
                          </td>
                          <td>{index + 1}</td>
                          <td>{book.title}</td>
                          <td className="hidden-480">{book.desc}</td>
                          <td>{book.author}</td>
                          <td>{book.Price}</td>
                          <td>
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/update/${book.id}`}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => openDeleteDialog(book.id)} // Open delete confirmation dialog
                            >
                              <Delete />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Box sx={{ marginTop: '20px', padding: '10px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              © 2024 Book Shop. All rights reserved.
            </Typography>
          </Box>
        </Container>

        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this book?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(deleteBookId)} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Box>
    </Box>
  );
};
    
export default Books;
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../ace-admin/assets/css/bootstrap.min.css';
import '../../ace-admin/assets/css/ace-ie.min.css';
import '../../ace-admin/assets/css/ace.min.css';
import '../../ace-admin/assets/css/ace-rtl.min.css';
import '../../ace-admin/assets/css/ace-skins.min.css';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, CircularProgress, Typography, AppBar, Toolbar, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { Add, Delete, Edit, MenuBook, Home } from '@mui/icons-material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

const CustomButton = styled(Button)({
  marginLeft: '10px',
});

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        setBooks(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/data/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      toast.success('Book deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete book.');
    }
    closeDeleteDialog();
  };

  const handleCheckboxChange = (bookId) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId)
        ? prevSelectedBooks.filter((id) => id !== bookId)
        : [...prevSelectedBooks, bookId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
    setSelectAll(!selectAll);
  };

  const openDeleteDialog = (id) => {
    setDeleteBookId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteBookId(null);
    setDeleteDialogOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

  return (
    <Box display="flex" sx={{ backgroundColor: '#f5f5f5' }}>
        
      <Drawer
        variant="permanent"
        sx={{
          width: 150,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#f0dada',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ fontSize: '1.5rem' }}
              sx={{ color: 'blue' }} // Change this color as needed
            />
          </ListItem>
          <ListItem component={Link} to="/books">
            <ListItemIcon><MenuBook /></ListItemIcon>
            <ListItemText
              primary="Books"
              primaryTypographyProps={{ fontSize: '1.5rem' }}
              sx={{ color: 'blue' }} // Change this color as needed
            />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container>
          <AppBar position="static" sx={{ marginBottom: '20px' , backgroundColor: '#4caf50' }}></AppBar>

          <div className="page-content">
            <div className="page-header custom-header">
              <h1>BOOK SHOP</h1>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h4">Books</Typography>
              <CustomButton
                variant="contained"
                color="primary"
                startIcon={<Add />}
                component={Link}
                to="/add"
                sx={{ fontSize: '1.3rem' }}  
              >
                Add new books
              </CustomButton>
            </Box>

            <div className="row">
              <div className="col-xs-12">
                <div className="table-responsive">
                  <table id="sample-table-1" className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="center">
                          <label>
                            <input
                              type="checkbox"
                              className="ace"
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                            <span className="lbl"></span>
                          </label>
                        </th>
                        <th className="custom-th" width="150">S.No</th>
                        <th className="custom-th" width="250">Title</th>
                        <th className="hidden-480 custom-th" width="250">Description</th>
                        <th className="custom-th" width="250">Author</th>
                        <th className="custom-th" width="150">Price</th>
                        <th className="custom-th" width="150">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book, index) => (
                        <tr key={book.id}>
                          <td className="center">
                            <label>
                              <input
                                type="checkbox"
                                className="ace"
                                checked={selectedBooks.includes(book.id)}
                                onChange={() => handleCheckboxChange(book.id)}
                              />
                              <span className="lbl"></span>
                            </label>
                          </td>
                          <td>{index + 1}</td>
                          <td>{book.title}</td>
                          <td className="hidden-480">{book.desc}</td>
                          <td>{book.author}</td>
                          <td>{book.Price}</td>
                          <td>
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/update/${book.id}`}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => openDeleteDialog(book.id)} // Open delete confirmation dialog
                            >
                              <Delete />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Box sx={{ marginTop: '20px', padding: '10px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              © 2024 Book Shop. All rights reserved.
            </Typography>
          </Box>
        </Container>

        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this book?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(deleteBookId)} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Box>
    </Box>
  );
};
    
export default Books;
>>>>>>> 9e0aa2a8f49a270957adb99f0586594698067039
