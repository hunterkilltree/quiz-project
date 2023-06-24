import React, { useEffect, useState } from 'react';
import { getServerData } from '../../../helper/helper';
import { formatTime } from '../../../components/Util';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

const LeaderboardTable = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.floor(results.length / rowsPerPage) + (results.length % rowsPerPage == 0 ? 0 : 1);

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

            return timeA - timeB; // Sort by time in ascending order
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

  if (!results || results.length === 0) {
    return <p>No data available</p>;
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {' '}
                Position
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {' '}
                Name{' '}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {' '}
                School{' '}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {' '}
                Score{' '}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {' '}
                Time{' '}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : results
            ).map((result, index) => (
              <TableRow
                key={index}
                sx={{
                  'td, th': { border: 1 }
                }}>
                <TableCell align="center"> {page*rowsPerPage + index + 1} </TableCell>
                <TableCell align="center"> {result.username} </TableCell>
                <TableCell align="center"> {result.university} </TableCell>
                <TableCell align="center"> {result.points} </TableCell>
                <TableCell align="center"> {formatTime(result.time)} </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter sx={{ width: '100%' }}>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <div style={{display: 'flex', justifyContent: 'space-between', flex: 1, padding: '12px 20px'}}>
                <div style={{display: 'flex'}}></div>
                <div style={{display: 'flex'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', width: 360}}>
                    <button 
                        disabled={page < 1} 
                        onClick={e => handleChangePage(e, page - 1)}
                        >Back
                    </button>

                    <div>
                        <span>Page: </span>
                        <input 
                            style={{width: 50, marginRight: 5}}
                            onClick={e => e.target.select()}
                            type='number' 
                            value={totalPages ? page + 1 : 0} 
                            onChange={e => handleChangePage(e, e.target.value*1 - 1)}
                        />
                        <span>of {totalPages}</span>
                    </div>

                      <button 
                          disabled={page + 2 > totalPages} 
                          onClick={e => handleChangePage(e, page+1)}
                          >Next
                      </button>
                  </div>
                </div>
              </div>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
