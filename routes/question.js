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
  console.log(req.user.id);
  User.findById(req.user.id)
    .then(user => {
      const questionText = user.userQuestions[user.head].question.questionText;
      const questionId = user.userQuestions[user.head].question.id;
      console.log('questionText => ' + questionText);
      res.json({ question: { questionText, questionId } });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { userQuestion, userAnswer } = req.body;
  const requiredInfo = ['userQuestion', 'userAnswer'];
  const missingInfo = requiredInfo.find(field => !(field in req.body));
  let err;
  if (missingInfo) {
    err = new Error(`${missingInfo} required in body`);
    err.location = missingInfo;
    err.code = 400;
    throw err;
  }

  //currentUserQuestion is the question the user is answering.
  //correct answer is the answer to the currentUserQuestion
  let currentUserQuestion, correctAnswer;

  User.findById(req.user.id)
    .then(user => {
      currentUserQuestion = user.userQuestions[0];
      console.log(currentUserQuestion);
      if (userQuestion.id !== currentUserQuestion.id) {
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
        userQuestion: currentUserQuestion.question,
        correct: correctAnswer,
        numCorrect: currentUserQuestion.correct,
        numIncorrect: currentUserQuestion.Incorrect
      });
    })
    .catch(next);
});
module.exports = router;
