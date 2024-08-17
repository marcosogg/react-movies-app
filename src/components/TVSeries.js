import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPopularTVSeries } from '../api/tmdb-api';

const TVSeries = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ['popularTVSeries', page],
    () => getPopularTVSeries(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">{t('error')}: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('popularTVSeries')}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.results.map((series) => (
          <Link key={series.id} to={`/tv/${series.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h2 className="text-sm font-semibold truncate">{series.name}</h2>
                <p className="text-xs text-gray-600">{new Date(series.first_air_date).getFullYear()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {t('previousPage')}
        </button>
        <span className="px-4 py-2">{t('page')} {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data.results.length}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default TVSeries;