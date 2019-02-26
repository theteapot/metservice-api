const express = require('express')
const router = express.Router()

const { getCodes, getGeoJSON } = require('../../database/model/metDataModel')

router.get('/time', async (req, res) => {
  const { start, stop } = req.params
  try {
    res.json(await getCodes({ start, stop }))
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: error.message || 'Unspecified error message' })
  }
})

router.get('/rainfall.geojson', async (req, res) => {
  const { start, stop } = req.params
  try {
    res.json(await getGeoJSON({ start, stop }))
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: error.message || 'Unspecified error message' })
  }
})

module.exports = router
