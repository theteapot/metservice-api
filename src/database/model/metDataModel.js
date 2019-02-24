const mongoose = require('mongoose')
const { server } = require('../index')

const MetDataSchema = require('../schemas/metDataSchema')
const MetData = mongoose.model('MetData', MetDataSchema)

async function saveCodes (codes) {
  const newCode = new MetData(codes)
  return newCode.save()
}

module.exports = {
  saveCodes
}
