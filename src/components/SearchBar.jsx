import { useCallback, useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/SearchBar.css';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [url, setUrl] = useState('');
  const [checkedRadioBtn1, setCheckedRadioBtn1] = useState(false);
  const [checkedRadioBtn2, setCheckedRadioBtn2] = useState(false);
  const [checkedRadioBtn3, setCheckedRadioBtn3] = useState(false);
  const { setFilteredSearch } = useContext(RecipesContext);
  const { pathname } = useLocation();

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
    else if (checkedRadioBtn3 && searchInput.length > 1) {
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
    console.log(url);
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return pathname === '/meals'
      ? setFilteredSearch(result.meals)
      : setFilteredSearch(result.drinks);
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
