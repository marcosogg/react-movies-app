import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/Layout';
import Home from './components/Home';
import PopularMovies from './components/PopularMovies';
import Actors from './components/Actors';
import TVSeries from './components/TVSeries';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import TVSeriesDetails from './components/TVSeriesDetails';
import Search from './components/Search';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import FantasyMovie from './components/FantasyMovie';
import Favorites from './components/Favorites';
import ThemedMoviePlaylist from './components/ThemedMoviePlaylist'; // Add this import
import './i18n';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular-movies" element={<PopularMovies />} />
                <Route path="/actors" element={<Actors />} />
                <Route path="/tv-series" element={<TVSeries />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/actor/:id" element={<ActorDetails />} />
                <Route path="/tv/:id" element={<TVSeriesDetails />} />
                <Route path="/search" element={<Search />} />
                
                <Route element={<PrivateRoute />}>
                  <Route path="/fantasy-movie" element={<FantasyMovie />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/themed-playlist" element={<ThemedMoviePlaylist />} />
                </Route>
                
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            </Layout>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;