/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle
} from './banner';
import Banner from '../../../components/Logo/banner.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HomeCoverV2() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleGoGame = () => {
    navigate('/Quiz');
  };

  return (
    <BannerContainer>
      <BannerContent>
        <Typography variant="h6">Huge Collection</Typography>
        <BannerTitle variant="h2">Contest</BannerTitle>

        <BannerDescription variant="subtitle">
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo tempor incididunt ut
          labore et dolore magna
        </BannerDescription>

        <Button
          variant="contained"
          color="warning"
          endIcon={<ArrowForwardIcon />}
          onClick={handleGoGame}>
          Quiz Time
        </Button>
      </BannerContent>
      <BannerImage src={Banner} />
    </BannerContainer>
  );
}
