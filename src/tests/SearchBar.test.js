import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

const INGREDIENT_DATA_TESTID = 'ingredient-search-radio';
const RECIPE_NAME_DATA_TESTID = 'name-search-radio';
const FIRST_LETTER_DATA_TESTID = 'first-letter-search-radio';
const SEARCH_INPUT_DATA_TESTID = 'search-input';
const SEARCH_BUTTON_DATA_TESTID = 'exec-search-btn';
const SEARCH_ICON_IMAGE = 'search-top-btn';
const noRecipesFoundPartial = 'Sorry, we haven';
const noRecipesFoundAlert = `${
  noRecipesFoundPartial}'t found any recipes for these filters.`;

afterEach(() => cleanup());

describe('SearchBar page tests', () => {
  test('If all elements are in the component', () => {
    renderWithRouter(<App />, '/meals');

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_DATA_TESTID);
    const recipeNameRadio = screen.getByTestId(RECIPE_NAME_DATA_TESTID);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);
    const searchButton = screen.getByTestId(SEARCH_BUTTON_DATA_TESTID);

    const elements = [
      ingredientRadio,
      recipeNameRadio,
      firstLetterRadio,
      searchInput,
      searchButton,
    ];

    elements.forEach((el) => expect(el).toBeInTheDocument());
  });
  test(' in Meals page if when typed in search input and select the ingredient radio input, the correct element appears when search button is clicked', async () => {
    renderWithRouter(<App />, '/meals');

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);
    const searchButton = screen.getByTestId(SEARCH_BUTTON_DATA_TESTID);

    await waitFor(async () => {
      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'chicken');

      expect(await screen.getAllByTestId(/recipe-card/)).toHaveLength(12);

      userEvent.click(searchButton);

      expect(await screen.getAllByTestId(/recipe-card/)).toHaveLength(11);
    });
  });
  test(' In Drinks Page if when typed in search input and select the ingredient radio input, the correct element appears when search button is clicked', async () => {
    renderWithRouter(<App />, '/drinks');

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);
    const searchButton = screen.getByTestId(SEARCH_BUTTON_DATA_TESTID);

    await waitFor(async () => {
      userEvent.click(firstLetterRadio);
      userEvent.type(searchInput, 'y');

      expect(await screen.getAllByTestId(/recipe-card/)).toHaveLength(12);

      userEvent.click(searchButton);

      expect(await screen.getAllByTestId(/recipe-card/)).toHaveLength(2);
    });
  });
  test('If when first letter radio is selected and typed more than one letter, an alert appears on the screen', () => {
    renderWithRouter(<App />, '/drinks');
    global.alert = jest.fn(() => 'Your search must have only 1 (one) character');

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'ya');

    expect(global.alert).toHaveBeenCalled();
  });
  test(' If when user select a radio button and searches for a recipe that does not exist on the API, an alert appears on the screen', () => {
    renderWithRouter(<App />, '/meals');
    global.alert = jest.fn(() => noRecipesFoundAlert);

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);
    const searchButton = screen.getByTestId(SEARCH_BUTTON_DATA_TESTID);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'fish');
    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalled();
  });
  test(' If when user select a radio button and searches for a recipe, the API is requested', () => {
    renderWithRouter(<App />, '/meals');
    global.fetch = jest.spy(() => fetch);

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);
    const searchButton = screen.getByTestId(SEARCH_BUTTON_DATA_TESTID);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'fish');
    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalled();
  });
});
