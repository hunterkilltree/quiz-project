import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Home = () => {
  const navigate = useNavigate();

  const handleGoGame = () => {
    navigate('/Quiz');
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://alumni.csiro.au/wp-content/uploads/2021/08/National-Science-Week-2021.gif"
        title="green iguana"
      />
      <CardContent>
        <Typography
          sx={{ fontWeight: 700, color: 'warning.main' }}
          gutterBottom
          variant="h3"
          component="div">
          We are looking for our NT STEAM stars!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          We are keen to recognise our champions who have been promoting Science and Technology in
          our schools and communities. We will celebrate our wonderful heroes during Science Week at
          the NT National Science Week awards Night. Nominations will open in June 2023.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleGoGame}>
          Quiz Time
        </Button>
      </CardActions>
    </Card>
  );
};

export default Home;
