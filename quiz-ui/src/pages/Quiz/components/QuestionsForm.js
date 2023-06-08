import React, { useState, useEffect } from 'react';

const QuestionsForm = () => {
  // const [questions, setQuestions] = useState([]);
  // const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds

  useEffect(() => {
    // Fetch questions from an API or any data source
    // const fetchQuestions = async () => {
    //   try {
    //     const response = await fetch('https://example.com/questions');
    //     const data = await response.json();
    //     setQuestions(data.questions);
    //   } catch (error) {
    //     console.error('Error fetching questions:', error);
    //   }
    // };
    // fetchQuestions();
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

  // const handleAnswerChange = (questionId, answer) => {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [questionId]: answer
  //   }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Submit answers to the server or perform any necessary actions
  //   console.log(answers);
  // };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Question Form</h2>
      <p>Time Remaining: {formatTime(timeRemaining)}</p>
      <button type="submit">Submit</button>
      {/* <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default QuestionsForm;
