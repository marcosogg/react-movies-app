import React from 'react';
import { useParams } from 'react-router-dom';
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
    </div>
  );
}

export default MovieDetails;