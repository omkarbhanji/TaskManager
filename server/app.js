const express = require('express'); 
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes =require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is working!');
});


module.exports = app;