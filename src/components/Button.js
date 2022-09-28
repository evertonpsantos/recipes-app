import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import saveRecipe from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function Button() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgress] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const { recipe } = useContext(RecipesContext);

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipesStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));

    if (doneRecipesStorage) {
      setDoneRecipes(doneRecipesStorage);
    }

    if (inProgressRecipesStorage) {
      const recipesInProgress = [
        ...Object.keys(inProgressRecipesStorage.drinks || {}),
        ...Object.keys(inProgressRecipesStorage.meals || {}),
      ];
      setInProgress(recipesInProgress);
    }
  }, [id]);

  const handleShareButton = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopyMessage('Link copied!');
  };

  const handleFavoriting = () => {
    if ('meals' in recipe) {
      const { idMeal, strArea, strCategory,
        strMeal, strMealThumb, strAlcoholic } = recipe.meals[0];

      const newRecipe = {
        id: idMeal,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic || '',
        name: strMeal,
        image: strMealThumb,
      };

      return saveRecipe(newRecipe);
    }

    const { idDrink, strArea, strCategory,
      strDrink, strDrinkThumb, strAlcoholic } = recipe.drinks[0];

    const newRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    saveRecipe(newRecipe);
  };

  if (!doneRecipes) return <p>...</p>;

  return (
    <div>
      { !doneRecipes.some((doneRecipe) => doneRecipe.id === id) && (
        <div className="recipe-button-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="recipe-status-btn"
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            { inProgressRecipes.includes(id) ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </div>
      )}

      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButton }
        className="details-button"
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { copyMessage && <p>{copyMessage}</p>}

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriting }
        className="details-button favorite"
      >
        Favoritar
      </button>
    </div>
  );
}
