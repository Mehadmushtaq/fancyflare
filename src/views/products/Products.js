import {
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import React from "react";
import { ProductCard } from "../../components/product-card/ProductCard";
import { products } from "../../data/products";

export const Products = () => {
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ marginY: "1.5rem" }}>
      <Typography variant="h5" textAlign="center">
        Products / Category
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select value={filter} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>SORT BY</em>
            </MenuItem>
            <MenuItem value={10}>ALPHABETICALLY (A-Z)</MenuItem>
            <MenuItem value={20}>ALPHABETICALLY (Z-A)</MenuItem>
            <MenuItem value={30}>TOP RATED</MenuItem>
            <MenuItem value={30}>NEWEST ARRIVAL</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ marginY: "0.5rem" }}>
        {products?.map((product) => {
          return (
            <Grid item xs={6} sm={3}>
              <ProductCard key={product.id} item={product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
