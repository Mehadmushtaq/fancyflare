import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../style.css";
import { Box } from "@mui/material";

export default function CategoryCard({
  imageUrl,
  title,
  description,
  ctaText,
}) {
  return (
    <Box className="wrapper">
      <Box className="image">
        <img src={imageUrl} />
        <Box class="text">
          <h1>title</h1>
          <p>lorum ispum</p>
        </Box>
      </Box>
    </Box>
  );
}
