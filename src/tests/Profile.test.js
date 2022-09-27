import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('testa a page profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({'email': 'teste@teste.com'}));
    renderWithRouter(<App />, '/profile');
  });
  it('testa se quando done recipes é clicado redireciona o componente doneRecipes', () => {
    const profile = screen.getByRole('heading', {level: 1, name: /Profile/i});
    expect(profile).toBeInTheDocument();
    const doneRecipesButton = screen.getByRole('button', {name:/Done Recipes/i});
    expect(doneRecipesButton).toBeInTheDocument();
    userEvent.click(doneRecipesButton);
    const doneRecipesH1 = screen.getByRole('heading', {level: 1, name:/Done Recipes/i});
    expect(doneRecipesH1).toBeInTheDocument();
  });
  it('testa se quando done recipes é clicado redireciona o componente favoriteRecipes', () => {
    const profile = screen.getByRole('heading', {level: 1, name: /Profile/i});
    expect(profile).toBeInTheDocument();
    const favoriteRecipesButton = screen.getByRole('button', {name:/favorite Recipes/i});
    expect(favoriteRecipesButton).toBeInTheDocument();
    userEvent.click(favoriteRecipesButton);
    const favoriteRecipesH1 = screen.getByRole('heading', {level: 1, name:/favorite Recipes/i});
    expect(favoriteRecipesH1).toBeInTheDocument();
  });
  it('testa se o botão de logout ao ser clicado volta pra home e limpa o localStorage', () =>{
    const logoutButton = screen.getByRole('button', {name:/Logout/i});
    expect(logoutButton).toBeInTheDocument();
    userEvent.click(logoutButton);
    const userInputs = screen.getAllByRole('textbox')
    expect(userInputs).toHaveLength(2)
  });
});
