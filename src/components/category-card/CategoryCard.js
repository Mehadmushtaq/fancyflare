import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Styles from './CategoryCard.module.css';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
  const image_url = `${process.env.REACT_APP_BACKEND_URL}${category?.image_url}`;
  const category_name = category?.name?.toUpperCase() || '';

  return (
    <Link to={`/products/${category.id}`}>
      <Box className={Styles.box}>
        <img alt={category_name} src={image_url} />

        <Box className={Styles.overlay}>
          <Typography variant='h5'>{category_name}</Typography>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Link>
  );
};
