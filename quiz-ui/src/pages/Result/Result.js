import React, { useEffect, useState } from 'react';
import ResultTable from './components/ResultTable';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getServerData } from '../../helper/helper';

const Result = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Make a fetch request to the server to get the results
        const data = await getServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
          (data) => data
        );

        if (data.length < 1) return;

        const sortedResults = data.sort((a, b) => {
          if (b.points !== a.points) {
            return b.points - a.points; // Sort by points in descending order
          }
          if (a.time !== b.time) {
            return a.time.localeCompare(b.time); // Sort by time in ascending order
          }
          return a.username.localeCompare(b.username); // Sort by username in ascending order
        });
        setResults(sortedResults);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

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
          {results.map((result, index) => (
            <ResultTable
              key={index}
              name={result.username}
              school={result.university}
              time={result.time}
              score={result.points}
              rank={index + 1} // Rank is the index + 1
            />
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Result;
