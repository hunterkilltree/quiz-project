import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import PropTypes from 'prop-types';

export default function MediaCard({ src }) {
  return (
    <Card orientation="horizontal">
      <CardContent>
        <AspectRatio objectFit="contain" variant="plain">
          <img style={{ minWidth: '150px', maxWidth: '500px' }} alt="" src={src} />
        </AspectRatio>
        <CardContent>
          <Typography level="h2" fontSize="xl">
            Need Some Help?
          </Typography>
          <Typography fontSize="sm" sx={{ mt: 0.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </Typography>
        </CardContent>
        <Button variant="outlined" color="primary">
          See FAQ
        </Button>
      </CardContent>
    </Card>
  );
}

MediaCard.propTypes = {
  src: PropTypes.string
};
