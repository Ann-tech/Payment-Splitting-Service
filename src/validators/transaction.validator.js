const joi = require('joi');

const transactionValidationMiddleware = async function(req, res, next) {
    try {
        const transactionPayload = req.body;
        await transactionValidator.validateAsync(transactionPayload);
        next()
    } catch(err) {
        console.log(err);
        return res.status(400).json({success: false, message: err.details[0].message})
    }
}


//Define validation schema
const transactionValidator = joi.object({
    ID: joi.number()
                    .required(),
    Amount: joi.number()
                    .required(),
    Currency: joi.string()
                 .required(),
    customerEmail: joi.string()
                .pattern(new RegExp(/^.+@(?:[\w-]+\.)+\w+$/))
                .required(),
    SplitInfo: joi.array()
                .min(1)
                .max(20)
                .items(
                    joi.object({
                        SplitType: joi.string().valid('FLAT', 'PERCENTAGE', 'RATIO').required(),
                        SplitValue: joi.number().required(),
                        SplitEntityId: joi.string().required()
                    })
                )
});


module.exports = {
    transactionValidationMiddleware
}