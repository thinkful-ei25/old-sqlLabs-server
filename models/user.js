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
    firstName: {type: String, default: ''},
    lastName: { type: String, default: '' },
    userQuestions: [
      {
        question: Question.schema,
        mValue: { type: Number, default: 1 },
        next: Number,
        correct: { type: Number, default: 0 },
        incorrect: { type: Number, default: 0 }
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
  return Question.find().then(results => {
<<<<<<< HEAD
    const ids = results.map(item => item._id);
    this.results = ids;
=======
    this.userQuestions = results.map((question, i) => ({
      question,
      next: i < results.length - 1 ? (i += 1) : null
    }));
>>>>>>> features/users
    return this.save();
  });
};

UserSchema.methods.postAnswer = function userPostAnswer(correct) {
  let mValueChange;
  const currentUserQuestion = this.userQuestions[this.head];
  if (correct) currentUserQuestion.correct++;
  if (!correct) currentUserQuestion.incorrect++;
  
  mValueChange = currentUserQuestion.mValue > 2 ? -1 : 1;


  correct
    ? (currentUserQuestion.mValue += 2)
    : (currentUserQuestion.mValue = 1);

  this.handleUserQuestion(currentUserQuestion.mValue);

  return this.save();
};

UserSchema.methods.handleUserQuestion = function userhandleUserQuestion(value) {
  //set head value to be equal to current question.
  let hold = this.head;
  //set the head to be the current question's next
  this.head = this.userQuestions[hold].next;

  let rotate = hold;

  for (let i = 0; i < value && i < this.userQuestions.length-1; i++) {
    rotate = this.userQuestions[rotate].next;
    console.log('rotate ' + rotate);
  }


  this.userQuestions[hold].next = this.userQuestions[rotate].next;
  this.userQuestions[rotate].next = hold;


};

module.exports = mongoose.model('User', UserSchema);
