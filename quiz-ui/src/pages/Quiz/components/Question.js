import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './Question.css';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import List from '@mui/joy/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/joy/ListItem';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function Question({ question, onSelectedOption, answer, x, rotateY }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value, question?.options.indexOf(event.target.value));
    }
  };

  // console.log(answer);
  return (
    <Paper elevation={0}>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id} // Use a unique key for each question
          initial={{ opacity: 0, x }} // Initial animation values
          animate={{ opacity: 1, x: 0 }} // Animation values when the question is in view
          exit={{ opacity: 0, x: 0, rotateX: 60, rotateY }} // Animation values when transitioning out of view
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1] // Custom easing function for smoother motion
          }}>
          <Card variant="outlined" sx={{ width: 350, height: 'auto' }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src={question.imgUrl}
                  // src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                  // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }} orientation="veritcal">
              <Typography level="body1">{question.question} </Typography>
              <RadioGroup
                sx={{ maxWidth: 260, height: 'auto', minWidth: 200 }}
                value={`${answer[question.id]}` ?? ' '}
                onChange={handleChange}>
                <List>
                  {question?.options.map((q, i) => (
                    <ListItem
                      variant="outlined"
                      key={i}
                      sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                        <FormControl overlay sx={{ p: 0, flexDirection: 'row', gap: 2 }}>
                          <Radio
                            overlay
                            value={q}
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
                          <div>
                            <FormLabel sx={{textAlign: 'left'}}>{q}</FormLabel>
                          </div>
                        </FormControl>
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
  x: PropTypes.number,
  rotateY: PropTypes.number
};
