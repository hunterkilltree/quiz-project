import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getServerData } from '../../../helper/helper';
import Question from './Question';
import { formatTime } from '../../../components/Util';

const QuestionsForm = ({ onHandleSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [answers, setAnswers] = useState({}); // Object to store user answers
  const [classAnimation, setClassAnimation] = useState('fade-out');

  useEffect(() => {
    // Fetch questions from an API or any data source
    const fetchQuestions = async () => {
      try {
        const q = await getServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
          (data) => data
        );
        setQuestions(q);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Countdown timer
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when component unmounts or when time runs out
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleNextQuestion = () => {
    setClassAnimation('fade-out');
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setClassAnimation('fade-in');
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit answers to the server or perform any necessary actions
    if (onHandleSubmit) {
      onHandleSubmit(timeRemaining, answers);
    }
  };

  return (
    <div className="quiz-container">
      <h2>Question Form</h2>
      <p>Time Remaining: {formatTime(timeRemaining)}</p>
      <form onSubmit={handleSubmit}>
        {questions.length > 0 && (
          <>
            <Question
              question={questions[currentQuestionIndex]}
              onSelectedOption={(answer) =>
                handleAnswerChange(questions[currentQuestionIndex].id, answer)
              }
              answer={answers} // Pass the answer as a prop
              classAnimation={classAnimation}
            />
          </>
        )}

        {currentQuestionIndex !== 0 && (
          <button
            type="button"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}>
            Previous
          </button>
        )}
        {currentQuestionIndex !== 4 && (
          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </button>
        )}
        {currentQuestionIndex === questions.length - 1 && <button type="submit">Submit</button>}
      </form>
    </div>
  );
};

QuestionsForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired
};

export default QuestionsForm;
