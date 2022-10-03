import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { readRecipe } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const recipes = readRecipe('doneRecipes');
    setDoneRecipes(recipes);
  }, []);

  return (
    <div>
      <Header />
      <div className="done-recipes-container">
        <div className="done-btn-container">
          <button
            data-testid="filter-by-all-btn"
            type="button"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
          >
            Drinks
          </button>
        </div>

        { doneRecipes ? doneRecipes.map((el, index) => (
          <div className="done-img-card-container" key={ index }>

            <img
              data-testid={ `${index}-horizontal-image` }
              src={ el.image }
              alt={ el.name }
            />
            <h2 data-testid={ `${index}-horizontal-name` }>{el.name}</h2>
            <h5
              data-testid={ `${index}-horizontal-top-text` }
            >
              { el.nationality
                ? `${el.nationality} - ${el.category}`
                : `${el.alcoholicOrNot} - ${el.category}` }
            </h5>
            <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            { el.tags ? el.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            )) : ''}
          </div>
        )) : ''}
      </div>
    </div>
  );
}
