import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (favorites.movies.length > 0 || favorites.actors.length > 0 || favorites.tvSeries.length > 0) {
      setIsLoading(false);
    }
  }, [favorites]);

  console.log('Favorites data:', favorites);

  const renderFavoriteItem = (item, type) => {
    console.log(`Rendering ${type} item:`, item);

    const imagePath = item.item_data.poster_path || item.item_data.profile_path;
    console.log('Image path:', imagePath);

    const imageUrl = imagePath
      ? `https://image.tmdb.org/t/p/w500${imagePath}`
      : 'https://via.placeholder.com/500x750?text=No+Image';

    console.log('Image URL:', imageUrl);

    return (
      <Link key={item.item_id} to={`/${type}/${item.item_id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <img
            src={imageUrl}
            alt={item.item_data.title || item.item_data.name || 'Favorite Item'}
            className="w-full h-auto"
            onError={(e) => {
              console.error('Image failed to load:', imageUrl);
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/500x750?text=Error+Loading+Image';
            }}
          />
          <div className="p-2">
            <h3 className="text-sm font-semibold truncate">{item.item_data.title || item.item_data.name || 'Unknown'}</h3>
          </div>
        </div>
      </Link>
    );
  };

  if (isLoading) {
    return <div className="text-center mt-8">{t('loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('myFavorites')}</h1>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">{t('favoriteMovies')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.movies.map(movie => renderFavoriteItem(movie, 'movie'))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">{t('favoriteActors')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.actors.map(actor => renderFavoriteItem(actor, 'actor'))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">{t('favoriteTVSeries')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.tvSeries.map(series => renderFavoriteItem(series, 'tv'))}
      </div>
    </div>
  );
};

export default Favorites;