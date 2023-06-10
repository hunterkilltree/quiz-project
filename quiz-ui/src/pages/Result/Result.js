import React from 'react';
import ResultTable from './components/ResultTable';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Result = () => {
  function createData(name, school, time, score, rank) {
    return { name, school, time, score, rank };
  }

  const rows = [
    createData('John Doe', 'School 1', '1h 30m', 90),
    createData('Katniss Everdeen', 'School 2', '1h 36m', 86),
    createData('Norman Bates', 'School 3', '1h 44m', 76),
    createData('Luke Skywalker', 'School 4', '1h 48m', 72)
  ];

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
          {rows.map((row) => (
            <ResultTable key={row} name={row.name} school={row.school} time={row.time} score={row.score} />
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Result;
