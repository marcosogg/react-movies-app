import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const MovieCard = React.memo(({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="card transition-transform hover:scale-105">
      <LazyImage
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-70 transition-opacity flex flex-col justify-end p-4 text-white opacity-0 hover:opacity-100">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm">{new Date(movie.release_date).getFullYear()}</p>
        <p className="text-sm mt-2">{movie.vote_average.toFixed(1)} / 10</p>
      </div>
    </Link>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;