import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi.js';
import MovieList from '../../components/MovieList/MovieList';
import { Box, Typography, CircularProgress } from '@mui/material';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom>
        Trending Movies
      </Typography>
      {movies.length > 0 && <MovieList movies={movies} />}
    </Box>
  );
};

export default HomePage;
