import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import { Card } from './ui';

const FantasyMoviesList = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchFantasyMovies();
    }
  }, [user]);

  const fetchFantasyMovies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fantasy_movies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMovies(data);
    } catch (error) {
      console.error('Error fetching fantasy movies:', error);
      setError(t('errorFetchingFantasyMovies'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId) => {
    if (window.confirm(t('confirmDeleteFantasyMovie'))) {
      try {
        const { error } = await supabase
          .from('fantasy_movies')
          .delete()
          .eq('id', movieId);

        if (error) throw error;

        setMovies(movies.filter(movie => movie.id !== movieId));
      } catch (error) {
        console.error('Error deleting fantasy movie:', error);
        setError(t('errorDeletingFantasyMovie'));
      }
    }
  };

  if (loading) return <div className="text-center mt-8">{t('loading')}</div>;
  if (error) return <div className="text-center mt-8 text-accent-red">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-text-white">{t('myFantasyMovies')}</h1>
      {movies.length === 0 ? (
        <p className="text-text-white">{t('noFantasyMoviesCreated')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="bg-secondary p-4">
              <img
                src={movie.poster_path || '/api/placeholder/300/450'}
                alt={movie.title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2 text-text-white">{movie.title}</h2>
              <p className="text-light-gray mb-4">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : t('releaseYearNotSet')}
              </p>
              <div className="flex flex-col space-y-2">
                <Link to={`/fantasy-movie/${movie.id}`} className="w-full">
                  <Button variant="primary" className="w-full">
                    {t('viewDetails')}
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(movie.id)}
                  variant="secondary"
                  className="w-full"
                >
                  {t('delete')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <Link to="/fantasy-movie">
          <Button variant="primary">
            {t('createNewFantasyMovie')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FantasyMoviesList;