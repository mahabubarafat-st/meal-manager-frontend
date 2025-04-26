const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const tokenRoutes = require('./routes/tokenRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const mealHistoryRoutes = require('./routes/mealHistoryRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));

connectDB();

app.use('/api/tokens', tokenRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/meal-history', mealHistoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
