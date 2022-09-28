import { node } from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
  });
  const [filteredSearch, setFilteredSearch] = useState([]);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    filteredSearch,
    setFilteredSearch,
  }), [user, filteredSearch]);

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: node.isRequired,
};
