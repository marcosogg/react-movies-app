import axios from 'axios';

const API_KEY = '901dd8a13aec35b683be8bf5e6260d7b';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,similar`);
  return response.data;
};

export const getActorDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits`);
  return response.data;
};

export const getCollectionDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/collection/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const getPopularActors = async () => {
  const response = await axios.get(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
  return response.data.results;
};
