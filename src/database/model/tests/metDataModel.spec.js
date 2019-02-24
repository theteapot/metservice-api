const assert = require('assert')
const moment = require('moment')
const { connect, disconnect } = require('../../index')

const { saveCodes, getCodes } = require('../metDataModel')

describe('Testing MetData objects', () => {
  before('Connect db before testing', async () => {
    await connect()
  })

  let metDataObjects
  it('Should get MetData objects', async () => {
    metDataObjects = await getCodes({
      start: new Date('2019-02-24T00:00:00'),
      stop: new Date('2019-02-24T23:59:59')
    })

    // Recordings are made 8 times a day (once every 3 hours)
    assert.equal(
      metDataObjects.length,
      8,
      `Expected 8 codes, got ${metDataObjects.length}`
    )
  })

  after('Should disconnect db', async () => {
    await disconnect()
  })
})
