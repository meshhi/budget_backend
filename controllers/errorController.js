const ApiError = require('../utils/ApiError');

class ErrorController {
  async handleError(err, req, res, next) {
    if (err instanceof ApiError) {
      console.log(err.message)
      console.log('err.message')
    }

    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send('ERRORRRSSS')
    // res.render('error');
  }
}

module.exports = new ErrorController();