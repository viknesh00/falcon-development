import Styles from '../Styles/OptionsComponent.module.css';

const OptionsComp = ({ option, isSelected, onSelect }) => {
  return (
    <div
      className={`${Styles.optionComp} ${isSelected ? Styles.selectedOption : ''}`}
      onClick={onSelect}
    >
      <p className={Styles.optionText}>{option}</p>
    </div>
  );
};
export default OptionsComp;
