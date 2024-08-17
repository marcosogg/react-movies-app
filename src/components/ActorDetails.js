import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getActorDetails } from '../api/tmdb-api';
import { useFavorites } from '../context/FavoritesContext';

const ActorDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { data: actor, isLoading, isError, error } = useQuery(['actor', id], () => getActorDetails(id));

  if (isLoading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">{t('error')}: {error.message}</div>;

  const isFavorite = favorites.actors.some(fav => fav.item_id === actor.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite('actors', actor.id);
    } else {
      addFavorite('actors', actor);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
          <p className="mb-4">{actor.biography}</p>
          <div className="mb-4">
            <strong>{t('birthday')}:</strong> {actor.birthday}
          </div>
          <div className="mb-4">
            <strong>{t('placeOfBirth')}:</strong> {actor.place_of_birth}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`mt-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            {isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
          </button>
          <h2 className="text-2xl font-bold mt-8 mb-4">{t('knownFor')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {actor.movie_credits.cast.slice(0, 8).map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 font-semibold">{movie.title}</p>
                <p className="text-sm text-gray-600">{movie.character}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;