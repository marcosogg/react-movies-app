import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              React Movies
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/movies">Movies</NavLink>
              <NavLink to="/actors">Actors</NavLink>
              <NavLink to="/tv-series">TV Series</NavLink>
              <NavLink to="/search">Search</NavLink>
              {user && <NavLink to="/favorites">Favorites</NavLink>}
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
            {user ? (
              <button onClick={logout} className="ml-4 text-white hover:text-accent">
                Logout
              </button>
            ) : (
              <Link to="/login" className="ml-4 text-white hover:text-accent">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

export default Navigation;