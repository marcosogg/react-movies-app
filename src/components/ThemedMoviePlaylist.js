import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { searchMulti } from '../api/tmdb-api';

const ThemedMoviePlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [theme, setTheme] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults, isLoading, error } = useQuery(
    ['search', searchQuery],
    () => searchMulti({ query: searchQuery, type: 'movie' }),
    {
      enabled: !!searchQuery,
    }
  );

  const handleAddToPlaylist = (movie) => {
    setPlaylist([...playlist, movie]);
  };

  const handleRemoveFromPlaylist = (movieId) => {
    setPlaylist(playlist.filter(movie => movie.id !== movieId));
  };

  return (
    <div>
      <h2>Themed Movie Playlist</h2>
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="Enter playlist theme"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <div>
        <h3>Search Results</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {searchResults && searchResults.results && (
          <ul>
            {searchResults.results.map(movie => (
              <li key={movie.id}>
                {movie.title}
                <button onClick={() => handleAddToPlaylist(movie)}>Add to Playlist</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Your Playlist: {theme}</h3>
        <ul>
          {playlist.map(movie => (
            <li key={movie.id}>
              {movie.title}
              <button onClick={() => handleRemoveFromPlaylist(movie.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemedMoviePlaylist;