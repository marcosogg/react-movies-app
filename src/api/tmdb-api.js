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