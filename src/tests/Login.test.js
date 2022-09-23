import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderwithRouter';

describe('Login page test', () => {
  const EMAIL_TESTID = 'email-input';
  const PASSWORD_TESTID = 'password-input';
  const BUTTON_TESTID = 'login-submit-btn';

  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => cleanup());

  test('Should have two inputs and a button', () => {
    expect(screen.getByTestId(EMAIL_TESTID)).toBeDefined();
    expect(screen.getByTestId(PASSWORD_TESTID)).toBeDefined();
    expect(screen.getByTestId(BUTTON_TESTID)).toBeDefined();
  });
  test('The button functionality', () => {
    userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email');
    userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');

    expect(screen.getByTestId(BUTTON_TESTID)).toBeDisabled();

    userEvent.clear(screen.getByTestId(EMAIL_TESTID));
    userEvent.clear(screen.getByTestId(PASSWORD_TESTID));

    userEvent.type(screen.getByTestId(EMAIL_TESTID), 'email@email.com');
    userEvent.type(screen.getByTestId(PASSWORD_TESTID), '1234567');

    expect(screen.getByTestId(BUTTON_TESTID)).toBeEnabled();

    userEvent.click(screen.getByTestId(BUTTON_TESTID));

    expect(screen.getByText(/ola/i)).toBeDefined();
  });
});
