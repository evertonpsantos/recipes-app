import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [showSearchBar, setShowBar] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const defineTitle = (props) => {
    switch (props) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'Header';
    }
  };

  const notRenderSearchIcon = ['/profile', '/done-recipes', '/favorite-recipes'];

  return (
    <>
      <h1 data-testid="page-title">{defineTitle(pathname)}</h1>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      </button>

      {notRenderSearchIcon.includes(pathname)
        ? '' : (
          <button
            type="button"
            onClick={ () => setShowBar(!showSearchBar) }
          >
            <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
          </button>
        )}

      { showSearchBar && <SearchBar /> }
    </>
  );
}
