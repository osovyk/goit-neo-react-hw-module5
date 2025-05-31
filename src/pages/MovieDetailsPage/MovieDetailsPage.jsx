import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, NavLink, Outlet, Link } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../../services/tmdbApi';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography align="center" mt={6}>
        No movie details available.
      </Typography>
    );
  }

  const { title, overview, poster_path, genres } = movie;

  return (
    <Box p={4}>
      <Button component={Link} to={backLinkLocationRef.current} variant="outlined" sx={{ mb: 4 }}>
        Go back
      </Button>
      <Box display="flex" gap={4} flexWrap="wrap">
        {poster_path && (
          <Box
            component="img"
            src={getImageUrl(poster_path)}
            alt={title}
            sx={{
              width: 300,
              borderRadius: 4,
              boxShadow: 3,
            }}
          />
        )}
        <Box>
          <Typography variant="h4" mb={2}>
            {title}
          </Typography>
          <Typography variant="body1" mb={2}>
            {overview}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Genres:</strong> {genres.map((g) => g.name).join(', ')}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap={2} mt={4}>
        <Button component={NavLink} to={`/movies/${movieId}/cast`} variant="contained">
          Cast
        </Button>
        <Button component={NavLink} to={`/movies/${movieId}/reviews`} variant="contained">
          Reviews
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
};

export default MovieDetailsPage;
