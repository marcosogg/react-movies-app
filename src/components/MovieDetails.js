import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovieDetails } from '../api/tmdb-api';

function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQuery(['movie', id], () => getMovieDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movie details</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Production Companies: {movie.production_companies.map(company => company.name).join(', ')}</p>
      {movie.belongs_to_collection && (
        <p>Part of: <Link to={`/collection/${movie.belongs_to_collection.id}`}>{movie.belongs_to_collection.name}</Link></p>
      )}
      <h3>Cast</h3>
      <ul>
        {movie.credits.cast.slice(0, 5).map(actor => (
          <li key={actor.id}><Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}</li>
        ))}
      </ul>
      <h3>Similar Movies</h3>
      <ul>
        {movie.similar.results.slice(0, 5).map(similarMovie => (
          <li key={similarMovie.id}><Link to={`/movie/${similarMovie.id}`}>{similarMovie.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;