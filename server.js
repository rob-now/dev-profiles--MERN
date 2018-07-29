const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

mongoose
  .connect(config.getDbConnectionString(), { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err.message))

const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello!'))

app.listen(port, () => console.log(`Server running on port ${port}`))
