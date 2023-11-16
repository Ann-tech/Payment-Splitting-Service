const { generateError } = require('../errorGenerator');

function validateCurrentSplitAmount(currentSplitAmount, Amount) {
    //SplitAmount for Each Entity cannot be greater than 0 or greater than Transaction amount
    if (currentSplitAmount > Amount || currentSplitAmount < 0) {
        const err = new Error('Split amount cannot be less than 0 or greater than transaction Amount');
        generateError(err);
    }
}

function validateCurrentBalance(currentBalance) {
    //Check if final Balance is less than 0
    if (currentBalance < 0) {
        const err = new Error('Final Balance cannot be less than 0.');
        generateError(err);
    }
}

function validateTotalSplitAmount(totalSplitAmount, Amount) {
    //check if the sum of all Split Amount values is greater than transaction amount
    if (totalSplitAmount > Amount) {
        const err = new Error('The sum of all split Amount values computed cannot be greater than the transaction Amount');
        generateError(err);
    }
}


module.exports = {
    validateCurrentSplitAmount,
    validateCurrentBalance,
    validateTotalSplitAmount
}