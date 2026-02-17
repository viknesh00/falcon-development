export default class LoanDetailsHelper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  getLoanDetails(id) {
    return {
      title: 'Home Purchase Plan',
      amount: 70430.55,
      installmentAmount: 1572.5,
      repaidAmount: 7780.4,
      get remainingBalance() {
        return this.amount - this.repaidAmount;
      },
      get completedPercentage() {
        return Math.round((this.repaidAmount / this.amount) * 100);
      },
      nextInstallmentDate: '28 Feb 2026',
      remainingInstallments: 11,
      closingDate: '31 Dec 2026',
      disbursementDate: '01 Oct 2025',
      totalRepayments: '5/15',
      loanNumber: 'LOAN-00148',
      autoDebitStatus: true,
      description: 'Housing Loan',
    };
  }

  getRepaymentHistory(id) {
    return [
      {
        transactionDetails: 'Loan Repayment',
        date: '05 Feb 2026',
        transactionId: 'FPS1234567890ABC',
        emiAmount: 1572.5,
        totalRepaid: 7780.4,
        remaining: 62780.4,
      },
      {
        transactionDetails: 'Loan Repayment',
        date: '05 Jan 2026',
        transactionId: 'FPS1234567890ABC',
        emiAmount: 1572.5,
        totalRepaid: 6200.4,
        remaining: 60800.4,
      },
      {
        transactionDetails: 'Loan Repayment',
        date: '05 Dec 2025',
        transactionId: 'FPS1234567890ABC',
        emiAmount: 1572.5,
        totalRepaid: 4700.4,
        remaining: 58500.4,
      },
      {
        transactionDetails: 'Loan Repayment',
        date: '05 Nov 2025',
        transactionId: 'FPS1234567890ABC',
        emiAmount: 1572.5,
        totalRepaid: 3200.4,
        remaining: 55200.4,
      },
      {
        transactionDetails: 'Loan Repayment',
        date: '05 Nov 2025',
        transactionId: 'FPS1234567890ABC',
        emiAmount: 1572.5,
        totalRepaid: 3200.4,
        remaining: 55200.4,
      },
      {
        transactionDetails: 'Loan Repayment',
        date: '05 Nov 2025',
        transactionId: 'FPS1234567890ABC',
        emiAmount: 1572.5,
        totalRepaid: 3200.4,
        remaining: 55200.4,
      },
    ];
  }
}
