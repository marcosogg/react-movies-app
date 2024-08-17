import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './components/Home';
import PopularMovies from './components/PopularMovies';
import Actors from './components/Actors';
import TVSeries from './components/TVSeries';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import CollectionDetails from './components/CollectionDetails';
import FantasyMovieCreation from './components/FantasyMovieCreation';
import Login from './components/Login';
import Search from './components/Search';
import Favorites from './components/Favorites';
import PrivateRoute from './components/PrivateRoute';
import ThemedMoviePlaylist from './components/ThemedMoviePlaylist';
import SupabaseIntegrationTest from './components/SupabaseIntegrationTest';
import './i18n';

const queryClient = new QueryClient();

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
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
          <Route path="/create-fantasy-movie" element={<PrivateRoute><FantasyMovieCreation /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path="/themed-playlist" element={<PrivateRoute><ThemedMoviePlaylist /></PrivateRoute>} />
          <Route path="/supabase-test" element={<SupabaseIntegrationTest />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;