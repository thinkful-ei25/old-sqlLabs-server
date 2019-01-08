'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  answer: {
    type: String,
    required: true
  },
  mValue: {
    type: Number,
    default: 0,
  },
  incorrect: {
    type: Number,
    default: 0
  },
  correct: {
    type: Number
  }
});

QuestionSchema.methods.serialize = function () {
  return {
    question: this.question || '',
    answer: this.answer || '',
    mValue: this.mValue || '',
    
  };
};



const Question = mongoose.model('User', QuestionSchema);

module.exports = { User };