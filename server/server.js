require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const startCronJobs = require('./services/cronService');

// Connect to database
connectDB();

// Initialize cron jobs
startCronJobs();

const app = express();

// Security Middleware
app.use(helmet());

// CORS configuration - adjust origin suitably in production
app.use(cors({
    origin: '*',
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Route files
const authRoutes = require('./routes/authRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Smart Panchayat API' });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes); // Added this line

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
