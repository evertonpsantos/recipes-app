import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readRecipe } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState({});
  const [renderedItems, setRenderedItems] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const recipes = readRecipe('doneRecipes');
    setDoneRecipes(recipes);
  }, []);

  useEffect(() => {
    setRenderedItems(doneRecipes
      .filter(({ type }) => (filter === 'All' ? true : type === filter)));
  }, [doneRecipes, filter]);

  const handleShareButton = (type, id) => {
    const path = `http://localhost:3000/${type}s/${id}`;
    copy(path);
    setCopyMessage({ [id]: 'Link copied!' });
  };

  const handleFilter = ({ target: { name } }) => {
    setFilter(name);
  };

  return (
    <div>
      <Header />
      <div className="done-recipes-container">
        <div className="done-btn-container">
          <button
            data-testid="filter-by-all-btn"
            name="All"
            onClick={ handleFilter }
            type="button"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            name="meal"
            onClick={ handleFilter }
            type="button"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ handleFilter }
            type="button"
          >
            Drinks
          </button>
        </div>

        { renderedItems ? renderedItems.map((el, index) => (
          <div className="done-img-card-container" key={ index }>
            <Link to={ `/${el.type}s/${el.id}` }>
              <img
                alt={ el.name }
                data-testid={ `${index}-horizontal-image` }
                src={ el.image }
                style={ {
                  width: '200px',
                } }
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{el.name}</h2>
            </Link>
            <h5
              data-testid={ `${index}-horizontal-top-text` }
            >
              { el.nationality
                ? `${el.nationality} - ${el.category}`
                : `${el.alcoholicOrNot} - ${el.category}` }
            </h5>
            <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareButton(el.type, el.id) }
              type="button"
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            { Object.keys(copyMessage) !== null && <p>{copyMessage[el.id]}</p>}
            { el.tags ? el.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            )) : ''}
          </div>
        )) : ''}
      </div>
    </div>
  );
}
