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
    .populate('userQuestions')
    .then(user => {
      //question that they are one
      const { questionText, id } = user.userQuestions[user.currentQuestionIndex];
      res.json({ userQuestion: { questionText, id } });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userQuestion, userAnswer } = req.body;

  if(!userQuestion || !userQuestion.id) {
    const err = new Error('`userQuestion` or `userQuestion.id` required in request body');
    err.code = 400;
    throw err;
  }

  // if(!userAnswer) {
  //   const err = new Error('An `answer` is required');
  //   err.code = 400;
  //   throw err;
  // }

  let currentUserQuestion;
  let correctAnswer;

  User.findById(req.user.id)
    .populate('userQuestions')
    .then(user => {
      currentUserQuestion = user.userQuestions[user.currentQuestionIndex];
      if(userQuestion.id !== currentUserQuestion.id) {
        const err = new Error('Question ids do not match');
        err.code = 422;
        throw err;
      }
      correctAnswer = userAnswer === currentUserQuestion.questionAnswer;
      
      return user.updateQuestionIndex();
    })
    .then(() => {
      res.json({
        userQuestion: currentUserQuestion,
        correct: correctAnswer
      });
    })
    .catch(next);
});
module.exports = router;