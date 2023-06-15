import * as React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import './Question.css'; // Assuming you have a CSS file named "Question.css" in the same directory

export default function Question({ question, onSelectedOption, answer }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value);
    }
  };

  return (
    <div className="question-card">
      <FormLabel className="question-label">{question.question}</FormLabel>
      <RadioGroup value={`${answer[question.id]}` ?? ' '} onChange={handleChange}>
        {question?.options.map((q, i) => (
          <FormControlLabel
            key={i}
            value={i}
            control={<Radio />}
            label={q}
            className="answer-label"
          />
        ))}
      </RadioGroup>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onSelectedOption: PropTypes.func,
  answer: PropTypes.object
};
