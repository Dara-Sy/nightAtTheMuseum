const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});

const dbConfig = require('./config');

module.exports = pgp(dbConfig);
