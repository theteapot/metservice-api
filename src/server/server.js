const express = require('express')
const cors = require('cors')

const routes = require('./routes')
const { connect, disconnect } = require('../database/index')

const app = express()
app.use(cors())

const port = process.env.PORT || 3000

routes(app)

let server

async function start () {
  await connect()
  server = app.listen(port, () =>
    console.log(`MetService listening on port ${port}!`)
  )
  return server
}

async function stop () {
  await disconnect()
  return server.close()
}

module.exports = {
  start,
  stop
}
