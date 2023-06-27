import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';
import { postServerData } from '../../helper/helper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const universities = [
  'University 1',
  'University 2',
  'University 3'
  // Add more universities as needed
];

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
        // Redirect to result page
        navigate('/Result', { state: userResult });
      } catch (error) {
        console.error('Error post result:', error);
      }
    };
    postResult();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      fullWidth>
      {!gameStarted && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh">
          <TextField
            label="Name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            sx={{ marginBottom: '16px', width: '300px' }}
          />
          <FormControl sx={{ width: '300px' }}>
            <InputLabel id="select-university-label">Select University</InputLabel>
            <Select
              labelId="select-university-label"
              label="Select University"
              value={university}
              onChange={handleUniversityChange}
              variant="outlined">
              <MenuItem value="" disabled>
                <em>Select University</em>
              </MenuItem>
              {universities.map((uni) => (
                <MenuItem key={uni} value={uni}>
                  {uni}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button sx={{ marginTop: '16px' }} variant="contained" onClick={handleStartGame}>
            Start Game
          </Button>
        </Box>
      )}
      {gameStarted && <QuestionsForm onHandleSubmit={onHandleSubmit} />}
    </Box>
  );
};

export default Quiz;
