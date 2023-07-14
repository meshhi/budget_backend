const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const { transactionModel } = require("../models/models")

class BudgetController {
  async getTransactions(req, res, next) {
    try {
      const transactions = await transactionModel.findAll();
      console.log(transactions)
      res.json(transactions);
    } catch (err) {
      return next(err);
    }
  };

  async createTransaction(req, res, next) {
    try {
      const { title, text, summary, isIncome } = req.body;
      console.log(req.body)
      const createdTransaction = await transactionModel.create({title: title, text: text, summary: summary, isIncome: isIncome});
      const responseData = {
        response: "Transaction created!",
        createdTransaction: createdTransaction
      }
      res.statusCode = 201;
      res.json(responseData);
    } catch (err) {
      return next(err);
    }
  };

  async deleteTransaction(req, res, next) {
    try {
      const { id } = req.body;
      const transaction = await transactionModel.findOne({where: {id: id}});
      if (!transaction) {
        throw new ApiError(404, "Transaction not found!");
      } else {
        await transaction.destroy();
        const responseData = {
          response: `Transaction ${id} deleted`
        }
        res.json(responseData);
      }
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = new BudgetController();