import React, { useEffect, useState } from 'react';
import { getServerData } from '../../../helper/helper';
import { formatTime } from '../../../components/Util';

const LeaderboardTable = () => {
  const [results, setResults] = useState([]);

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
            return a.time.localeCompare(b.time); // Sort by time in ascending order
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

  return (
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>School</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{result.name}</td>
            <td>{result.university}</td>
            <td>{result.points}</td>
            <td>{formatTime(result.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
