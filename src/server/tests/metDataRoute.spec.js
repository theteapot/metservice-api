const { start, stop } = require('../server')
const assert = require('assert')

const fetch = require('node-fetch')

describe('Tests starting and stopping server', () => {
  before('Should start a server', async () => {
    assert.equal((await start()).listening, true)
  })

  it('Should get metservice data', async () => {
    let response = await fetch(`http://localhost:3000/time`)

    assert.equal(response.ok, true, `Expected response to be ok, was not`)
  })

  it('Should get geoJSON', async () => {
    let response = await fetch(`http://localhost:3000/rainfall.geojson`)
    assert.equal(response.ok, true, `Expected response to be ok, was not`)
  })

  after('Should stop a server', async () => {
    assert.equal((await stop()).listening, false)
  })
})
