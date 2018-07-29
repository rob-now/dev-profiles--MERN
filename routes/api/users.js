const express = require('express')
const gravatar = require('gravatar')
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
    })
    .catch()
})

module.exports = router
