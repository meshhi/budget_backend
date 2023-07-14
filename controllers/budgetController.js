const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const { transactionModel } = require("../models/models")

class BudgetController {
  async addTransaction(req, res, next) {
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
    
        res.json(responseData);
      } else {
        throw ApiError.internalError("Invalid password!");
      }
    } catch (err) {
      return next(err);
    }
  };

  async getTransactions(req, res, next) {
    try {
      const transactions = await transactionModel.findAll();
      console.log(transactions)
      res.json(transactions);
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = new BudgetController();