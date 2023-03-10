import { useCallback, useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/SearchBar.css';

export default function SearchBar() {
  const noRecipesFoundPartial = 'Sorry, we haven';
  const noRecipesFoundAlert = `${
    noRecipesFoundPartial}'t found any recipes for these filters.`;
  const [url, setUrl] = useState('');
  const [checkedRadioBtn1, setCheckedRadioBtn1] = useState(false);
  const [checkedRadioBtn2, setCheckedRadioBtn2] = useState(false);
  const [checkedRadioBtn3, setCheckedRadioBtn3] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const {
    setFilteredSearch,
    searchInput,
    setSearchInput,
  } = useContext(RecipesContext);

  const mealsPath = useCallback(() => {
    if (checkedRadioBtn1) setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    else if (checkedRadioBtn2) setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    else if (checkedRadioBtn3 && searchInput.length === 1) setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    else if (checkedRadioBtn3 && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [checkedRadioBtn1, checkedRadioBtn2, checkedRadioBtn3, searchInput]);

  const drinksPath = useCallback(() => {
    if (checkedRadioBtn1) setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    else if (checkedRadioBtn2) setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    else if (checkedRadioBtn3 && searchInput.length === 1) setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    else if (checkedRadioBtn3 && (searchInput.length > 1 || searchInput.length < 1)) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [checkedRadioBtn1, checkedRadioBtn2, checkedRadioBtn3, searchInput]);

  useEffect(
    () => (
      pathname === '/meals' ? mealsPath() : drinksPath()
    ),
    [pathname, mealsPath, drinksPath],
  );

  const checkRadioBtn = ({ target }) => {
    if (target.id === 'ingredient') {
      setCheckedRadioBtn1(!checkedRadioBtn1);
      setCheckedRadioBtn2(false);
      setCheckedRadioBtn3(false);
    }

    if (target.id === 'recipe-name') {
      setCheckedRadioBtn1(false);
      setCheckedRadioBtn2(!checkedRadioBtn2);
      setCheckedRadioBtn3(false);
    }
    if (target.id === 'first-letter') {
      setCheckedRadioBtn1(false);
      setCheckedRadioBtn2(false);
      setCheckedRadioBtn3(!checkedRadioBtn3);
    }
  };

  const handleSearchClick = async () => {
    const response = await fetch(url);
    const result = await response.json();
    const path = pathname.split('/')[1];

    if (result[path] !== null && result[path].length === 1) {
      history.push(`/${path}/${result[path][0][path === 'meals' ? 'idMeal'
        : 'idDrink']}`);
      return setFilteredSearch([]);
    }

    if (result[path] === null) {
      global.alert(noRecipesFoundAlert);
      console.log('ola');
    }

    return setFilteredSearch(result[path]);
  };

  return (
    <div className="search-container">

      <input
        className="search-input"
        data-testid="search-input"
        onChange={ (e) => setSearchInput(e.target.value) }
        placeholder="Search"
        type="text"
        value={ searchInput }
      />
      <div className="search-radio-button-container">

        <div className="search-radio-container">

          <label htmlFor="ingredient">
            <input
              checked={ checkedRadioBtn1 }
              data-testid="ingredient-search-radio"
              id="ingredient"
              onChange={ (e) => checkRadioBtn(e) }
              type="radio"
            />
            Ingredient
          </label>

          <label htmlFor="recipe-name">
            <input
              checked={ checkedRadioBtn2 }
              data-testid="name-search-radio"
              id="recipe-name"
              onChange={ (e) => checkRadioBtn(e) }
              type="radio"
            />
            Name
          </label>

          <label htmlFor="first-letter">
            <input
              checked={ checkedRadioBtn3 }
              data-testid="first-letter-search-radio"
              id="first-letter"
              onChange={ (e) => checkRadioBtn(e) }
              type="radio"
            />
            First Letter
          </label>

        </div>

        <button
          className="search-button"
          data-testid="exec-search-btn"
          onClick={ () => handleSearchClick() }
          type="submit"
        >
          SEARCH
        </button>
      </div>

    </div>
  );
}
