'use strict';
const { localStrategy } = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');

module.exports = { localStrategy, jwtStrategy };