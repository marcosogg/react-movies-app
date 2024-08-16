import React, { createContext, useState, useContext, useEffect } from 'react';

   const FavoritesContext = createContext();

   export const useFavorites = () => useContext(FavoritesContext);

   export const FavoritesProvider = ({ children }) => {
     const [favorites, setFavorites] = useState({
       actors: [],
       tvSeries: []
     });

     useEffect(() => {
       const storedFavorites = localStorage.getItem('favorites');
       if (storedFavorites) {
         setFavorites(JSON.parse(storedFavorites));
       }
     }, []);

     const addFavorite = (type, item) => {
       setFavorites(prev => {
         const newFavorites = {
           ...prev,
           [type]: [...prev[type], item]
         };
         localStorage.setItem('favorites', JSON.stringify(newFavorites));
         return newFavorites;
       });
     };

     const removeFavorite = (type, itemId) => {
       setFavorites(prev => {
         const newFavorites = {
           ...prev,
           [type]: prev[type].filter(item => item.id !== itemId)
         };
         localStorage.setItem('favorites', JSON.stringify(newFavorites));
         return newFavorites;
       });
     };

     return (
       <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
         {children}
       </FavoritesContext.Provider>
     );
   };