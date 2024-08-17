import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPopularActors } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';
import { useTranslation } from 'react-i18next';

const Actors = () => {
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(
    ['popularActors', page],
    () => getPopularActors(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  if (isError) {
    return <div>{t('error')}: {error.message}</div>;
  }

  const toggleFavorite = (actor) => {
    const isFavorite = favorites.actors.some(fav => fav.id === actor.id);
    if (isFavorite) {
      removeFavorite('actors', actor.id);
    } else {
      addFavorite('actors', actor);
    }
  };

  return (
    <div>
      <h2>{t('popularActors')}</h2>
      <div className="actor-grid">
        {data.results.map((actor) => (
          <div key={actor.id} className="actor-card">
            <Link to={`/actor/${actor.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <h3>{actor.name}</h3>
            </Link>
            <button onClick={() => toggleFavorite(actor)}>
              {favorites.actors.some(fav => fav.id === actor.id)
                ? t('removeFromFavorites')
                : t('addToFavorites')}
            </button>
            <p>{t('knownFor')}:</p>
            <ul>
              {actor.known_for.slice(0, 3).map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    {movie.title || movie.name}
                  </Link>
                </li>
              ))}
            </ul>
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
          disabled={!data.hasMore}
        >
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default Actors;