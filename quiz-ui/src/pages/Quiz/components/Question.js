import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import './Question.css';
import inspiredNt_logo from '../../../components/Logo/inspiredNt_logo.png';
import { Paper } from '@mui/material';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

export default function Question({ question, onSelectedOption, answer, x }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value, question?.options.indexOf(event.target.value));
    }
  };

  console.log(answer);
  return (
    <Paper elevation={0}>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id} // Use a unique key for each question
          initial={{ opacity: 0, x }} // Initial animation values
          animate={{ opacity: 1, x: 0 }} // Animation values when the question is in view
          exit={{ opacity: 0, x, rotateX: 60, rotateY: -60 }} // Animation values when transitioning out of view
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1] // Custom easing function for smoother motion
          }}>
          <Card variant="outlined" sx={{ width: 320 }}>
            <div className="question-image">
              <img src={inspiredNt_logo} alt="Logo" className="question-image" />
            </div>
            <FormLabel className="question-label">{question.question}</FormLabel>
            <CardContent
              orientation="horizontal"
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <RadioGroup value={`${answer[question.id]}` ?? ' '} onChange={handleChange}>
                <List
                  sx={{
                    minWidth: 240,
                    '--List-gap': '0.5rem',
                    '--ListItem-paddingY': '1rem',
                    '--ListItem-radius': '20px'
                  }}>
                  {question?.options.map((q, i) => (
                    <ListItem
                      variant="outlined"
                      key={i}
                      sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                      <Radio
                        overlay
                        value={q}
                        label={q}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                inset: -1,
                                border: '2px solid',
                                borderColor: theme.vars.palette.primary[500]
                              })
                            })
                          })
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Paper>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onSelectedOption: PropTypes.func,
  answer: PropTypes.object,
  x: PropTypes.number
};
