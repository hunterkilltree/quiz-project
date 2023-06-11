import React from 'react';
import ResultTable from './components/ResultTable';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const result = location.state;
  return (
    <div>
      <h1>Overall Results</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="right">User&apos;s Name</TableCell>
              <TableCell align="right">School&apos;s Name</TableCell>
              <TableCell align="right">Completion&nbsp;Time</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Rank&nbsp;in&nbsp;Leaderboard</TableCell>
            </TableRow>
          </TableHead>

          <ResultTable
            name={result?.data?.username}
            school={result?.data?.university}
            time={result?.data?.time}
            score={result?.data?.points}
            rank={result?.rank} // Rank is the index + 1
          />
        </Table>
      </TableContainer>
    </div>
  );
};

export default Result;
