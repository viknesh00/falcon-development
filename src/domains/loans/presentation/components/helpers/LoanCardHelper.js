export class LoanCardHelper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  onInvoiceFinancingClick = () => {
    this.navigate('/loan/invoice-financing');
  };

  onPersonalLoanClick = () => {
    this.navigate('/loan/loan-application');
  };
}
