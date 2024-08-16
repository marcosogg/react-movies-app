import React from 'react';
import { useQuery } from 'react-query';
import { getPopularActors } from '../api/tmdb-api';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Actors = () => {
  const { data, error, isLoading } = useQuery(['popularActors', 1], () => getPopularActors(1));
  const { addFavorite } = useFavorites();

  if (isLoading) return <div>Loading actors...</div>;
  if (error) return <div>Error loading actors: {error.message}</div>;

  return (
    <div>
      <h2>Popular Actors</h2>
      {data && data.results ? (
        <ul>
          {data.results.map(actor => (
            <li key={actor.id}>
              <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
              <button onClick={() => addFavorite('actors', { id: actor.id, name: actor.name })}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No actors found</div>
      )}
    </div>
  );
};

export default Actors;