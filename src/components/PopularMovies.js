import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPopularMovies } from '../api/tmdb-api';
import { useTranslation } from 'react-i18next';

const PopularMovies = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isPreviousData } = useQuery(
    ['popularMovies', page],
    () => getPopularMovies(page),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) return <div>{t('loading')}</div>;
  if (isError) return <div>{t('error')}: {error.message}</div>;

  return (
    <div>
      <h1>{t('popularMovies')}</h1>
      <ul>
        {data.results.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button 
          onClick={() => setPage((old) => Math.max(old - 1, 1))} 
          disabled={page === 1}
        >
          {t('previousPage')}
        </button>
        <span>{t('page')} {page}</span>
        <button 
          onClick={() => {
            if (!isPreviousData && data.page < data.total_pages) {
              setPage((old) => old + 1);
            }
          }} 
          disabled={isPreviousData || data.page >= data.total_pages}
        >
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;