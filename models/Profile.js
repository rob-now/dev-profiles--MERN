const mongoose = require('mongoose')

const { Schema } = mongoose

const ProfileSchema = new Schema({
  // Associating profile with the user Schema by ID
  // We want information about user in profile
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users', // reference to users Model
  },
  // User friendly URL, eg. /profiles/john-doe
  // which users will be able to change
  handle: {
    type: String,
    required: true,
    max: 40, // number of allowed characters
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Array of strings
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },

})

const Profile = mongoose.model('profiles', ProfileSchema)

module.exports = Profile
