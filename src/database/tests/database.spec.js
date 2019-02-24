const { server } = require('../index')
const assert = require('assert')
const delay = require('delay')

describe('Testing database', () => {
  it('Should connect to the database', async () => {
    await delay(300)
    assert.equal(
      server.connection.readyState == 1 || server.connection.readyState == 2,
      true,
      `Expected readystate 1, got ${server.connection.readyState}`
    )
  })
})
