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

export default function Cart() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "1rem",
        "& .MuiGrid-root.MuiGrid-grid-xs-2": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Typography variant="h5">My Cart</Typography>

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
              backgroundColor: "lightgrey",
              justifyContent: "space-between",
              display: "flex",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "0.2rem",
            }}
          >
            <Grid items xs={5}>
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
              margin: "1rem",
              padding: "1rem",
              border: "1px solid grey",
              borderRadius: "0.5rem",
            }}
          >
            <Typography variant="h6">ORDER SUMMARY</Typography>
            <Divider light />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Sub Total:</Typography>
              <Typography>PKR 3,983</Typography>
            </Stack>
            <Divider light />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total:</Typography>
              <Typography>PKR 3,983</Typography>
            </Stack>

            <Button variant="primary">Proceed to checkout</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
