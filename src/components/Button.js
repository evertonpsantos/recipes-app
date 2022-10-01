import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import saveRecipe, { readRecipe, removeRecipe } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function Button() {
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { recipe } = useContext(RecipesContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgress] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalDisplay, setModalDisplay] = useState({ display: 'none' });

  const path = pathname.split('/')[1];

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
    setModalDisplay({ display: 'block' });
  };

  const closeModal = () => setModalDisplay({ display: 'none' });

  const handleFavoriting = () => {
    if (isFavorite) {
      removeRecipe(recipe, path);
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

      saveRecipe(newRecipe);
      return setIsFavorite(true);
    }
  };

  useEffect(() => {
    const favoriteArray = readRecipe() || [];
    if (recipe[path].length !== 0) {
      return setIsFavorite(favoriteArray
        .some((savedRecipe) => savedRecipe
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
                  inProgressRecipes.includes(id) ? 'CONTINUE RECIPE' : 'START RECIPE'
                }
              </button>)
          }
        </div>
      )}

      <div className="recipe-details-button-container">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShareButton }
          className="button-icon"
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        { copyMessage && (
          <div
            className="modal-container"
            style={ modalDisplay }
          >
            <div className="modal-content">
              <button
                className="modal-close button-icon"
                type="button"
                onClick={ closeModal }
              >
                &times;
              </button>
              <p>{copyMessage}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavoriting }
          className="button-icon"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="share-icon"
          />
        </button>
      </div>
    </div>
  );
}
