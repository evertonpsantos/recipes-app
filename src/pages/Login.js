import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveUserEmail } from '../helpers/userLocalStorage';
import verifyEmail from '../helpers/verifyEmail';

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
    <form>
      <input
        data-testid="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => setUser({ email: value }) }
      />
      <input
        data-testid="password-input"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ verifyEmail(email, password) }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
