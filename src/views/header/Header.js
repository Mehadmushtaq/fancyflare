import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// import { Link } from 'react-router-dom';

import { MdPersonOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [collectionAnchorEl, setCollectionAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const collectionOpen = Boolean(collectionAnchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCollectionAnchorEl(event.currentTarget);
  };
  // const handleCollectionClose = () => {
  //   setCollectionAnchorEl(null);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCollectionAnchorEl(null);
  };

  return (
    <AppBar>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "white",
          color: "black",
          alignItems: "center",
          paddingX: { xs: "0.5rem", sm: "1rem", md: "2rem" },
          paddingY: "0.5rem",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <FaWhatsapp width={10} height={10} />
          <Typography>+123456789</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "0",
              marginX: "0.5rem",
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "0",
              display: { xs: "none", md: "inline-block", sm: "inline-block" },
            }}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
}
