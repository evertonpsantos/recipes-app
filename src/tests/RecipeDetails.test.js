import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderwithRouter';
import mockAPI from './helpers/mockAPI';
import App from '../App';

const mockPromise = Promise.resolve({
  json: () => Promise.resolve(mockAPI),
});

describe('Testing DrinkDetails component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => mockPromise);

    await act(async () => renderWithRouter(<App />, '/drinks'));
  });

  it('1 - Should render details about selected drink', async () => {
    const currDrink = await screen.findByText(/gg/i);
    const otherDrink = await screen.findByText(/abc/i);

    expect(currDrink).toBeInTheDocument();
    expect(otherDrink).toBeInTheDocument();

    userEvent.click(currDrink);

    expect(otherDrink).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { level: 1, name: /gg/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('2 - Should render recommended meals', async () => {
    const currDrink = await screen.findByText(/gg/i);

    userEvent.click(currDrink);

    const recomendedMeal = await screen.findByText(/burek/i);
    expect(recomendedMeal).toBeInTheDocument();
  });
});

describe('Testing MealDetails component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => mockPromise);

    await act(async () => renderWithRouter(<App />, '/meals'));
  });

  it('1 - Should render details about selected meal', async () => {
    const currMeal = await screen.findByText(/corba/i);
    const otherMeal = await screen.findByText(/burek/i);

    expect(currMeal).toBeInTheDocument();
    expect(otherMeal).toBeInTheDocument();

    userEvent.click(currMeal);

    expect(otherMeal).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { level: 1, name: /corba/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('2 - Should render recommended meals', async () => {
    const currMeal = await screen.findByText(/corba/i);

    userEvent.click(currMeal);

    const recommendedDrink = await screen.findByText(/a1/i);
    expect(recommendedDrink).toBeInTheDocument();
  });
});
