import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';
import { mockCategory } from './helpers/mockAPI';
import drinks from './helpers/mockDrinks';
import mockMeals from './helpers/mockMeals';
import ordinaryDrinks from './helpers/ordinaryDrinks';
import renderWithRouter from './helpers/renderwithRouter';

describe('Test the Recipe component', () => {
  const EMAIL_TESTID = 'email-input';
  const PASSWORD_TESTID = 'password-input';
  const BUTTON_TESTID = 'login-submit-btn';
  const CARD_TESTID = '0-card-img';
  const BEEF_AND_MUSTARD = 'Beef and Mustard Pie';

  afterEach(() => cleanup());

  it('Should render 12 meals recipe as the page loads', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCategory),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(beefMeals),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(beefMeals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      });

    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email.com');
    userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');
    userEvent.click(screen.getByTestId(BUTTON_TESTID));

    expect(screen.getByRole('heading', { name: /meals/i, level: 1 })).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByRole('button', { name: 'Beef' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', BEEF_AND_MUSTARD);

    userEvent.click(screen.getByRole('button', { name: 'ALL' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'Corba');

    userEvent.click(screen.getByRole('button', { name: 'Beef' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', BEEF_AND_MUSTARD);

    userEvent.click(screen.getByRole('button', { name: 'Beef' }));
  });
  it('Should render 12 drinks as the page loads', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });

    renderWithRouter(<App />, '/drinks');

    expect(screen.getByRole('heading', { name: /drinks/i, level: 1 })).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/i)).toHaveLength(12);

    userEvent.click(screen.getByRole('button', { name: /Ordinary drink/i }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', '3-Mile Long Island Iced Tea');

    userEvent.click(screen.getByRole('button', { name: /Ordinary drink/i }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'GG');
  });
  test('The ALL button in the meals page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockMeals),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCategory),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(beefMeals),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMeals),
      });

    renderWithRouter(<App />, '/meals');

    expect(screen.getByRole('heading', { name: /meals/i, level: 1 })).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByRole('button', { name: 'Beef' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', BEEF_AND_MUSTARD);

    userEvent.click(screen.getByRole('button', { name: 'ALL' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'Corba');
  });
  test('The ALL button in the drinks page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });

    renderWithRouter(<App />, '/drinks');

    expect(screen.getByRole('heading', { name: /drinks/i, level: 1 })).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByRole('button', { name: 'Ordinary Drink' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', '3-Mile Long Island Iced Tea');

    userEvent.click(screen.getByRole('button', { name: 'ALL' }));

    expect(await screen.findByTestId(CARD_TESTID))
      .toHaveAttribute('alt', 'GG');
  });
});
