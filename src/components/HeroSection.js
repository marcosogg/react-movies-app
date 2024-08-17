import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
      <img 
        src="/api/placeholder/1920/1080" 
        alt="Featured movie" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('welcome')}</h1>
        <p className="text-xl md:text-2xl mb-8">{t('homeDescription')}</p>
        <Link 
          to="/popular-movies" 
          className="bg-accent-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300"
        >
          {t('exploreMovies')}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;