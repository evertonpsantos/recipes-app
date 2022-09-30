import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { readUserEmail } from '../helpers/userLocalStorage';
import favIcon from '../images/favIcon.svg';
import doneIc from '../images/doneIc.svg';
import logoutIcon from '../images/logoutIcon.svg';
import '../style/Profile.css';

export default function Profile() {
  const history = useHistory();

  const redirectDoneRecipes = () => (
    history.push('/done-recipes')
  );

  const redirectFavoriteRecipes = () => (
    history.push('/favorite-recipes')
  );

  const logout = () => {
    history.push('/');
    localStorage.clear();
  };

  const getEmail = readUserEmail() && readUserEmail().email;
  return (
    <div>
      <Header />
      <div className="profile-container">
        <h1 data-testid="profile-email">{ getEmail }</h1>
        <div className="profile-button-container">
          <button
            onClick={ redirectDoneRecipes }
            type="button"
            data-testid="profile-done-btn"
          >
            <img src={ doneIc } alt="done icon" />
            <p>Done Recipes</p>
          </button>
          <div className="profile-line" />
          <button
            onClick={ redirectFavoriteRecipes }
            type="button"
            data-testid="profile-favorite-btn"
          >
            <img src={ favIcon } alt="favorite icon" />
            <p>Favorite Recipes</p>
          </button>
          <div className="profile-line" />
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            <img src={ logoutIcon } alt="logout icon" />
            <p>Logout</p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
