import React, {createContext, ReactNode, useState} from 'react';
import Movie from '../models/Movie';

interface FavoriteContextType {
  favoriteSeries: Movie[];
  addFavorite: (series: Movie) => void;
  removeFavorite: (id: number) => void;
}

type FavoriteProviderProps = {
  children: ReactNode;
};

export const FavoriteContext = createContext<FavoriteContextType>({
  favoriteSeries: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoriteProvider = ({children}: FavoriteProviderProps) => {
  const [favoriteSeries, setFavoriteSeries] = useState<Movie[]>([]);

  const addFavorite = (series: Movie) => {
    if (!favoriteSeries.some(favorite => favorite.id === series.id)) {
      setFavoriteSeries([...favoriteSeries, series]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavoriteSeries(favoriteSeries.filter(favorite => favorite.id !== id));
  };

  return (
    <FavoriteContext.Provider
      value={{favoriteSeries, addFavorite, removeFavorite}}>
      {children}
    </FavoriteContext.Provider>
  );
};
