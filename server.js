const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Added import for CORS middleware

const app = express();
const port = process.env.PORT || 3000;
// require('dotenv').config();

// const secretKey = process.env.JWT_SECRET;

// Replace with your MySQL connection details
const db = mysql.createConnection({
  host: 'sql5.freemysqlhosting.net',
  user: 'sql5668837',
  password: 'ui7i8Mwz93',
  database: 'sql5668837'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Middleware to generate JWT token
// const generateToken = (user) => {
//   return jwt.sign({ username: user.username }, secretKey, { expiresIn: '1m' }); // Change expiresIn to set the token expiry time
// };

// Routes for login, signup, and logout

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;


  // Insert the new user into your database
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) {
      console.error('Signup error:', err);
      res.status(500).json({ message: 'Signup failed' });
    } else {
      res.status(200).json({ message: 'Signup successful' });
    }
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check the username and password against your database
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Login failed' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  });
});

// Logout route (optional)
app.post('/logout', (req, res) => {
  // Implementation of logout logic
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
