import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealRecipe } from '../helpers/mealsAPI';
import { fetchDrinkRecipe } from '../helpers/drinksAPI';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipeDetails.css';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { recipe, setRecipe } = useContext(RecipesContext);

  useEffect(() => {
    (async () => (
      pathname.includes('meals')
        ? setRecipe(await fetchMealRecipe(id))
        : setRecipe(await fetchDrinkRecipe(id))
    ))();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  if (recipe) {
    if (pathname.includes('meals')) {
      return (
        <div>
          <MealDetails />
        </div>
      );
    }

    return (
      <div>
        <DrinkDetails />
      </div>
    );
  }
}
