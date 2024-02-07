import {
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import React, { useEffect } from 'react';
import { ProductCard } from '../../components/product-card/ProductCard';
// import { products } from "../../data/products";
import { ProductSkeleton } from '../../components';
import { useProductApi } from '../../hooks';

export const Products = () => {
  const [filter, setFilter] = React.useState('');
  const { loading, products, getAllProducts } = useProductApi();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container maxWidth='xl' sx={{ marginY: '1.5rem' }}>
      <Typography variant='h5' textAlign='center'>
        Products / Category
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select value={filter} onChange={handleChange} displayEmpty>
            <MenuItem value=''>
              <em>SORT BY</em>
            </MenuItem>
            <MenuItem value={10}>ALPHABETICALLY (A-Z)</MenuItem>
            <MenuItem value={20}>ALPHABETICALLY (Z-A)</MenuItem>
            <MenuItem value={30}>TOP RATED</MenuItem>
            <MenuItem value={30}>NEWEST ARRIVAL</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ marginY: '0.5rem' }}>
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <ProductSkeleton />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {products?.map((product) => {
              return (
                <Grid item xs={6} sm={3} key={product.id}>
                  <ProductCard item={product} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </Container>
  );
};
