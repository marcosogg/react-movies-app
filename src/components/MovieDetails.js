import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();

  // We'll implement the actual data fetching later
  const movie = {
    title: `Movie ${id}`,
    overview: 'This is a placeholder for the movie overview.',
    genres: ['Action', 'Adventure'],
    release_date: '2023-01-01',
    runtime: 120,
    production_companies: ['Company A', 'Company B'],
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Production Companies: {movie.production_companies.join(', ')}</p>
    </div>
  );
}

export default MovieDetails;