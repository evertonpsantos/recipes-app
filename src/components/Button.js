import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import saveRecipe from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function Button() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgress] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipe } = useContext(RecipesContext);
  const { drinks, meals } = recipe;

  const mealsPath = pathname.includes('meals');

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
    const path = `http://localhost:3000${pathname}`;
    const regex = path.replace(/\/in-progress+$/g, '');
    copy(regex);
    setCopyMessage('Link copied!');
  };

  const handleFavoriting = () => {
    if (isFavorite) {
      if (mealsPath) {
        const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const filteredArray = favoriteArray
          .filter((savedRecipe) => savedRecipe.id !== meals[0].idMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
        return setIsFavorite(false);
      }

      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredArray = favoriteArray
        .filter((savedRecipe) => savedRecipe.id !== drinks[0].idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
      return setIsFavorite(false);
    }

    if (mealsPath && meals.length !== 0) {
      const { idMeal, strArea, strCategory,
        strMeal, strMealThumb, strAlcoholic } = meals[0];

      const newRecipe = {
        id: idMeal,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic || '',
        name: strMeal,
        image: strMealThumb,
      };

      saveRecipe(newRecipe);
      return setIsFavorite(true);
    }

    const { idDrink, strArea, strCategory,
      strDrink, strDrinkThumb, strAlcoholic } = drinks[0];

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
    return setIsFavorite(true);
  };

  const renderBtn = (param) => {
    if (inProgressRecipes.includes(param)) {
      return 'Continue Recipe';
    }
    return pathname.includes('in-progress') ? 'Finish Recipe' : 'Start Recipe';
  };

  const setTestId = () => {
    if (pathname.includes('in-progress')) return 'finish-recipe-btn';
    return 'start-recipe-btn';
  };

  useEffect(() => {
    if (mealsPath && meals.length !== 0) {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      return setIsFavorite(favoriteArray
        .some((savedRecipe) => savedRecipe.id === meals[0].idMeal));
    }

    const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    return setIsFavorite(favoriteArray
      .some((savedRecipe) => savedRecipe.id === drinks[0].idDrink));
  }, [recipe]);

  if (!doneRecipes) return <p>Loading...</p>;

  return (
    <div>
      { !doneRecipes.some((doneRecipe) => doneRecipe.id === id) && (
        <div className="recipe-button-container">
          <button
            type="button"
            data-testid={ setTestId() }
            className="recipe-status-btn"
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            {
              renderBtn(id)
            }
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
