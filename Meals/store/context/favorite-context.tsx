import {createContext, useState} from 'react';

type favoriteContextGenericType = {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<favoriteContextGenericType>({
  ids: [],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {},
});

function FavoritesContextProvider({children}: {children: React.ReactNode}) {
  const [FavoriteMealIds, setFavoriteMealsId] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavoriteMealsId(currentFavIds => [...currentFavIds, id]);
  };
  const removeFavorite = (id: string) => {
    setFavoriteMealsId(currentFavIds =>
      currentFavIds.filter(mealId => mealId !== id),
    );
  };

  const value = {
    ids: FavoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
