export class LoanStatusHelper {
  static formateAmount(amount) {
    if (!amount) return '';

    // remove commas
    const cleanValue = amount.toString().replace(/,/g, '');

    // split decimal
    const [integer, decimal] = cleanValue.split('.');

    // format integer part
    let lastThree = integer.slice(-3);
    let rest = integer.slice(0, -3);

    if (rest !== '') {
      rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      lastThree = ',' + lastThree;
    }

    return decimal !== undefined ? rest + lastThree + '.' + decimal.slice(0, 2) : rest + lastThree;
  }
}
