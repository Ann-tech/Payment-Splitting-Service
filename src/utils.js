function sortSplitType(SplitType) {
    const SplitTypeOrder = {FLAT: 1, PERCENTAGE: 2, RATIO: 3};
    SplitType.sort((a, b) => SplitTypeOrder[a.SplitType] - SplitTypeOrder[b.SplitType] );
    console.log(SplitType);
}

module.exports = {
    sortSplitType
}