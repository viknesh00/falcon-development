import Styles from '../Styles/OptionsComponent.module.css';
import OptionsHelper from './options-helper';
/**
 * OptionsComp
 * -----------
 * A reusable toggle/switch component used to select one option
 * from a given list (e.g., personal / business).
 *
 * @param {Object} props
 * @param {string[]} props.options - List of selectable options
 * @param {string} props.selectedOption - Currently selected option
 * @param {Function} props.setSelectedOption - State updater function
 */
const OptionsComp = ({ options = ['personal', 'business'], selectedOption, setSelectedOption }) => {
  return (
    <div className={Styles.switchContainer}>
      {options.map((option) => (
        <div
          className={`${Styles.switchOption} ${selectedOption === option ? Styles.activeOption : ''}`}
          onClick={() => OptionsHelper.optionChnage(option, setSelectedOption)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};
export default OptionsComp;
