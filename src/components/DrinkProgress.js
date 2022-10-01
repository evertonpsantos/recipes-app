import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveProgress, readProgress } from '../helpers/recipeLocalStorage';
import Button from './Button';

export default function DrinkProgress() {
  const { id } = useParams();
  const { recipe, loading, setLoading } = useContext(RecipesContext);
  const { drinks } = recipe;

  const history = useHistory();
  const [check, setCheck] = useState([]);
  const [renderedItems, setRenderedItems] = useState([]);

  useEffect(() => {
    const checkedItems = readProgress();
    if (checkedItems) setCheck(checkedItems[id]);
  }, [id]);

  useEffect(() => {
    saveProgress({ [id]: check });
  }, [check, id]);

  useEffect(() => {
    const data = Object.entries(drinks[0])
      .filter((el) => el[1] !== '' && el[1] !== null);
    const renderIngredients = data.filter((el) => el[0].includes('strIngredient'));
    const renderMeasurement = data.filter((el) => el[0].includes('strMeasure'))
      .map((i) => i[1]);
    setRenderedItems(renderIngredients
      .map((el, i) => (renderMeasurement[i] === undefined ? el[1]
        : `${el[1]} - ${renderMeasurement[i]}`)));
    setLoading(false);
  }, [drinks]);

  const handleCheck = ({ target }) => {
    if (check.includes(target.id)) {
      setCheck(check.filter((el) => el !== target.id));
    } else {
      setCheck([...check, target.id]);
    }
  };

  useEffect(() => {
    console.log(recipe);
    console.log(drinks);
  }, [renderedItems]);

  const handleClick = () => history.push('/done-recipes');

  if (loading) return <h1>Loading...</h1>;
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
          renderedItems
            .map((el, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `drink${index}` }
              >
                <input
                  type="checkbox"
                  id={ `drink${index}` }
                  checked={ check.includes(el) }
                  onChange={ handleCheck }
                />
                {el}
              </label>
            ))
        }
      </div>
      <p data-testid="instructions">{drinks[0].strInstructions}</p>
      <Button />
      <button
        type="button"
        className="recipe-status-btn"
        disabled={ renderedItems.length !== check.length }
        onClick={ handleClick }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}
