import React, { useState } from "react";
import { Typography, Box, Grid, Card, Badge, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, Space, Drawer } from "antd";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { menuItems } from "../../data/menuItems";
import { MdPersonOutline, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext, useCartContext } from "../../context";
import { AccountMenu } from "../index";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const { count } = useCartContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Container disableGutters maxWidth="xl">
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
          px: { xs: "0.5rem", sm: "1rem", md: "2rem" },
          py: "0.5rem",
        }}
      >
        <Grid item xs={3}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            <WhatsAppIcon style={{ height: "2rem", width: "2rem" }} />
            <Link
              to={`https://api.whatsapp.com/send?phone=${process.env.REACT_APP_WHATSAPP_CONTACT}`}
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2">03001034660</Typography>
            </Link>
          </Box>

          {/* HAMBURGER MENU FOR MOBILE */}
          <Box sx={{ display: { xs: "inline", sm: "none" } }}>
            <MenuIcon
              style={{ height: "2rem", width: "2rem" }}
              onClick={showDrawer}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <Typography variant="h4">LOGO</Typography>
          </Link>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <Link to="/login">
              <MdPersonOutline style={{ height: "2rem", width: "2rem" }} />
            </Link>
          )}

          <Link to="/cart">
            <Badge badgeContent={count} color="error">
              <MdOutlineShoppingCart
                style={{ height: "2rem", width: "2rem", mL: "0.5rem" }}
              />
            </Badge>
          </Link>
        </Grid>
      </Grid>

      {/* MENU */}
      <Grid container sx={{ display: { xs: "none", sm: "inline" } }}>
        <Menu
          mode="horizontal"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          items={menuItems}
        />
      </Grid>

      {/* MOBILE MENU */}
      <Drawer
        placement="left"
        width={200}
        closeIcon={false}
        onClose={onClose}
        open={open}
      >
        <Menu mode="inline" items={menuItems} />
      </Drawer>
    </Container>
  );
};
