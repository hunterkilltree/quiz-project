import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';
import { postServerData } from '../../helper/helper';

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

  const onHandleSubmit = (timeRemaining, answers) => {
    const data = {
      username: name,
      university: university,
      time: timeRemaining,
      answers: answers
    };
    // send this data to server
    const fetchQuestions = async () => {
      try {
        if (answers !== [] && university && !name) throw new Error("Couldn't get Result");
        await postServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
          data,
          (data) => data
        );
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();

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
