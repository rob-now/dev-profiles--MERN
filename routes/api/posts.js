const express = require('express')

const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/Post')

// Validation
const validatePostInput = require('../../validation/post')


// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts endpoint works' }))

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    // .populate('user', ['name', 'avatar'])
    .sort({ date: -1 }) // Descending order
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ nopostsfound: 'There are no posts' }))
})

// @route   GET api/posts/:post_id
// @desc    Get post by ID
// @access  Public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
    // .populate('user', ['name', 'avatar'])
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ nopostfound: 'There is no post with such ID' }))
})

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  })

  newPost.save().then(post => res.json(post))
})

// @route   DELETE api/posts/:post_id
// @desc    Delete post by ID
// @access  Private
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      // Check post owner
      if (post.user.toString() !== req.user.id) {
        // Send unauthorized status
        return res.status(401).json({ unauthorized: 'User not authorized to delete' })
      }

      // Delete post
      post.remove().then(() => res.json({ success: true }))
    })
    .catch(() => res.status(404).json({ nopostfound: 'There is no post with such ID' }))
})

// @route   POST api/posts/like/:post_id
// @desc    Like post by ID
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      // Check if user already liked the post
      if (post.likes
        .filter(like => like.user.toString() === req.user.id)
        .length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' })
      }

      // Add user ID to likes
      post.likes.push({ user: req.user.id })

      // Save updated post with likes array to database
      post.save().then(post => res.json(post))
    })
})

module.exports = router
