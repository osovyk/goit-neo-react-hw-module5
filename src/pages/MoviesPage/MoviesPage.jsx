import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.currentTarget.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchMovies(query)
      .then(setMovies)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <Box p={4}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        justifyContent="center"
        gap={2}
        mb={4}
      >
        <TextField
          name="query"
          label="Search Movies"
          variant="outlined"
          size="small"
          sx={{ width: 400 }}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>
      {loading ? (
        <Box textAlign="center" mt={6}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <MovieList movies={movies} />
      )}
    </Box>
  );
};

export default MoviesPage;
