import React, { useState, useEffect } from 'react';
import drinksAPI from '../helpers/drinksAPI';
import '../style/Recommendations.css';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    (async () => setRecommendations(await drinksAPI()))();
  }, []);

  const SIX = 6;

  if (recommendations.drinks) {
    return (
      <div className="scroller">
        {
          recommendations.drinks.slice(0, SIX).map((drink, i) => (
            <div
              className="item"
              data-testid={ `${i}-recommendation-card` }
              key={ i }
            >
              <div className="image">
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <h3 data-testid={ `${i}-recommendation-title` }>{ drink.strDrink }</h3>
                <p>{ drink.strCategory }</p>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
  return null;
}
