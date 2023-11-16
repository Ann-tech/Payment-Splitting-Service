const { sortSplitType } = require('../utils');

function httpSplitPayment(req, res, next) {
    const transactionInfo = req.body;

    const { ID, Amount, SplitInfo } = transactionInfo;
    
    //sort SplitInfo based on SplitType
    sortSplitType(SplitInfo);
}
 

module.exports = {
    httpSplitPayment
}