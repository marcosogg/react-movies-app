import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { getActorDetails } from '../api/tmdb-api';

const ActorDetails = () => {
  const { id } = useParams();
  const { data: actor, isLoading, isError } = useQuery(['actor', id], () => getActorDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching actor details</div>;

  return (
    <div>
      <h1>{actor.name}</h1>
      <p>{actor.biography}</p>
      <h2>Known For</h2>
      <ul>
        {actor.movie_credits.cast.slice(0, 5).map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link> as {movie.character}
          </li>
        ))}
      </ul>
      <h2>TV Appearances</h2>
      <ul>
        {actor.tv_credits.cast.slice(0, 5).map(tvShow => (
          <li key={tvShow.id}>
            <Link to={`/tv/${tvShow.id}`}>{tvShow.name}</Link> as {tvShow.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorDetails;