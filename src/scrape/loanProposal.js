let loanProposal = (usd) => {
    let commission = 0.02;
    let collateral = 0.5;
    let loan = (collateral-commission)*usd;

    return loan;
}

module.exports = loanProposal;