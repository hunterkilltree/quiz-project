import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGoGame = () => {
    navigate('/Quiz');
  };

  return (
    <div>
      <h3>Home View</h3>
      <p> This is the home view of Home</p>
      <button onClick={handleGoGame}>Let Go Game</button>
    </div>
  );
};

export default Home;
