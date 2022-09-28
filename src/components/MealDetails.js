import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import DrinkRecommendations from './DrinkRecommendations';

export default function MealDetails() {
  const { recipe } = useContext(RecipesContext);
  const { meals } = recipe;

  if (meals.length === 0) return <h1>Loading...</h1>;
  return (
    <div>
      <img
        src={ meals[0].strMealThumb }
        alt={ meals[0].strMeal }
        data-testid="recipe-photo"
        style={ { width: '200px' } }
      />
      <h1 data-testid="recipe-title">{meals[0].strMeal}</h1>
      <h3 data-testid="recipe-category">{meals[0].strCategory}</h3>
      <table>
        <thead>
          <tr>
            {
              Object.entries(meals[0])
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
            Object.entries(meals[0])
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
      <p data-testid="instructions">{meals[0].strInstructions}</p>
      <iframe
        title="how to make video"
        width="560"
        height="315"
        src={ meals[0]?.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allowFullScreen
        data-testid="video"
      />

      <DrinkRecommendations />
      <Button />
    </div>
  );
}
