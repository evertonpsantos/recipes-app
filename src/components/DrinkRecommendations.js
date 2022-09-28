import React, { useState, useEffect } from 'react';
import drinksAPI from '../helpers/drinksAPI';
// import settings from '../helpers/carouselSettings';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    (async () => setRecommendations(await drinksAPI()))();
  }, []);

  const SIX = 6;

  if (recommendations.drinks) {
    return (
      <div
        style={ {
          display: 'flex',
          overflowX: 'scroll',
        } }
      >
        {
          recommendations.drinks.slice(0, SIX).map((drink, i) => (
            <div
              data-testid={ `${i}-recommendation-card` }
              key={ i }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                style={ {
                  width: '200px',
                } }
              />
              <div>
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
