const express = require('express')
const multer = require('multer')
const bcrypt = require('bcrypt') // Add bcrypt for hashing passwords
const router = express.Router()
const { User } = require('../models')

// Configure Multer for file upload
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// PUT route to update user profile
router.patch('/profile/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params
  const { name, email, headline, bio, password } = req.body
  const profilePicture = req.file // Uploaded image

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update user's profile data
    user.name = name || user.name
    user.email = email || user.email
    user.headline = headline || user.headline
    user.bio = bio || user.bio

    // If an image is uploaded, store it as BLOB
    if (profilePicture) {
      user.profilePicture = profilePicture.buffer // Store image as buffer
    }

    // Hash and update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10) // Hash the password
      user.password = hashedPassword
    }

    // Save updated user
    await user.save()

    res.json({ ...user.toJSON(), password: undefined }) // Exclude password from response
  } catch (error) {
    console.error('Error updating profile:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the profile' })
  }
})

// GET route to retrieve a single user profile by ID
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Exclude password from response
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.error('Error retrieving profile:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the profile' })
  }
})

// GET route to retrieve all user profiles
router.get('/profiles', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude password from response
    })

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' })
    }

    res.json(users)
  } catch (error) {
    console.error('Error retrieving profiles:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the profiles' })
  }
})

module.exports = router
