import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('myFavorites')}</h1>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">{t('favoriteMovies')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.movies.map((movie) => (
          <Link key={movie.item_id} to={`/movie/${movie.item_id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.item_data.poster_path}`}
                alt={movie.item_data.title}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{movie.item_data.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">{t('favoriteActors')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.actors.map((actor) => (
          <Link key={actor.item_id} to={`/actor/${actor.item_id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.item_data.profile_path}`}
                alt={actor.item_data.name}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{actor.item_data.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">{t('favoriteTVSeries')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.tvSeries.map((series) => (
          <Link key={series.item_id} to={`/tv/${series.item_id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${series.item_data.poster_path}`}
                alt={series.item_data.name}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{series.item_data.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;