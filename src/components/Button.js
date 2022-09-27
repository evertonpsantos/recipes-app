import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Button() {
  const { id } = useParams();
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesStorage) {
      return setDoneRecipes(doneRecipesStorage);
    }
  }, [doneRecipes]);

  if (!doneRecipes) return <p>...</p>;

  return (
    <div>
      { !doneRecipes.some((recipe) => recipe.id === id) && (
        <div className="recipe-button-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="recipe-status-btn"
          >
            Start Recipe
          </button>
        </div>
      )}
    </div>
  );
}
