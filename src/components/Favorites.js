import React from 'react';
   import { useFavorites } from '../context/FavoritesContext';
   import { Link } from 'react-router-dom';

   const Favorites = () => {
     const { favorites, removeFavorite } = useFavorites();

     return (
       <div>
         <h2>Favorite Actors</h2>
         <ul>
           {favorites.actors.map(actor => (
             <li key={actor.id}>
               <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
               <button onClick={() => removeFavorite('actors', actor.id)}>Remove</button>
             </li>
           ))}
         </ul>

         <h2>Favorite TV Series</h2>
         <ul>
           {favorites.tvSeries.map(series => (
             <li key={series.id}>
               <Link to={`/tv/${series.id}`}>{series.name}</Link>
               <button onClick={() => removeFavorite('tvSeries', series.id)}>Remove</button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default Favorites;