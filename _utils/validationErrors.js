'use strict';

function ValidationError(res, error) {

  if(error.code === 11000 && error.name === 'MongoError') {
    const err = new Error('Username already in use');
    err.location = 'username',
    err.code = 422,
    err.reason = 'ValidationError';

    return err;
  }

  if(error.reason === 'ValidationError') {
    return res.status(error.code).json(error);
  }
  return res.status(500).json({code: 500, message: 'Internal Server Error'});
}


module.exports = {
  ValidationError
};
