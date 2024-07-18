import mysql2 from 'mysql2/promise';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;



// Database connection details (replace with yours)
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lakshya123@',
  database: 'newstart',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
//app.use(cors()); // Enable CORS for React app to make requests
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}))
app.use(express.json()); // Parse incoming JSON data

// Example GET endpoint to retrieve data
app.get('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const [rows] = await pool.query('SELECT * FROM bookdata WHERE id = ?', [id]);
      if (rows.length > 0) {
          res.json(rows[0]);
      } else {
          res.status(404).json({ message: 'Book not found' });
      }
  } catch (err) {
      console.error('Error fetching book:', err);
      res.status(500).send('Error fetching book');
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookdata');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/data', async (req, res) => {
  const { title, Author, Published_Year, Genre, Copies } = req.body;
  if (!title || !Author || !Published_Year || !Genre || !Copies) {
    return res.status(400).send('Title, description, author, and price are required');
    console.log(req.body);
  }

  try {
    const [result] = await pool.query('INSERT INTO bookdata (title, Author, Published_Year , Genre, Copies) VALUES (?, ?, ?, ?, ?)', [title, Author, Published_Year, Genre, Copies]);
    res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
    console.log(req.body);
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data');
  }
});

app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM bookdata WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Book not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).send('Error deleting data');
  }
});

app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { title, Author, Published_Year, Genre,Copies } = req.body;

  if (!title || !Author || !Published_Year || !Genre || !Copies) {
    return res.status(400).send('Title, description, author, and price are required');
  }

  try {
    const [result] = await pool.query('UPDATE bookdata SET title = ?, Author = ?, Published_Year = ?, Genre = ?, Copies = ? WHERE id = ?', [title, Author, Published_Year, Genre, Copies, id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Book not found');
    }
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).send('Error updating book');
  }
});
app.get('/api/employee/login', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});
app.post('/api/employee/login', async (req, res) => {
  const { employee_id, first_name } = req.body;

  // Validate credentials against your database
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE employee_id = ? AND first_name = ?', [employee_id, first_name]);

    if (rows.length > 0) {
      // Successful login 
      res.json({ success: true });
    } else {
      // Invalid credentials
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error validating login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


app.get('/api/user/login', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM userlogin');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});
app.post('/api/user/login', async (req, res) => {
  const { userid, first_name, password } = req.body;

  // Validate credentials against your database
  try {
    const [rows] = await pool.query('SELECT * FROM userlogin WHERE userid = ? AND first_name = ? AND password = ?', [userid, first_name, password]);

    if (rows.length > 0) {
      // Successful login
      console.log("Succesful") 
      res.json({ success: true });
    } else {
      // Invalid credentials
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error validating login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


app.get('/api/user/signin', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM userlogin');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/user/signin', async (req, res) => {
  const { first_name, last_name, email, phone_no, password } = req.body;
  console.log(req.body);
  if (!first_name || !last_name || !email || !phone_no || !password) {
    return res.status(400).send('Title, description, author, and price are required');
    console.log(req.body);
  }

  try {
    const [result] = await pool.query('INSERT INTO userlogin (first_name, last_name, email, phone_no, password) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, email, phone_no, password]);
    res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
    console.log(req.body);
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error inserting data');
  }
});

app.put('/api/user/login/:id', async (req, res) => {
  const { userId } = req.body; // Get userId from the request body
  const bookId = req.params.id; // Get bookId from the URL parameters
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const connection = await pool.getConnection(); // Get a connection from the pool

  try {
    await connection.beginTransaction(); // Begin a transaction
        // Check if user has any books issued but not returned
        const [userResults] = await connection.query(
          'SELECT * FROM issued_books WHERE userId = ? AND return_date IS NULL',
          [userId]
        );
    
        if (userResults.length > 0) {
          await connection.rollback();
          return res.status(400).json({ message: 'You have not returned a book.Please return the book before issuing any more' });
        }

    // Check if book exists and has copies
    const [results] = await connection.query('SELECT * FROM bookdata WHERE id = ?', [bookId]);

    if (results.length === 0) {
      await connection.rollback();
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const book = results[0];

    if (book.Copies <= 0) {
      await connection.rollback();
      res.status(400).json({ message: 'No copies available' });
      return;
    }

    // Decrease copies of the book
    await connection.query('UPDATE bookdata SET Copies = Copies - 1 WHERE id = ?', [bookId]);

    // Increase books borrowed by the user
    await connection.query('UPDATE userlogin SET Books_borrowed = Books_borrowed + 1 WHERE userid = ?', [userId]);

    await connection.query(
      'INSERT INTO issued_books (userId, bookId, issue_date) VALUES (?, ?, CURRENT_TIMESTAMP())',[userId,bookId]
    );

    await connection.commit(); // Commit the transaction
    res.json({ message: 'Book issued successfully' });
  } catch (err) {
    await connection.rollback(); // Rollback the transaction in case of error
    console.error('Error issuing book:', err);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
});

app.put('/api/user/login/return/:id', async (req, res) => {
  const { id } = req.params; // Get bookId from URL parameter
  const { userId } = req.body; // Assuming userId is sent in the request body

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Check if the book is issued to the user
    const [results] = await connection.query(
      'SELECT * FROM issued_books WHERE bookId = ? AND userId = ? AND return_date IS NULL',
      [id, userId]
    );

    if (results.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Book not issued to this user or already returned' });
    }

    // Update the return_date to mark the book as returned and set issue date if not already set
    await connection.query(
      'UPDATE issued_books SET return_date = CURRENT_TIMESTAMP() WHERE bookId = ? AND userId = ?',
      [id, userId]
    );

    // Increase copies in bookdata
    await connection.query(
      'UPDATE bookdata SET Copies = Copies + 1 WHERE id = ?',
      [id]
    );

    // Decrease books borrowed by the user in userlogin
    await connection.query(
      'UPDATE userlogin SET Books_borrowed = Books_borrowed - 1 WHERE userid = ?',
      [userId]
    );

    await connection.commit();
    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    await connection.rollback();
    console.error('Error returning book:', err);
    res.status(500).json({ message: 'Server Error' });
  } finally {
    connection.release();
  }
});


app.get('/api/books/admview', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM issued_books');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});   
