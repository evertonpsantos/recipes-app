import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import drinksSearchedY from '../helpers/mockDrinksY';
import mealsByLetter from '../helpers/mockMealsByLetter';
import drinks from './helpers/mockDrinks';
import renderWithRouter from './helpers/renderwithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

const INGREDIENT_DATA_TESTID = 'ingredient-search-radio';
const RECIPE_NAME_DATA_TESTID = 'name-search-radio';
const FIRST_LETTER_DATA_TESTID = 'first-letter-search-radio';
const SEARCH_INPUT_DATA_TESTID = 'search-input';
const SEARCH_BUTTON_DATA_TESTID = 'exec-search-btn';
const SEARCH_ICON_IMAGE = 'search-top-btn';
const CARD_NAME = '0-card-name';

describe('SearchBar page tests', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

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
  test('If when an radio input is selected, the others inputs are not selected', () => {
    renderWithRouter(<App />, '/meals');

    const searchImgButton = screen.getByTestId(SEARCH_ICON_IMAGE);
    userEvent.click(searchImgButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_DATA_TESTID);
    const recipeNameRadio = screen.getByTestId(RECIPE_NAME_DATA_TESTID);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);

    userEvent.click(recipeNameRadio);
    expect(recipeNameRadio).toBeChecked();
    expect(ingredientRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();
  });
  test('In Drinks Page if when typed in search input and select the ingredient radio input, the correct element appears when search button is clicked', async () => {
    jest.clearAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinksSearchedY),
    });

    renderWithRouter(<App />, '/drinks');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(FIRST_LETTER_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'y');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('Yellow Bird');
  });
  test('In Meals Page if when typed in search input and select the ingredient radio input, the correct element appears when search button is clicked', async () => {
    jest.clearAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealsByLetter),
    });

    renderWithRouter(<App />, '/meals');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(FIRST_LETTER_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'd');

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('Dal fry');
  });
  test('In Drinks page if when first letter radio is selected and typed more than one letter, an alert appears on the screen', () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(<App />, '/drinks');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);

    userEvent.type(searchInput, 'ya');
    userEvent.click(firstLetterRadio);

    expect(window.alert).toHaveBeenCalled();
  });
  test('In Meals page if when first letter radio is selected and typed more than one letter, an alert appears on the screen', () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(<App />, '/meals');

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_DATA_TESTID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_DATA_TESTID);

    userEvent.type(searchInput, 'ya');
    userEvent.click(firstLetterRadio);

    expect(window.alert).toHaveBeenCalled();
  });
  test('If the user is redirected to the proper recipe details page', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    renderWithRouter(<App />, '/meals');

    expect(await screen.findByText('Corba')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Arrabiata');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByRole('heading', { name: /spicy arrabiata penne/i, level: 1 }));
  });
  test('If the user is redirected to the proper recipe details page', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findByText('GG')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Aquamarine');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByRole('heading', { name: /Aquamarine/i, level: 1 }));
  });
  test('If the meals ingredient search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });

    renderWithRouter(<App />, '/meals');

    expect(await screen.findByText('Corba')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(INGREDIENT_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Chicken');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('Brown Stew Chicken');
  });
  test('If the drinks ingredient search', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinksByIngredient),
    });

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findByText('GG')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(INGREDIENT_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Light rum');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    expect(await screen.findByTestId(CARD_NAME)).toHaveTextContent('151 Florida Bushwacker');
  });
  test('If the alert is called', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(emptyDrinks),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });

    jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouter(<App />, '/drinks');

    expect(await screen.findByText('GG')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'Xablau');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
  test('If the alert is called', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(emptyMeals),
    });

    jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouter(<App />, '/meals');
    console.log(window.alert);

    expect(await screen.findByText('Corba')).toBeDefined();

    userEvent.click(screen.getByTestId(SEARCH_ICON_IMAGE));

    userEvent.click(screen.getByTestId(RECIPE_NAME_DATA_TESTID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_DATA_TESTID), 'xablau');

    userEvent.click(screen.getByTestId(SEARCH_BUTTON_DATA_TESTID));

    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
});
