// The purpose of this is to get data from the metservice endpoints, do a little
// bit of parsing, and then store it in a database

const fetch = require('node-fetch')
const moment = require('moment')
const { saveCodes } = require('../database/model/metDataModel')

const {
  SurfaceDataValidFromDateFormat,
  SurfaceDataURL
} = require('./constants.json')

async function getMetServiceData () {
  if (!SurfaceDataURL || typeof SurfaceDataURL !== 'string') {
    throw new Error('Must pass a string for the SurfaceDataURL')
  }

  let response = await (await fetch(SurfaceDataURL)).json()
  // Codes are sent in blocks for each time period, within each block
  // each code is seperated by <br> tags

  let parsedData = []
  for (let { data, validFrom } of response) {
    if (!data || typeof data !== 'string' || data === '') {
      throw new Error('data must be a non-empty string')
    }

    if (!new moment(validFrom, SurfaceDataValidFromDateFormat).isValid()) {
      throw new Error(
        `validFrom must be a valid date of format "${SurfaceDataValidFromDateFormat}"`
      )
    }

    let time = new moment(validFrom, SurfaceDataValidFromDateFormat)

    // The string data contains codes, each code seperated by a '=',
    // and each code containing one more more <br> tag
    let codeArray = data
      .replace(/<br>/g, '')
      .split('=')
      .reduce((codes, code) => {
        if (code !== '') codes.push(code)
        return codes
      }, [])

    parsedData.push({ timestamp: time.toString(), codes: codeArray })
  }

  return parsedData
}

async function saveMetServiceData () {
  let data = await getMetServiceData()
  for (let d of data) {
    await saveCodes(d)
  }
}

module.exports = { getMetServiceData, saveMetServiceData }
