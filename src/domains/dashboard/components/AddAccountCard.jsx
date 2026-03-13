import Styles from './styles/AddAccount.module.css';
import { BankIcon } from '../../../shared/assets';
import PropTypes from 'prop-types';

const AddAccountCard = ({ icon, text, discription, onClick }) => {
  return (
    <div onClick={onClick} className={Styles.cardContainer}>
      <div className={Styles.iconWrapper}>
        <img src={icon || BankIcon} alt="" className={Styles.icon} />
      </div>
      <div className={Styles.title}>{text}</div>
      <div className={Styles.discription}>{discription}</div>
    </div>
  );
};

export default AddAccountCard;

// PropTypes validation
AddAccountCard.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  discription: PropTypes.string,
  onClick: PropTypes.func,
};
