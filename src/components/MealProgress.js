import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveProgress, readRecipe, saveRecipe }
  from '../helpers/recipeLocalStorage';
import Button from './Button';

export default function MealProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { recipe } = useContext(RecipesContext);
  const { meals } = recipe;

  const path = pathname.split('/')[1];
  const history = useHistory();
  const [check, setCheck] = useState([]);

  useEffect(() => {
    const checkedItems = readRecipe('inProgressRecipes');
    readRecipe('doneRecipes');
    if (checkedItems) setCheck(checkedItems[id]);
  }, [id]);

  useEffect(() => {
    saveProgress({ [id]: check });
  }, [check, id]);

  const handleCheck = ({ target }) => {
    if (check.includes(target.id)) {
      setCheck(check.filter((el) => el !== target.id));
    } else {
      setCheck([...check, target.id]);
    }
  };

  const handleClick = () => {
    const recipeNew = recipe[path][0];
    const mealPath = path === 'meals';
    const dateCompleted = new Date().toDateString();
    const tags = recipeNew.strTags.split(', ');

    const newRecipe = {
      id: recipeNew[mealPath ? 'idMeal' : 'idDrink'],
      type: mealPath ? 'meal' : 'drink',
      nationality: !mealPath ? '' : recipeNew.strArea,
      category: recipeNew.strCategory,
      alcoholicOrNot: mealPath ? '' : recipeNew.strAlcoholic,
      name: recipeNew[mealPath ? 'strMeal' : 'strDrink'],
      image: recipeNew[mealPath ? 'strMealThumb' : 'strDrinkThumb'],
      dateCompleted,
      tags,
    };
    saveRecipe('doneRecipes', newRecipe);
    history.push('/done-recipes');
  };

  let itemsToRender;
  if (meals.length > 0) {
    itemsToRender = Object.entries(meals[0])
      .filter((el) => el[0].includes('strIngredient'))
      .filter((el) => el[1] !== '' && el[1] !== null);
  }

  if (meals.length === 0) return <h1>Loading...</h1>;
  return (
    <div>
      <img
        src={ meals[0].strMealThumb }
        alt={ meals[0].strMeal }
        style={ { width: '200px' } }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{meals[0].strMeal}</h1>
      <h3 data-testid="recipe-category">{meals[0].strCategory}</h3>
      <div>
        {
          itemsToRender
            .map((el, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ el[1] }
              >
                <input
                  type="checkbox"
                  id={ el[1] }
                  checked={ check.includes(el[1]) }
                  onChange={ handleCheck }
                />
                {el[1]}
              </label>
            ))
        }
      </div>
      <p data-testid="instructions">{meals[0].strInstructions}</p>
      <Button />
      <button
        type="button"
        className="recipe-status-btn"
        disabled={ itemsToRender.length !== check.length }
        onClick={ handleClick }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}
