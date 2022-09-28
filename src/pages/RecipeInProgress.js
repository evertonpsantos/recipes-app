import React from 'react';

export default function RecipeInProgress() {
  return (
    <div>
      <img src="" alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">Título da receita</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h3 data-testid="recipe-category">Categoria</h3>
      <p data-testid="instructions">Instruções</p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}
