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
    firstName: { type: String },
    lastName: { type: String },
    userQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    currentQuestionIndex: { type: Number, default: 0 }
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, result) {
        delete result._id;
        delete result._v;
        delete result.password;
        delete result.questions;
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
  return Question.find({}, 'id').then(results => {
    const ids = results.map(item => item._id);
    this.results = ids;
    return this.save();
  });
};

UserSchema.methods.updateQuestionIndex = function userUpdateQuestionIndex() {
  const { currentQuestionIndex } = this;
  this.currentQuestionIndex =
    (currentQuestionIndex + 1) % this.userQuestions.length;
  return this.save();
};


module.exports = mongoose.model('User', UserSchema);
