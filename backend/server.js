import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Connect to database (replace with your credentials)
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lakshya123@',
    database: 'newstart'
});
  
app.use(express.json())  //It allows us to send any JSON file using a client
app.use(cors())

app.listen(PORT, () => {
    console.log(`SERVER : http://localhost:${PORT}`);
  
    // Connect to database asynchronously (recommended)
    connection.connect((err) => {
      if (err) {
        console.error("DATABASE CONNECTION FAILED:", err);
        throw err; // Re-throw for potential handling in a higher-level exception handler
      } else {
        console.log("DATABASE CONNECTED");
      }
    });
});



// Example GET endpoint to retrieve all data
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM bookdata');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});
