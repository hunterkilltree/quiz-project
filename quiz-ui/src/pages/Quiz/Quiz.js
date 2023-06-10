import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUniversityChange = (event) => {
    setUniversity(event.target.value);
  };

  const handleStartGame = () => {
    if (name && university) {
      setGameStarted(true);
    } else {
      alert('Please enter your name and university.');
    }
  };

  const onHandleSubmit = (timeRemaining) => {
    const data = {
      name: name,
      university: university,
      time: timeRemaining
    };
    // send this data to server
    console.log(data);

    // Redirect to result page
    navigate('/Result');
  };

  return (
    <div>
      <h3>Quiz</h3>
      <p>This is the about view of the quiz</p>
      {!gameStarted && (
        <div>
          <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
          <input
            type="text"
            placeholder="University"
            value={university}
            onChange={handleUniversityChange}
          />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      )}
      {gameStarted && <QuestionsForm onHandleSubmit={onHandleSubmit} />}
    </div>
  );
};

export default Quiz;
