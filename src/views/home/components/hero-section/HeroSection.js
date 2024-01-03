import { Box } from "@mui/material";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
  width: "100% ",
  backgroundPosition: "center",
  border: "1px solid red",
};
const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 3",
  },
];

export const HeroSection = () => {
  return (
    <Box style={{ border: "1px solid black" }}>
      <Fade indicators={true} arrows={false}>
        {slideImages.map((slideImage, index) => (
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
