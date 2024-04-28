import React, { useEffect } from 'react';
import { Grid, Container, Typography, Divider } from '@mui/material';
import { FloatingWhatsApp } from 'react-floating-whatsapp'


import {
  HeroSection,
  ProductCard,
  ProductSkeleton,
  CategorySection,
} from '../../components';
import { useProductApi } from '../../hooks';
import logo from '../../assets/images/customer-care-icon.png';

export const Home = () => {
  const { loading, latestProducts, getLatestProducts } = useProductApi();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

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
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <ProductSkeleton />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {latestProducts?.map((item) => {
                return (
                  <Grid item xs={6} sm={4} md={3} key={item?.product?.id}>
                    <ProductCard item={item} />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
        <FloatingWhatsApp phoneNumber='+923001034660'accountName='Ayeshye Fancy Flare' avatar={logo}
        statusMessage='Typically replies within 1 hour'/>
      </Container>
    </Container>
  );
};
