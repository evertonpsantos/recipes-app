const USER_KEY = 'user';

export const readUserEmail = () => {
  if (localStorage.getItem(USER_KEY) === null) {
    return localStorage.setItem(USER_KEY, JSON.stringify({}));
  }
  return JSON.parse(localStorage.getItem(USER_KEY));
};

export const saveUserEmail = (email) => localStorage
  .setItem(USER_KEY, JSON.stringify({ email }));
