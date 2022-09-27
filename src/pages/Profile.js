import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { readUserEmail } from '../helpers/userLocalStorage';

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
  return (
    <div>
      <Header />
      <div>
        <h1 data-testid="profile-email">{ readUserEmail().email }</h1>
        <button
          onClick={ redirectDoneRecipes }
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          onClick={ redirectFavoriteRecipes }
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
