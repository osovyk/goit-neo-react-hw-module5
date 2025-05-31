import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE0NTQzY2UxYWQwOTRjNjVmNDMxNTQ2NzdlZTk2MyIsIm5iZiI6MTcxNDc1MDUxNS44ODUsInN1YiI6IjY2MzUwNDMzOTlkNWMzMDEyMzU3N2JjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VMkGz08R9T1GcGFHyvOn9CJ4m7ecAIotCyJeP8C2g-E';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await instance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await instance.get('/search/movie', {
    params: { query, include_adult: false, language: 'en-US', page: 1 },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const getImageUrl = (path) => `${IMAGE_BASE_URL}${path}`;
