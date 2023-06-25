import React from 'react';
import ResultTable from './components/ResultTable';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import congratulation from '../../components/Logo/congratulation.png';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const result = location.state;
  return (
    <div className="result-page">
      <h1>Overall Results</h1>
      <div className="image-container">
        <img src={congratulation} alt="congratulation" className="congratulation-image" />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ bgcolor: 'text.primary' }}>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                User&apos;s Name
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                University&apos;s Name
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                Score
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                Completion&nbsp;Time
              </TableCell>
              <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                Rank&nbsp;in&nbsp;Leaderboard
              </TableCell>
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
