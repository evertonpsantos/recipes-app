import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveProgress, readProgress } from '../helpers/recipeLocalStorage';

export default function DrinkProgress() {
  const { id } = useParams();
  const { recipe } = useContext(RecipesContext);
  const { drinks } = recipe;

  const [check, setCheck] = useState([]);

  useEffect(() => {
    const checkedItems = readProgress();
    if (checkedItems) setCheck(checkedItems[id]);
  }, []);

  const handleCheck = ({ target }) => {
    if (check.includes(target.id)) {
      setCheck(check.filter((el) => el !== target.id));
    } else {
      setCheck([...check, target.id]);
    }
  };

  useEffect(() => {
    saveProgress({ [id]: check });
  }, [check]);

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
      <button
        type="button"
        data-testid="share-btn"
      >
        Share

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite

      </button>
      <h3 data-testid="recipe-category">{drinks[0].strCategory}</h3>
      <div>
        {
          Object.entries(drinks[0])
            .filter((el) => el[0].includes('strIngredient'))
            .filter((el) => el[1] !== '' && el[1] !== null)
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
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish

      </button>
    </div>
  );
}
