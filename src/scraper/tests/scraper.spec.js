const assert = require('assert')

const { getMetServiceData, saveMetServiceData } = require('../index')

describe('Should test the web scraper', () => {
  it('Should get the website and return dated codes', async () => {
    let result = await getMetServiceData()
    assert.equal(
      Object.keys(result).length > 0,
      true,
      'Result should return an object with multiple keys'
    )

    for (let data of Object.values(result)) {
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

  it('Should save metservice data', async () => {
    console.log(await saveMetServiceData())
  })
})
