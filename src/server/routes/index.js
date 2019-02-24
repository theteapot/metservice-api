const metData = require('./metData')

/**
 * @description Adds routes to an express server passed in
 *
 * @param {Express} server An instance of an express app
 */
function applyRoutes (server) {
  server.use('/', metData)
}

module.exports = applyRoutes
