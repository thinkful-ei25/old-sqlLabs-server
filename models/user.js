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
    this.userQuestions = results.map((question, i) => ({ question, next: i < results.length -1 ? i += 1 : null }));
    return this.save();
  });
};

UserSchema.methods.postAnswer = function userPostAnswer(correct) {
  const currentUserQuestion = this.userQuestions[this.currentQuestionIndex];
  if (correct) currentUserQuestion.correct++;
  if (!correct) currentUserQuestion.incorrect++;  

  // let increment = 2;

  // if(currentUserQuestion.mValue ==)

  correct ? currentUserQuestion.mValue += 2 : currentUserQuestion.mValue = 1;

  this.handleUserQuestion(currentUserQuestion.mValue);

  return this.save();
};


UserSchema.methods.handleUserQuestion = function userhandleUserQuestion(value) {
  //set head value to be equal to current question.
  let hold = this.head;  
  //set the head to be the current question's next
  this.head = this.userQuestions[hold].next;

  let rotate = hold;
  //rotate = 0;
  for(let i = 0; i < value; i++){
    rotate = this.userQuestions[rotate].next;
  }

  // rotate = 1;
  // hold = 0;


  this.userQuestions[hold].next = this.userQuestions[rotate].next;
  this.userQuestions[rotate].next = hold;

};

module.exports = mongoose.model('User', UserSchema);
