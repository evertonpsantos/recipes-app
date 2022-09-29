import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealRecipe } from '../helpers/mealsAPI';
import { fetchDrinkRecipe } from '../helpers/drinksAPI';
import RecipesContext from '../context/RecipesContext';
import MealProgress from '../components/MealProgress';
import DrinkProgress from '../components/DrinkProgress';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { setRecipe } = useContext(RecipesContext);

  useEffect(() => {
    let fetching = true;
    if (fetching) {
      (async () => setRecipe(pathname.includes('meals') ? await fetchMealRecipe(id)
        : await fetchDrinkRecipe(id)))();
      fetching = false;
    }
  }, [pathname, id, setRecipe]);

  return pathname.includes('meals')
    ? <MealProgress />
    : <DrinkProgress />;
}
