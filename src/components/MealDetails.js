import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Button from './Button';
import DrinkRecommendations from './DrinkRecommendations';
import { setCategoryIcon } from '../helpers/categoriesIcons';
import Loading from './Loading';

export default function MealDetails() {
  const { recipe } = useContext(RecipesContext);
  const { meals } = recipe;
  const [renderedItems, setRenderedItems] = useState([]);

  useEffect(() => {
    const data = Object.entries(meals[0])
      .filter((el) => el[1] !== '' && el[1] !== null);
    const renderIngredients = data.filter((el) => el[0].includes('strIngredient'));
    const renderMeasurement = data.filter((el) => el[0].includes('strMeasure'))
      .map((i) => i[1]);
    setRenderedItems(renderIngredients
      .map((el, i) => (renderMeasurement[i] === undefined ? el[1]
        : `${el[1]} - ${renderMeasurement[i]}`)));
  }, [meals]);

  if (meals.length === 0) return <Loading />;
  return (
    <div className="recipe-details-container">

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
        { renderedItems.map((el, index) => (
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
