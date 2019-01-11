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


//create a query to reused the findById
router.get('/', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      const currentUser = user.userQuestions[user.head];
      const questionText = currentUser.question.questionText;
      const questionId = currentUser.question.id;
      // const questionText = user.userQuestions[user.head].question.questionText;
      // const questionId = user.userQuestions[user.head].question.id;
      res.json({ question: { questionText, questionId } });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userAnswer, questionId } = req.body;
  const requiredInfo = ['questionId', 'userAnswer'];
  const missingInfo = requiredInfo.find(field => !(field in req.body));
  let currentUserQuestion, correctAnswer;
  let err;
  if (missingInfo) {
    err = new Error(`${missingInfo} required in body`);
    err.location = missingInfo;
    err.code = 400;
    throw err;
  }



  User.findById(req.user.id)
    .then(user => {
      currentUserQuestion = user.userQuestions[user.head];
      if (questionId !== currentUserQuestion.question.id) {
        const err = new Error('Question ids do not match');
        err.code = 422;
        throw err;
      }
      correctAnswer =
        userAnswer === currentUserQuestion.question.questionAnswer;

      return user.postAnswer(correctAnswer);
    })
    .then(() => {
      res.json({
        questionId: currentUserQuestion.question.id,
        questionText: currentUserQuestion.question.questionText,
        questionAnswer: currentUserQuestion.question.questionAnswer,
        correct: correctAnswer,
        numCorrect: currentUserQuestion.correct,
        numIncorrect: currentUserQuestion.incorrect
      });
    })
    .catch(next);
});
module.exports = router;
