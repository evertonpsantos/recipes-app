const USER_KEY = 'user';

export const readUserEmail = () => JSON.parse(localStorage.getItem(USER_KEY));

export const saveUserEmail = (email) => localStorage
  .setItem(USER_KEY, JSON.stringify({ email }));
