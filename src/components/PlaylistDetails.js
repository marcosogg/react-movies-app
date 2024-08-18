// src/components/PlaylistDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import { Card } from './ui';

const PlaylistDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('themed_playlists')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        setError(t('errorFetchingPlaylist'));
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id, user, t]);

  if (loading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (error) return <div className="text-center mt-8 text-accent-red">{error}</div>;
  if (!playlist) return <div className="text-center mt-8">{t('playlistNotFound')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-text-white">{playlist.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {JSON.parse(playlist.movies).map((movie) => (
          <Card key={movie.id} className="bg-secondary p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2 text-text-white">{movie.title}</h2>
            <p className="text-light-gray mb-4">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </p>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="primary">
                {t('View Details')}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
      <Link to="/playlists" className="inline-block mt-6">
        <Button variant="secondary">
          {t('Back to Playlists')}
        </Button>
      </Link>
    </div>
  );
};

export default PlaylistDetails;