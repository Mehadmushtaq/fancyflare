import React, { useState } from "react";
import { Typography, Box, Grid, Card, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../../styles.css";
import { Menu, Space, Drawer } from "antd";
import {
  MdPersonOutline,
  MdOutlineShoppingCart,
  MdOutlineArrowDropDown,
} from "react-icons/md";

import { Link } from "react-router-dom";

export function Header() {
  //use State to open and close Drawer to menu on mobile
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    console.log("show Drawer ");

    setOpen(true);
  };

  const onClose = () => {
    console.log("close Drawer");
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
              display: { xs: "none", sm: "inline" },
            }}
          >
            {/* <FaWhatsapp style={{ height: "5rem", width: "5rem" }} /> */}
            <Typography sx={{ display: "inline-block" }}>+123456789</Typography>
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
          <Typography variant="h4">LOGO</Typography>
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

          <Badge badgeContent={4} color="error">
            <MdOutlineShoppingCart style={{ height: "2rem", width: "2rem" }} />
          </Badge>
        </Grid>
      </Grid>

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
              icon: <MdOutlineArrowDropDown />,
              children: [
                {
                  label: <MegaMenu onClose={onClose} open={open} />,
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

      <Drawer placement="left" width={200} onClose={onClose} open={open}>
        <Menu
          mode="inline"
          items={[
            {
              label: "Women",
              key: "women",
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
