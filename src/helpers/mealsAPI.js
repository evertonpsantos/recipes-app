export default async function mealsAPI() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export const mealsCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const mealsFilterByCategories = async (param) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const fetchMealRecipe = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
