const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  res.statusCode = err.code || 500;
  const responseData ={
    response: err.message || err
  };
  console.log(err.message);
  res.json(responseData);
};