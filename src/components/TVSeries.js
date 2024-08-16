import React from 'react';
import { useQuery } from 'react-query';
import { getPopularTVSeries } from '../api/tmdb-api';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const TVSeries = () => {
  const { data, error, isLoading } = useQuery(['popularTVSeries', 1], () => getPopularTVSeries(1));
  const { addFavorite } = useFavorites();

  if (isLoading) return <div>Loading TV series...</div>;
  if (error) return <div>Error loading TV series: {error.message}</div>;

  return (
    <div>
      <h2>Popular TV Series</h2>
      {data && data.results ? (
        <ul>
          {data.results.map(series => (
            <li key={series.id}>
              <Link to={`/tv/${series.id}`}>{series.name}</Link>
              <button onClick={() => addFavorite('tvSeries', { id: series.id, name: series.name })}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No TV series found</div>
      )}
    </div>
  );
};

export default TVSeries;