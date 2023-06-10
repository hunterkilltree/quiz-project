import React from 'react';
import LeaderboardTable from './components/LeaderboardTable';

const Leaderboard = () => {
  const leaderboardData = [
    { id: 1, name: 'John', school: 'ABC School', score: 100 },
    { id: 2, name: 'Jane', school: 'XYZ School', score: 90 },
    { id: 3, name: 'Mark', school: 'PQR School', score: 80 },
    { id: 4, name: 'Emily', school: 'LMN School', score: 70 },
  ];

  return (
    <div>
      <h3>Result View</h3>
      <LeaderboardTable data={leaderboardData} />
    </div>
  );
};

export default Leaderboard;
