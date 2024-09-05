const express = require('express')
const dotenv = require('dotenv')
const { sequelize } = require('./models')

dotenv.config()

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Init Middleware
app.use(express.json())

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'))

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
