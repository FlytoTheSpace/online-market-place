const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer') // Import multer
const { sequelize } = require('./models')
const profileRoute = require('./routes/profileRoutes')

dotenv.config()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.text({ type: 'text/plain;charset=UTF-8' }))

// Initialize multer
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})

// Middleware to handle multipart/form-data
app.use(upload.array()) // or use upload.single('file') for single file upload

// Enable CORS
app.use(cors())

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api', profileRoute)

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
