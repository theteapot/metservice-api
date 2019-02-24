const express = require('express')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

routes(app)

let server

function start () {
  server = app.listen(port, () =>
    console.log(`MetService listening on port ${port}!`)
  )
  return server
}

function stop () {
  return server.close()
}

module.exports = {
  start,
  stop
}
