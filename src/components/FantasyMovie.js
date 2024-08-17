import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

const FantasyMovie = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    genres: '',
    releaseDate: '',
    runtime: '',
    productionCompanies: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('fantasy_movies')
        .insert([{ ...movie, user_id: user.id }]);

      if (error) throw error;

      alert(t('fantasyMovieCreated'));
      setMovie({
        title: '',
        overview: '',
        genres: '',
        releaseDate: '',
        runtime: '',
        productionCompanies: ''
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{t('createFantasyMovie')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">{t('title')}:</label>
          <input 
            id="title"
            name="title" 
            value={movie.title} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="overview" className="block mb-1">{t('overview')}:</label>
          <textarea 
            id="overview"
            name="overview" 
            value={movie.overview} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="genres" className="block mb-1">{t('genres')}:</label>
          <input 
            id="genres"
            name="genres" 
            value={movie.genres} 
            onChange={handleChange} 
            placeholder={t('genresPlaceholder')} 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="releaseDate" className="block mb-1">{t('releaseDate')}:</label>
          <input 
            id="releaseDate"
            name="releaseDate" 
            type="date" 
            value={movie.releaseDate} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="runtime" className="block mb-1">{t('runtime')}:</label>
          <input 
            id="runtime"
            name="runtime" 
            type="number" 
            value={movie.runtime} 
            onChange={handleChange} 
            placeholder={t('runtimePlaceholder')} 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="productionCompanies" className="block mb-1">{t('productionCompanies')}:</label>
          <input 
            id="productionCompanies"
            name="productionCompanies" 
            value={movie.productionCompanies} 
            onChange={handleChange} 
            placeholder={t('productionCompaniesPlaceholder')} 
            required 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {t('createMovie')}
        </button>
      </form>
    </div>
  );
};

export default FantasyMovie;