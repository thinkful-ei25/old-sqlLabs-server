'use strict';

module.exports = {
  PORT: process.env.PORT || 8090,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'mongodb://admin:credit6000living300house@ds145093.mlab.com:45093/sql-labs',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/sql-learning-labs-test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
