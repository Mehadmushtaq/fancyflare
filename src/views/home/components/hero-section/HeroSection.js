import { Box } from "@mui/material";
import React from "react";
import { Fade } from "react-slideshow-image";
import { sliderImages } from "../../../../data/slideImages";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
  width: "100% ",
  backgroundPosition: "center",
};

export const HeroSection = () => {
  return (
    <Box sx={{ ".indicators": { paddingLeft: "0" } }}>
      <Fade indicators={true} arrows={false}>
        {sliderImages.map((slideImage, index) => (
          <Box key={index}>
            <Box
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></Box>
          </Box>
        ))}
      </Fade>
    </Box>
  );
};
