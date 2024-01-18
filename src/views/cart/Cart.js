import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CartItem from "../../components/cart-item/CartItem";
import { fontsWeight } from "../../utils";

export default function Cart() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "1rem",
      }}
    >
      <Typography variant="h4">My Cart</Typography>

      <Grid container>
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            padding: "1rem 0rem",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              borderBottom: "1px solid lightgrey",
              display: "flex",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "0.2rem",
              "& .MuiGrid-root.MuiGrid-grid-xs-2": {
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              },
            }}
          >
            <Grid items xs={12} sm={5}>
              Products
            </Grid>
            <Grid items xs={2}>
              Price
            </Grid>
            <Grid items xs={2}>
              Quantity
            </Grid>
            <Grid items xs={2}>
              Total
            </Grid>
            <Grid items xs={1}></Grid>
          </Grid>
          <CartItem />
          <CartItem />
          <CartItem />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              margin: { sm: "1rem" },
              padding: "1rem",
              border: "1px solid grey",
              borderRadius: "0.2rem",
            }}
          >
            <Typography variant="body1" fontWeight={fontsWeight.fontBold}>
              ORDER SUMMARY
            </Typography>
            <Divider dark sx={{ marginBottom: "1rem" }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Sub Total:</Typography>
              <Typography>PKR 3,983</Typography>
            </Stack>
            <Divider light sx={{ marginBottom: "1rem" }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total:</Typography>
              <Typography>PKR 3,983</Typography>
            </Stack>
            <Divider light sx={{ marginBottom: "1rem" }} />

            <Button variant="contained" size="small" sx={{ width: "100%" }}>
              Proceed to checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
