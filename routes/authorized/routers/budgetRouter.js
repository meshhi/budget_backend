const express = require("express");
const router = express.Router();
const budgetController = require("../../../controllers/budgetController");

router.get("/get-all", budgetController.getTransactions);
router.post("/transaction", budgetController.createTransaction);
router.delete("/transaction", budgetController.deleteTransaction);
router.get("/categories", budgetController.getCategories);

module.exports = router;
