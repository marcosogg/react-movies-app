import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { searchMulti } from '../api/tmdb-api';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

const ThemedMoviePlaylist = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState({ name: '', movies: [] });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults, isLoading, error } = useQuery(
    ['search', searchQuery],
    () => searchMulti({ query: searchQuery, type: 'movie' }),
    { enabled: !!searchQuery }
  );

  const handleAddToPlaylist = (movie) => {
    setPlaylist(prev => ({
      ...prev,
      movies: [...prev.movies, movie]
    }));
  };

  const handleRemoveFromPlaylist = (movieId) => {
    setPlaylist(prev => ({
      ...prev,
      movies: prev.movies.filter(movie => movie.id !== movieId)
    }));
  };

  const handleSavePlaylist = async () => {
    if (!user) {
      alert(t('loginToSavePlaylist'));
      return;
    }

    const { data, error } = await supabase
      .from('themed_playlists')
      .insert({ user_id: user.id, name: playlist.name, movies: playlist.movies });

    if (error) {
      console.error('Error saving playlist:', error);
      alert(t('errorSavingPlaylist'));
    } else {
      alert(t('playlistSaved'));
      setPlaylist({ name: '', movies: [] });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('themedMoviePlaylist')}</h1>
      <div className="mb-6">
        <input
          type="text"
          value={playlist.name}
          onChange={(e) => setPlaylist(prev => ({ ...prev, name: e.target.value }))}
          placeholder={t('playlistName')}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchMovies')}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('searchResults')}</h2>
          {isLoading && <p>{t('loading')}</p>}
          {error && <p className="text-red-500">{t('error')}: {error.message}</p>}
          {searchResults && (
            <ul className="space-y-2">
              {searchResults.results.map(movie => (
                <li key={movie.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{movie.title}</span>
                  <button
                    onClick={() => handleAddToPlaylist(movie)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    {t('addToPlaylist')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('yourPlaylist')}: {playlist.name}</h2>
          <ul className="space-y-2">
            {playlist.movies.map(movie => (
              <li key={movie.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{movie.title}</span>
                <button
                  onClick={() => handleRemoveFromPlaylist(movie.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  {t('remove')}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSavePlaylist}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {t('savePlaylist')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemedMoviePlaylist;