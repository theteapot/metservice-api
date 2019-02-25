const assert = require('assert')
const moment = require('moment')
const { connect, disconnect } = require('../../index')
const util = require('util')

const {
  saveCodes,
  getCodes,
  getGeoJSON,
  getCodesPrecipitation
} = require('../metDataModel')

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

  it('Should get MetData precipitation', async () => {
    metDataObjects = await getCodesPrecipitation({
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

  it('Should get geoJson object', async () => {
    let geoJSON = await getGeoJSON()
    assert.equal(
      geoJSON.type,
      'FeatureCollection',
      `Expected type to be FeatureCollection, got ${geoJSON.type}`
    )
    assert.equal(
      Array.isArray(geoJSON.features),
      true,
      `Expected features to be an array, got ${typeof geoJSON.features}`
    )
    for (let { type, properties, geometry } of geoJSON.features) {
      assert.equal(type, 'Feature', `Expected type to be Feature, got ${type}`)
      assert.equal(
        Boolean(properties),
        true,
        `Expected properties to exist, got ${properties}`
      )
      assert.equal(
        Boolean(geometry),
        true,
        `Expected geometry to exist, got ${geometry}`
      )
      assert.equal(
        Boolean(properties.timestamp),
        true,
        `Expected properties.timestamp to exist, got ${properties.timestamp}`
      )
      assert.equal(
        Boolean(properties.name),
        true,
        `Expected properties.name to exist, got ${properties.name}`
      )
      assert.equal(
        properties.hoursPrecedingObservation === null ||
          properties.hoursPrecedingObservation === undefined,
        false,
        `Expected properties.hoursPrecedingObservation to exist, got ${
          properties.hoursPrecedingObservation
        }`
      )
      assert.equal(
        properties.amountOfPrecipitation === null ||
          properties.amountOfPrecipitation === undefined,
        false,
        `Expected properties.amountOfPrecipitation to exist, got ${
          properties.amountOfPrecipitation
        }`
      )
      assert.equal(
        geometry.type,
        'Point',
        `Expected geometry type to be Point, got ${geometry.type}`
      )
      assert.equal(
        geometry.coordinates.length,
        3,
        `Expected geometry coordinates to have length 3 [y,x,z], got ${
          geometry.coordinates.length
        }`
      )
    }
  })

  after('Should disconnect db', async () => {
    await disconnect()
  })
})
