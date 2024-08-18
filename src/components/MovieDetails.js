// src/components/MovieDetails.js
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const MovieDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { user } = useAuth();

  const { data: movie, isLoading, isError, error } = useQuery(['movie', id], () => getMovieDetails(id));

  const isFavorite = favorites.movies.some(fav => fav.item_id === movie?.id);

  const handleFavoriteClick = () => {
    if (!user) {
      console.error('User must be logged in to add favorites');
      return;
    }

    if (!movie) {
      console.error('Movie data is not available');
      return;
    }

    if (isFavorite) {
      removeFavorite('movies', movie.id);
    } else {
      addFavorite('movies', {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average
      });
    }
  };

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">{t('error')}: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {movie && (
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
            {user && (
              <Button
                onClick={handleFavoriteClick}
                variant={isFavorite ? "secondary" : "primary"}
              >
                {isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
