// const app = require('./app');  // ✅ Import the Express app from app.js
// const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

// // // ✅ Create and test your DB pool connection
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: false
// // });
// // console.log("connecting to db");
// // pool.connect()
// //   .then(() => console.log('Connected to PostgreSQL'))
// //   .catch(err => console.error('❌ Connection error', err));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Server is working!');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
