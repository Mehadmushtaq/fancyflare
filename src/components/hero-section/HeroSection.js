import { Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useFetchImages } from "../../hooks";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "60vh",
  width: "100%",
  backgroundPosition: "center center",
};

export const HeroSection = () => {
  const { loading, heroImages, fetchHeroImages } = useFetchImages();

  useEffect(() => {
    fetchHeroImages();
  }, []);

  return (
    <Box sx={{ ".indicators": { paddingLeft: "0" } }}>
      <Fade indicators={true} arrows={false}>
        {loading ? (
          <Box style={{ ...divStyle }}>
            <Skeleton variant="rectangular" width="100%" height="60vh" />
          </Box>
        ) : (
          heroImages.map((slideImage, index) => (
            <Box key={index}>
              <Box
                style={{
                  ...divStyle,
                  backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${slideImage.image_url})`,
                }}
              ></Box>
            </Box>
          ))
        )}
      </Fade>
    </Box>
  );
};
