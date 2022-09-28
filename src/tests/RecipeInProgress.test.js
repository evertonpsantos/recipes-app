import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderwithRouter';
import { mockMealDetail, mockDrinkDetail } from './helpers/mockAPI';
import App from '../App';

describe('Testing MealProgress component', () => {
  it('1 - Should render a recipe checklist when clicking to start recipe', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealDetail),
    }));
    renderWithRouter(<App />, '/meals/53060');

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    expect(startBtn).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { name: /burek/i });
    expect(recipeTitle).toBeInTheDocument();
  });
});

describe('Testing DrinkProgress component', () => {
  it('1 - Should render a recipe checklist when clicking to start recipe', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinkDetail),
    }));
    renderWithRouter(<App />, '/drinks/13501');

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    expect(startBtn).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { name: /abc/i });
    expect(recipeTitle).toBeInTheDocument();
  });
});
