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


export const searchMulti = async ({ query, type, year, genre }) => {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;

  if (type) url += `&search_type=${type}`;
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

// Add this function to the existing tmdb-api.js file

export const getAdvancedRecommendations = async (userId) => {
  // In a real application, this would make a call to the backend,

  // For this example, we'll just return mock data.
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

  return [
    { id: 1, title: "Inception", reason: "Based on your interest in sci-fi movies" },
    { id: 2, title: "The Shawshank Redemption", reason: "Highly rated drama, similar to movies you've enjoyed" },
    { id: 3, title: "The Dark Knight", reason: "You've watched several Christopher Nolan films" },
    { id: 4, title: "Pulp Fiction", reason: "Matches your preference for non-linear storytelling" },
    { id: 5, title: "Forrest Gump", reason: "Aligns with your interest in historical dramas" },
  ];
};