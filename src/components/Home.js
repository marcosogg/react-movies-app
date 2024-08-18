import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Welcome to React Movies App</h1>
          <p className="text-xl text-center mb-8">Discover your next favorite movie or TV show</p>
          <div className="text-center">
            <Link to="/movies" className="bg-accent text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Explore Movies
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeaturedSection title="Movies" link="/movies" />
          <FeaturedSection title="Actors" link="/actors" />
          <FeaturedSection title="TV Series" link="/tv-series" />
        </div>
      </div>
    </div>
  );
};

const FeaturedSection = ({ title, link }) => (
  <div className="bg-secondary rounded-lg p-6 hover:shadow-lg transition duration-300">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <p className="mb-4">Discover the latest and greatest in entertainment.</p>
    <Link to={link} className="text-accent hover:underline">
      Explore {title} &rarr;
    </Link>
  </div>
);

export default Home;