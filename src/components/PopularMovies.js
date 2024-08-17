import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPopularMovies } from '../api/tmdb-api';
import MovieCard from './MovieCard';

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(['popularMovies', page], () => getPopularMovies(page));

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setPage(old => Math.max(old - 1, 1))} 
          disabled={page === 1}
          className="bg-accent text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(old => (!data.total_pages || old < data.total_pages) ? old + 1 : old)}
          disabled={page === (data.total_pages || 1)}
          className="bg-accent text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;