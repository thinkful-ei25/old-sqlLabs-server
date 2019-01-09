use strict';
const express = require('express');
const User  = require('../models/user');

const router = express.Router();

function validateUser(req, res, next) {
  let err;
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );
  const sizedFields = {
    username: {
      min: 3
    },
    password: {
      min: 10,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (missingField) {
    err = new Error('Missing Field: ' + missingField);
    err.location = missingField;
    err.code = 422;
  } else if (nonStringField) {
    err = new Error(
      'Incorrect field type: ' + nonStringField + ': expected string'
    );
    err.location = nonStringField;
    err.code = 422;
  } else if (nonTrimmedField) {
    err = new Error(
      'Cannot start or end ' + nonTrimmedField + 'with whitespace'
    );
    err.location = nonTrimmedField;
    err.code = 422;
  } else if (tooSmallField || tooLargeField) {
    let message = tooSmallField
      ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
      : `Must be at most ${sizedFields[tooLargeField].max} characters long`;
    err = new Error(message);
    err.location = tooSmallField || tooLargeField;
    err.code = 422;
  }

  if(err) {
    err.reason = 'ValidationError';
    next(err);
    return;
  }

  next();
}

// Post to register a new user
router.post('/', validateUser, (req, res) => {
  let { username, password, firstName = '', lastName = '', userQuestions } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({ username })
    .count()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        firstName,
        lastName,
        userQuestions
      });
    })
    .then(user => {
      return res.status(201).location(`${req.baseUrl}/${user._id}`).json(user);
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });
});

module.exports = router ;