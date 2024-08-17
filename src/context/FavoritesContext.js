import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({ actors: [], tvSeries: [] });
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
        const actors = data.filter(item => item.type === 'actor');
        const tvSeries = data.filter(item => item.type === 'tvSeries');
        setFavorites({ actors, tvSeries });
      }
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (type, item) => {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, type, item_id: item.id, item_data: item })
      .select();

    if (error) {
      console.error('Error adding favorite:', error);
    } else {
      setFavorites(prev => ({
        ...prev,
        [type]: [...prev[type], data[0]]
      }));
    }
  };

  const removeFavorite = async (type, itemId) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: user.id, type, item_id: itemId });

    if (error) {
      console.error('Error removing favorite:', error);
    } else {
      setFavorites(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.item_id !== itemId)
      }));
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};