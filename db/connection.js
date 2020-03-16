const knex = require('knex');
const { customConfig, baseConfig } = require('../knexfile');

exports.knex(baseConfig);
exports.knex(customConfig);
