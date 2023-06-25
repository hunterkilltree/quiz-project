import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { formatTime } from '../../../components/Util';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResultTable = ({ name, school, time, score, rank }) => {
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }));

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
      <StyledTableRow sx={{ 'td, th': { border: 1 } }}>
        <StyledTableCell align="right">{name}</StyledTableCell>
        <StyledTableCell align="right">{school}</StyledTableCell>
        <StyledTableCell align="right">{score}</StyledTableCell>
        <StyledTableCell align="right">{formatTime(time)}</StyledTableCell>
        <StyledTableCell align="right">{rank}</StyledTableCell>
      </StyledTableRow>
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
};

ResultTable.propTypes = {
  name: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired
};

export default ResultTable;
