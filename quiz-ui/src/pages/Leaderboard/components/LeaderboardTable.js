import React from 'react';
import PropTypes from 'prop-types';

const LeaderboardTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>School</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((player, index) => (
          <tr key={player.id}>
            <td>{index + 1}</td>
            <td>{player.name}</td>
            <td>{player.school}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

LeaderboardTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ),
};

export default LeaderboardTable;
