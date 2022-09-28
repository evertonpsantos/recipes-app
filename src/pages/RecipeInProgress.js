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
    (async () => (
      pathname.includes('meals')
        ? setRecipe(await fetchMealRecipe(id))
        : setRecipe(await fetchDrinkRecipe(id))
    ))();
  }, [pathname, id]);

  return pathname.includes('meals')
    ? <MealProgress />
    : <DrinkProgress />;
}
