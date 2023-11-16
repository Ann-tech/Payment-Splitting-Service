const { sortSplitInfo, splitTransaction } = require('../utils');

function httpSplitPayment(req, res, next) {
    const transactionInfo = req.body;

    const { SplitInfo } = transactionInfo;
    
    //sort SplitInfo based on SplitType
    sortSplitInfo(SplitInfo);

    const result = splitTransaction(transactionInfo);
    result.success = true;

    return res.status(200).json(result);
}
 

module.exports = {
    httpSplitPayment
}