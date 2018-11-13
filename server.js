const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const config = require('./config')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to database
mongoose
  .connect(config.getDbConnectionString(), { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err.message))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Server static assests if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  // Load index.html for any route
  app.get('*', (req, res) => {
    res.sendFile(path(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
