// src/components/Layout.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui';

const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before closing
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="nav-dropdown-container"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="nav-dropdown-button">
        {title}
      </button>
      {isOpen && (
        <div className="nav-dropdown-menu">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="nav-dropdown-item"
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-text-white">
      <header className="fixed top-0 left-0 right-0 bg-primary bg-opacity-90 p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-accent-red">Movies App</Link>

          <nav className="hidden md:flex space-x-6 items-center">
            <NavDropdown
              title={t('nav.movies')}
              items={[
                { to: "/popular-movies", text: t('Popular Movies') },
                { to: "/fantasy-movie", text: t('Create Fantasy Movie') },
                { to: "/fantasy-movies", text: t('My Fantasy Movies') },
              ]}
            />
            <NavDropdown
              title={t('TV Series')}
              items={[
                { to: "/tv-series", text: t('nav.tvSeries') },
              ]}
            />
            <NavDropdown
              title={t('People')}
              items={[
                { to: "/actors", text: t('nav.actors') },
              ]}
            />
            {user && (
              <NavDropdown
                title={t('My Stuff')}
                items={[
                  { to: "/favorites", text: t('Favorites') },
                  { to: "/themed-playlist", text: t('Create Playlist') },
                  { to: "/playlists", text: t('View Playlists') },
                ]}
              />
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-white hover:text-accent-red">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <LanguageSwitcher />
            {user ? (
              <Button onClick={signOut} variant="secondary">{t('logout')}</Button>
            ) : (
              <Link to="/login" className="text-white hover:text-accent-red">{t('login')}</Link>
            )}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-primary p-4">
            <Link to="/popular-movies" className="block py-2 text-white hover:text-accent-red">{t('nav.popularMovies')}</Link>
            <Link to="/tv-series" className="block py-2 text-white hover:text-accent-red">{t('nav.tvSeries')}</Link>
            <Link to="/actors" className="block py-2 text-white hover:text-accent-red">{t('nav.actors')}</Link>
            {user && (
              <>
                <Link to="/fantasy-movie" className="block py-2 text-white hover:text-accent-red">{t('nav.createFantasyMovie')}</Link>
                <Link to="/fantasy-movies" className="block py-2 text-white hover:text-accent-red">{t('nav.myFantasyMovies')}</Link>
                <Link to="/favorites" className="block py-2 text-white hover:text-accent-red">{t('Favorites')}</Link>
                <Link to="/themed-playlist" className="block py-2 text-white hover:text-accent-red">{t('Create Playlist')}</Link>
                <Link to="/playlists" className="block py-2 text-white hover:text-accent-red">{t('View Playlists')}</Link>
              </>
            )}
          </div>
        )}
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
