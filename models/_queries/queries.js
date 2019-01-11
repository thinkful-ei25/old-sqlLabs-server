'use strict';

const User = require('../user');

//findByID

const findById = (req) => {
  return User.findById(req.user.id)
    .then(user => {
      return user.userQuestions[user.head].question;
    });
};



module.exports = {
  findById

};

