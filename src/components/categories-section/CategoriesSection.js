import React, { useEffect } from 'react';
import { Grid, Container, Skeleton } from '@mui/material';

import { CategoryCard } from '../../components';
import { useProductApi } from '../../hooks';

export const CategorySection = () => {
  const { loading, categories, getCategories } = useProductApi();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container maxWidth='xl' disableGutters>
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
        {categories.map((category) => {
          return (
            <Grid item xs={12} sm={4} key={category.id}>
              <CategoryCard
                imageUrl={category.image_url}
                title={category.name}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
