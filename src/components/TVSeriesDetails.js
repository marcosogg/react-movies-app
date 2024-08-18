// src/components/TVSeriesDetails.js
import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTVSeriesDetails } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';
import Button from './ui/Button';

const TVSeriesDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { data: series, isLoading, isError, error } = useQuery(['tvSeries', id], () => getTVSeriesDetails(id));

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">{t('error')}: {error.message}</div>;

  const isFavorite = favorites.tvSeries.some(fav => fav.item_id === series.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite('tvSeries', series.id);
    } else {
      addFavorite('tvSeries', series);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{series.name}</h1>
          <p className="text-gray-600 mb-4">{series.tagline}</p>
          <p className="mb-4">{series.overview}</p>
          <div className="mb-4">
            <strong>{t('genres')}:</strong> {series.genres.map(g => g.name).join(', ')}
          </div>
          <div className="mb-4">
            <strong>{t('firstAirDate')}:</strong> {new Date(series.first_air_date).toLocaleDateString()}
          </div>
          <div className="mb-4">
            <strong>{t('numberOfSeasons')}:</strong> {series.number_of_seasons}
          </div>
          <div className="mb-4">
            <strong>{t('numberOfEpisodes')}:</strong> {series.number_of_episodes}
          </div>
          <div className="mb-4">
            <strong>{t('rating')}:</strong> {series.vote_average.toFixed(1)}/10
          </div>
          <Button
            onClick={handleFavoriteClick}
            variant={isFavorite ? "secondary" : "primary"}
          >
            {isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
          </Button>
          <h2 className="text-2xl font-bold mt-8 mb-4">{t('cast')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {series.credits.cast.slice(0, 8).map((actor) => (
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

export default TVSeriesDetails;
