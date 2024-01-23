import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

export default function CategoryCard({
  imageUrl,
  title,
  description,
  ctaText,
}) {
  return (
    <Link to="/products">
      <Box className={Styles.box}>
        <img alt="" src={imageUrl} />

        <Box className={Styles.overlay}>
          <Typography variant="h5">{title}</Typography>
          <Typography>{description}</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "white", color: "black" }}
          >
            {ctaText}
          </Button>
        </Box>
      </Box>
    </Link>
  );
}
