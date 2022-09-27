import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import drinksAPI from '../helpers/drinksAPI';
import DrinkRecommendations from './DrinkRecommendations';

export default function MealDetails() {
  const { recipe } = useContext(RecipesContext);

  const meal = recipe.meals[0];

  useEffect(() => { (async () => drinksAPI())(); }, []);

  if (!recipe.meals[0]) return null;
  return (
    <div>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        data-testid="recipe-photo"
        style={ { width: '200px' } }
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <table>
        <thead>
          <tr>
            {
              Object.entries(meal)
                .filter((el) => el[0].includes('strIngredient'))
                .filter((ele) => ele[1] !== '')
                .map((el, index) => (
                  <td
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {el[1]}
                  </td>
                ))
            }
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(meal)
              .filter((el) => el[0].includes('strMeasure'))
              .filter((ele) => ele[1] !== '')
              .map((el, index) => (
                <tr
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <td>{el[1]}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <iframe
        title="how to make video"
        width="560"
        height="315"
        src={ meal.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allowFullScreen
        data-testid="video"
      />

      <DrinkRecommendations />
    </div>
  );
}
