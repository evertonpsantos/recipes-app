import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import DrinkRecommendations from './DrinkRecommendations';
import { setCategoryIcon } from '../helpers/categoriesIcons';

export default function MealDetails() {
  const { recipe } = useContext(RecipesContext);
  const { meals } = recipe;

  let renderAll;
  if (meals.length > 0) {
    const data = Object.entries(meals[0]).filter((el) => el[1] !== '' && el[1] !== null);
    const renderIngredients = data.filter((el) => el[0].includes('strIngredient'));
    const renderMeasurement = data.filter((el) => el[0].includes('strMeasure'));

    renderAll = renderIngredients
      .map((el, ind) => el[1].concat(' - ', renderMeasurement[ind][1]));
  }

  if (meals.length === 0) return <h1>Loading...</h1>;
  return (
    <div className="recipe-details-container">
      {/* tirar depois dos 100% */}
      <span className="remover" data-testid="recipe-title">{meals[0].strMeal}</span>
      <p className="remover" data-testid="instructions">
        {meals[0].strInstructions}
      </p>

      <div className="recipe-image-card-container">
        <img
          src={ meals[0].strMealThumb }
          alt={ meals[0].strMeal }
          data-testid="recipe-photo"
        />
        <div className="recipe-image-bg" />
        <h1>{meals[0].strMeal.toUpperCase()}</h1>
        <div className="recipe-category-container">
          <img
            src={ setCategoryIcon(meals[0].strCategory) }
            alt={ `${meals[0].strCategory} category logo` }
          />
          <h3 data-testid="recipe-category">{meals[0].strCategory}</h3>
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
          meals[0].strInstructions.split('.').map((el, i) => <p key={ i }>{el}</p>)
        }

      </div>

      <iframe
        allowFullScreen
        data-testid="video"
        frameBorder="0"
        src={ meals[0]?.strYoutube.replace('watch?v=', 'embed/') }
        title="how to make video"
      />

      <DrinkRecommendations />
    </div>
  );
}
