import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { readRecipe, saveRecipe, readInProgress, saveInProgress }
  from '../helpers/recipeLocalStorage';
import { setCategoryIcon } from '../helpers/categoriesIcons';
import Button from './Button';
import Loading from './Loading';

export default function MealProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { recipe, loading, setLoading } = useContext(RecipesContext);
  const { meals } = recipe;

  const path = pathname.split('/')[1];
  const history = useHistory();
  const [check, setCheck] = useState([]);
  const [renderedItems, setRenderedItems] = useState([]);

  useEffect(() => {
    const checkedItems = readInProgress();
    readRecipe('doneRecipes');
    if (checkedItems[id] !== undefined) setCheck(checkedItems[id]);
  }, [id]);

  useEffect(() => {
    saveInProgress({ [id]: check });
  }, [check, id]);

  useEffect(() => {
    if (meals.length !== 0) {
      const data = Object.entries(meals[0])
        .filter((el) => el[1] !== '' && el[1] !== null);
      const renderIngredients = data.filter((el) => el[0].includes('strIngredient'));
      const renderMeasurement = data.filter((el) => el[0].includes('strMeasure'))
        .map((i) => i[1]);
      setRenderedItems(renderIngredients
        .map((el, i) => (renderMeasurement[i] === undefined ? el[1]
          : `${el[1]} - ${renderMeasurement[i]}`)));
      setLoading(false);
    }
  }, [meals]);

  const handleCheck = ({ target }) => {
    if (check.includes(target.id)) {
      setCheck(check.filter((el) => el !== target.id));
    } else {
      setCheck([...check, target.id]);
    }
  };

  const newDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClick = () => {
    const recipeNew = recipe[path][0];

    let tags;
    if (recipeNew.strTags) {
      tags = recipeNew.strTags.split(',');
    }
    const doneDate = newDate();

    const newRecipe = {
      id: recipeNew.idMeal,
      type: 'meal',
      nationality: recipeNew.strArea,
      category: recipeNew.strCategory,
      name: recipeNew.strMeal,
      image: recipeNew.strMealThumb,
      doneDate,
      tags,
    };
    saveRecipe('doneRecipes', newRecipe);
    history.push('/done-recipes');
  };

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
        <h1 data-testid="recipe-title">{meals[0].strMeal.toUpperCase()}</h1>
        <div className="recipe-category-container">
          <Link to={ `/meals/${meals[0].idMeal}` }>
            <img
              src={ setCategoryIcon(meals[0].strCategory) }
              alt={ `${meals[0].strCategory} category logo` }
            />
          </Link>
          <h3 data-testid="recipe-category">{meals[0].strCategory}</h3>
        </div>
        <Button />
      </div>
      <h1 className="recipe-title ingredients">Ingredients</h1>
      <div className="ingredients-container">
        {
          renderedItems
            .map((el, index) => (
              <label
                className="ingredient-checklist-item"
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `meals${index}` }
                key={ index }
              >
                <input
                  checked={ check.includes(el) }
                  className="ingredient-checkbox"
                  id={ el }
                  onChange={ handleCheck }
                  type="checkbox"
                />
                <div className="new-checkbox" />
                {el}
              </label>
            ))
        }
      </div>
      <h1 className="recipe-title">Instructions</h1>
      <div className="recipe-instructions">
        {
          meals[0].strInstructions.split('.').map((el, i) => <p key={ i }>{el}</p>)
        }
      </div>
      <button
        className="recipe-status-btn"
        data-testid="finish-recipe-btn"
        disabled={ renderedItems.length !== check.length }
        onClick={ handleClick }
        type="button"
      >
        FINISH RECIPE
      </button>
    </div>
  );
}
