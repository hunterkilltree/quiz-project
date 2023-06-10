import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <h5>NAVBAR</h5>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/Result">Result</Link>
        </li>
        <li>
          <Link to="/Leaderboard">Leaderboard</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;
