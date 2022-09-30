import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readRecipe, removeRecipeFromFavPage } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import allAll from '../images/allAll.svg';
import allMealCat from '../images/allMealCat.svg';
import allDrinkCat from '../images/allDrinkCat.svg';
import '../style/FavoriteRecipes.css';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const localStorageFav = readRecipe();
    if (localStorageFav !== undefined) {
      setFavorites(localStorageFav
        .filter(({ type }) => (filter === 'ALL' ? true : type === filter)));
    }
  }, [filter]);

  const handleShareButton = (type, id) => {
    const path = `http://localhost:3000/${type}s/${id}`;
    copy(path);
    setCopyMessage('Link copied!');
  };

  const handleUnFavoriting = (id) => {
    removeRecipeFromFavPage(id);
    const newFav = readRecipe();
    setFavorites(newFav);
  };

  const handleFilter = ({ target: { name } }) => {
    setFilter(name);
  };

  return (
    <div className="favorite-page-container">
      <Header />
      <form className="category-button-container favorite-category">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="ALL"
          onClick={ handleFilter }
        >
          <div className="category-card-container">
            <img
              src={ allAll }
              alt="all F&B icon"
            />
            <p>All</p>
          </div>
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          name="meal"
          onClick={ handleFilter }
        >
          <div className="category-card-container">
            <img
              src={ allMealCat }
              alt="food icon"
            />
            <p>Food</p>
          </div>
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ handleFilter }
        >
          <div className="category-card-container">
            <img
              src={ allDrinkCat }
              alt="drink icon"
            />
            <p>Drink</p>
          </div>
        </button>
      </form>
      <div className="favorite-card-container">
        {favorites.length !== 0 && (
          favorites.map((e, index) => (
            <div className="favorite-card" key={ index }>
              <Link className="image-link" to={ `/${e.type}s/${e.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ e.image }
                  alt={ e.name }
                />
              </Link>
              <Link className="link" to={ `/${e.type}s/${e.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${e.type === 'drink'
                    ? e.alcoholicOrNot
                    : e.nationality} - ${e.category}`}
                </h5>
              </Link>
              <div className="favorite-button-container">
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShareButton(e.type, e.id) }
                  src={ shareIcon }
                >
                  <img src={ shareIcon } alt="share-icon" />
                </button>
                { copyMessage && <p>{copyMessage}</p>}
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleUnFavoriting(e.id) }
                  src={ blackHeartIcon }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="share-icon"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
