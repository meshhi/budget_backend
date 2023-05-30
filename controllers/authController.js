const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const { userModel } = require("../models/models")

class AuthController {
  async registration(req, res, next) {
    const {email, password, role} = req.body;
    if (!email || !password) {
      next(!email ? ApiError.internalError("No email") : !password ? ApiError.internalError("No password") : ApiError.internalError("No email and password"));
    }

    const candidate = await userModel.findOne({where: {email: email}})
    if (!candidate) {
      await userModel.create({email: email, password: password, role: role});
    } else {
      next(ApiError.internalError("This email is already registered"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const token = jsonwebtoken.sign({
      id: Math.floor(Math.random() * 1000),
      email,
      password: hashPassword,
      role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" });

    res.send(JSON.stringify(token));
  }  
}

module.exports = new AuthController();