import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { formatTime } from '../../../components/Util';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CongratCard = ({ name, school, time, score, rank }) => {
  const [showComponent, setShowComponent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleRetry = () => {
    navigate('/Quiz');
  };

  const handleGoToLeaderboard = () => {
    navigate('/Leaderboard');
  };

  if (!showComponent) {
    // Display a loading indicator while waiting for the timeout to finish
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      <TableRow>
        <Card
          data-resizable
          sx={{
            textAlign: 'center',
            alignItems: 'center',
            width: 450,
            height: 370,
            // to make the demo resizable
            overflow: 'auto',
            resize: 'horizontal',
            '--icon-size': '100px',
          }}
        >
          <CardOverflow variant="solid" color="warning">
            <AspectRatio
              variant="outlined"
              color="warning"
              ratio="1"
              sx={{
                m: 'auto',
                transform: 'translateY(50%)',
                borderRadius: '50%',
                width: 'var(--icon-size)',
                boxShadow: 'sm',
                bgcolor: 'background.surface',
                position: 'relative',
              }}
            >
              <div>
                <AutoAwesome sx={{ fontSize: '4rem' }} />
              </div>
            </AspectRatio>
          </CardOverflow>
          <Typography level="h2" fontSize="xl" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
            🎊 <span style={{ fontWeight: 'bold', fontSize: 27 }}>{name}</span> 🎊<br/>
            &nbsp;from <span style={{ fontWeight: 'bold', fontSize: 27 }}>{school}</span>
          </Typography>
          <Typography sx={{ maxWidth: '40ch' }}>
            You finish the quiz in {formatTime(1200 - time)} ! <br/>
            Your final score is: <span style={{ fontWeight: 'bold', fontSize: 25 }}>{score}</span> <br/>
          </Typography>
          <CardContent sx={{ maxWidth: '40ch' }}>
            Current rank: <span style={{ fontWeight: 'bold', fontSize: 25 }}>{rank}</span>
          </CardContent>
          <CardActions
            orientation="vertical"
            buttonFlex={1}
            sx={{
              '--Button-radius': '40px',
              width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
            }}
          >
          </CardActions>
        </Card>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} align="center">
          <Stack sx={{ display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
            <Button variant="contained" color="warning" onClick={handleRetry}>
              Retry
            </Button>
            <Button variant="contained" color="warning" onClick={handleGoToLeaderboard}>
              Go to Leaderboard
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

CongratCard.propTypes = {
  name: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired
};

export default CongratCard;