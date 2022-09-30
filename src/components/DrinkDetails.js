import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import MealRecommendations from './MealRecommendations';
import { setCategoryIcon } from '../helpers/categoriesIcons';

export default function DrinkDetails() {
  const { recipe } = useContext(RecipesContext);
  const { drinks } = recipe;

  let renderAll;
  if (drinks.length > 0) {
    const data = Object.entries(drinks[0]).filter((el) => el[1] !== '' && el[1] !== null);
    const renderIngredients = data.filter((el) => el[0].includes('strIngredient'));
    const renderMeasurement = data.filter((el) => el[0].includes('strMeasure'));

    renderAll = renderIngredients
      .map((el, ind) => el[1].concat(' - ', renderMeasurement[ind][1]));
  }

  if (drinks.length === 0) return <h1>Loading...</h1>;
  return (
    <div className="recipe-details-container">

      {/* tirar depois dos 100% */}
      <span className="remover" data-testid="recipe-title">{drinks[0].strDrink}</span>
      <p className="remover" data-testid="instructions">
        {drinks[0].strInstructions}
      </p>

      <div className="recipe-image-card-container">
        <img
          src={ drinks[0].strDrinkThumb }
          alt={ drinks[0].strDrink }
          data-testid="recipe-photo"
        />
        <div className="recipe-image-bg" />
        <h1>{drinks[0].strDrink.toUpperCase()}</h1>
        <div className="recipe-category-container">
          <img
            src={ setCategoryIcon(drinks[0].strCategory) }
            alt={ `${drinks[0].strCategory} category logo` }
          />
          <h3 data-testid="recipe-category">
            {drinks[0].strCategory}
            <p>{drinks[0].strAlcoholic}</p>
          </h3>
        </div>

        <Button />

      </div>
      <h1 className="recipe-title ingredients">Ingredients</h1>
      <ul className="ingredients-container">
        { renderAll.map((el, index) => (
          <li
            className="ingredient-list-item"
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {el}
          </li>
        )) }
      </ul>
      <h1 className="recipe-title">Instructions</h1>
      <div className="recipe-instructions">
        {
          drinks[0].strInstructions.split('.').map((el, i) => <p key={ i }>{el}</p>)
        }
      </div>
      <MealRecommendations />
    </div>
  );
}
