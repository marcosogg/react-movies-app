import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({ movies: [], actors: [], tvSeries: [] });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching favorites:', error);
    } else {
      console.log('Fetched favorites:', data);
      const parsedData = data.map(item => ({
        ...item,
        item_data: typeof item.item_data === 'string' ? JSON.parse(item.item_data) : item.item_data
      }));
      const movies = parsedData.filter(item => item.type === 'movies');
      const actors = parsedData.filter(item => item.type === 'actors');
      const tvSeries = parsedData.filter(item => item.type === 'tvSeries');
      setFavorites({ movies, actors, tvSeries });
    }
  };

  const addFavorite = async (type, item) => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }
  
    if (!item || !item.id) {
      console.error('Invalid item data:', item);
      return;
    }
  
    const favoriteItem = {
      user_id: user.id,
      type,
      item_id: item.id,
      item_data: {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        profile_path: item.profile_path,
      }
    };
  
    console.log('Adding favorite:', favoriteItem);
  
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert(favoriteItem)
        .select();
  
      if (error) {
        console.error('Supabase error adding favorite:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        throw error;
      }
  
      console.log('Favorite added successfully:', data);
  
      // Ensure the item_data is in the correct format
      const newFavorite = {
        ...data[0],
        item_data: favoriteItem.item_data
      };
  
      setFavorites(prev => ({
        ...prev,
        [type]: [...prev[type], newFavorite]
      }));
    } catch (error) {
      console.error('Error adding favorite:', error);
      if (error.message.includes('duplicate key value violates unique constraint')) {
        console.log('This item is already a favorite');
      }
    }
  };

  const removeFavorite = async (type, itemId) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: user.id, type, item_id: itemId });

      if (error) {
        console.error('Supabase error removing favorite:', error);
        throw error;
      }

      setFavorites(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.item_id !== itemId)
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;