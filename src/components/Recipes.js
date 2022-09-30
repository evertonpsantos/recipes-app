import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinksAPI, { drinksCategories,
  drinksFilterByCategories } from '../helpers/drinksAPI';
import mealsAPI, { mealsCategories, mealsFilterByCategories } from '../helpers/mealsAPI';
import { allDrinkCat, allMealCat, setCategoryIcon } from '../helpers/categoriesIcons';

import '../style/Recipes.css';

function Recipes() {
  const MAX_RECIPE = 12;
  const MAX_CATEGORIES = 5;
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { filteredSearch } = useContext(RecipesContext);
  const [btnFilter, setBtn] = useState({
    filter: {},
  });

  useEffect(() => {
    (async () => {
      if (pathname === '/meals') {
        const data = await mealsAPI();
        const mealsCat = await mealsCategories();
        setCategories(mealsCat.meals);
        return setRecipes(data.meals);
      }
      const data = await drinksAPI();
      const drinksCat = await drinksCategories();
      setCategories(drinksCat.drinks);
      return setRecipes(data.drinks);
    })();
  }, [pathname]);

  const checkPath = () => {
    if (pathname === '/meals') return true;
  };

  const handleClick = async (param) => {
    if (!btnFilter.filter[param]) {
      const data = checkPath() ? (await mealsFilterByCategories(param))
        : (await drinksFilterByCategories(param));
      setBtn({ filter: { [param]: true } });
      return setRecipes(data[checkPath() ? 'meals' : 'drinks']);
    }
    const data = checkPath() ? (await mealsAPI())
      : (await drinksAPI());
    setBtn({ filter: {} });
    return setRecipes(data[checkPath() ? 'meals' : 'drinks']);
  };

  if (recipes.length === 0) return <h1>Loading...</h1>;
  return (
    <div className="recipes-container">
      <form className="category-button-container">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ async () => {
            const data = checkPath() ? (await mealsAPI())
              : (await drinksAPI());
            setRecipes(data[checkPath() ? 'meals' : 'drinks']);
          } }
        >
          <div className="category-card-container">
            <img
              src={ pathname === '/meals' ? allMealCat : allDrinkCat }
              alt="all category"
            />
            <p>All</p>
          </div>
        </button>
        {categories.filter((_, i) => i < MAX_CATEGORIES)
          .map(({ strCategory }, index) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ index }
              onClick={ () => handleClick(strCategory) }
            >
              <div className="category-card-container">
                <img
                  src={ setCategoryIcon(strCategory) }
                  alt={ `${strCategory} logo` }
                />
                <p>{strCategory === 'Other/Unknown' ? 'Other/ Unknown' : strCategory}</p>
              </div>
            </button>
          ))}
      </form>

      <div className="recipe-card-container">
        { filteredSearch !== null && filteredSearch.length !== 0
          ? filteredSearch.filter((_, index) => index < MAX_RECIPE)
            .map((e, i) => (
              <Link
                className="recipe-card"
                data-testid={ `${i}-recipe-card` }
                key={ i }
                to={ `/${checkPath() ? 'meals' : 'drinks'}/${e[checkPath() ? 'idMeal'
                  : 'idDrink']}` }
              >
                <img
                  data-testid={ `${i}-card-img` }
                  src={ checkPath() ? e.strMealThumb : e.strDrinkThumb }
                  alt={ checkPath() ? e.strMeal : e.strDrink }
                />
                <span data-testid={ `${i}-card-name` }>
                  {checkPath() ? e.strMeal : e.strDrink}
                </span>
              </Link>
            ))
          : recipes.filter((_, index) => index < MAX_RECIPE)
            .map((el, i) => (
              <Link
                className="recipe-card"
                data-testid={ `${i}-recipe-card` }
                key={ i }
                to={ `/${checkPath() ? 'meals' : 'drinks'}/${el[checkPath() ? 'idMeal'
                  : 'idDrink']}` }
              >
                <img
                  data-testid={ `${i}-card-img` }
                  src={ checkPath() ? el.strMealThumb : el.strDrinkThumb }
                  alt={ checkPath() ? el.strMeal : el.strDrink }
                />
                <span data-testid={ `${i}-card-name` }>
                  {checkPath() ? el.strMeal : el.strDrink}
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Recipes;
