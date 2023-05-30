const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    console.log('API error: ' + err.message);
  }
  res.send(err.message);
};