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
    const postResult = async () => {
      try {
        if (answers !== [] && university && !name) throw new Error("Couldn't get Result");
        const userResult = await postServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
          data,
          (data) => data
        );
        console.log(userResult);
        // Redirect to result page
        navigate('/Result', { state: userResult });
      } catch (error) {
        console.error('Error post result:', error);
      }
    };
    postResult();
  };

  return (
    <div>
      {!gameStarted && (
        <div className='quiz-user'>
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
