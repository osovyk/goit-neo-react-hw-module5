import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast, getImageUrl } from '../../services/tmdbApi';
import { Avatar, List, ListItem, Typography, CircularProgress, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!cast.length) return <Typography>No cast available.</Typography>;

  return (
    <List>
      {cast.map(({ id, name, profile_path }) => (
        <ListItem key={id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={profile_path ? getImageUrl(profile_path) : undefined}
            alt={name}
            sx={{ width: 56, height: 56 }}
          >
            {!profile_path && <PersonIcon />}
          </Avatar>
          <Typography variant="subtitle1">{name}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default MovieCast;
