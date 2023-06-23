import React, { useEffect, useState } from 'react';
import { getServerData } from '../../../helper/helper';
import { formatTime } from '../../../components/Util';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  console.log(props);
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const LeaderboardTable = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 30;

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
    '&:nth-of-type(odd)': {}
  }));

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
          <TableHead sx={{ bgcolor: 'text.primary' }}>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                {' '}
                Position
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                {' '}
                Name{' '}
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                {' '}
                School{' '}
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                {' '}
                Score{' '}
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
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
              <StyledTableRow
                key={index}
                sx={{
                  'td, th': { border: 1 },
                  bgcolor: '#F4C458'
                }}>
                <StyledTableCell align="center"> {page*rowsPerPage + index + 1} </StyledTableCell>
                <StyledTableCell align="center"> {result.username} </StyledTableCell>
                <StyledTableCell align="center"> {result.university} </StyledTableCell>
                <StyledTableCell align="center"> {result.points} </StyledTableCell>
                <StyledTableCell align="center"> {formatTime(result.time)} </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>

          <TableFooter sx={{ width: '100%' }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={4}
                count={results.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
