const { updateMetServiceData } = require('./index')
/**
 * @description File that will run the update function, so it can be
 * independently run by a node application (apart from the server),
 * to make scheduling it easier (i.e. can use cron)
 *
 * @returns {Object[]} Array of mongo db schema objects
 */
;(() => updateMetServiceData())()
