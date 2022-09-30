const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';

export const readRecipe = () => {
  if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES))) {
    return localStorage.setItem(FAVORITE_RECIPES, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
};

const saveRecipe = (newRecipe) => {
  const arrayStorage = readRecipe();
  const newArray = [...arrayStorage, newRecipe];
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newArray));
};

export const removeRecipe = (recipe, path) => {
  const id = recipe[path][0][path === 'meals' ? 'idMeal' : 'idDrink'];
  const localStorageRecipes = readRecipe();
  const filteredArray = localStorageRecipes.filter((e) => e.id !== id);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(filteredArray));
};

export const removeRecipeFromFavPage = (id) => {
  const localStorageRecipes = readRecipe();
  const filteredArray = localStorageRecipes.filter((e) => e.id !== id);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(filteredArray));
};

export const readProgress = () => (
  JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))
    ? JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))
    : localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify([]))
);

export const saveProgress = (recipe) => localStorage
  .setItem(IN_PROGRESS_RECIPES, JSON.stringify(recipe));

export default saveRecipe;
