import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb-api';

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQuery(['movie', id], () => getMovieDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movie details</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <h2>Genres</h2>
      <ul>
        {movie.genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <h2>Cast</h2>
      <ul>
        {movie.credits.cast.slice(0, 5).map(actor => (
          <li key={actor.id}>
            <Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}
          </li>
        ))}
      </ul>
      <h2>Similar Movies</h2>
      <ul>
        {movie.similar.results.slice(0, 5).map(similarMovie => (
          <li key={similarMovie.id}>
            <Link to={`/movie/${similarMovie.id}`}>{similarMovie.title}</Link>
          </li>
        ))}
      </ul>
      {movie.belongs_to_collection && (
        <div>
          <h2>Part of Collection</h2>
          <Link to={`/collection/${movie.belongs_to_collection.id}`}>
            {movie.belongs_to_collection.name}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;