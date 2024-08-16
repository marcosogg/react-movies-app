import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getActorDetails } from '../api/tmdb-api';

function ActorDetails() {
  const { id } = useParams();
  const { data: actor, isLoading, isError } = useQuery(['actor', id], () => getActorDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching actor details</div>;

  return (
    <div>
      <h2>{actor.name}</h2>
      <p>{actor.biography}</p>
      <h3>Known For</h3>
      <ul>
        {actor.movie_credits.cast.slice(0, 5).map(movie => (
          <li key={movie.id}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default ActorDetails;