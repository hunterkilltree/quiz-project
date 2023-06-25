import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getServerData } from '../../../helper/helper';
import Question from './Question';
import { formatTime } from '../../../components/Util';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const QuestionsForm = ({ onHandleSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(2); // 20 minutes in seconds
  const [answers, setAnswers] = useState({}); // Object to store user answers
  const [questionsLoaded, setQuestionsLoaded] = useState(false); // Track if questions are loaded
  const [loading, setLoading] = useState(true); // Track loading state

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
        setQuestionsLoaded(true); // Set the questionsLoaded state to true after questions are fetched
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Start countdown timer only when questions are loaded
    if (questionsLoaded) {
      const timerId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerId);
            onHandleSubmit(0, answers);
          }
          return prevTime - 1;
        });
      }, 1000);

      // Clean up the timer when component unmounts
      return () => {
        clearInterval(timerId);
      };
    }
  }, [questionsLoaded]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    // Submit answers to the server or perform any necessary actions
    if (onHandleSubmit) {
      onHandleSubmit(timeRemaining, answers);
    }
  };

  if (loading) {
    // Display a loading indicator while fetching data
    return (
      <Paper sx={{ display: 'flex', justifyContent: 'center' }} fullHeight fullWidth>
        <CircularProgress color="secondary" />
      </Paper>
    );
  }

  return (
    <div className="quiz-container">
      <Typography sx={{ color: 'warning.main' }} variant="h3" gutterBottom>
        Weekly Question
      </Typography>
      <Typography sx={{ color: 'primary.main' }} variant="h6" gutterBottom>
        Time remaining: {formatTime(timeRemaining)}
      </Typography>
      <form onSubmit={handleSubmit}>
        {questionsLoaded && questions.length > 0 && (
          <>
            <Question
              question={questions[currentQuestionIndex]}
              onSelectedOption={(answer) =>
                handleAnswerChange(questions[currentQuestionIndex].id, answer)
              }
              answer={answers} // Pass the answer as a prop
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
        {currentQuestionIndex !== questions.length - 1 && (
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
