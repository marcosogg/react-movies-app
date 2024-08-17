import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Movies App</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/popular-movies">{t('nav.movies')}</Link></li>
              <li><Link to="/actors">{t('nav.actors')}</Link></li>
              <li><Link to="/tv-series">{t('nav.tvSeries')}</Link></li>
              <li><Link to="/search">{t('nav.search')}</Link></li>
              {user && (
                <>
                  <li><Link to="/fantasy-movie">{t('nav.fantasyMovie')}</Link></li>
                  <li><Link to="/favorites">{t('nav.favorites')}</Link></li>
                  <li><Link to="/themed-playlist">{t('nav.themedPlaylist')}</Link></li>
                </>
              )}
              {user ? (
                <li><button onClick={signOut}>{t('logout')}</button></li>
              ) : (
                <li><Link to="/login">{t('login')}</Link></li>
              )}
            </ul>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; 2024 Movies App
        </div>
      </footer>
    </div>
  );
};

export default Layout;