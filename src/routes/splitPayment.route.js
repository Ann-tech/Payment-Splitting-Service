const express = require('express');
const splitPaymentRouter = express.Router();

const { httpSplitPayment } = require("../controllers/splitPayment.controller");
const { transactionValidationMiddleware } = require('../validators/transaction.validator');

splitPaymentRouter.post("/", transactionValidationMiddleware, httpSplitPayment);

module.exports = splitPaymentRouter;