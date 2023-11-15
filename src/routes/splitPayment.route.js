const express = require('express');
const splitPaymentRouter = express.Router();

const { httpSplitPayment } = require("../controllers/splitPayment.controller");

splitPaymentRouter.post("/", httpSplitPayment)

module.exports = splitPaymentRouter;