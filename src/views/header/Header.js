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
        spacing={12}
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

      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            // flexGrow: 1,
            alignItems: "flex-start",
          }}
        >
          {/* <Link to="/" style={{ textDecoration: 'none', color: 'white' }}> */}
          Fancy Flare
          {/* </Link> */}
        </Typography>

        {/* Navbar - Desktop */}
        <Box
          className="desktop-nav"
          sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
        >
          <Button
            color="inherit"
            //    component={Link} to="/new-arrivals"
          >
            New Arrivals
          </Button>
          <Button
            color="inherit"
            //    component={Link} to="/collections"
          >
            Collections
          </Button>
          <Button
            color="inherit"
            //    component={Link} to="/contact"
          >
            Contact Us
          </Button>
          <Button
            color="inherit"
            //    component={Link} to="/about"
          >
            About Us
          </Button>
        </Box>

        {/* Mobile Menu - Icon/Button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ display: { xs: "block", md: "none", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu - Popup */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            //    component={Link} to='/new-arrivals'
            onClick={handleClose}
          >
            New Arrivals
          </MenuItem>
          <MenuItem
            id="collection-button"
            onClick={(event) => handleClick(event)}
            onClose={handleClose}
          >
            Collections
          </MenuItem>
          <MenuItem
            //    component={Link} to='/contact'
            onClick={handleClose}
          >
            Contact Us
          </MenuItem>
          <MenuItem
            //   component={Link} to='/about'
            onClick={handleClose}
          >
            About Us
          </MenuItem>
          <MenuItem
            //   component={Link} to='/about'
            onClick={handleClose}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "0",
                mx: "0.2rem",
              }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "0",
              }}
            >
              Register
            </Button>
          </MenuItem>
        </Menu>

        <Menu
          id="collection-menu"
          anchorEl={collectionAnchorEl}
          open={collectionOpen}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>category 1</MenuItem>
          <MenuItem onClick={handleClose}>category 2</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
