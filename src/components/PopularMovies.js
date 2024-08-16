import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPopularMovies } from '../api/tmdb-api';

function PopularMovies() {
  const [filterYear, setFilterYear] = useState('');
  const { data: movies, isLoading, isError } = useQuery('popularMovies', getPopularMovies);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movies</div>;

  const filteredMovies = filterYear
    ? movies.filter(movie => movie.release_date.startsWith(filterYear))
    : movies;

  return (
    <div>
      <h2>Popular Movies</h2>
      <input
        type="text"
        placeholder="Filter by year (e.g., 2023)"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
      />
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link> ({movie.release_date.split('-')[0]})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularMovies;