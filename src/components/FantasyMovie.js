// src/components/FantasyMovie.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { FormInput, FormTextArea } from './ui/FormComponents';
import Button from './ui/Button';

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
    <div className="max-w-md mx-auto mt-8 p-6 bg-secondary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">{t('createFantasyMovie')}</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t('title')}
          id="title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          required
        />
        <FormTextArea
          label={t('overview')}
          id="overview"
          name="overview"
          value={movie.overview}
          onChange={handleChange}
          required
        />
        <FormInput
          label={t('genres')}
          id="genres"
          name="genres"
          value={movie.genres}
          onChange={handleChange}
          placeholder={t('genresPlaceholder')}
          required
        />
        <FormInput
          label={t('releaseDate')}
          id="releaseDate"
          name="releaseDate"
          type="date"
          value={movie.releaseDate}
          onChange={handleChange}
          required
        />
        <FormInput
          label={t('runtime')}
          id="runtime"
          name="runtime"
          type="number"
          value={movie.runtime}
          onChange={handleChange}
          placeholder={t('runtimePlaceholder')}
          required
        />
        <FormInput
          label={t('productionCompanies')}
          id="productionCompanies"
          name="productionCompanies"
          value={movie.productionCompanies}
          onChange={handleChange}
          placeholder={t('productionCompaniesPlaceholder')}
          required
        />
        <Button type="submit" variant="primary">
          {t('createMovie')}
        </Button>
      </form>
    </div>
  );
};

export default FantasyMovie;
