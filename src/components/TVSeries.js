import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPopularTVSeries } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';
import { useTranslation } from 'react-i18next';

const TVSeries = () => {
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(
    ['popularTVSeries', page],
    () => getPopularTVSeries(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div>{t('loading')}</div>;
  if (isError) return <div>{t('error')}: {error.message}</div>;

  const toggleFavorite = (series) => {
    const isFavorite = favorites.tvSeries.some(fav => fav.item_id === series.id);
    if (isFavorite) {
      removeFavorite('tvSeries', series.id);
    } else {
      addFavorite('tvSeries', series);
    }
  };

  return (
    <div>
      <h2>{t('popularTVSeries')}</h2>
      <div className="tv-series-grid">
        {data.results.map((series) => (
          <div key={series.id} className="tv-series-card">
            <Link to={`/tv/${series.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${series.poster_path}`}
                alt={series.name}
              />
              <h3>{series.name}</h3>
            </Link>
            <button onClick={() => toggleFavorite(series)}>
              {favorites.tvSeries.some(fav => fav.item_id === series.id)
                ? t('removeFromFavorites')
                : t('addToFavorites')}
            </button>
            <p>{t('firstAirDate')}: {series.first_air_date}</p>
            <p>{t('voteAverage')}: {series.vote_average}</p>
            <p>{t('overview')}: {series.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
      <div>
        <button 
          onClick={() => setPage((old) => Math.max(old - 1, 1))} 
          disabled={page === 1}
        >
          {t('previousPage')}
        </button>
        <span>{t('page')} {page}</span>
        <button 
          onClick={() => setPage((old) => old + 1)} 
          disabled={!data.results.length}
        >
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default TVSeries;