import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;