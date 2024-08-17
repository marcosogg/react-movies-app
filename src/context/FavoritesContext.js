import React, { createContext, useState, useEffect, useContext } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({
    actors: [],
    tvSeries: []
  });
  const [favoritesOrder, setFavoritesOrder] = useState({
    actors: [],
    tvSeries: []
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedOrder = localStorage.getItem('favoritesOrder');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedOrder) setFavoritesOrder(JSON.parse(storedOrder));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('favoritesOrder', JSON.stringify(favoritesOrder));
  }, [favorites, favoritesOrder]);

  const addFavorite = (type, item) => {
    setFavorites(prev => ({
      ...prev,
      [type]: [...prev[type], item]
    }));
    setFavoritesOrder(prev => ({
      ...prev,
      [type]: [...prev[type], item.id]
    }));
  };

  const removeFavorite = (type, id) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    setFavoritesOrder(prev => ({
      ...prev,
      [type]: prev[type].filter(itemId => itemId !== id)
    }));
  };

  const reorderFavorites = (type, newOrder) => {
    setFavoritesOrder(prev => ({
      ...prev,
      [type]: newOrder
    }));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesOrder,
        addFavorite,
        removeFavorite,
        reorderFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};