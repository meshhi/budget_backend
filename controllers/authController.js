const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const { userModel } = require("../models/models")

class AuthController {
  async registration(req, res, next) {
    try {
      const {email, password, role} = req.body;
      if (!email || !password) {
        throw ApiError.internalError("No email or password");
      }
      let candidate = await userModel.findOne({where: {email: email}})
      const hashPassword = await bcrypt.hash(password, 5);
      if (!candidate) {
        candidate = await userModel.create({email: email, password: hashPassword, role: role});
      } else {
        throw ApiError.internalError("Email already exists");
      }
      const token = jsonwebtoken.sign({
        id: candidate.id,
        email,
        password: hashPassword,
        role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" });
      
      const responseData = {
        response: "User created successfully!",
        token,
        user: candidate
      };
      res.statusCode = 201;
      res.send(JSON.stringify(responseData));
    } catch (err) {
      return next(err);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        throw ApiError.internalError("No email or password");
      }
      let candidate = await userModel.findOne({where: {email: email}});
      if (!candidate) {
        throw ApiError.internalError("User not found!");
      }

      const isValidPassword = await bcrypt.compareSync(password, candidate.password);
      if (isValidPassword) {
        const hashPassword = await bcrypt.hash(password, 5);
        const token = jsonwebtoken.sign({
          id: candidate.id,
          email: candidate.email,
          password: hashPassword,
          role: candidate.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" });
  
        const responseData = {
          response: "Login success!",
          token,
          user: candidate
        };
    
        res.send(JSON.stringify(responseData));
      } else {
        throw ApiError.internalError("Invalid password!");
      }
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = new AuthController();