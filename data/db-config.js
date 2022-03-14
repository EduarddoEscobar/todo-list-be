const knex = require('knex');
const configs = require('../knexfile');
const configuration = process.env.NODE_ENV || 'development';

module.exports = knex(configs[configuration]);