const express = require('express')
const router = express.Router()

const { getCodes } = require('../../database/model/metDataModel')

router.get('/time', async (req, res) => {
  const { start, stop } = req.params
  try {
    res.json(await getCodes({ start, stop }))
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Unspecified error message' })
  }
})

module.exports = router
