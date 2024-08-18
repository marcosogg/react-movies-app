// src/components/Search.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { searchMulti } from '../api/tmdb-api';
import { FormInput } from './ui/FormComponents';
import Button from './ui/Button';

const Search = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useState({
    query: '',
    type: '',
    year: '',
    genre: '',
  });

  const { data, isLoading, isError, refetch } = useQuery(
    ['search', searchParams],
    () => searchMulti(searchParams),
    { enabled: false }
  );

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto mb-8 p-6 bg-secondary rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">{t('search.title')}</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label={t('search.placeholder')}
            id="query"
            name="query"
            value={searchParams.query}
            onChange={handleInputChange}
            required
          />
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
              {t('search.type.all')}
            </label>
            <select
              id="type"
              name="type"
              value={searchParams.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">{t('search.type.all')}</option>
              <option value="movie">{t('search.type.movies')}</option>
              <option value="tv">{t('search.type.tvShows')}</option>
              <option value="person">{t('search.type.people')}</option>
            </select>
          </div>
          <FormInput
            label={t('search.year')}
            id="year"
            name="year"
            type="number"
            value={searchParams.year}
            onChange={handleInputChange}
          />
          <FormInput
            label={t('search.genre')}
            id="genre"
            name="genre"
            value={searchParams.genre}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="primary">
            {t('search.submit')}
          </Button>
        </form>
      </div>

      {isLoading && <div className="text-center text-white">{t('loading')}</div>}
      {isError && <div className="text-center text-accent-red">{t('error')}</div>}
      {data && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">{t('search.results')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.results.map((item) => (
              <Link 
                key={item.id} 
                to={`/${item.media_type}/${item.id}`} 
                className="block bg-secondary rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                  alt={item.title || item.name}
                  className="w-full h-auto"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold truncate text-white">{item.title || item.name}</h3>
                  <p className="text-xs text-gray-400">{item.media_type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
