import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Styles from './CategoryCard.module.css';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ imageUrl, title }) => {
  const image_url = `${process.env.REACT_APP_BACKEND_URL}${imageUrl}`;
  const category_name = title.toUpperCase();

  return (
    <Link to='/products'>
      <Box className={Styles.box}>
        <img alt={category_name} src={image_url} />

        <Box className={Styles.overlay}>
          <Typography variant='h5'>{category_name}</Typography>
          <Button
            variant='contained'
            sx={{ backgroundColor: 'white', color: 'black' }}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Link>
  );
};
