const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
// Profile model
const Profile = require('../../models/Profile')
// User model
const User = require('../../models/User')
// Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

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
    // We assosiated User model with Profile model so we can get values from our 'user' attribute
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for such user'
        return res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = 'No profiles found'
        res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(() => res.status(404).json({ profile: 'No profiles found' }))
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}

  // `req.params.handle` grabs anything that is passed in URL in `:handle`
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'No such profile found'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'No user profile found'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(() => res.status(404).json({ profile: 'No user profile found' }))
})

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Get fields entered by user
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

        // Check if given handle already exists and send error message
        Profile.findOne({ handle: profileFields.handle })
          .then((profile) => {
            if (profile) {
              errors.handle = 'Handle already exists'
              res.status(400).json(errors)
            }

            // Save Profile in database if such handle doesn't exist in database
            new Profile(profileFields).save()
              // Send back saved profile in database
              .then(profile => res.json(profile))
          })
      }
    })
})

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      // Add to experience array at the beginning
      profile.experience.unshift(newExperience)

      // Save updated profile to database
      // and send back updated profile to the endpoint
      profile.save().then(profile => res.json(profile))
    })
})

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      // Add to education array at the beginning
      profile.education.unshift(newEducation)

      // Save updated profile to database
      // and send back updated profile to the endpoint
      profile.save().then(profile => res.json(profile))
    })
})

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:experience_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      // Getting index of experience to remove
      const indexToRemove = profile.experience
        .map(item => item.id)
        .indexOf(req.params.experience_id)

      // Remove given index from experience array
      profile.experience.splice(indexToRemove, 1)

      // Save new array to database
      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

// @route   DELETE /api/profile/education/:education_id
// @desc    Remove education from profile
// @access  Private

router.delete('/education/:education_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const indexToRemove = profile.education
        .map(item => item.id)
        .indexOf(req.params.education_id)

      profile.education.splice(indexToRemove, 1)

      profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

// @route   DELETE /api/profile
// @desc    Remove profile and user
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }))
    })
})

module.exports = router
