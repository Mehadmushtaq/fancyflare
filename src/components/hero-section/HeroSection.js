import { Box, Skeleton, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useFetchImages } from '../../hooks';

export const HeroSection = () => {
  const { loading, heroImages, fetchHeroImages } = useFetchImages();
  
  const isMobile = useMediaQuery('(max-width:600px)');
  
  useEffect(() => {
    fetchHeroImages();
  }, []);

  return (
    <Box sx={{ '.indicators': { paddingLeft: '0' } }}>
      <Fade indicators={true} arrows={false}>
        {loading ? (
            <Skeleton variant='rectangular' width='100%'
            height={isMobile ? '20vh' : '60vh'}
             />
        ) : (
          heroImages?.map((slideImage, index) => (
            <Box key={index}
            sx={{
              height: "auto",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit:'cover'
                }}
                src={`${process.env.REACT_APP_BACKEND_URL}${slideImage.image_url}`}
                alt={`Slide ${index}`}
              />
            </Box>
          ))
        )}
      </Fade>
    </Box>
  );
};
