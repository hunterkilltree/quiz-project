import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { formatTime } from '../../../components/Util';

const ResultTable = ({ name, school, time, score, rank }) => {
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
      backgroundColor: theme.palette.action.hover,
      border: 1
    }
  }));

  return (
    <TableBody>
      <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
        <StyledTableCell align="right">{name}</StyledTableCell>
        <StyledTableCell align="right">{school}</StyledTableCell>
        <StyledTableCell align="right">{formatTime(time)}</StyledTableCell>
        <StyledTableCell align="right">{score}</StyledTableCell>
        <StyledTableCell align="right">{rank}</StyledTableCell>
      </StyledTableRow>
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
