import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { data: movie, isLoading, isError, error } = useQuery(['movie', id], () => getMovieDetails(id));

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">{t('error')}: {error.message}</div>;

  const isFavorite = favorites.movies.some(fav => fav.item_id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite('movies', movie.id);
    } else {
      addFavorite('movies', movie);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-4">{movie.tagline}</p>
          <p className="mb-4">{movie.overview}</p>
          <div className="mb-4">
            <strong>{t('genres')}:</strong> {movie.genres.map(g => g.name).join(', ')}
          </div>
          <div className="mb-4">
            <strong>{t('releaseDate')}:</strong> {new Date(movie.release_date).toLocaleDateString()}
          </div>
          <div className="mb-4">
            <strong>{t('runtime')}:</strong> {movie.runtime} {t('minutes')}
          </div>
          <div className="mb-4">
            <strong>{t('rating')}:</strong> {movie.vote_average.toFixed(1)}/10
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`mt-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            {isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
          </button>
          <h2 className="text-2xl font-bold mt-8 mb-4">{t('cast')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movie.credits.cast.slice(0, 8).map((actor) => (
              <Link key={actor.id} to={`/actor/${actor.id}`} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;