'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Question = require('./question');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: String,
    lastName: String, 
    userQuestions: [
      { 
        question: Question.schema,
        mValue: Number, default: 0,
        next: Number,
        correct: {type: Number,  default: 0},
        incorrect: {type: Number, default: 0}
      }
    ],
    head: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, result) {
        delete result._id;
        delete result.__v;
        delete result.password;
        delete result.userQuestions;
      }
    }
  }
);

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

UserSchema.methods.generateQuestions = function userGenerateQuestions() { 
  return Question.find().then((results) => {
    this.userQuestions = results.map(question => ({ question}));
    return this.save();
  });
};

UserSchema.methods.postAnswer = function userPostAnswer(correct) {
  const currentUserQuestion = this.userQuestions[this.currentQuestionIndex];
  if(correct) currentUserQuestion.correct ++;
  if (!correct) currentUserQuestion.incorrect++;

  this.currentQuestionIndex += 1;
  return this.save();
};


module.exports = mongoose.model('User', UserSchema);
