const { start, stop } = require('../server')
const assert = require('assert')

describe('Tests starting and stopping server', () => {
  it('Should start a server', () => {
    assert.equal(start().listening, true)
  })
  it('Should stop a server', () => {
    assert.equal(stop().listening, false)
  })
})
