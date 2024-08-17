import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { getAdvancedRecommendations } from '../api/tmdb-api';

const AdvancedRecommendations = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useQuery(
    ['advancedRecommendations', user.id],
    () => getAdvancedRecommendations(user.id),
    {
      enabled: !!user,
    }
  );

  if (isLoading) return <div>{t('loading')}</div>;
  if (isError) return <div>{t('errorFetchingRecommendations')}</div>;

  return (
    <div>
      <h2>{t('advancedRecommendations')}</h2>
      <p>{t('advancedRecommendationsDescription')}</p>
      <ul>
        {data.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            <p>{t('recommendationReason', { reason: movie.reason })}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedRecommendations;