import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Menu, Space } from "antd";

// import { Link } from 'react-router-dom';

import { MdPersonOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

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
    <>
      {/* <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "white",
          color: "black",
          alignItems: "center",
          paddingX: { xs: "0.5rem", sm: "1rem", md: "2rem" },
          paddingY: "0.5rem",
          border: "1px solid black",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FaWhatsapp />
          <Typography> +123456789</Typography>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>LOGO</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MdPersonOutline />
          <Typography sx={{ mr: "1rem" }}>Login</Typography>

          <MdOutlineShoppingCart />
          <Typography>0</Typography>
        </Grid>
      </Grid> */}
      <Menu
        mode="horizontal"
        items={[
          {
            label: "Women",
            key: "women",
            // icon: <MenuIcon />,
            children: [
              {
                label: "item 1.1",
                key: "item1.1",
              },
              {
                label: "item 1.2",
                key: "item1.2",
              },
            ],
          },
          {
            label: "Men",
            key: "men",
          },
          {
            label: "Kids",
            key: "kids",
          },

          {
            label: "New Arrivals",
            key: "NewArrivals",
            children: [
              {
                label: <MegaMenu />,
                key: "MegaMenu",
                style: { height: "fit-content" },
              },
            ],
          },
        ]}
      ></Menu>
    </>
  );
}

function MegaMenu() {
  return (
    <Box>
      <Typography>CATEGORIES</Typography>

      <Space direction="horizontal">
        <Menu
          items={[
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators1",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators2",
              key: "Refrigerators2",
            },
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators1",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators2",
              key: "Refrigerators2",
            },
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators1",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators2",
              key: "Refrigerators2",
            },
          ]}
        ></Menu>
      </Space>
    </Box>
  );
}
