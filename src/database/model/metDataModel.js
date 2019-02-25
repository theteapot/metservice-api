const mongoose = require('mongoose')
const moment = require('moment')
const { getPrecipitation } = require('metservice-synoptic-codes')

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

async function getCodesPrecipitation ({
  start = new moment().startOf('week').toDate(),
  stop = new moment().endOf('week').toDate()
} = {}) {
  let results = await MetData.find({ timestamp: { $gte: start, $lte: stop } })

  console.log(Object.keys(results))

  return results.map(({ timestamp, codes }) => {
    console.log(codes)

    codes = codes.map(code => getPrecipitation({ code }))
    return { timestamp, codes }
  })
}

module.exports = {
  saveCodes,
  getCodes,
  getCodesPrecipitation
}
