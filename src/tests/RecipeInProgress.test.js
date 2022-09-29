import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderwithRouter';
import { mockMealDetail, mockDrinkDetail } from './helpers/mockAPI';
import App from '../App';

describe('Testing MealProgress component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealDetail),
    }));

    await act(async () => renderWithRouter(<App />, '/meals/53060'));
    localStorage.clear();
  });

  it('1 - Should render a recipe checklist when clicking to start recipe', async () => {
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    expect(startBtn).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { name: /burek/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('2 - If the checkbox is checked, it should remain checked after the page is reloaded', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ 53060: ['Filo Pastry', 'Minced Beef'] }));

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    userEvent.click(startBtn);

    const recipeTitle = await screen.findByRole('heading', { name: /burek/i });
    expect(recipeTitle).toBeInTheDocument();

    const checkbox = await screen.findAllByRole('checkbox');

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    delete window.location;
    window.location = { reload: jest.fn() };

    window.location.reload();

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    userEvent.click(checkbox[2]);

    expect(checkbox[2]).toBeChecked();

    window.location.reload();

    userEvent.click(checkbox[0]);

    window.location.reload();

    expect(checkbox[0]).not.toBeChecked();
  });
});

describe('Testing DrinkProgress component', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinkDetail),
    }));

    await act(async () => renderWithRouter(<App />, '/drinks/13501'));
    localStorage.clear();
  });

  it('1 - Should render a recipe checklist when clicking to start recipe', async () => {
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);

    expect(startBtn).not.toBeInTheDocument();

    const recipeTitle = await screen.findByRole('heading', { name: /abc/i });
    expect(recipeTitle).toBeInTheDocument();
  });

  it('2 - If the checkbox is checked, it should remain checked after the page is reloaded', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ 13501: ['Amaretto', 'Baileys irish cream'] }));

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    userEvent.click(startBtn);

    const recipeTitle = await screen.findByRole('heading', { name: /abc/i });
    expect(recipeTitle).toBeInTheDocument();

    const checkbox = await screen.findAllByRole('checkbox');

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    delete window.location;
    window.location = { reload: jest.fn() };

    window.location.reload();

    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).not.toBeChecked();

    userEvent.click(checkbox[2]);

    expect(checkbox[2]).toBeChecked();

    window.location.reload();

    checkbox.forEach((el) => expect(el).toBeChecked());

    userEvent.click(checkbox[0]);

    window.location.reload();

    expect(checkbox[0]).not.toBeChecked();
  });
});
