import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPopularActors } from '../api/tmdb-api';

function Actors() {
  const { data: actors, isLoading, isError } = useQuery('popularActors', getPopularActors);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching actors</div>;

  return (
    <div>
      <h2>Popular Actors</h2>
      <ul>
        {actors.map(actor => (
          <li key={actor.id}>
            <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Actors;