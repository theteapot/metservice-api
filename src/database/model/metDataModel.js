const mongoose = require('mongoose')
const moment = require('moment')
const { getPrecipitation, getStation } = require('metservice-synoptic-codes')

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

  return results.map(({ timestamp, codes }) => {
    codes = codes.map(code => getPrecipitation({ code }))
    return { timestamp, codes }
  })
}

async function getGeoJSON ({
  start = new moment().startOf('week').toDate(),
  stop = new moment().endOf('week').toDate()
} = {}) {
  let data = await MetData.find({ timestamp: { $gte: start, $lte: stop } })

  let features = data.reduce((features, { timestamp, codes }) => {
    for (let code of codes) {
      let { lat = 0, lng = 0, name = 'No name' } = getStation({ code }) || {}

      let { hoursPrecedingObservation = 0, amountOfPrecipitation = 0 } =
        getPrecipitation({ code }) || {}

      features.push({
        type: 'Feature',
        properties: {
          timestamp,
          name,
          hoursPrecedingObservation,
          amountOfPrecipitation
        },
        geometry: { type: 'Point', coordinates: [lng, lat, 0] }
      })
    }
    return features
  }, [])

  return {
    type: 'FeatureCollection',
    features
  }
}

module.exports = {
  saveCodes,
  getCodes,
  getGeoJSON,
  getCodesPrecipitation
}
