const ApiError = require('../utils/ApiError');

class ErrorMiddleware {
  async handleError(err, req, res, next) {
    if (err instanceof ApiError) {
      console.log('caused ApiError')
    } else {
      const err = new ApiError(501, 'Custom error message exit');
    }
    res.status(err.status || 500);
    res.send(err.message);
  }
}

module.exports = new ErrorMiddleware();