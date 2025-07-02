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

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { protect, restrictTo } = require('./middleware/authMiddleware');

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
