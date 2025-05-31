import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { getImageUrl } from '../../services/tmdbApi';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  const fallbackPoster = 'https://placehold.co/300x450?text=No+Image+Available';

  return (
    <Grid container spacing={4} justifyContent="center">
      {movies.map(({ id, title, poster_path, vote_average }) => (
        <Grid key={id}>
          <Card
            component={Link}
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.card}
          >
            <Box className={styles.posterContainer}>
              <CardMedia
                component="img"
                image={poster_path ? getImageUrl(poster_path) : fallbackPoster}
                alt={title}
                className={styles.media}
              />
              <Box className={styles.rating}>
                <StarIcon fontSize="small" sx={{ color: '#FFD700' }} />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  {vote_average?.toFixed(1) || 'N/A'}
                </Typography>
              </Box>
            </Box>
            <CardContent className={styles.cardContent}>
              <Typography variant="h6" component="div" noWrap>
                {title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
