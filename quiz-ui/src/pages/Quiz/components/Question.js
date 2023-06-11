import * as React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export default function Question({ question, onSelectedOption }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value);
    }
  };

  return (
    <>
      <FormLabel>{question.question}</FormLabel>
      <RadioGroup onChange={handleChange}>
        {question?.options.map((q, i) => (
          <FormControlLabel key={i} value={i} control={<Radio />} label={q} />
        ))}
      </RadioGroup>
    </>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onSelectedOption: PropTypes.func
};
