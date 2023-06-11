import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ResultTable = ({ name, school, time, score }) => {
const [rank, setRank] = useState(null);
  useEffect(() => {
    // Simulating an API call to fetch the user's rank from the leaderboard
    // Replace this with your actual API call to fetch the rank
    const fetchUserRank = async () => {
      try {
        const response = await fetch('your-api-url');
        const data = await response.json();
        const userRank = data.rank; // Assuming the API response contains the user's rank
        setRank(userRank);
      } catch (error) {
        console.error('Error fetching user rank:', error);
      }
    };

    fetchUserRank();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      border: 1
    }
  }));

  return (
    <TableBody>
      <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
        <StyledTableCell align="right">{name}</StyledTableCell>
        <StyledTableCell align="right">{school}</StyledTableCell>
        <StyledTableCell align="right">{time}</StyledTableCell>
        <StyledTableCell align="right">{score}</StyledTableCell>
        <StyledTableCell align="right">{(rank != null ? rank : <p>Loading rank...</p>)}</StyledTableCell>
      </StyledTableRow >
    </TableBody>
  );
};

ResultTable.propTypes = {
  name: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

export default ResultTable;