const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const splitPaymentRouter = require('./routes/splitPayment.route');

app.use( express.json() );

app.use("/split-payments/compute", splitPaymentRouter)

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
}

//Global error handler middleware
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500).json({success: false, message: err.message});
});

module.exports = app;