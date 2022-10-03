import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import MealRecommendations from './MealRecommendations';

export default function DrinkDetails() {
  const { recipe } = useContext(RecipesContext);
  const { drinks } = recipe;

  // if (drinks.length === 0) return <h1>Loading...</h1>;
  return (
    <div>
      <img
        src={ drinks[0].strDrinkThumb }
        alt={ drinks[0].strDrink }
        data-testid="recipe-photo"
        style={ { width: '200px' } }
      />
      <h1 data-testid="recipe-title">{drinks[0].strDrink}</h1>
      <h3 data-testid="recipe-category">
        {drinks[0].strCategory}
        {' '}
        <span>{drinks[0].strAlcoholic}</span>
      </h3>
      <table>
        <thead>
          <tr>
            {
              Object.entries(drinks[0])
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
            Object.entries(drinks[0])
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
      <p data-testid="instructions">{drinks[0].strInstructions}</p>

      <MealRecommendations />
      <Button />
    </div>
  );
}
