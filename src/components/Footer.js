import React from 'react';
import '../style/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const { push } = useHistory();

  return (
    <footer data-testid="footer">

      <button
        type="button"
        onClick={ () => push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ () => push('/meals') }
      >
        <img
          src={ mealIcon }
          alt="meal icon"
          data-testid="meals-bottom-btn"
        />
      </button>

    </footer>
  );
}
