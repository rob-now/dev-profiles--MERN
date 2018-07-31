const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
// Profile model
const Profile = require('../../models/Profile')
// User model
const User = require('../../models/User')


const router = express.Router()

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile endpoint works' }))

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for such user'
        return res.status(404).json(errors)
      }
    })
})

module.exports = router
