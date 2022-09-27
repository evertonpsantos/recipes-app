import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import mealsAPI from '../helpers/mealsAPI';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import settings from '../helpers/carouselSettings';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    (async () => setRecommendations(await mealsAPI()))();
  }, []);

  const SIX = 6;

  if (recommendations.meals) {
    return (
      <Slider { ...settings }>
        {
          recommendations.meals.slice(0, SIX).map((meal, i) => (
            <div
              data-testid={ `${i}-recommendation-card` }
              key={ i }
            >
              <img
                className="d-block w-100"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                style={ { width: '200px' } }
              />
              <div>
                <h3 data-testid={ `${i}-recommendation-title` }>{ meal.strMeal }</h3>
                <p>{ meal.strCategory }</p>
              </div>
            </div>
          ))
        }
      </Slider>
    );
  }
  return null;
}
