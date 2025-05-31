import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdbApi';
import { List, ListItem, Typography, CircularProgress, Box } from '@mui/material';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(setReviews)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!reviews.length) return <Typography>No reviews available.</Typography>;

  return (
    <List>
      {reviews.map(({ id, author, content }) => (
        <ListItem key={id} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6">{author}</Typography>
          <Typography variant="body2">{content}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default MovieReviews;
