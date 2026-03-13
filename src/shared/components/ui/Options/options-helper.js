export default class OptionsHelper {
  // Add helper methods if needed in the future
  static optionChnage(option, setSelectedOption) {
    setSelectedOption(option);
    console.log('Option changed to:', option);
  }
}
