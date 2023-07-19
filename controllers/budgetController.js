const ApiError = require("../utils/ApiError");
const { userModel, transactionModel, categoryModel } = require("../models/models")

class BudgetController {
  async getTransactions(req, res, next) {
    try {
      const authUser = req.user;
      const transactions = await transactionModel.findAll(
        {
          where: {user_id: authUser.id},
          include: [{
            model: userModel,
          }, {
            model: categoryModel,
          }]
        }
      );

      res.json(transactions);
    } catch (err) {
      return next(err);
    }
  };

  async createTransaction(req, res, next) {
    try {
      const { title, text, summary, isIncome, categoryId } = req.body;
      const authUser = req.user;
      const createdTransaction = await transactionModel.create({title: title, text: text, summary: summary, is_income: isIncome, user_id: authUser.id, category_id: categoryId });
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

  async getCategories(req, res, next) {
    try {
      const categories = await categoryModel.findAll();
      if (!categories) {
        throw new ApiError(404, "Categories not found!");
      } else {
        res.json(categories);
      }
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = new BudgetController();