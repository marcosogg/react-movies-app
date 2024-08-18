// src/components/PlaylistDisplay.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import { Card } from './ui';

const PlaylistDisplay = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaylists = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('themed_playlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError(t('errorFetchingPlaylists'));
    } finally {
      setLoading(false);
    }
  }, [user, t]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleDeletePlaylist = async (playlistId) => {
    try {
      const { error } = await supabase
        .from('themed_playlists')
        .delete()
        .eq('id', playlistId);

      if (error) throw error;

      setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    } catch (error) {
      console.error('Error deleting playlist:', error);
      setError(t('errorDeletingPlaylist'));
    }
  };

  if (loading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (error) return <div className="text-center mt-8 text-accent-red">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-text-white">{t('My Playlists')}</h1>
      {playlists.length === 0 ? (
        <p className="text-text-white">{t('No Playlists Found')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="bg-secondary p-4">
              <h2 className="text-xl font-semibold mb-2 text-text-white">{playlist.name}</h2>
              <p className="text-light-gray mb-4">
                {t('Movies Count', { count: JSON.parse(playlist.movies).length })}
              </p>
              <div className="flex justify-between">
                <Link to={`/playlist/${playlist.id}`}>
                  <Button variant="primary">
                    {t('View Details')}
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  variant="secondary"
                >
                  {t('delete')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Link to="/themed-playlist" className="inline-block mt-6">
        <Button variant="primary">
          {t('Create Playlist')}
        </Button>
      </Link>
    </div>
  );
};

export default PlaylistDisplay;