import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('Test the Recipe component', () => {
  const EMAIL_TESTID = 'email-input';
  const PASSWORD_TESTID = 'password-input';
  const BUTTON_TESTID = 'login-submit-btn';
  const CARD_TESTID = '0-card-img';

  afterEach(() => cleanup());

  it('Should render 12 meals recipe as the page loads', async () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email.com');
    userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');
    userEvent.click(screen.getByTestId(BUTTON_TESTID));

    expect(screen.getByRole('heading', { name: /meals/i, level: 1 })).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    expect(screen.getByRole('heading', { name: /drinks/i, level: 1 })).toBeInTheDocument();

    expect(await screen.findAllByTestId(/recipe-card/)).toHaveLength(12);

    userEvent.click(screen.getByRole('button', { name: 'Ordinary Drink' }));

    await waitFor(() => {
      expect(screen.getAllByTestId(/recipe-card/)).toHaveLength(12);
    });

    await waitFor(() => {
      expect(screen.getByTestId(CARD_TESTID))
        .toHaveAttribute('alt', '3-Mile Long Island Iced Tea');
    });

    userEvent.click(screen.getByRole('button', { name: 'Ordinary Drink' }));

    await waitFor(() => {
      expect(screen.getByTestId(CARD_TESTID))
        .toHaveAttribute('alt', 'GG');
    });

    userEvent.click(screen.getByRole('button', { name: 'ALL' }));

    await waitFor(() => {
      expect(screen.getByTestId(CARD_TESTID))
        .toHaveAttribute('alt', 'GG');
    });

    userEvent.click(screen.getByTestId('meals-bottom-btn'));

    expect(screen.getByRole('heading', { name: /meals/i, level: 1 })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId(/recipe-card/)).toHaveLength(12);
    });

    userEvent.click(screen.getByRole('button', { name: 'Beef' }));

    await waitFor(() => {
      expect(screen.getByTestId(CARD_TESTID))
        .toHaveAttribute('alt', 'Beef and Mustard Pie');
    });

    userEvent.click(screen.getByRole('button', { name: 'ALL' }));

    await waitFor(() => {
      expect(screen.getByTestId(CARD_TESTID))
        .toHaveAttribute('alt', 'Corba');
    });

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    await waitFor(() => {
      expect(screen.getAllByTestId(/card-name/)[0]).toHaveTextContent(/GG/);
    });

    userEvent.click(screen.getByTestId('meals-bottom-btn'));
  });
});
