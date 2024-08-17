const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,similar`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getPopularActors = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getActorDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getPopularTVSeries = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getTVSeriesDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,similar`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getCollectionDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/collection/${id}?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const searchMulti = async ({ query, type, year, genre, page = 1 }) => {
  let url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
  
  if (type) url += `&include_adult=false&search_type=${type}`;
  if (year) url += `&year=${year}`;
  if (genre) url += `&with_genres=${genre}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getMovieCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getTVSeriesCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getSimilarMovies = async (id, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getSimilarTVSeries = async (id, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getActorMovieCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getActorTVCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};