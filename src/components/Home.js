import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSection from './HeroSection';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4">{t('featuredSections')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/popular-movies" className="bg-hover-gray p-4 rounded-lg text-center hover:bg-opacity-80 transition duration-300">
            <h3 className="text-xl font-semibold">{t('popularMovies')}</h3>
          </Link>
          <Link to="/actors" className="bg-hover-gray p-4 rounded-lg text-center hover:bg-opacity-80 transition duration-300">
            <h3 className="text-xl font-semibold">{t('actors')}</h3>
          </Link>
          <Link to="/tv-series" className="bg-hover-gray p-4 rounded-lg text-center hover:bg-opacity-80 transition duration-300">
            <h3 className="text-xl font-semibold">{t('tvSeries')}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;