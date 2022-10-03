import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Test the Done Recipes page', () => {
  beforeEach(async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

    renderWithRouter(<App />, '/done-recipes');
  });

  it('1 - Should render the correct items when clicking the filter buttons', async () => {
    const firstItem = await screen.findByTestId('0-horizontal-name');

    expect(firstItem).toHaveTextContent('Spicy Arrabiata');

    const mealFilterBtn = screen.getByRole('button', { name: /meals/i });
    const drinkFilterBtn = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(drinkFilterBtn);

    expect(firstItem).toHaveTextContent('Aquamarine');

    userEvent.click(mealFilterBtn);

    expect(firstItem).toHaveTextContent('Spicy Arrabiata');
  });

  it('2 - Should copy the correct link to clipboard when clicking the share button', async () => {
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    window.document.execCommand = jest.fn(() => true);
    userEvent.click(shareBtn);

    const message = await screen.findByText('Link copied!');

    expect(message).toBeInTheDocument();
  });
});
