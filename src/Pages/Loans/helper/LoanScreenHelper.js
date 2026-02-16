export class LoanScreenHelper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  onApplyNewClick() {
    this.navigate('/loan/loan-application');
  }

  onLoanStatusClick(id) {
    console.log(`Loan Status Card Clicked: ${id}`);
    // Future: navigate to loan details
    // this.navigate(\`/loans/\${id}\`);
  }

  onActiveFinanceClick(index) {
    console.log(`Active Finance Card Clicked: ${index}`);
    // Future: navigate to finance details
  }

  onTrackApplicationClick(id) {
    console.log(`Track Application Clicked: ${id}`);
    // Future: navigate to application tracking
    // this.navigate(\`/loans/track/\${id}\`);
  }
}
