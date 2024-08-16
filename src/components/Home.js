import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Movies App</h1>
      <nav>
        <ul>
          <li><Link to="/popular-movies">Popular Movies</Link></li>
          <li><Link to="/actors">Actors</Link></li>
          <li><Link to="/tv-series">TV Series</Link></li>
          <li><Link to="/fantasy-movie">Create Fantasy Movie</Link></li>
        </ul>
      </nav>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Home;