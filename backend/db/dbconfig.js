const knex = require('knex');

const config = require('../../../react-git-clone/backend/knexfile.js');

const db = knex(config.development);

module.exports = db;