import React from 'react';
import '../style/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon2 from '../images/drinkIcon2.svg';
import mealIcon2 from '../images/mealIcon2.svg';

export default function Footer() {
  const { push } = useHistory();

  return (
    <footer className="footer-container" data-testid="footer">

      <button
        type="button"
        onClick={ () => push('/drinks') }
      >
        <img
          src={ drinkIcon2 }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ () => push('/meals') }
      >
        <img
          src={ mealIcon2 }
          alt="meal icon"
          data-testid="meals-bottom-btn"
        />
      </button>

    </footer>
  );
}
