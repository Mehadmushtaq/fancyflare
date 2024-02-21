import React, { useEffect } from 'react';
import { Grid, Container, Skeleton, Box } from '@mui/material';
import { CategoryCard } from '../../components';
import { useProductApi } from '../../hooks';
import Carousel from 'react-multi-carousel';

export const CategorySection = () => {
  const { loading, categories, getCategories } = useProductApi();
  // console.log({ categories });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container maxWidth='xl' disableGutters>
      <Carousel responsive={responsive} partialVisible={false}>
        {categories?.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </Carousel>

      <Grid container spacing={2} sx={{ marginTop: '0' }}>
        {loading && (
          <>
            {[...Array(3)].map((_, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Skeleton variant='rectangle' width='100%' height={350} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};
