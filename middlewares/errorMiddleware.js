const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    console.log('ApiError')
  } else {
    console.log('not ApiError')
    err = new ApiError.badRequest(err.message);
  }

  res.status(err.status || 500);
  res.send(err.message);
};