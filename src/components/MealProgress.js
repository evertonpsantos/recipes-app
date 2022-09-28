import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function MealProgress() {
  const { recipe } = useContext(RecipesContext);

  const meal = recipe.meals[0];

  if (!recipe.meals[0]) return null;
  return (
    <div>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        style={ { width: '200px' } }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <div>
        {
          Object.entries(meal)
            .filter((el) => el[0].includes('strIngredient'))
            .filter((el) => el[1] !== '' && el[1] !== null)
            .map((el, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `${index}-ingredient` }
                />
                {el[1]}
              </label>
            ))
        }
      </div>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}
