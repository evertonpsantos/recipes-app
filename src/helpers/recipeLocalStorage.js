const IN_PROGRESS_RECIPES = 'inProgressRecipes';

export const readRecipe = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    return localStorage.setItem(key, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(key));
};

export const saveRecipe = (key, newRecipe) => {
  const arrayStorage = readRecipe(key);
  const newArray = [...arrayStorage, newRecipe];
  localStorage.setItem(key, JSON.stringify(newArray));
};

export const removeRecipe = (key, recipe, path) => {
  const id = recipe[path][0][path === 'meals' ? 'idMeal' : 'idDrink'];
  const localStorageRecipes = readRecipe(key);
  const filteredArray = localStorageRecipes.filter((e) => e.id !== id);
  localStorage.setItem(key, JSON.stringify(filteredArray));
};

export const removeRecipeFromFavPage = (key, id) => {
  const localStorageRecipes = readRecipe(key);
  const filteredArray = localStorageRecipes.filter((e) => e.id !== id);
  localStorage.setItem(key, JSON.stringify(filteredArray));
};

export const saveProgress = (recipe) => localStorage
  .setItem(IN_PROGRESS_RECIPES, JSON.stringify(recipe));
