import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderwithRouter';
import mockAPI from './helpers/mockAPI';
import App from '../App';

const mockPromise = Promise.resolve({
  json: () => Promise.resolve(mockAPI),
});

const FAVORITE_BTN = 'favorite-btn';

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

describe('Testing Buttons component', () => {
  const FAVORITE_RECIPES = 'favoriteRecipes';

  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => mockPromise);

    await act(async () => renderWithRouter(<App />, '/meals'));
    const currMeal = await screen.findByText(/corba/i);
    expect(currMeal).toBeInTheDocument();
    userEvent.click(currMeal);
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
  });

  it('1 - Should render buttons', async () => {
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });

  it('2 - Should show "Link copied!" after clicking on share button', async () => {
    window.document.execCommand = jest.fn(() => true);
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    const linkMessage = await screen.findByText('Link copied!');
    expect(linkMessage).toBeInTheDocument();
  });
  it('1 - Should unfavorite the selected recipes', async () => {
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(FAVORITE_BTN)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(FAVORITE_BTN));

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).toHaveLength(1);

    userEvent.click(screen.getByTestId(FAVORITE_BTN));

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).toHaveLength(0);
  });
});

describe('Test the Buttons inside the drinks path', () => {
  const FAVORITE_RECIPES = 'favoriteRecipes';

  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => mockPromise);

    await act(async () => renderWithRouter(<App />, '/drinks'));
    const currDrink = await screen.findByText(/GG/i);
    expect(currDrink).toBeInTheDocument();
    userEvent.click(currDrink);
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
  });
  it('Should unfavorite the selected drink', () => {
    userEvent.click(screen.getByTestId(FAVORITE_BTN));

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).toHaveLength(1);

    userEvent.click(screen.getByTestId(FAVORITE_BTN));

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).toHaveLength(0);
  });
});
