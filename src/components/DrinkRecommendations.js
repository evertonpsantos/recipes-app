import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import drinksAPI from '../helpers/drinksAPI';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import settings from '../helpers/carouselSettings';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState({});

  useEffect(() => {
    (async () => setRecommendations(await drinksAPI()))();
  }, []);

  const SIX = 6;

  if (recommendations.drinks) {
    return (
      <Slider { ...settings }>
        {
          recommendations.drinks.slice(0, SIX).map((drink, i) => (
            <div
              data-testid={ `${i}-recommendation-card` }
              key={ i }
            >
              <img
                className="d-block w-100"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <div>
                <h3 data-testid={ `${i}-recommendation-title` }>{ drink.strDrink }</h3>
                <p>{ drink.strCategory }</p>
              </div>
            </div>
          ))
        }
      </Slider>
    );
  }
  return null;
}
