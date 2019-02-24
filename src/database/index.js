const mongoose = require('mongoose')
const { MongoURL } = require('./constants')

console.log(MongoURL)

mongoose.connect(MongoURL, { useNewUrlParser: true })

module.exports = {
  server: mongoose
}
