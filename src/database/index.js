require('dotenv').config()

const mongoose = require('mongoose')

const { MONGODB_URI } = process.env

async function connect () {
  if (mongoose.connection.readyState === 1) {
    return false
  }
  if (MONGODB_URI || MONGODB_URI === '') {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  } else {
    throw new Error(`MONGODB_URI config variable not set, got ${MONGODB_URI}`)
  }

  return true
}

async function disconnect () {
  if (mongoose.connection.readyState === 4) {
    return false
  }

  await mongoose.disconnect()

  return true
}

module.exports = {
  server: mongoose,
  connect,
  disconnect
}
