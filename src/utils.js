function sortSplitInfo(SplitInfo) {
    const SplitTypeOrder = {FLAT: 1, PERCENTAGE: 2, RATIO: 3};
    SplitInfo.sort((a, b) => SplitTypeOrder[a.SplitType] - SplitTypeOrder[b.SplitType] );
}

function splitTransaction(transactionInfo) {
    const { ID, Amount, SplitInfo } = transactionInfo;

    let currentBalance = Amount;
    let SplitBreakdown = [];
    let currentSplitAmount;
    let openingRatioBalance;
    let totalRatio;


    for (let i = 0; i < SplitInfo.length; i++) {
        const { SplitType, SplitValue, SplitEntityId } = SplitInfo[i];
        let currentSplitBreakdown = {};
        currentSplitBreakdown.SplitEntityId = SplitEntityId;

        if (SplitType === "FLAT") {
            currentSplitAmount = SplitValue;
            currentSplitBreakdown.Amount = SplitValue;
        } else if (SplitType === "PERCENTAGE") {
            currentSplitAmount = calculateSplitAmountForPercentage(SplitValue, currentBalance);
            currentSplitBreakdown.Amount = currentSplitAmount;
        } else {
            //FOR RATIO
            if (openingRatioBalance === undefined) {
                openingRatioBalance = currentBalance;
                totalRatio = calculateTotalRatio(SplitInfo);
                
            }
            currentSplitAmount = calculateSplitAmountForRatio(SplitValue, openingRatioBalance, totalRatio);
            currentSplitBreakdown.Amount = currentSplitAmount;
        }

        
        currentBalance -= currentSplitAmount; 
        SplitBreakdown.push(currentSplitBreakdown);
    }

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