/* eslint-disable no-unused-vars */
import React from 'react';
import CongratCard from './components/CongratCard';
import { useLocation } from 'react-router-dom';
import './Result.css';
import Box from '@mui/material/Box';
import styles from './Result.module.scss';

const Result = () => {
  const location = useLocation();
  const result = location.state;
  return (
    <Box
      className={styles.home}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <h1 className={styles.mainTitle}>Overall Result</h1>
      <CongratCard
        name={result?.data?.username}
        school={result?.data?.university}
        time={result?.data?.time}
        score={result?.data?.points}
        rank={result?.rank}
      />
    </Box>
  );
};

export default Result;
