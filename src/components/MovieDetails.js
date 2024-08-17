import React from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb-api';
import { useTranslation } from 'react-i18next';

const MovieDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQuery(['movie', id], () => getMovieDetails(id));

  if (isLoading) return <div>{t('loading')}</div>;
  if (isError) return <div>{t('errorFetchingMovieDetails')}</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <h2>{t('genres')}</h2>
      <ul>
        {movie.genres.map(genre => (
          <li key={genre.id}>
            <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
      <h2>{t('cast')}</h2>
      <ul>
        {movie.credits.cast.slice(0, 10).map(actor => (
          <li key={actor.id}>
            <Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}
          </li>
        ))}
      </ul>
      <h2>{t('crew')}</h2>
      <ul>
        {movie.credits.crew.slice(0, 10).map(crewMember => (
          <li key={`${crewMember.id}-${crewMember.job}`}>
            <Link to={`/person/${crewMember.id}`}>{crewMember.name}</Link> - {crewMember.job}
          </li>
        ))}
      </ul>
      <h2>{t('similarMovies')}</h2>
      <ul>
        {movie.similar.results.slice(0, 5).map(similarMovie => (
          <li key={similarMovie.id}>
            <Link to={`/movie/${similarMovie.id}`}>{similarMovie.title}</Link>
          </li>
        ))}
      </ul>
      {movie.belongs_to_collection && (
        <div>
          <h2>{t('partOfCollection')}</h2>
          <Link to={`/collection/${movie.belongs_to_collection.id}`}>
            {movie.belongs_to_collection.name}
          </Link>
        </div>
      )}
      <h2>{t('productionCompanies')}</h2>
      <ul>
        {movie.production_companies.map(company => (
          <li key={company.id}>
            <Link to={`/company/${company.id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;