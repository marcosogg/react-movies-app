import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PopularMovies from './components/PopularMovies';
import Actors from './components/Actors';
import TVSeries from './components/TVSeries';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>React Movies App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<PopularMovies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/tv-series" element={<TVSeries />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;