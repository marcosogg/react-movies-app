import React, { useState } from 'react';

function FantasyMovie() {
  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    genres: '',
    releaseDate: '',
    runtime: '',
    productionCompanies: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fantasy Movie:', movie);
    // Here you would typically save the movie to some form of storage
    alert('Fantasy movie created!');
  };

  return (
    <div>
      <h2>Create Fantasy Movie</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={movie.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="overview" value={movie.overview} onChange={handleChange} placeholder="Overview" required />
        <input name="genres" value={movie.genres} onChange={handleChange} placeholder="Genres (comma-separated)" required />
        <input name="releaseDate" value={movie.releaseDate} onChange={handleChange} placeholder="Release Date" type="date" required />
        <input name="runtime" value={movie.runtime} onChange={handleChange} placeholder="Runtime (minutes)" type="number" required />
        <input name="productionCompanies" value={movie.productionCompanies} onChange={handleChange} placeholder="Production Companies (comma-separated)" required />
        <button type="submit">Create Fantasy Movie</button>
      </form>
    </div>
  );
}

export default FantasyMovie;