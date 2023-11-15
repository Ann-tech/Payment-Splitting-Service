const express = require('express');
const splitPaymentRouter = express.Router();

splitPaymentRouter.post("/", httpSplitPayment)

module.exports = splitPaymentRouter;