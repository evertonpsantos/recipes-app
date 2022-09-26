import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealRecipe, fetchDrinkRecipe } from '../helpers/mealsAPI';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => (
    pathname.includes('meals')
      ? fetchMealRecipe(id)
      : fetchDrinkRecipe(id)
  ), [pathname, id]);

  return pathname.includes('meals')
    ? <MealDetails />
    : <DrinkDetails />;
}
