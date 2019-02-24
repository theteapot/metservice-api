const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MetDataSchema = new Schema({
  timestamp: Date,
  codes: [{ type: String }]
})

module.exports = MetDataSchema
