import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function MealProgress() {
  const { recipe } = useContext(RecipesContext);
  const { meals } = recipe;

  if (meals.length === 0) return <h1>Loading...</h1>;
  return (
    <div>
      <img
        src={ meals[0].strMealThumb }
        alt={ meals[0].strMeal }
        style={ { width: '200px' } }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{meals[0].strMeal}</h1>
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
      <h3 data-testid="recipe-category">{meals[0].strCategory}</h3>
      <div>
        {
          Object.entries(meals[0])
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
      <p data-testid="instructions">{meals[0].strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}
