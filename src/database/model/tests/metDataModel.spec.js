const { saveCodes } = require('../metDataModel')

describe('Testing MetData objects', () => {
  it('Should create a MetData object', async () => {
    console.log(await saveCodes({ timestamp: 'thing', codes: 'test' }))
  })
})
