const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')

const router = express.Router()

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users endpoint works' }))

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email address already exists.' })
      }
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      })

      // Hashing password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    })
    .catch(err => console.log(err))
})

// @route   GET api/users/login
// @desc    Login a user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { email } = req.body
  const { password } = req.body

  // Find user by email
  User.findOne({ email }) // shorthand for { email = email }
    .then((user) => {
      // Check if user exist
      if (!user) {
        return res.status(404).json({ email: 'User not found.' })
      }
      // Check password
      bcrypt
        .compare(password, user.password)
        .then((arePasswordsTheSame) => {
          if (arePasswordsTheSame) {
            res.json({ msg: 'Password is OK.' }) // Should be Token here
          }
          return res.status(400).json({ password: 'Password is incorrect.' })
        })
    })
})

module.exports = router
