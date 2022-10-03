import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealRecipe } from '../helpers/mealsAPI';
import { fetchDrinkRecipe } from '../helpers/drinksAPI';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import '../style/RecipeDetails.css';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { recipe, setRecipe } = useContext(RecipesContext);

  const path = pathname.split('/')[1];

  useEffect(() => {
    (async () => {
      setRecipe(path === 'meals' ? ({ ...await fetchMealRecipe(id), drinks: [] })
        : ({ ...await fetchDrinkRecipe(id), meals: [] }));
    })();
  }, [id, path, setRecipe]);

  if (recipe[path] === undefined || recipe[path].length === 0) return <Loading />;
  if (path === 'meals') {
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
