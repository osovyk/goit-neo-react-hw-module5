import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

const Navigation = () => (
  <AppBar position="sticky" color="default" elevation={2}>
    <Toolbar>
      <MovieIcon sx={{ mr: 2 }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        MovieSearch
      </Typography>
      <Box>
        <Button
          color="inherit"
          component={NavLink}
          to="/"
          sx={({ isActive }) => ({
            color: isActive ? 'primary.main' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            mx: 1,
          })}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/movies"
          sx={({ isActive }) => ({
            color: isActive ? 'primary.main' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            mx: 1,
          })}
        >
          Movies
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navigation;
