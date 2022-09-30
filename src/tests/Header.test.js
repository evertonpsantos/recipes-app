import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderwithRouter';

describe('Header page tests', () => {
  it('Should redirect to /profile when profile icon is clicked', () => {
    renderWithRouter(<Header />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const profileTitle = screen.getByRole('heading', { level: 1, name: /Profile/i });
    expect(profileTitle);
  });
  it('Should render the right page titles', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/drinks');
    const drinksTitle = screen.getByRole('heading', { level: 1, name: /Drinks/i });
    expect(drinksTitle).toBeInTheDocument();
    history.push('/done-recipes');
    const doneRecipesTitle = screen.getByRole('heading', { level: 1, name: /Done Recipes/i });
    expect(doneRecipesTitle).toBeInTheDocument();
    history.push('/favorite-recipes');
    const favoriteRecipesTitle = screen.getByRole('heading', { level: 1, name: /Favorite Recipes/i });
    expect(favoriteRecipesTitle).toBeInTheDocument();
  });
});
