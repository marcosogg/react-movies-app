import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { searchMulti } from '../api/tmdb-api';

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
      <h1 className="text-3xl font-bold mb-6">{t('search.title')}</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <input
              type="text"
              name="query"
              value={searchParams.query}
              onChange={handleInputChange}
              placeholder={t('search.placeholder')}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <select 
              name="type" 
              value={searchParams.type} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">{t('search.type.all')}</option>
              <option value="movie">{t('search.type.movies')}</option>
              <option value="tv">{t('search.type.tvShows')}</option>
              <option value="person">{t('search.type.people')}</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <input
              type="number"
              name="year"
              value={searchParams.year}
              onChange={handleInputChange}
              placeholder={t('search.year')}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <input
              type="text"
              name="genre"
              value={searchParams.genre}
              onChange={handleInputChange}
              placeholder={t('search.genre')}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {t('search.submit')}
        </button>
      </form>

      {isLoading && <div className="text-center">{t('loading')}</div>}
      {isError && <div className="text-center text-red-500">{t('error')}</div>}
      {data && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('search.results')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.results.map((item) => (
              <Link 
                key={item.id} 
                to={`/${item.media_type}/${item.id}`} 
                className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                  alt={item.title || item.name}
                  className="w-full h-auto"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                  <p className="text-xs text-gray-600">{item.media_type}</p>
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