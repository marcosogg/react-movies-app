# README.md

```md
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

# package.json

```json
{
  "name": "react-movies-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@tanstack/react-query": "^5.51.23",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.26.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
  }
}

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
node_modules

```

# src\setupTests.js

```js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

# src\reportWebVitals.js

```js
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

# src\logo.svg

This is a file of the type: SVG Image

# src\index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

# src\index.css

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

# src\App.test.js

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

# src\App.js

```js
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
```

# src\App.css

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

# public\robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

# public\manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

# public\logo512.png

This is a binary file of the type: Image

# public\logo192.png

This is a binary file of the type: Image

# public\index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# public\favicon.ico

This is a binary file of the type: Binary

# src\context\FavoritesContext.js

```js
import React, { createContext, useState, useContext, useEffect } from 'react';

   const FavoritesContext = createContext();

   export const useFavorites = () => useContext(FavoritesContext);

   export const FavoritesProvider = ({ children }) => {
     const [favorites, setFavorites] = useState({
       actors: [],
       tvSeries: []
     });

     useEffect(() => {
       const storedFavorites = localStorage.getItem('favorites');
       if (storedFavorites) {
         setFavorites(JSON.parse(storedFavorites));
       }
     }, []);

     const addFavorite = (type, item) => {
       setFavorites(prev => {
         const newFavorites = {
           ...prev,
           [type]: [...prev[type], item]
         };
         localStorage.setItem('favorites', JSON.stringify(newFavorites));
         return newFavorites;
       });
     };

     const removeFavorite = (type, itemId) => {
       setFavorites(prev => {
         const newFavorites = {
           ...prev,
           [type]: prev[type].filter(item => item.id !== itemId)
         };
         localStorage.setItem('favorites', JSON.stringify(newFavorites));
         return newFavorites;
       });
     };

     return (
       <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
         {children}
       </FavoritesContext.Provider>
     );
   };
```

# src\context\AuthContext.js

```js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // For this basic implementation, we'll just check if both fields are non-empty
    if (username && password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

# src\components\TVSeries.js

```js
import React from 'react';
import { useQuery } from 'react-query';
import { getPopularTVSeries } from '../api/tmdb-api';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const TVSeries = () => {
  const { data, error, isLoading } = useQuery(['popularTVSeries', 1], () => getPopularTVSeries(1));
  const { addFavorite } = useFavorites();

  if (isLoading) return <div>Loading TV series...</div>;
  if (error) return <div>Error loading TV series: {error.message}</div>;

  return (
    <div>
      <h2>Popular TV Series</h2>
      {data && data.results ? (
        <ul>
          {data.results.map(series => (
            <li key={series.id}>
              <Link to={`/tv/${series.id}`}>{series.name}</Link>
              <button onClick={() => addFavorite('tvSeries', { id: series.id, name: series.name })}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No TV series found</div>
      )}
    </div>
  );
};

export default TVSeries;
```

# src\components\PrivateRoute.js

```js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
```

# src\components\PopularMovies.js

```js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPopularMovies } from '../api/tmdb-api';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ['popularMovies', page],
    () => getPopularMovies(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {data.results.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button 
          onClick={() => setPage((old) => Math.max(old - 1, 1))} 
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage((old) => old + 1)} 
          disabled={!data.hasMore}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PopularMovies;
```

# src\components\MovieDetails.js

```js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovieDetails } from '../api/tmdb-api';

function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useQuery(['movie', id], () => getMovieDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movie details</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Production Companies: {movie.production_companies.map(company => company.name).join(', ')}</p>
      {movie.belongs_to_collection && (
        <p>Part of: <Link to={`/collection/${movie.belongs_to_collection.id}`}>{movie.belongs_to_collection.name}</Link></p>
      )}
      <h3>Cast</h3>
      <ul>
        {movie.credits.cast.slice(0, 5).map(actor => (
          <li key={actor.id}><Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}</li>
        ))}
      </ul>
      <h3>Similar Movies</h3>
      <ul>
        {movie.similar.results.slice(0, 5).map(similarMovie => (
          <li key={similarMovie.id}><Link to={`/movie/${similarMovie.id}`}>{similarMovie.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
```

# src\components\Login.js

```js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
```

# src\components\Home.js

```js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Movies App</h1>
      <nav>
        <ul>
          <li><Link to="/popular-movies">Popular Movies</Link></li>
          <li><Link to="/actors">Actors</Link></li>
          <li><Link to="/tv-series">TV Series</Link></li>
          <li><Link to="/fantasy-movie">Create Fantasy Movie</Link></li>
        </ul>
      </nav>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Home;
```

# src\components\Favorites.js

```js
import React from 'react';
   import { useFavorites } from '../context/FavoritesContext';
   import { Link } from 'react-router-dom';

   const Favorites = () => {
     const { favorites, removeFavorite } = useFavorites();

     return (
       <div>
         <h2>Favorite Actors</h2>
         <ul>
           {favorites.actors.map(actor => (
             <li key={actor.id}>
               <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
               <button onClick={() => removeFavorite('actors', actor.id)}>Remove</button>
             </li>
           ))}
         </ul>

         <h2>Favorite TV Series</h2>
         <ul>
           {favorites.tvSeries.map(series => (
             <li key={series.id}>
               <Link to={`/tv/${series.id}`}>{series.name}</Link>
               <button onClick={() => removeFavorite('tvSeries', series.id)}>Remove</button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default Favorites;
```

# src\components\FantasyMovie.js

```js
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
```

# src\components\CollectionDetails.js

```js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCollectionDetails } from '../api/tmdb-api';

function CollectionDetails() {
  const { id } = useParams();
  const { data: collection, isLoading, isError } = useQuery(['collection', id], () => getCollectionDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching collection details</div>;

  return (
    <div>
      <h2>{collection.name}</h2>
      <p>{collection.overview}</p>
      <h3>Movies in this collection</h3>
      <ul>
        {collection.parts.map(movie => (
          <li key={movie.id}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionDetails;
```

# src\components\Actors.js

```js
import React from 'react';
import { useQuery } from 'react-query';
import { getPopularActors } from '../api/tmdb-api';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Actors = () => {
  const { data, error, isLoading } = useQuery(['popularActors', 1], () => getPopularActors(1));
  const { addFavorite } = useFavorites();

  if (isLoading) return <div>Loading actors...</div>;
  if (error) return <div>Error loading actors: {error.message}</div>;

  return (
    <div>
      <h2>Popular Actors</h2>
      {data && data.results ? (
        <ul>
          {data.results.map(actor => (
            <li key={actor.id}>
              <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
              <button onClick={() => addFavorite('actors', { id: actor.id, name: actor.name })}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No actors found</div>
      )}
    </div>
  );
};

export default Actors;
```

# src\components\ActorDetails.js

```js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getActorDetails } from '../api/tmdb-api';

function ActorDetails() {
  const { id } = useParams();
  const { data: actor, isLoading, isError } = useQuery(['actor', id], () => getActorDetails(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching actor details</div>;

  return (
    <div>
      <h2>{actor.name}</h2>
      <p>{actor.biography}</p>
      <h3>Known For</h3>
      <ul>
        {actor.movie_credits.cast.slice(0, 5).map(movie => (
          <li key={movie.id}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default ActorDetails;
```

# src\api\tmdb-api.js

```js
const apiKey = process.env.REACT_APP_TMDB_KEY;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || 'Network response was not ok');
  }
  return response.json();
};

const makeRequest = async (endpoint, params = {}) => {
  if (!apiKey) {
    console.error('TMDB API key is not set');
    throw new Error('TMDB API key is not set');
  }
  const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
  url.searchParams.append('api_key', apiKey);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });
  console.log('Making request to:', url.toString());
  const response = await fetch(url.toString());
  console.log('Response status:', response.status);
  return handleResponse(response);
};

export const getPopularMovies = async (page = 1) => {
  return makeRequest('/movie/popular', { language: 'en-US', page });
};

export const getMovieDetails = async (id) => {
  return makeRequest(`/movie/${id}`, { language: 'en-US' });
};

export const getActorDetails = async (id) => {
  return makeRequest(`/person/${id}`, { language: 'en-US' });
};

export const getCollectionDetails = async (id) => {
  return makeRequest(`/collection/${id}`, { language: 'en-US' });
};

export const getPopularActors = async (page = 1) => {
  return makeRequest('/person/popular', { language: 'en-US', page });
};

export const getPopularTVSeries = async (page = 1) => {
  return makeRequest('/tv/popular', { language: 'en-US', page });
};

export const searchMulti = async ({ query, type, year, genre, page = 1 }) => {
  const params = {
    language: 'en-US',
    query,
    include_adult: false,
    page
  };
  if (type) params.type = type;
  if (year) params.year = year;
  if (genre) params.with_genres = genre;
  return makeRequest('/search/multi', params);
};

export const getTVSeriesDetails = async (id) => {
  return makeRequest(`/tv/${id}`, { language: 'en-US' });
};

export const getMovieCredits = async (id) => {
  return makeRequest(`/movie/${id}/credits`, { language: 'en-US' });
};

export const getTVSeriesCredits = async (id) => {
  return makeRequest(`/tv/${id}/credits`, { language: 'en-US' });
};

export const getSimilarMovies = async (id, page = 1) => {
  return makeRequest(`/movie/${id}/similar`, { language: 'en-US', page });
};

export const getSimilarTVSeries = async (id, page = 1) => {
  return makeRequest(`/tv/${id}/similar`, { language: 'en-US', page });
};

export const getActorMovieCredits = async (id) => {
  return makeRequest(`/person/${id}/movie_credits`, { language: 'en-US' });
};

export const getActorTVCredits = async (id) => {
  return makeRequest(`/person/${id}/tv_credits`, { language: 'en-US' });
};
```

