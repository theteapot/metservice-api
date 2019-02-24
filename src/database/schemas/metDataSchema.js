const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MetDataSchema = new Schema({
  timestamp: String,
  codes: [{ type: String }]
})

module.exports = MetDataSchema
