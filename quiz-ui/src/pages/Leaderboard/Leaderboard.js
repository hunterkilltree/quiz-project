import React from 'react';
import LeaderboardTable from './components/LeaderboardTable';
import styles from './Leaderboard.module.scss';

const Leaderboard = () => {
  return (
    <div className={styles.home}>
      <h3 className={styles.mainTitle}>LEADERBOARD</h3>
      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;
