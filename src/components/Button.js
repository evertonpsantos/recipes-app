import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function Button() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgress] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');

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

  const handleClick = () => {
    history.push(`${pathname}/in-progress`);
  };

  const handleShareButton = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopyMessage('Link copied!');
  };

  if (!doneRecipes) return <p>...</p>;

  return (
    <div>
      { !doneRecipes.some((recipe) => recipe.id === id) && (
        <div className="recipe-button-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="recipe-status-btn"
            onClick={ handleClick }
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

      <button type="button" data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}
