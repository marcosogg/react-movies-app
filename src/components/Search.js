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
    <div>
      <h1>{t('search.title')}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={searchParams.query}
          onChange={handleInputChange}
          placeholder={t('search.placeholder')}
          required
        />
        <select name="type" value={searchParams.type} onChange={handleInputChange}>
          <option value="">{t('search.type.all')}</option>
          <option value="movie">{t('search.type.movies')}</option>
          <option value="tv">{t('search.type.tvShows')}</option>
          <option value="person">{t('search.type.people')}</option>
        </select>
        <input
          type="number"
          name="year"
          value={searchParams.year}
          onChange={handleInputChange}
          placeholder={t('search.year')}
        />
        <input
          type="text"
          name="genre"
          value={searchParams.genre}
          onChange={handleInputChange}
          placeholder={t('search.genre')}
        />
        <button type="submit">{t('search.submit')}</button>
      </form>

      {isLoading && <div>{t('loading')}</div>}
      {isError && <div>{t('error')}</div>}
      {data && (
        <div>
          <h2>{t('search.results')}</h2>
          <ul>
            {data.results.map((item) => (
              <li key={item.id}>
                {item.media_type === 'movie' && (
                  <Link to={`/movie/${item.id}`}>{item.title}</Link>
                )}
                {item.media_type === 'tv' && (
                  <Link to={`/tv/${item.id}`}>{item.name}</Link>
                )}
                {item.media_type === 'person' && (
                  <Link to={`/actor/${item.id}`}>{item.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;