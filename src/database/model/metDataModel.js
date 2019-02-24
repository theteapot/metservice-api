const mongoose = require('mongoose')
const moment = require('moment')

const MetDataSchema = require('../schemas/metDataSchema')
const MetData = mongoose.model('MetData', MetDataSchema)

async function saveCodes ({ timestamp, codes }) {
  return MetData.findOneAndUpdate({ timestamp }, { codes }, { upsert: true })
}

async function getCodes ({
  start = new moment().startOf('week').toDate(),
  stop = new moment().endOf('week').toDate()
} = {}) {
  return MetData.find({ timestamp: { $gte: start, $lte: stop } })
}

module.exports = {
  saveCodes,
  getCodes
}
