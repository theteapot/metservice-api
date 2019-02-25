const { start, stop } = require('../server')
const assert = require('assert')

describe('Tests starting and stopping server', () => {
  it('Should start a server', async () => {
    assert.equal((await start()).listening, true)
  })
  it('Should stop a server', async () => {
    assert.equal((await stop()).listening, false)
  })
})
