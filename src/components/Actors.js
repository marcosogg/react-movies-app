import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPopularActors } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';
import Carousel from './Carousel';
import LazyImage from './LazyImage';

const Actors = () => {
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(
    ['popularActors', page],
    () => getPopularActors(page),
    { keepPreviousData: true }
  );

  const toggleFavorite = useCallback((actor) => {
    const isFavorite = favorites.actors.some(fav => fav.item_id === actor.id);
    if (isFavorite) {
      removeFavorite('actors', actor.id);
    } else {
      addFavorite('actors', {
        id: actor.id,
        name: actor.name,
        profile_path: actor.profile_path
      });
    }
  }, [favorites.actors, addFavorite, removeFavorite]);

  if (isLoading) return <div>{t('loading')}</div>;
  if (isError) return <div>{t('error')}: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="section-title">{t('Actors')}</h2>
      <Carousel>
        {data.results.map((actor) => (
          <div key={actor.id} className="flex-none w-48 mr-4">
            <div className="card">
              <Link to={`/actor/${actor.id}`}>
                <LazyImage
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-auto"
                />
              </Link>
              <div className="card-body">
                <h3 className="font-semibold text-lg mb-2">{actor.name}</h3>
                <button
                  onClick={() => toggleFavorite(actor)}
                  className={`btn ${
                    favorites.actors.some(fav => fav.item_id === actor.id)
                      ? 'btn-secondary'
                      : 'btn-primary'
                  }`}
                >
                  {favorites.actors.some(fav => fav.item_id === actor.id)
                    ? t('removeFromFavorites')
                    : t('addToFavorites')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="mt-8 flex justify-center space-x-4">
        <button 
          onClick={() => setPage((old) => Math.max(old - 1, 1))} 
          disabled={page === 1}
          className="btn btn-primary disabled:bg-gray-300"
        >
          {t('previousPage')}
        </button>
        <span className="px-4 py-2">{t('page')} {page}</span>
        <button 
          onClick={() => setPage((old) => old + 1)} 
          disabled={!data.results.length}
          className="btn btn-primary disabled:bg-gray-300"
        >
          {t('nextPage')}
        </button>
      </div>
    </div>
  );
};

export default Actors;