import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPopularMovies } from '../api/tmdb-api';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ['popularMovies', page],
    () => getPopularMovies(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {data.results.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button 
          onClick={() => setPage((old) => Math.max(old - 1, 1))} 
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage((old) => old + 1)} 
          disabled={!data.hasMore}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;