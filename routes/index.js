'use strict';

const express = require('express');
const auth = require('./auth');
const users = require('./users');
const question = require('./question');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/question', question);

module.exports = router;
