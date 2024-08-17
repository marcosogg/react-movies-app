import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FantasyMovieCreation = () => {
  const { user } = useAuth();
  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    genres: [],
    releaseDate: '',
    runtime: '',
    productionCompanies: [],
    cast: [],
    director: '',
    budget: '',
    tagline: '',
  });
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value.split(',').map(item => item.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to a backend
    console.log('Fantasy Movie:', movie);
    console.log('User Review:', review);
    console.log('User Rating:', rating);
  };

  return (
    <div>
      <h2>Create Your Fantasy Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleInputChange}
          placeholder="Movie Title"
          required
        />
        <textarea
          name="overview"
          value={movie.overview}
          onChange={handleInputChange}
          placeholder="Movie Overview"
          required
        />
        <input
          type="text"
          name="genres"
          value={movie.genres.join(', ')}
          onChange={handleArrayInputChange}
          placeholder="Genres (comma-separated)"
        />
        <input
          type="date"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="runtime"
          value={movie.runtime}
          onChange={handleInputChange}
          placeholder="Runtime (minutes)"
        />
        <input
          type="text"
          name="productionCompanies"
          value={movie.productionCompanies.join(', ')}
          onChange={handleArrayInputChange}
          placeholder="Production Companies (comma-separated)"
        />
        <input
          type="text"
          name="cast"
          value={movie.cast.join(', ')}
          onChange={handleArrayInputChange}
          placeholder="Cast (comma-separated)"
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleInputChange}
          placeholder="Director"
        />
        <input
          type="number"
          name="budget"
          value={movie.budget}
          onChange={handleInputChange}
          placeholder="Budget"
        />
        <input
          type="text"
          name="tagline"
          value={movie.tagline}
          onChange={handleInputChange}
          placeholder="Tagline"
        />
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
        />
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          placeholder="Your rating (1-10)"
        />
        <button type="submit">Create Fantasy Movie</button>
      </form>
    </div>
  );
};

export default FantasyMovieCreation;