import React, { useState } from 'react';
import QuestionsForm from './components/QuestionsForm';

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      <h3>Quiz</h3>
      <p>This is the about view of the quiz</p>
      {!gameStarted && <button onClick={handleStartGame}>Start Game</button>}
      {gameStarted && <QuestionsForm />}
    </div>
  );
};

export default Quiz;
