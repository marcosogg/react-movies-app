import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-dark-gray text-white">
      <header className="fixed top-0 left-0 right-0 bg-dark-gray bg-opacity-90 text-white p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-accent-red">Movies App</Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Link to="/popular-movies" className="hover:text-accent-red transition-colors">{t('nav.movies')}</Link></li>
              <li><Link to="/actors" className="hover:text-accent-red transition-colors">{t('nav.actors')}</Link></li>
              <li><Link to="/tv-series" className="hover:text-accent-red transition-colors">{t('nav.tvSeries')}</Link></li>
              <li><Link to="/search" className="hover:text-accent-red transition-colors">{t('nav.search')}</Link></li>
              {user && (
                <>
                  <li><Link to="/fantasy-movie" className="hover:text-accent-red transition-colors">{t('nav.fantasyMovie')}</Link></li>
                  <li><Link to="/favorites" className="hover:text-accent-red transition-colors">{t('nav.favorites')}</Link></li>
                  <li><Link to="/themed-playlist" className="hover:text-accent-red transition-colors">{t('nav.themedPlaylist')}</Link></li>
                </>
              )}
              {user ? (
                <li><button onClick={signOut} className="hover:text-accent-red transition-colors">{t('logout')}</button></li>
              ) : (
                <li><Link to="/login" className="hover:text-accent-red transition-colors">{t('login')}</Link></li>
              )}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 pt-20">
        {children}
      </main>
      
      <footer className="bg-dark-gray text-white p-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            {/* Add social media icons here */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <h3 className="font-bold mb-2">Company</h3>
              <ul>
                <li><a href="#" className="hover:text-accent-red transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-accent-red transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Support</h3>
              <ul>
                <li><a href="#" className="hover:text-accent-red transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-accent-red transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Legal</h3>
              <ul>
                <li><a href="#" className="hover:text-accent-red transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent-red transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Follow Us</h3>
              <ul>
                <li><a href="#" className="hover:text-accent-red transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-accent-red transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="text-sm">
            &copy; 2024 Movies App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;