class AuthController {
  
  async registration(req, res, next) {
    console.log('Registration');
    res.send('Registration')
  }  
}

module.exports = new AuthController();