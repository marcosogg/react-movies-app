import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import AdvancedRecommendations from './AdvancedRecommendations';

const Home = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <nav>
        <ul>
          <li><Link to="/popular-movies">{t('popularMovies')}</Link></li>
          <li><Link to="/actors">{t('actors')}</Link></li>
          <li><Link to="/tv-series">{t('tvSeries')}</Link></li>
          {user && <li><Link to="/fantasy-movie">{t('createFantasyMovie')}</Link></li>}
        </ul>
      </nav>
      {user ? (
        <div>
          <p>{t('welcomeUser', { name: user.email })}</p>
          <button onClick={signOut}>{t('logout')}</button>
          <AdvancedRecommendations />
        </div>
      ) : (
        <Link to="/login">{t('login')}</Link>
      )}
    </div>
  );
};

export default Home;