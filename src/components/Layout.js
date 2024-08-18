import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-text-white">
      <header className="fixed top-0 left-0 right-0 bg-primary bg-opacity-90 p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-accent-red">Movies App</Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <NavLink to="/popular-movies">{t('nav.movies')}</NavLink>
              <NavLink to="/actors">{t('nav.actors')}</NavLink>
              <NavLink to="/tv-series">{t('nav.tvSeries')}</NavLink>
              <NavLink to="/search">{t('nav.search')}</NavLink>
              {user && (
                <>
                  <NavLink to="/fantasy-movie">{t('nav.fantasyMovie')}</NavLink>
                  <NavLink to="/favorites">{t('Favorites')}</NavLink>
                  <NavLink to="/themed-playlist">{t('Create Playlist')}</NavLink>
                  <NavLink to="/playlists">{t('View Playlists')}</NavLink>
                </>
              )}
              {user ? (
                <li><Button onClick={signOut} variant="secondary">{t('logout')}</Button></li>
              ) : (
                <NavLink to="/login">{t('login')}</NavLink>
              )}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="md:hidden text-text-white">
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
      
      <footer className="bg-primary text-text-white p-8">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <FooterSection title="Company" links={[{to: '/about', text: 'About Us'}, {to: '/careers', text: 'Careers'}]} />
            <FooterSection title="Support" links={[{to: '/help', text: 'Help Center'}, {to: '/contact', text: 'Contact Us'}]} />
            <FooterSection title="Legal" links={[{to: '/terms', text: 'Terms of Service'}, {to: '/privacy', text: 'Privacy Policy'}]} />
            <FooterSection title="Follow Us" links={[{to: '/facebook', text: 'Facebook'}, {to: '/twitter', text: 'Twitter'}]} />
          </div>
          <div className="text-sm text-light-gray">
            &copy; 2024 Movies App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <li>
    <Link to={to} className="hover:text-accent-red transition-colors duration-300">
      {children}
    </Link>
  </li>
);

const FooterSection = ({ title, links }) => (
  <div>
    <h3 className="font-bold mb-2">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.to} className="hover:text-accent-red transition-colors duration-300">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Layout;