// src/components/FantasyMovie.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { FormInput, FormTextArea } from './ui/FormComponents';
import Button from './ui/Button';
import PosterUpload from './PosterUpload';

const FantasyMovie = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    genres: '',
    releaseDate: '',
    runtime: '',
    productionCompanies: '',
    cast: '',
    director: '',
    budget: '',
    tagline: ''
  });
  const [poster, setPoster] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!movie.title.trim()) newErrors.title = t('titleRequired');
    if (!movie.overview.trim()) newErrors.overview = t('overviewRequired');
    if (!movie.genres.trim()) newErrors.genres = t('genresRequired');
    if (!movie.releaseDate) newErrors.releaseDate = t('releaseDateRequired');
    if (!movie.runtime) newErrors.runtime = t('runtimeRequired');
    if (!movie.productionCompanies.trim()) newErrors.productionCompanies = t('productionCompaniesRequired');
    if (!movie.cast.trim()) newErrors.cast = t('castRequired');
    if (!movie.director.trim()) newErrors.director = t('directorRequired');
    if (!movie.budget) newErrors.budget = t('budgetRequired');
    if (movie.tagline.length > 100) newErrors.tagline = t('taglineTooLong');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePosterSelect = (file) => {
    setPoster(file);
  };

  const uploadPoster = async () => {
    if (!poster) return null;

    const fileExt = poster.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      const { error: uploadError, data } = await supabase.storage
        .from('movie-posters')
        .upload(filePath, poster);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('movie-posters')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('URL error:', urlError);
        throw urlError;
      }

      return publicUrl;
    } catch (error) {
      console.error('Poster upload failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    console.log('Current user:', user); // Log the entire user object
  
    if (!user || !user.id) {
      console.error('User is not authenticated');
      alert(t('userNotAuthenticated'));
      return;
    }
  
    try {
      console.log('Uploading poster...');
      const posterUrl = await uploadPoster();
      console.log('Poster uploaded successfully:', posterUrl);
  
      const movieData = {
        user_id: user.id,
        title: movie.title,
        overview: movie.overview,
        genres: movie.genres.split(',').map(genre => genre.trim()),
        release_date: movie.releaseDate,
        runtime: parseInt(movie.runtime, 10),
        production_companies: movie.productionCompanies.split(',').map(company => company.trim()),
        movie_cast: movie.cast.split(',').map(actor => actor.trim()),
        director: movie.director,
        budget: parseInt(movie.budget, 10),
        tagline: movie.tagline,
        poster_path: posterUrl
      };
      console.log('Inserting movie data:', movieData);
  
      const { data, error } = await supabase
        .from('fantasy_movies')
        .insert([movieData]);
  
      if (error) {
        console.error('Supabase error:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        throw error;
      }
  
      console.log('Movie inserted successfully:', data);
      alert(t('fantasyMovieCreated'));
      // Reset form and state
      setMovie({
        title: '',
        overview: '',
        genres: '',
        releaseDate: '',
        runtime: '',
        productionCompanies: '',
        cast: '',
        director: '',
        budget: '',
        tagline: ''
      });
      setPoster(null);
    } catch (error) {
      console.error('Error creating fantasy movie:', error);
      console.error('Error details:', error.details, error.hint, error.message);
      alert(t('errorCreatingMovie') + ': ' + error.message);
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
          error={errors.title}
          required
        />
        <FormTextArea
          label={t('overview')}
          id="overview"
          name="overview"
          value={movie.overview}
          onChange={handleChange}
          error={errors.overview}
          required
        />
        <FormInput
          label={t('genres')}
          id="genres"
          name="genres"
          value={movie.genres}
          onChange={handleChange}
          placeholder={t('genresPlaceholder')}
          error={errors.genres}
          required
        />
        <FormInput
          label={t('releaseDate')}
          id="releaseDate"
          name="releaseDate"
          type="date"
          value={movie.releaseDate}
          onChange={handleChange}
          error={errors.releaseDate}
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
          error={errors.runtime}
          required
        />
        <FormInput
          label={t('productionCompanies')}
          id="productionCompanies"
          name="productionCompanies"
          value={movie.productionCompanies}
          onChange={handleChange}
          placeholder={t('productionCompaniesPlaceholder')}
          error={errors.productionCompanies}
          required
        />
        <FormInput
          label={t('cast')}
          id="cast"
          name="cast"
          value={movie.cast}
          onChange={handleChange}
          placeholder={t('castPlaceholder')}
          error={errors.cast}
          required
        />
        <FormInput
          label={t('director')}
          id="director"
          name="director"
          value={movie.director}
          onChange={handleChange}
          error={errors.director}
          required
        />
        <FormInput
          label={t('budget')}
          id="budget"
          name="budget"
          type="number"
          value={movie.budget}
          onChange={handleChange}
          placeholder={t('budgetPlaceholder')}
          error={errors.budget}
          required
        />
        <FormInput
          label={t('tagline')}
          id="tagline"
          name="tagline"
          value={movie.tagline}
          onChange={handleChange}
          placeholder={t('taglinePlaceholder')}
          error={errors.tagline}
          maxLength={100}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {t('moviePoster')}
          </label>
          <PosterUpload onFileSelect={handlePosterSelect} />
          {poster && <p className="mt-2 text-sm text-gray-300">{t('posterSelected')}: {poster.name}</p>}
        </div>
        <Button type="submit" variant="primary">
          {t('createMovie')}
        </Button>
      </form>
    </div>
  );
};

export default FantasyMovie;
