import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import PopularMovies from './components/PopularMovies';
import Actors from './components/Actors';
import TVSeries from './components/TVSeries';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import CollectionDetails from './components/CollectionDetails';
import FantasyMovie from './components/FantasyMovie';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { FavoritesProvider } from './context/FavoritesContext';
import Favorites from './components/Favorites';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular-movies" element={<PopularMovies />} />
                <Route path="/actors" element={<Actors />} />
                <Route path="/tv-series" element={<TVSeries />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/actor/:id" element={<ActorDetails />} />
                <Route path="/collection/:id" element={<CollectionDetails />} />
                <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
                <Route 
                  path="/fantasy-movie" 
                  element={
                    <PrivateRoute>
                      <FantasyMovie />
                    </PrivateRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;