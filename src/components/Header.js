import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon2 from '../images/profileIcon2.svg';
import searchIcon2 from '../images/searchIcon2.svg';
import writtenLogo from '../images/writtenLogo.svg';
import foodCoverLogo from '../images/foodCoverLogo.svg';
import mealsIcon from '../images/mealsIcon.svg';
import drinksIcon from '../images/drinksIcon.svg';
import favoriteLogo from '../images/favoriteIcon.svg';
import doneIcon from '../images/doneIcon.svg';
import profileHeaderIcon from '../images/profileHeaderIcon.svg';
import '../style/Header.css';

export default function Header() {
  const [showSearchBar, setShowBar] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const DONE_RECIPES = '/done-recipes';
  const FAVORITE_RECIPES = '/favorite-recipes';

  // tirar dps dos 100% ( e o header que renderiza isso )
  const defineTitle = (props) => {
    switch (props) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case DONE_RECIPES:
      return 'Done Recipes';
    case FAVORITE_RECIPES:
      return 'Favorite Recipes';
    default:
      return 'Header';
    }
  };

  const defineLogo = (props) => {
    switch (props) {
    case '/meals':
      return mealsIcon;
    case '/drinks':
      return drinksIcon;
    case '/profile':
      return profileHeaderIcon;
    case DONE_RECIPES:
      return doneIcon;
    case FAVORITE_RECIPES:
      return favoriteLogo;
    default:
      return 'Header';
    }
  };

  const notRenderSearchIcon = ['/profile', DONE_RECIPES, FAVORITE_RECIPES];

  return (
    <header className="header-container">
      <nav className="navbar-container">
        <div className="header-logo-container">
          <button
            className="header-button"
            onClick={ () => history.push('/meals') }
            type="button"
          >
            <img
              src={ foodCoverLogo }
              alt="food cover logo"
            />
          </button>
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
      <img
        src={ defineLogo(pathname) }
        alt={ `${pathname} logo` }
        className="header-component-logo"
      />

      { showSearchBar && <SearchBar /> }

    </header>
  );
}
