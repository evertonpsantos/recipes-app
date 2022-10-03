import React, { useState, useEffect } from 'react';
import mealsAPI from '../helpers/mealsAPI';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    (async () => setRecommendations(await mealsAPI()))();
  }, []);

  const SIX = 6;

  if (recommendations.meals) {
    return (
      <div className="scroller">
        {
          recommendations.meals.slice(0, SIX).map((meal, i) => (
            <div
              className="item"
              data-testid={ `${i}-recommendation-card` }
              key={ i }
            >
              <div className="image">
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <h3 data-testid={ `${i}-recommendation-title` }>{ meal.strMeal }</h3>
                <p>{ meal.strCategory }</p>
              </div>
            </div>
          ))
        }
      </div>
      // </Slider>
    );
  }
  return null;
}
