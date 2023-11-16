const { validateCurrentSplitAmount, validateCurrentBalance, validateTotalSplitAmount } = require('./validators/validator');

function sortSplitInfo(SplitInfo) {
    const SplitTypeOrder = {FLAT: 1, PERCENTAGE: 2, RATIO: 3};
    SplitInfo.sort((a, b) => SplitTypeOrder[a.SplitType] - SplitTypeOrder[b.SplitType] );
}

function splitTransaction(transactionInfo) {
    const { ID, Amount, SplitInfo } = transactionInfo;

    let currentBalance = Amount;
    let currentSplitAmount;
    let SplitBreakdown = [];
    let openingRatioBalance;
    let totalRatio;
    let totalSplitAmount = 0;


    for (let i = 0; i < SplitInfo.length; i++) {
        const { SplitType, SplitValue, SplitEntityId } = SplitInfo[i];
        let currentSplitBreakdown = {};

        currentSplitBreakdown.SplitEntityId = SplitEntityId;

        if (SplitType === "FLAT") {
            currentSplitAmount = SplitValue;

            //validate currentSplitAmount
            validateCurrentSplitAmount(currentSplitAmount, Amount);

            currentSplitBreakdown.Amount = SplitValue;

        } else if (SplitType === "PERCENTAGE") {
            currentSplitAmount = calculateSplitAmountForPercentage(SplitValue, currentBalance);

            //validate currentSplitAmount
            validateCurrentSplitAmount(currentSplitAmount, Amount);
            
            currentSplitBreakdown.Amount = currentSplitAmount;

        } else {
            //FOR RATIO

            //Obtain openingRatioBalance and totalRatio when the first "RATIO" SplitType is encountered; these values will be reused for subsequent "RATIO" SplitTypes
            if (openingRatioBalance === undefined) {
                openingRatioBalance = currentBalance;
                totalRatio = calculateTotalRatio(SplitInfo);    
            }
            currentSplitAmount = calculateSplitAmountForRatio(SplitValue, openingRatioBalance, totalRatio);

            //validate currentSplitAmount
            validateCurrentSplitAmount(currentSplitAmount, Amount);

            currentSplitBreakdown.Amount = currentSplitAmount;
        }

        //update balance
        currentBalance -= currentSplitAmount; 

        //update totalSplitAmount
        totalSplitAmount += currentSplitAmount;

        SplitBreakdown.push(currentSplitBreakdown);
    }

    //validate currentBalance
    validateCurrentBalance(currentBalance);

    //validate totalSplitAmount
    validateTotalSplitAmount(totalSplitAmount, Amount);

    const result = {ID, Balance: currentBalance, SplitBreakdown};
    return result;
}

function calculateSplitAmountForPercentage(SplitValue, currentBalance) {
    const currentSplitAmount = SplitValue * currentBalance / 100;
    return currentSplitAmount;
}

function calculateTotalRatio(SplitInfo) {
    //calculate total Ratio
    const totalRatio = SplitInfo.reduce((sum, SplitEntity) => {
        const { SplitType, SplitValue } = SplitEntity;
        if (SplitType === "RATIO") {
            sum += SplitValue;
            return sum;
        }
        return sum;
    }, 0);

    return totalRatio;
}

function calculateSplitAmountForRatio(SplitValue, openingRatioBalance, totalRatio) {
    const splitAmount = (SplitValue / totalRatio) * openingRatioBalance;
    return splitAmount;
}


module.exports = {
    sortSplitInfo,
    splitTransaction
}