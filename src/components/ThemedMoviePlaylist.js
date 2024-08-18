// src/components/ThemedMoviePlaylist.js
import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { searchMulti } from '../api/tmdb-api';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { debounce } from 'lodash';
import { FormInput } from './ui/FormComponents';
import Button from './ui/Button';

const MAX_PLAYLIST_NAME_LENGTH = 50;

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  } shadow-lg z-50 flex items-center`}>
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
);

const ThemedMoviePlaylist = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState({ name: '', movies: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const debouncedSearch = useCallback((query) => {
    debounce((q) => setSearchQuery(q), 300)(query);
  }, []);

  const { data: searchResults, isLoading, error } = useQuery(
    ['search', searchQuery],
    () => searchMulti({ query: searchQuery, type: 'movie' }),
    { enabled: !!searchQuery }
  );

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide after 3 seconds
  };

  const handleAddToPlaylist = (movie) => {
    setPlaylist(prev => ({
      ...prev,
      movies: [...prev.movies, movie]
    }));
    showToast(t('Movie Added To Playlist'));
  };

  const handleRemoveFromPlaylist = (movieId) => {
    setPlaylist(prev => ({
      ...prev,
      movies: prev.movies.filter(movie => movie.id !== movieId)
    }));
    showToast(t('Movie Removed From Playlist'));
  };

  const handleSavePlaylist = async () => {
    if (!user) {
      showToast(t('loginToSavePlaylist'), 'error');
      return;
    }

    try {
      const { error } = await supabase
        .from('themed_playlists')
        .insert({ 
          user_id: user.id, 
          name: playlist.name, 
          movies: JSON.stringify(playlist.movies)
        });

      if (error) throw error;

      showToast(t('Playlist Saved'));
      setPlaylist({ name: '', movies: [] });
    } catch (error) {
      console.error('Error saving playlist:', error);
      showToast(t('errorSavingPlaylist'), 'error');
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(playlist.movies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPlaylist(prev => ({ ...prev, movies: items }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-dark-bg text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 className="text-4xl font-bold mb-6">{t('Create a Playlist')}</h1>
      <div className="mb-6 space-y-4">
        <FormInput
          label={t('Playlist Name')}
          id="playlistName"
          value={playlist.name}
          onChange={(e) => setPlaylist(prev => ({ ...prev, name: e.target.value.slice(0, MAX_PLAYLIST_NAME_LENGTH) }))}
          maxLength={MAX_PLAYLIST_NAME_LENGTH}
        />
        <FormInput
          label={t('Search Movies')}
          id="movieSearch"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{t('Search Results')}</h2>
          {isLoading && <div className="loader">Loading...</div>}
          {error && <p className="text-accent-red">{t('error')}: {error.message}</p>}
          {searchResults && (
            <ul className="space-y-4">
              {searchResults.results.map(movie => (
                <li key={movie.id} className="flex items-center bg-secondary p-4 rounded-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.release_date?.split('-')[0]}</p>
                  </div>
                  <Button onClick={() => handleAddToPlaylist(movie)} variant="secondary">
                    {t('Add')}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-white">{t('Your Playlist')}</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="playlist">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {playlist.movies.map((movie, index) => (
                    <Draggable key={movie.id} draggableId={movie.id.toString()} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center bg-secondary p-4 rounded-lg"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                            alt={movie.title}
                            className="w-16 h-24 object-cover rounded mr-4"
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{movie.title}</h3>
                            <p className="text-sm text-gray-400">{movie.release_date?.split('-')[0]}</p>
                          </div>
                          <Button onClick={() => handleRemoveFromPlaylist(movie.id)} variant="tertiary">
                            {t('Remove')}
                          </Button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            onClick={handleSavePlaylist}
            variant="primary"
            className="w-full mt-6"
          >
            {t('Save Playlist')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThemedMoviePlaylist;
