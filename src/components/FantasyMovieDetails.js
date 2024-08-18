import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const FantasyMovieDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFantasyMovie();
  }, [id, user]);

  const fetchFantasyMovie = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fantasy_movies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data.user_id !== user.id) {
        throw new Error('Unauthorized');
      }

      setMovie(data);
    } catch (error) {
      console.error('Error fetching fantasy movie:', error);
      setError(error.message === 'Unauthorized' ? t('unauthorizedAccess') : t('errorFetchingFantasyMovie'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t('confirmDeleteFantasyMovie'))) {
      try {
        const { error } = await supabase
          .from('fantasy_movies')
          .delete()
          .eq('id', id);

        if (error) throw error;

        navigate('/fantasy-movies');
      } catch (error) {
        console.error('Error deleting fantasy movie:', error);
        setError(t('errorDeletingFantasyMovie'));
      }
    }
  };

  if (loading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (error) return <div className="text-center mt-8 text-accent-red">{error}</div>;
  if (!movie) return <div className="text-center mt-8">{t('movieNotFound')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={movie.poster_path || '/api/placeholder/300/450'}
              alt={movie.title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-accent-red font-semibold">
              {t('fantasyMovie')}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-white">
              {movie.title}
            </h1>
            <p className="mt-2 text-gray-300">{movie.tagline}</p>
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-white text-xl mb-4">{t('overview')}</h2>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-bold">{t('genres')}</h3>
              <p className="text-gray-300">{movie.genres.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-white font-bold">{t('releaseDate')}</h3>
              <p className="text-gray-300">{new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-white font-bold">{t('runtime')}</h3>
              <p className="text-gray-300">{movie.runtime} {t('minutes')}</p>
            </div>
            <div>
              <h3 className="text-white font-bold">{t('budget')}</h3>
              <p className="text-gray-300">${movie.budget.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-white font-bold">{t('productionCompanies')}</h3>
              <p className="text-gray-300">{movie.production_companies.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-white font-bold">{t('director')}</h3>
              <p className="text-gray-300">{movie.director}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-white font-bold mb-2">{t('cast')}</h3>
            <p className="text-gray-300">{movie.movie_cast.join(', ')}</p>
          </div>
        </div>
        <div className="p-8 flex justify-between">
          <Button
            onClick={() => navigate('/fantasy-movies')}
            variant="secondary"
          >
            {t('backToList')}
          </Button>
          <Button
            onClick={handleDelete}
            variant="primary"
          >
            {t('deleteMovie')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FantasyMovieDetails;