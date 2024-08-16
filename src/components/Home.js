import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to the Movies App</h2>
      <nav>
        <ul>
          <li><Link to="/popular">Popular Movies</Link></li>
          <li><Link to="/actors">Actors</Link></li>
          <li><Link to="/tv-series">TV Series</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;