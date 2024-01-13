import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CartItem from "../../components/cart-item/CartItem";

export default function Cart() {
  return (
    <Container maxWidth="lg">
      <Typography>My Cart</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Box
            sx={{
              backgroundColor: "grey",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Typography>Products</Typography>
            <Stack direction="row" spacing={15}>
              <Typography>Price</Typography>
              <Typography>Quantity</Typography>
              <Typography>Total</Typography>
            </Stack>
          </Box>
          <CartItem />
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
    </Container>
  );
}
