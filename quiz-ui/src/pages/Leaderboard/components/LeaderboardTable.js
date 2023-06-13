import React, { useEffect, useState } from 'react';
import { getServerData } from '../../../helper/helper';
import { formatTime } from '../../../components/Util';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LeaderboardTable = () => {
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

  if (!results || results.length === 0) {
    return <p>No data available</p>;
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {}}));

  return (
    <div>
      <TableContainer  component={Paper} sx={{ overflow: 'hidden'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{bgcolor: 'text.primary'}}>
            <TableRow sx={{ 'td, th': { border: 1 }}}>
              <TableCell align="center" sx={{color: '#ffffff', fontWeight: 'bold'}}> Position</TableCell>
              <TableCell align="center" sx={{color: '#ffffff', fontWeight: 'bold'}}> Name    </TableCell>
              <TableCell align="center" sx={{color: '#ffffff', fontWeight: 'bold'}}> School  </TableCell>
              <TableCell align="center" sx={{color: '#ffffff', fontWeight: 'bold'}}> Score   </TableCell>
              <TableCell align="center" sx={{color: '#ffffff', fontWeight: 'bold'}}> Time    </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {results.map((result, index) => (
              <StyledTableRow key={index} sx={{ 'td, th': { border: 1 }, bgcolor: (index == 0) ? '#ffff00': (index == 1) ? '#c0c0c0' : (index == 2) ? '#994c00' : 'none' }}>
                <StyledTableCell align="center"> {index + 1}               </StyledTableCell>
                <StyledTableCell align="center"> {result.username}         </StyledTableCell>
                <StyledTableCell align="center"> {result.university}       </StyledTableCell>
                <StyledTableCell align="center"> {result.points}           </StyledTableCell>
                <StyledTableCell align="center"> {formatTime(result.time)} </StyledTableCell>
              </StyledTableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
