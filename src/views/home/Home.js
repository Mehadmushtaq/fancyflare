import React, { useEffect } from 'react';
import { Grid, Container, Typography, Divider } from '@mui/material';

import {
  HeroSection,
  ProductCard,
  ProductSkeleton,
  CategorySection,
} from '../../components';
import { useProductApi } from '../../hooks';

export const Home = () => {
  const { loading, latestProducts, getLatestProducts } = useProductApi();

  useEffect(() => {
    getLatestProducts();
  }, []);

  return (
    <Container maxWidth='xl' disableGutters>
      <HeroSection />
      <Container maxWidth='lg' sx={{ marginY: '2rem' }}>
        <Divider color='light'>
          <Typography sx={{ typography: { xs: 'h5', sm: 'h4' } }}>
            CATEGORIES
          </Typography>
        </Divider>
        <CategorySection />
        <Divider color='light' sx={{ marginTop: '2rem' }}>
          <Typography sx={{ typography: { xs: 'h5', sm: 'h4' } }}>
            LATEST PRODUCTS
          </Typography>
        </Divider>

        <Grid container spacing={2} sx={{ marginY: '0.5rem' }}>
          {loading ? (
            <>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <ProductSkeleton />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {latestProducts?.map((item) => {
                return (
                  <Grid item xs={6} sm={3} key={item?.product?.id}>
                    <ProductCard item={item} />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Container>
    </Container>
  );
};
