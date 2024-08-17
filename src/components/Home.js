import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <div className="bg-blue-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
          <p className="text-xl mb-8">{t('homeDescription')}</p>
          <Link to="/popular-movies" className="bg-white text-blue-600 py-2 px-6 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300">
            {t('exploreMovies')}
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">{t('featuredSections')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/popular-movies" className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 transition duration-300">
            <h3 className="text-xl font-semibold">{t('popularMovies')}</h3>
          </Link>
          <Link to="/actors" className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 transition duration-300">
            <h3 className="text-xl font-semibold">{t('actors')}</h3>
          </Link>
          <Link to="/tv-series" className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 transition duration-300">
            <h3 className="text-xl font-semibold">{t('tvSeries')}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;