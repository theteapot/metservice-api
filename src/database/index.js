require('dotenv').config()

const mongoose = require('mongoose')
// const { MongoURL } = require('./constants')

const { MONGODB_URI } = process.env
if (MONGODB_URI || MONGODB_URI === '') {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
} else {
  throw new Error(`MONGODB_URI config variable not set, got ${MONGODB_URI}`)
}

module.exports = {
  server: mongoose
}
