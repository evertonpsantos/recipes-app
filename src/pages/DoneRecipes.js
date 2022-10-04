import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readRecipe } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import allAll from '../images/allAll.svg';
import allMealCat from '../images/allMealCat.svg';
import allDrinkCat from '../images/allDrinkCat.svg';
import '../style/DoneRecipes.css';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState({});
  const [renderedItems, setRenderedItems] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [modalDisplay, setModalDisplay] = useState({ display: 'none' });

  useEffect(() => {
    readRecipe('favoriteRecipes');
    readRecipe('inProgressRecipes');
    readRecipe('doneRecipes');
  }, []);

  useEffect(() => {
    const recipes = readRecipe('doneRecipes');
    const recipesFiltered = recipes.filter((item, index, array) => index === array
      .findIndex((obj) => obj.id === item.id));
    setDoneRecipes(recipesFiltered);
  }, []);

  useEffect(() => {
    if (doneRecipes) {
      setRenderedItems(doneRecipes
        .filter(({ type }) => (filter === 'ALL' ? true : type === filter)));
    }
  }, [doneRecipes, filter]);

  const handleShareButton = (type, id) => {
    const path = `http://localhost:3000/${type}s/${id}`;
    copy(path);
    setCopyMessage({ [id]: 'Link copied!' });
    setModalDisplay({ display: 'block' });
  };

  const handleFilter = (name) => setFilter(name);

  const handleDones = (id) => {
    const recipes = readRecipe('doneRecipes');
    return recipes.filter((e) => e.id === id).length;
  };

  const closeModal = () => setModalDisplay({ display: 'none' });

  return (
    <div>
      <Header />
      <div className="done-card">
        <div className="done-btn-container">
          <button
            className="done-btn-filter flex-column button-icon"
            data-testid="filter-by-all-btn"
            name="ALL"
            onClick={ () => handleFilter('ALL') }
            type="button"
          >
            <img
              src={ allAll }
              alt="all F&B icon"
            />
            <p>All</p>
          </button>
          <button
            className="done-btn-filter flex-column button-icon"
            data-testid="filter-by-meal-btn"
            name="meal"
            onClick={ () => handleFilter('meal') }
            type="button"
          >
            <img
              src={ allMealCat }
              alt="all F&B icon"
            />
            <p>Food</p>
          </button>
          <button
            className="done-btn-filter flex-column button-icon"
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ () => handleFilter('drink') }
            type="button"
          >
            <img
              src={ allDrinkCat }
              alt="all F&B icon"
            />
            <p>Drink</p>
          </button>
        </div>

        { renderedItems.length > 0 ? renderedItems.map((el, index) => (
          <div className="done-card-container" key={ index }>
            <Link
              className="done-card-img-container"
              to={ `/${el.type}s/${el.id}` }
            >
              <img
                alt={ el.name }
                data-testid={ `${index}-horizontal-image` }
                src={ el.image }
              />
            </Link>
            <Link
              className="done-link"
              to={ `/${el.type}s/${el.id}` }
            >
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {el.name}
              </h2>
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                { el.nationality
                  ? `${el.nationality} - ${el.category}`
                  : `${el.alcoholicOrNot} - ${el.category}` }
              </h5>
            </Link>
            <p
              className="done-date"
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Done in: ${el.doneDate}` }

            </p>
            <p
              className="done-date done-times"
            >
              { `Done ${handleDones(el.id)} time(s)` }

            </p>
            <button
              className="button-icon"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareButton(el.type, el.id) }
              type="button"
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            { Object.keys(copyMessage) && (
              <div
                className="modal-container"
                style={ modalDisplay }
              >
                <div className="modal-content">
                  <p>Link copied!</p>
                  <button
                    className="modal-close button-icon"
                    type="button"
                    onClick={ closeModal }
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            <div className="done-tag-container">
              { el.tags ? el.tags.map((tag) => (
                <p
                  className="done-tag"
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                >
                  {tag.toLowerCase()}
                </p>
              )) : ''}
            </div>
          </div>
        ))
          : (
            <p style={ { color: '#797d86' } }>
              You haven&apos;t finished any recipe yet
            </p>
          )}
      </div>
    </div>
  );
}
