import React, { useContext, useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => setRecipe(pathname.includes('meals') ? await fetchMealRecipe(id)
      : await fetchDrinkRecipe(id)))();
    setLoading(false);
  }, [pathname, id, setRecipe]);

  if (loading) return <h1>Loading...</h1>;
  return pathname.includes('meals')
    ? <MealProgress />
    : <DrinkProgress />;
}
