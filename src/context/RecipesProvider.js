import { node } from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
  });
  const [filteredSearch, setFilteredSearch] = useState(null);
  const [recipe, setRecipe] = useState({ meals: [], drinks: [] });
  const contextValue = useMemo(() => ({
    user,
    setUser,
    recipe,
    setRecipe,
    filteredSearch,
    setFilteredSearch,
  }), [user, recipe, filteredSearch]);

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: node.isRequired,
};
