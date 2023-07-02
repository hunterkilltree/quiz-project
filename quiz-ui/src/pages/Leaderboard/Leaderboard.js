import React from 'react';
import LeaderboardTable from './components/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div>
      <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 31, paddingTop: 15 }}>
        LEADERBOARD
      </h3>
      <LeaderboardTable/>
    </div>
  );
};

export default Leaderboard;
