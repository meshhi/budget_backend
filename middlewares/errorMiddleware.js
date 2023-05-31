const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  res.statusCode = err.code || 500;
  res.send(JSON.stringify({
    response: err.message || err
  }));
};