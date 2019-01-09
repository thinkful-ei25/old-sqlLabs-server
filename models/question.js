'use strict';
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionAnswer: {
    type: String,
    required: true
  },
  toJSON: {
    virtuals: true,
    transform(result) {
      delete result._id;
      delete result.__v;
      delete result.password;
    },
  },
});



module.exports = mongoose.model('Question', QuestionSchema);