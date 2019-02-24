const { connect, disconnect, server } = require('../index')
const assert = require('assert')
const delay = require('delay')

describe('Testing database', () => {
  let startup, shutdown
  it('Should connect to the database', async () => {
    startup = await connect()
    assert.equal(
      startup,
      true,
      `Expected connect function to return true, got ${startup}`
    )
    assert.equal(
      server.connection.readyState,
      1,
      `Expected server to be state 1 (connected), got ${
        server.connection.readyState
      }`
    )
  })
  it('Should disconnect from the database', async () => {
    shutdown = await disconnect()
    assert.equal(
      shutdown,
      true,
      `Expected shutdown function to return true, got ${shutdown}`
    )
    assert.equal(
      server.connection.readyState,
      0,
      `Expected server to be state 0 (disconnected), got ${
        server.connection.readyState
      }`
    )
  })
})
