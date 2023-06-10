import * as React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export default function Question({ question }) {
  return (
    <>
      <FormLabel>{question.question}</FormLabel>
      <RadioGroup>
        {question?.options.map((q, i) => (
          <FormControlLabel key={i} value={q} control={<Radio />} label={q} />
        ))}
      </RadioGroup>
    </>
  );
}

Question.propTypes = {
  question: PropTypes.object
};
