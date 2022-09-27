import React from 'react';

export default function Button() {
  return (
    <div className="recipe-button-container">
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="recipe-status-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}
