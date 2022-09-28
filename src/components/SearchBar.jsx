import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/SearchBar.css';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [url, setUrl] = useState('');
  const [checkedRadioBtn1, setCheckedRadioBtn1] = useState(false);
  const [checkedRadioBtn2, setCheckedRadioBtn2] = useState(false);
  const [checkedRadioBtn3, setCheckedRadioBtn3] = useState(false);
  const [setFilteredSearch] = useContext(RecipesContext);
  const { pathname } = useLocation();

  const setMealsEndpoint = () => {
    if (checkedRadioBtn1) {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    }

    if (checkedRadioBtn2) {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    }

    if (checkedRadioBtn3 && searchInput.length === 1) {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?f=${searchInput}`);
    }
    if (checkedRadioBtn3 && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const setDrinksEndpoint = () => {
    if (checkedRadioBtn1) {
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    }

    if (checkedRadioBtn2) {
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    }

    if (checkedRadioBtn3 && searchInput.length === 1) {
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?f=${searchInput}`);
    }
    if (checkedRadioBtn3 && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const setCorrectUrl = () => {
    if (pathname === '/meals') {
      setMealsEndpoint();
    }
    if (pathname === '/drink') {
      setDrinksEndpoint();
    }
  };

  const checkRadioBtn = ({ target }) => {
    if (target.id === 'ingredient') {
      setCheckedRadioBtn1(!checkedRadioBtn1);
      setCheckedRadioBtn2(false);
      setCheckedRadioBtn3(false);
      setCorrectUrl();
    }

    if (target.id === 'recipe-name') {
      setCheckedRadioBtn1(false);
      setCheckedRadioBtn2(!checkedRadioBtn2);
      setCheckedRadioBtn3(false);
      setCorrectUrl();
    }
    if (target.id === 'first-letter') {
      setCheckedRadioBtn1(false);
      setCheckedRadioBtn2(false);
      setCheckedRadioBtn3(!checkedRadioBtn3);
      setCorrectUrl();
    }
  };

  const handleSearchClick = async () => {
    const response = await fetch(url);
    const result = await response.json();
    setFilteredSearch(result);
  };

  return (
    <div>

      <div className="radio-btn">

        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            checked={ checkedRadioBtn1 }
            onChange={ (e) => checkRadioBtn(e) }
          />
          Ingredient
        </label>

        <label htmlFor="recipe-name">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="recipe-name"
            checked={ checkedRadioBtn2 }
            onChange={ (e) => checkRadioBtn(e) }
          />
          Recipe Name
        </label>

        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            checked={ checkedRadioBtn3 }
            onChange={ (e) => checkRadioBtn(e) }
          />
          First Letter
        </label>

      </div>

      <input
        type="text"
        placeholder="Search recipe"
        data-testid="search-input"
        value={ searchInput }
        onChange={ (e) => setSearchInput(e.target.value) }
      />

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchClick() }
      >
        Search
      </button>

    </div>
  );
}
