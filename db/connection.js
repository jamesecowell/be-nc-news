const knex = require('knex');
const customConfig = require('../knexfile');

module.exports = knex(customConfig);
