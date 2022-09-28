import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinksAPI, { drinksCategories,
  drinksFilterByCategories } from '../helpers/drinksAPI';
import mealsAPI, { mealsCategories, mealsFilterByCategories } from '../helpers/mealsAPI';

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
    // if (btnFilter.filter[param]) {
    const data = checkPath() ? (await mealsAPI())
      : (await drinksAPI());
    setBtn({ filter: {} });
    return setRecipes(data[checkPath() ? 'meals' : 'drinks']);
    // }
  };

  return (
    <div>
      <form>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ async () => {
            const data = checkPath() ? (await mealsAPI())
              : (await drinksAPI());
            setRecipes(data[checkPath() ? 'meals' : 'drinks']);
          } }
        >
          ALL
        </button>
        {categories.filter((_, i) => i < MAX_CATEGORIES)
          .map(({ strCategory }, index) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ index }
              onClick={ () => handleClick(strCategory) }
            >
              {strCategory}
            </button>
          ))}
      </form>
      { filteredSearch !== null
        ? filteredSearch.filter((_, index) => index < MAX_RECIPE)
          .map((e, i) => (
            <Link
              to={ `/${checkPath() ? 'meals' : 'drinks'}/${e[checkPath() ? 'idMeal'
                : 'idDrink']}` }
              key={ i }
            >
              <div data-testid={ `${i}-recipe-card` }>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ checkPath() ? e.strMealThumb : e.strDrinkThumb }
                  alt={ checkPath() ? e.strMeal : e.strDrink }
                  style={ {
                    width: '100px',
                  } }
                />
                <span data-testid={ `${i}-card-name` }>
                  {checkPath() ? e.strMeal : e.strDrink}
                </span>
              </div>
            </Link>
          ))
        : recipes.filter((_, index) => index < MAX_RECIPE)
          .map((el, i) => (
            <Link
              to={ `/${checkPath() ? 'meals' : 'drinks'}/${el[checkPath() ? 'idMeal'
                : 'idDrink']}` }
              key={ i }
            >
              <div data-testid={ `${i}-recipe-card` }>
                <img
                  data-testid={ `${i}-card-img` }
                  src={ checkPath() ? el.strMealThumb : el.strDrinkThumb }
                  alt={ checkPath() ? el.strMeal : el.strDrink }
                  style={ {
                    width: '100px',
                  } }
                />
                <span data-testid={ `${i}-card-name` }>
                  {checkPath() ? el.strMeal : el.strDrink}
                </span>
              </div>
            </Link>
          ))}
    </div>
  );
}

export default Recipes;
