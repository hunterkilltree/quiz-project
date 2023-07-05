import React from 'react';
import CongratCard from './components/CongratCard';
import { useLocation } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const result = location.state;
  return (
    <div className="result-page">
      <h1>Overall Results</h1>
      <div>
        <CongratCard name={result?.data?.username}
                     school={result?.data?.university}
                     time={result?.data?.time}
                     score={result?.data?.points}
                     rank={result?.rank} />
      </div>
    </div>
  );
};

export default Result;
