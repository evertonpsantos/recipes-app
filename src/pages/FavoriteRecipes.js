import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readRecipe, removeRecipeFromFavPage } from '../helpers/recipeLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [copyMessage, setCopyMessage] = useState({});
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
    setCopyMessage({ [id]: 'Link copied!' });
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
    <div>
      <Header />
      <form>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="ALL"
          onClick={ handleFilter }
        >
          ALL
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          name="meal"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </form>
      {favorites.length !== 0 && (
        favorites.map((e, index) => (
          <div key={ index }>
            <Link to={ `/${e.type}s/${e.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ e.image }
                alt={ e.name }
                style={ {
                  width: '200px',
                } }
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
            </Link>
            <h5
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${e.type === 'drink' ? e.alcoholicOrNot : e.nationality} - ${e.category}`}
            </h5>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareButton(e.type, e.id) }
              className="details-button"
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            { Object.keys(copyMessage) !== null && <p>{copyMessage[e.id]}</p>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleUnFavoriting(e.id) }
              className="favorite"
              src={ blackHeartIcon }
            >
              <img
                src={ blackHeartIcon }
                alt="share-icon"
              />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
