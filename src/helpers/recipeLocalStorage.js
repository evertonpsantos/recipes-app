const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';

const saveRecipe = (newRecipe) => {
  const arrayStorage = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  if (!arrayStorage) {
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify([]));
    const oldArray = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
    const newArray = oldArray.concat(newRecipe);

    return localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newArray));
  }
  const newArray = arrayStorage.concat(newRecipe);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newArray));
};

export const readProgress = () => (
  JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))
    ? JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))
    : localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify([]))
);

export const saveProgress = (recipe) => localStorage
  .setItem(IN_PROGRESS_RECIPES, JSON.stringify(recipe));

export default saveRecipe;
