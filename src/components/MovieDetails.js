import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../api/tmdb-api';

const MovieDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: movie, isLoading, isError, error } = useQuery(['movie', id], () => getMovieDetails(id));

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <h2 className="font-bold">{t('error')}</h2>
      <p>{error.message}</p>
    </div>
  );

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg'; // You should add a placeholder image to your public folder

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row mb-6">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full md:w-64 h-auto rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <p className="text-lg mb-2"><strong>{t('overview')}:</strong> {movie.overview}</p>
          <p className="mb-2"><strong>{t('releaseDate')}:</strong> {movie.release_date}</p>
          <p className="mb-2"><strong>{t('runtime')}:</strong> {movie.runtime} {t('minutes')}</p>
          <p className="mb-2"><strong>{t('genres')}:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p className="mb-2"><strong>{t('productionCompanies')}:</strong> {movie.production_companies.map(c => c.name).join(', ')}</p>
        </div>
      </div>
      {/* Add other movie details here */}
    </div>
  );
};

export default MovieDetails;