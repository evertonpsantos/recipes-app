import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const { pathname } = useLocation();

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
      <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      {notRenderSearchIcon.includes(pathname)
        ? '' : <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />}
    </>
  );
}
