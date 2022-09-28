export default async function drinksAPI() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export const drinksCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const drinksFilterByCategories = async (param) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchDrinkRecipe = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
