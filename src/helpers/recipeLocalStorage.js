const saveRecipe = (newRecipe) => {
  const arrayStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!arrayStorage) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = oldArray.concat(newRecipe);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  }
  const newArray = arrayStorage.concat(newRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
};

export default saveRecipe;
