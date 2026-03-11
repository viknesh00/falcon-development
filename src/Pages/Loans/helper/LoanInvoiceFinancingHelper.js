export class InvoiceFinancingHelper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  onApplicationSubmit = (data) => {
    this.navigate('/loan/application-success', { state: data });
  };
}
