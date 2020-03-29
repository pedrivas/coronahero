const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development // seta variavel de    o ambiente e banco de dados para teste quando roda o npm test

const connection = knex(config);

module.exports = connection;