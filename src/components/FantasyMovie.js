import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FantasyMovie = () => {
  const { t } = useTranslation();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fantasy Movie:', movie);
    // Here you would typically save the movie to some form of storage
    alert(t('fantasyMovieCreated'));
  };

  return (
    <div>
      <h2>{t('createFantasyMovie')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">{t('title')}:</label>
          <input 
            id="title"
            name="title" 
            value={movie.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="overview">{t('overview')}:</label>
          <textarea 
            id="overview"
            name="overview" 
            value={movie.overview} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="genres">{t('genres')}:</label>
          <input 
            id="genres"
            name="genres" 
            value={movie.genres} 
            onChange={handleChange} 
            placeholder={t('genresPlaceholder')} 
            required 
          />
        </div>
        <div>
          <label htmlFor="releaseDate">{t('releaseDate')}:</label>
          <input 
            id="releaseDate"
            name="releaseDate" 
            type="date" 
            value={movie.releaseDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="runtime">{t('runtime')}:</label>
          <input 
            id="runtime"
            name="runtime" 
            type="number" 
            value={movie.runtime} 
            onChange={handleChange} 
            placeholder={t('runtimePlaceholder')} 
            required 
          />
        </div>
        <div>
          <label htmlFor="productionCompanies">{t('productionCompanies')}:</label>
          <input 
            id="productionCompanies"
            name="productionCompanies" 
            value={movie.productionCompanies} 
            onChange={handleChange} 
            placeholder={t('productionCompaniesPlaceholder')} 
            required 
          />
        </div>
        <button type="submit">{t('createMovie')}</button>
      </form>
    </div>
  );
};

export default FantasyMovie;