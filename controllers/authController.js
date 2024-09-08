const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    let user = await User.findOne({ where: { email } })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.status(201).json({
          token,
          msg: 'successfully created',
          status: 201,
          user: payload.user,
        }) // Send token and user details
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// exports.login = async (req, res) => {
//   const { email, password } = req.body
//   console.log(req.body)

//   try {
//     let user = await User.findOne({ where: { email } })
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' })
//     }

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' })
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     }

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err
//         res.json({ token })
//       }
//     )
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server error')
//   }
// }
exports.login = async (req, res) => {
  console.log('Request Body:', req.body) // Log request body to check incoming data

  const { email, password } = req.body
  console.log('Email:', email) // Log email and password
  console.log('Password:', password)

  try {
    let user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ status: 400, msg: 'Invalid credentials' })
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token, status: 200, user: payload.user })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
