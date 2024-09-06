const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer') // Import multer
const { sequelize } = require('./models')

dotenv.config()

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Middleware to parse text/html bodies

app.use(express.text({ type: 'text/plain;charset=UTF-8' }))

// Initialize multer
const upload = multer()

// Middleware to handle multipart/form-data
app.use(upload.array()) // or use upload.single('file') for single file upload

// Enable CORS
app.use(cors())

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'))

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
