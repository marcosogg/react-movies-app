import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { getPopularMovies } from '../api/tmdb-api';
import MovieCard from './MovieCard';

const PopularMovies = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(['popularMovies', page], () => getPopularMovies(page));

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">{t('error')}: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('popularMovies')}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-accent-red text-white rounded disabled:bg-gray-300 transition-colors"
        >
          {t('previousPage')}
        </button>
        <span className="px-4 py-2">{t('page')} {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data.results.length}
          className="px-4 py-2 bg-accent-red text-white rounded disabled:bg-gray-300 transition-colors"
        >
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;