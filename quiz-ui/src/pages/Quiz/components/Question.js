import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import './Question.css';
import inspiredNt_logo from '../../../components/Logo/inspiredNt_logo.png';

export default function Question({ question, onSelectedOption, answer }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id} // Use a unique key for each question
        initial={{ opacity: 0, y: -100 }} // Initial animation values
        animate={{ opacity: 1, y: 0 }} // Animation values when the question is in view
        exit={{ opacity: 0, y: 100 }} // Animation values when transitioning out of view
        transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1] // Custom easing function for smoother motion
        }}>
        <div className="question-card">
          <div className="question-image">
            <img src={inspiredNt_logo} alt="Logo" className="question-image" />
          </div>
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
      </motion.div>
    </AnimatePresence>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onSelectedOption: PropTypes.func,
  answer: PropTypes.object
};
