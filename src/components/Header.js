import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon2 from '../images/profileIcon2.svg';
import searchIcon2 from '../images/searchIcon2.svg';
import mealsLogo from '../images/mealsLogo.svg';
import foodCoverLogo from '../images/foodCoverLogo.svg';
import writtenLogo from '../images/writtenLogo.svg';
import '../style/Header.css';

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
    <header className="header-container">
      <nav className="navbar-container">
        <div className="header-logo-container">
          <img src={ foodCoverLogo } alt="food cover logo" />
          <img src={ writtenLogo } alt="recipes app" className="header-written-logo" />
        </div>
        <div className="header-button-container">
          {notRenderSearchIcon.includes(pathname)
            ? '' : (
              <button
                className="header-button"
                type="button"
                onClick={ () => setShowBar(!showSearchBar) }
              >
                <img src={ searchIcon2 } alt="search-icon" data-testid="search-top-btn" />
              </button>
            )}
          { showSearchBar && <SearchBar /> }
          <button
            className="header-button"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img src={ profileIcon2 } alt="profile-icon" data-testid="profile-top-btn" />
          </button>
        </div>
      </nav>
      <h1
        className="header-title"
        data-testid="page-title"
      >
        {defineTitle(pathname)}

      </h1>
      <img src={ mealsLogo } alt="meals logo" className="header-meals-logo" />

    </header>
  );
}
