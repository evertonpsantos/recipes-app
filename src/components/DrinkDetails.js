import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import MealRecommendations from './MealRecommendations';

export default function DrinkDetails() {
  const { recipe } = useContext(RecipesContext);

  const drink = recipe.drinks[0];

  if (!recipe.drinks[0]) return null;
  return (
    <div>
      <img
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid="recipe-photo"
        style={ { width: '200px' } }
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <h3 data-testid="recipe-category">
        {drink.strCategory}
        {' '}
        <span>{drink.strAlcoholic}</span>
      </h3>
      <table>
        <thead>
          <tr>
            {
              Object.entries(drink)
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
            Object.entries(drink)
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
      <p data-testid="instructions">{drink.strInstructions}</p>

      <MealRecommendations />
      <Button />
    </div>
  );
}
