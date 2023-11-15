const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const splitPaymentRouter = require('./routes/splitPayment.route');

app.use("/split-payments/compute", splitPaymentRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

module.exports = app;