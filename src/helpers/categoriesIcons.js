import allAll from '../images/allAll.svg';
import allDrinkCat from '../images/allDrinkCat.svg';
import allMealCat from '../images/allMealCat.svg';
import beefCat from '../images/beefCat.svg';
import breakfastCat from '../images/breakfastCat.svg';
import chickenCat from '../images/chickenCat.svg';
import cocktailCat from '../images/cocktailCat.svg';
import cocoaCat from '../images/cocoaCat.svg';
import dessertCat from '../images/dessertCat.svg';
import lambCat from '../images/lambCat.svg';
import ordinaryCat from '../images/ordinaryCat.svg';
import otherDrinkCat from '../images/otherDrinkCat.svg';
import shakeCat from '../images/shakeCat.svg';

export { allDrinkCat, allMealCat };

export const setCategoryIcon = (cat) => {
  switch (cat) {
  case 'Ordinary Drink':
    return ordinaryCat;
  case 'Cocktail':
    return cocktailCat;
  case 'Shake':
    return shakeCat;
  case 'Other/Unknown':
    return otherDrinkCat;
  case 'Cocoa':
    return cocoaCat;
  case 'Beef':
    return beefCat;
  case 'Breakfast':
    return breakfastCat;
  case 'Chicken':
    return chickenCat;
  case 'Dessert':
    return dessertCat;
  case 'Goat':
    return lambCat;
  default:
    return allAll;
  }
};
