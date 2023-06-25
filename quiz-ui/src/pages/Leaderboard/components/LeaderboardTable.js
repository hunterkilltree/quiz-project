import React, { useEffect, useState } from 'react';
import { getServerData } from '../../../helper/helper';
import { formatTime } from '../../../components/Util';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function TruncatedName(name) {
  let truncatedName = name;
  if (name && name.length > 50) {
    truncatedName = name.substring(0, 25) + '...';
  }

  return truncatedName;
}

const LeaderboardTable = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages =
    Math.floor(results.length / rowsPerPage) + (results.length % rowsPerPage === 0 ? 0 : 1);

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
            // Convert time strings to Date objects for comparison
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);

            return timeB - timeA; // Sort by time in ascending order
          }
          return a.username.localeCompare(b.username); // Sort by username in ascending order
        });

        // create effect loading
        const timer = setTimeout(() => {
          setResults(sortedResults);
        }, 1000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  if (!results || results.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="leaderboard table">
        <TableHead>
          <TableRow sx={{ 'td, th': { border: 1 } }}>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '10%' }}>
              Rank#
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>
              University
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '10%' }}>
              Score
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', width: '10%' }}>
              Time
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : results
          ).map((result, index) => (
            <TableRow key={index} sx={{ 'td, th': { border: 1 } }}>
              <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
              <TableCell align="center">
                <Tooltip title={result.username} placement="top">
                  <span>{TruncatedName(result.username)}</span>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={result.university} placement="top">
                  <span>{TruncatedName(result.university)}</span>
                </Tooltip>
              </TableCell>
              <TableCell align="center">{result.points}</TableCell>
              <TableCell align="center">{formatTime(result.time)}</TableCell>
            </TableRow>
          ))}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
        <Stack spacing={5}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
            color="secondary"
          />
        </Stack>
      </Box>
    </TableContainer>
  );
};

export default LeaderboardTable;
