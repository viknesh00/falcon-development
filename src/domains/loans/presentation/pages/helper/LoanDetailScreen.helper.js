import { loanData } from '../../../data/loanData';

export default class LoanDetailsHelper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  getLoanDetails(id) {
    const details = loanData.loanDetails;
    return {
      ...details,
      get remainingBalance() {
        return this.amount - this.repaidAmount;
      },
      get completedPercentage() {
        return Math.round((this.repaidAmount / this.amount) * 100);
      },
    };
  }

  getRepaymentHistory(id) {
    return loanData.repaymentHistory;
  }
}
