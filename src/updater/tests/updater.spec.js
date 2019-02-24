const assert = require('assert')
const { connect, disconnect } = require('../../database/index')

const { getMetServiceData, updateMetServiceData } = require('../index')

describe('Should test the web updater', () => {
  before('Connect db before testing', async () => {
    await connect()
  })

  let metDataResults, uploadResults
  it('Should get the website and return dated codes', async () => {
    metDataResults = await getMetServiceData()

    assert.equal(
      Object.keys(metDataResults).length > 0,
      true,
      'Result should return an object with multiple keys'
    )

    for (let data of Object.values(metDataResults)) {
      assert.equal(
        data.hasOwnProperty('timestamp'),
        true,
        `Each data element must have a timestamp property`
      )
      assert.equal(
        data.hasOwnProperty('codes'),
        true,
        `Each data element must have a timestamp property`
      )
    }
  })

  it('Should update metservice data', async () => {
    uploadResults = await updateMetServiceData()
    for (let metData of metDataResults) {
      assert.equal(
        Boolean(
          uploadResults.find(({ timestamp }) => timestamp == metData.timestamp)
        ),
        true,
        `Could not find a matching timestamp for ${metData.timestamp}`
      )
    }
  })

  after('Should disconnect db', async () => {
    await disconnect()
  })
})
