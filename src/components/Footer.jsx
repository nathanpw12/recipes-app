import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

const Footer = () => {
  const history = useHistory();

  const redirectHistory = (param) => {
    history.push(param);
  };

  return (
    <div data-testid="footer" className={ styles.container }>
      <button
        className={ `${styles.button__footer} ${styles.button__hover__footer}` }
        type="button"
        onClick={
          () => redirectHistory('/drinks')
        }
      >
        <img
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        className={ `${styles.button__footer} ${styles.button__hover__footer}` }
        data-testid="meals-bottom-btn"
        type="button"
        onClick={
          () => redirectHistory('/foods')
        }
      >
        <img src={ mealIcon } alt="meal-icon" data-testid="food-bottom-btn" />
      </button>
    </div>
  );
};

export default Footer;
