export class LoanScreenHelper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  onApplyNewClick() {
    this.navigate('/loan/loan-application');
  }

  onLoanStatusClick(id) {
    console.log(`Loan Status Card Clicked: ${id}`);
    this.navigate(`/loan/${id}`);
  }

  onActiveFinanceClick(index) {
    console.log(`Active Finance Card Clicked: ${index}`);
    this.navigate(`/loan/${index}`);
  }

  onTrackApplicationClick(id) {
    console.log(`Track Application Clicked: ${id}`);
    // Future: navigate to application tracking
    // this.navigate(`/loans/track/${id}`);
  }
}
