import React from 'react';
import ResultTable from './components/ResultTable';

const Result = () => {
  const score = 90;
  const userName = 'John Doe';
  const completionTime = '1h 30m';

  return (
    <div>
      <h1>Test Results</h1>
      <ResultTable score={score} userName={userName} completionTime={completionTime} />
    </div>
  );
};

export default Result;
