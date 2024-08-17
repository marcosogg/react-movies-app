const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=credits,similar`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getActorDetails = async (id) => {
  const url = `${BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=movie_credits,tv_credits`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getCollectionDetails = async (id) => {
  const url = `${BASE_URL}/collection/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPopularActors = async (page = 1) => {
  const url = `${BASE_URL}/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPopularTVSeries = async (page = 1) => {
  const url = `${BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const searchMulti = async ({ query, type, year, genre, page = 1 }) => {
  const url = `${BASE_URL}/search/multi?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}&page=${page}`;
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (year) params.append('year', year);
  if (genre) params.append('with_genres', genre);
  
  try {
    const response = await fetch(`${url}&${params.toString()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTVSeriesDetails = async (id) => {
  const url = `${BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=credits,similar`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieCredits = async (id) => {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTVSeriesCredits = async (id) => {
  const url = `${BASE_URL}/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getSimilarMovies = async (id, page = 1) => {
  const url = `${BASE_URL}/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getSimilarTVSeries = async (id, page = 1) => {
  const url = `${BASE_URL}/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getActorMovieCredits = async (id) => {
  const url = `${BASE_URL}/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getActorTVCredits = async (id) => {
  const url = `${BASE_URL}/person/${id}/tv_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};