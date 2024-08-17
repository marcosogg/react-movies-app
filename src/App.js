import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/Layout';
import './i18n';

const Home = lazy(() => import('./components/Home'));
const PopularMovies = lazy(() => import('./components/PopularMovies'));
const Actors = lazy(() => import('./components/Actors'));
const TVSeries = lazy(() => import('./components/TVSeries'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));
const ActorDetails = lazy(() => import('./components/ActorDetails'));
const TVSeriesDetails = lazy(() => import('./components/TVSeriesDetails'));
const Search = lazy(() => import('./components/Search'));
const Login = lazy(() => import('./components/Login'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const PublicRoute = lazy(() => import('./components/PublicRoute'));
const FantasyMovie = lazy(() => import('./components/FantasyMovie'));
const Favorites = lazy(() => import('./components/Favorites'));
const ThemedMoviePlaylist = lazy(() => import('./components/ThemedMoviePlaylist'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <Layout>
              <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
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
              </Suspense>
            </Layout>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;