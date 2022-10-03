import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { readRecipe } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState({});

  useEffect(() => {
    const recipes = readRecipe('doneRecipes');
    setDoneRecipes(recipes);
  }, []);

  const handleShareButton = (type, id) => {
    const path = `http://localhost:3000/${type}s/${id}`;
    copy(path);
    setCopyMessage({ [id]: 'Link copied!' });
  };

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
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareButton(el.type, el.id) }
              type="button"
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            { Object.keys(copyMessage) !== null && <p>{copyMessage[el.id]}</p>}
            { el.tags ? el.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            )) : ''}
          </div>
        )) : ''}
      </div>
    </div>
  );
}
