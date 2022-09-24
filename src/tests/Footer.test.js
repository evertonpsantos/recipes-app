import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderwithRouter';

describe('Testing footer component', () => {
  beforeEach(() => {
    renderWithRouter(<Profile />);
  });

  it('1 - Should go to "/drinks" when clicking the drink button', () => {
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(drinkBtn);

    const drinkTitle = screen.getByText('Drinks');
    expect(drinkTitle).toBeInTheDocument();
  });

  it('2 - Should go to "/meals" when clicking the meal button', () => {
    const mealBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealBtn).toBeInTheDocument();

    userEvent.click(mealBtn);

    const mealTitle = screen.getByText('Meals');
    expect(mealTitle).toBeInTheDocument();
  });
});
