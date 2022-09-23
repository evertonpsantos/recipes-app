import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderwithRouter';

describe('Header page tests', () => {
  // const EMAIL_TESTID = 'email-input';
  // const PASSWORD_TESTID = 'password-input';
  // const BUTTON_TESTID = 'login-submit-btn';

  // beforeEach(() => {
  //   renderWithRouter(<App />);
  //   // userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email');
  //   // userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');
  //   // expect(screen.getByTestId(BUTTON_TESTID)).toBeDisabled();
  //   // userEvent.clear(screen.getByTestId(EMAIL_TESTID));
  //   // userEvent.clear(screen.getByTestId(PASSWORD_TESTID));
  //   // userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email.com');
  //   // userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');
  //   // expect(screen.getByTestId(BUTTON_TESTID)).toBeEnabled();
  //   // userEvent.click(screen.getByTestId(BUTTON_TESTID));
  // });

  it('Should redirect to /profile when profile icon is clicked', () => {
    renderWithRouter(<Header />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const profileTitle = screen.getByRole('heading', { level: 1, name: /Profile/i });
    expect(profileTitle);
  });

  it('Should be possible to use search bar', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/meals');
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
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
