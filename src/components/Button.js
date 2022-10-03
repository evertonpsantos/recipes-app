import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveRecipe, readRecipe, removeRecipe } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function Button() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgress] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
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
    const pathNa = `http://localhost:3000${pathname}`;
    const regex = pathNa.replace(/\/in-progress+$/g, '');
    copy(regex);
    setCopyMessage('Link copied!');
  };

  const handleFavoriting = () => {
    if (isFavorite) {
      removeRecipe('favoriteRecipes', recipe, path);
      return setIsFavorite(false);
    }

    if (recipe[path].length !== 0) {
      const recipeNew = recipe[path][0];
      const checkPath = path === 'meals';

      const newRecipe = {
        id: recipeNew[checkPath ? 'idMeal' : 'idDrink'],
        type: checkPath ? 'meal' : 'drink',
        nationality: !checkPath ? '' : recipeNew.strArea,
        category: recipeNew.strCategory,
        alcoholicOrNot: checkPath ? '' : recipeNew.strAlcoholic,
        name: recipeNew[checkPath ? 'strMeal' : 'strDrink'],
        image: recipeNew[checkPath ? 'strMealThumb' : 'strDrinkThumb'],
      };

      saveRecipe('favoriteRecipes', newRecipe);
      return setIsFavorite(true);
    }
  };

  useEffect(() => {
    const favoriteArray = readRecipe('favoriteRecipes') || [];
    if (recipe[path].length !== 0) {
      return setIsFavorite(favoriteArray.some((savedRecipe) => savedRecipe
        .id === recipe[path][0][path === 'meals' ? 'idMeal' : 'idDrink']));
    }
  }, [recipe, path]);

  if (!doneRecipes) return <p>Loading...</p>;

  return (
    <div>
      { !doneRecipes.some((doneRecipe) => doneRecipe.id === id) && (
        <div className="recipe-button-container">
          {
            !pathname.includes('in-progress') && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="recipe-status-btn"
                onClick={ () => history.push(`${pathname}/in-progress`) }
              >
                {
                  inProgressRecipes.includes(id) ? 'Continue Recipe' : 'Start Recipe'
                }
              </button>)
          }
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
        className="favorite"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="share-icon"
        />
      </button>
    </div>
  );
}
