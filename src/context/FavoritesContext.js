import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const fetchFavorites = useCallback(async () => {
    if (user) {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
      } else {
        setFavorites(data);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (item) => {
    if (user) {
      const { data, error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, item_id: item.id, item_type: item.media_type });

      if (error) {
        console.error('Error adding favorite:', error);
      } else {
        setFavorites([...favorites, data[0]]);
      }
    } else {
      console.error('User not authenticated');
    }
  };

  const removeFavorite = async (itemId) => {
    if (user) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: user.id, item_id: itemId });

      if (error) {
        console.error('Error removing favorite:', error);
      } else {
        setFavorites(favorites.filter(fav => fav.item_id !== itemId));
      }
    } else {
      console.error('User not authenticated');
    }
  };

  const value = {
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};