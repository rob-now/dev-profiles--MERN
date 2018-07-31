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

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.status) profileFields.status = req.body.status

  // Skills will come as comma separated so we need to split them into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername

  // Social need to be initialized as empty object so we dont' get error
  // that says that social attribute doesn't exist
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  // Find logged in user in MongoDB
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        )
          // Respond with the updated profile
          .then(profile => res.json(profile))
      } else {
        // Create profile
      }
    })
})

module.exports = router
