const IN_PROGRESS_RECIPES = 'inProgressRecipes';

export const readRecipe = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    return localStorage.setItem(key, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(key));
};

export const readInProgress = () => {
  if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))) {
    return localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify({}));
  }
  return JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
};

export const saveRecipe = (key, newRecipe) => {
  const arrayStorage = readRecipe(key);
  const newArray = [...arrayStorage, newRecipe];
  localStorage.setItem(key, JSON.stringify(newArray));
};

export const saveInProgress = (inProgress) => {
  const arrayStorage = readInProgress();
  const newObject = {
    ...arrayStorage,
    ...inProgress,
  };
  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(newObject));
};

export const removeRecipeFromInProgress = (id) => {
  const arrayStorage = readInProgress();
  const newObject = Object.fromEntries(Object
    .entries(arrayStorage).filter((e) => e[0] !== id));
  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(newObject));
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
