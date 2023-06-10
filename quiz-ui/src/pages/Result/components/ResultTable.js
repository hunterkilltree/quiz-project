import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ResultTable = ({ score, userName, completionTime }) => {
  const [rank, setRank] = useState(null);

  useEffect(() => {
    // Simulating an API call to fetch the user's rank from the leaderboard
    // Replace this with your actual API call to fetch the rank
    const fetchUserRank = async () => {
      try {
        const response = await fetch('your-api-url');
        const data = await response.json();
        const userRank = data.rank; // Assuming the API response contains the user's rank
        setRank(userRank);
      } catch (error) {
        console.error('Error fetching user rank:', error);
      }
    };

    fetchUserRank();
  }, []);

  return (
    <div>
      <h2>Test Result</h2>
      <p>Score: {score}</p>
      <p>User&apos;s Name: {userName}</p>
      <p>Completion Time: {completionTime}</p>
      {rank !== null ? <p>Rank in Leaderboard: {rank}</p> : <p>Loading rank...</p>}
    </div>
  );
};

ResultTable.propTypes = {
  score: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  completionTime: PropTypes.string.isRequired,
};

export default ResultTable;
