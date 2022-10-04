import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealRecipe } from '../helpers/mealsAPI';
import { fetchDrinkRecipe } from '../helpers/drinksAPI';
import RecipesContext from '../context/RecipesContext';
import MealProgress from '../components/MealProgress';
import DrinkProgress from '../components/DrinkProgress';
import Loading from '../components/Loading';
import '../style/RecipeInProgress.css';
import { readRecipe } from '../helpers/recipeLocalStorage';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { setRecipe } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readRecipe('favoriteRecipes');
    readRecipe('inProgressRecipes');
  }, []);

  useEffect(() => {
    (async () => setRecipe(pathname.includes('meals')
      ? await fetchMealRecipe(id)
      : await fetchDrinkRecipe(id)))();
    setLoading(false);
  }, [pathname, id, setRecipe]);

  if (loading) return <Loading />;
  return pathname.includes('meals')
    ? <MealProgress />
    : <DrinkProgress />;
}
