import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveUserEmail } from '../helpers/userLocalStorage';
import verifyEmail from '../helpers/verifyEmail';
import logo from '../images/logo.svg';
import tomatoLogin from '../images/tomatoLogin.svg';
import '../style/Login.css';

function Login() {
  const { user: { email }, setUser } = useContext(RecipesContext);
  const history = useHistory();
  const [password, setPassword] = useState('');

  const handleClick = () => {
    saveUserEmail(email);
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src={ logo } alt="app logo" className="login-logo" />
        <img src={ tomatoLogin } alt="tomato" />
      </header>
      <form className="login-form">
        <h1 className="login-title">LOGIN</h1>
        <input
          className="login-input"
          data-testid="email-input"
          onChange={ ({ target: { value } }) => setUser({ email: value }) }
          placeholder="Email"
          type="text"
          value={ email }
        />
        <input
          className="login-input"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
          placeholder="Password"
          type="password"
          value={ password }
        />
        <button
          className="login-button"
          data-testid="login-submit-btn"
          disabled={ verifyEmail(email, password) }
          onClick={ handleClick }
          type="button"
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

export default Login;
