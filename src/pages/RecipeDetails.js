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

  const path = pathname.split('/')[1];

  useEffect(() => {
    let loading = true;
    if (loading) {
      (async () => {
        setRecipe(path === 'meals' ? ({ ...await fetchMealRecipe(id), drinks: [] })
          : ({ ...await fetchDrinkRecipe(id), meals: [] }));
        loading = false;
      })();
    }
  }, [id, path, setRecipe]);

  if (recipe[path].length === 0) return <h1>Loading...</h1>;
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
