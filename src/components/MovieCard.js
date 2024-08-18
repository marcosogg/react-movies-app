import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <Card>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate text-text-white">{movie.title}</h3>
          <p className="text-sm text-light-gray">{movie.release_date}</p>
        </div>
      </Card>
    </Link>
  );
};

export default MovieCard;