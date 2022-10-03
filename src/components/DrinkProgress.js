import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveProgress, readProgress } from '../helpers/recipeLocalStorage';
import { setCategoryIcon } from '../helpers/categoriesIcons';
import Button from './Button';
import Loading from './Loading';

export default function DrinkProgress() {
  const { id } = useParams();
  const { recipe, loading, setLoading } = useContext(RecipesContext);
  const { drinks } = recipe;

  const history = useHistory();
  const [check, setCheck] = useState([]);
  const [renderedItems, setRenderedItems] = useState([]);

  useEffect(() => {
    const checkedItems = readProgress();
    if (checkedItems[id]) setCheck(checkedItems[id]);
    else setCheck([]);
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

  const handleClick = () => history.push('/done-recipes');

  if (loading) return <Loading />;
  return (
    <div className="recipe-details-container">
      <div className="recipe-image-card-container">
        <img
          src={ drinks[0].strDrinkThumb }
          alt={ drinks[0].strDrink }
          data-testid="recipe-photo"
        />
        <div className="recipe-image-bg" />
        <h1 data-testid="recipe-title">{ drinks[0].strDrink.toUpperCase() }</h1>
        <div className="recipe-category-container">
          <img
            src={ setCategoryIcon(drinks[0].strCategory) }
            alt={ `${drinks[0].strCategory} category logo` }
          />
          <h3 data-testid="recipe-category">{drinks[0].strCategory}</h3>
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
                htmlFor={ `drink${index}` }
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
          drinks[0].strInstructions.split('.').map((el, i) => <p key={ i }>{el}</p>)
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
