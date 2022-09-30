import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('Test the Favorite Recipes page', () => {
  const FAVORITE_RECIPES = 'favoriteRecipes';
  const favoriteRecipesMock = [
    {
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      type: 'drink',
    },
    {
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    },
  ];
  const FAVORITE_RECIPES_PATH = '/favorite-recipes';
  beforeEach(() => {
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(favoriteRecipesMock));
  });
  it('Should render the correct favorited items', async () => {
    renderWithRouter(<App />, FAVORITE_RECIPES_PATH);

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(2);

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(1);
  });
  it('Should unfavorite the selected item', async () => {
    renderWithRouter(<App />, FAVORITE_RECIPES_PATH);

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(2);

    userEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));

    expect(await screen.findAllByTestId(/horizontal-name/)).toHaveLength(1);

    userEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));
  });
  it('Should show "Link copied!" after clicking on share button', async () => {
    renderWithRouter(<App />, FAVORITE_RECIPES_PATH);

    window.document.execCommand = jest.fn(() => true);
    userEvent.click(await screen.findByTestId('0-horizontal-share-btn'));
    expect(await screen.findByText('Link copied!')).toBeInTheDocument();
  });
});
