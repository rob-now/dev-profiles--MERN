// Dobrą praktyką jest nazywanie pliku (modelu)
// zaczynając od wielkiej litery w liczbie pojedynczej

const mongoose = require('mongoose')

const { Schema } = mongoose

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('users', UserSchema)

module.exports = User
