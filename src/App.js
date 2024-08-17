import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './components/Home';
import PopularMovies from './components/PopularMovies';
import Actors from './components/Actors';
import TVSeries from './components/TVSeries';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import CollectionDetails from './components/CollectionDetails';
import FantasyMovie from './components/FantasyMovie';
import Search from './components/Search';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/movies">{t('nav.movies')}</Link></li>
            <li><Link to="/actors">{t('nav.actors')}</Link></li>
            <li><Link to="/tv">{t('nav.tvSeries')}</Link></li>
            <li><Link to="/fantasy">{t('nav.fantasyMovie')}</Link></li>
            <li><Link to="/search">{t('nav.search')}</Link></li>
          </ul>
        </nav>

        <LanguageSwitcher />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={PopularMovies} />
          <Route path="/actors" component={Actors} />
          <Route path="/tv" component={TVSeries} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/actor/:id" component={ActorDetails} />
          <Route path="/collection/:id" component={CollectionDetails} />
          <Route path="/fantasy" component={FantasyMovie} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;