import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveProgress, readRecipe, saveRecipe }
  from '../helpers/recipeLocalStorage';
import Button from './Button';

export default function DrinkProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { recipe } = useContext(RecipesContext);
  const { drinks } = recipe;

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
      tags = recipeNew.strTags.split(', ');
    }
    const doneDate = newDate();

    const newRecipe = {
      id: recipeNew.idDrink,
      type: 'drinks',
      category: recipeNew.strCategory,
      alcoholicOrNot: recipeNew.strAlcoholic,
      name: recipeNew.strDrink,
      image: recipeNew.strDrinkThumb,
      doneDate,
      tags,
    };
    saveRecipe('doneRecipes', newRecipe);
    history.push('/done-recipes');
  };

  let itemsToRender;
  if (drinks.length > 0) {
    itemsToRender = Object.entries(drinks[0])
      .filter((el) => el[0].includes('strIngredient'))
      .filter((el) => el[1] !== '' && el[1] !== null);
  }

  if (drinks.length === 0) return <h1>Loading...</h1>;
  return (
    <div>
      <img
        src={ drinks[0].strDrinkThumb }
        alt={ drinks[0].strDrink }
        style={ { width: '200px' } }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinks[0].strDrink }</h1>
      <h3 data-testid="recipe-category">{drinks[0].strCategory}</h3>
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
      <p data-testid="instructions">{drinks[0].strInstructions}</p>
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
