const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const userModel = require("../models/userModel")

class AuthController {
  async registration(req, res, next) {
    const {email, password, role} = req.body;
    if (!email || !password) {
      next()
    }

    // const candidate = await userModel.findOne({where: {email: email}})
    // if (!candidate) {
    //   next()
    // }

    const hashPassword = await bcrypt.hash(password, 5);
    const token = jsonwebtoken.sign({
      id: Math.floor(Math.random() * 1000),
      email,
      role
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h"
    }
    )

    res.send(JSON.stringify(token));
  }  
}

module.exports = new AuthController();