import React, { useState } from "react";
import { Typography, Box, Grid, Card, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, Space, Drawer } from "antd";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { submenu } from "../../data/menuItems";

import {
  MdPersonOutline,
  MdOutlineShoppingCart,
  MdOutlineArrowDropDown,
} from "react-icons/md";

import { Link } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
          paddingX: { xs: "0.5rem", sm: "1rem", md: "2rem" },
          paddingY: "0.5rem",
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
            <Typography variant="body2">+123456789</Typography>
          </Box>

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
          <Link to="/login">
            <MdPersonOutline style={{ height: "2rem", width: "2rem" }} />
          </Link>

          <Link to="/cart">
            <Badge badgeContent={4} color="error">
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
            borderBottom: "1px solid lightgrey",
            display: "flex",
            justifyContent: "center",
          }}
          items={[
            {
              label: "Women",
              key: "women",
              icon: <MdOutlineArrowDropDown />,
              children: submenu,
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
              icon: <MdOutlineArrowDropDown />,
              children: [
                {
                  label: <MegaMenu />,
                  key: "MegaMenu",
                  style: {
                    height: "fit-content",
                    backgroundColor: "white",
                    p: "1rem",
                  },
                },
              ],
            },
          ]}
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
        <Menu
          style={{
            border: "none",
          }}
          mode="inline"
          items={[
            {
              label: "Women",
              key: "women",
              children: submenu,
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
            },
          ]}
        />
      </Drawer>
    </>
  );
}

function MegaMenu() {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Space direction="horizontal">
        <Menu
          style={{ boxShadow: "none", border: "none" }}
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
              label: "Refrigerators3",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators4",
              key: "Refrigerators2",
            },
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators5",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators6",
              key: "Refrigerators2",
            },
          ]}
        />
        <Menu
          style={{ boxShadow: "none", border: "none" }}
          items={[
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators7",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators8",
              key: "Refrigerators2",
            },
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators9",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators10",
              key: "Refrigerators2",
            },
            {
              label: "Refrigerators",
              key: "Refrigerators",
              type: "group",
            },
            {
              label: "Refrigerators11",
              key: "Refrigerators1",
            },
            {
              label: "Refrigerators12",
              key: "Refrigerators2",
            },
          ]}
        />
        <Box>
          <img
            src="https://sameersain.pk/cdn/shop/products/728A2729.jpg?v=1649608059"
            width={200}
          />
        </Box>
      </Space>
    </Box>
  );
}
