const clientRoute = require('./routes/clientRoute');
const taskRoute = require('./routes/taskRoute');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/clients', clientRoute);
app.use('/api/tasks', taskRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Compliance Tracker API running' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Server failed to start:', error.message);
  }
};

startServer();