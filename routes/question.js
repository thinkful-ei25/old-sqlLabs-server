'use strict';

const express = require('express');
const passport = require('passport');

const User = require('../models/user');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});
router.use(jwtAuth);

router.get('/', (req, res, next) => {
  User.findById(req.user.id)
    // .populate('userQuestions')
    .then(user => {
      console.log('User => ' + user.userQuestions[user.currentQuestionIndex].question);
      console.log('User => ' + user.currentQuestionIndex);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userQuestion, userAnswer } = req.body;
  const requiredInfo = ['userQuestion', 'userAnswer'];
  const missingInfo = requiredInfo.find(field => !(field in req.body));
  let err;
  if(missingInfo) {
    err = new Error(`${missingInfo} required in body`);
    err.location = missingInfo;
    err.code = 400;
    throw err;
  }

  let currentUserQuestion, correctAnswer;


  User.findById(req.user.id)
    .populate('userQuestions')
    .then(user => {
      currentUserQuestion = user.userQuestions[user.currentQuestionIndex];
      if(userQuestion.id !== currentUserQuestion.id) {
        const err = new Error('Question ids do not match');
        err.code = 422;
        throw err;
      }
      correctAnswer = userAnswer === currentUserQuestion.question.questionAnswer;
      
      return user.postAnswer(correctAnswer);
    })
    .then(() => {
      res.json({
        userQuestion: currentUserQuestion.question,
        correct: correctAnswer,
        numCorrect: currentUserQuestion.correct,
        numIncorrect: currentUserQuestion.Incorrect
      });
    })
    .catch(next);
});
module.exports = router;