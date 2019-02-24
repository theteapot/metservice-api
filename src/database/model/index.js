const { server } = require('../index')
const MetData = require('../schemas/metDataSchema')

async function saveCodes (codes) {
  const newCode = new MetData(codes)
  await newCode.save()
}
