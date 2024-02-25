import {
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../components/product-card/ProductCard';
import { ProductSkeleton } from '../../components';
import { useProductApi } from '../../hooks';
import { useParams } from 'react-router-dom';

export const Products = () => {
  const { category } = useParams();

  const [filter, setFilter] = React.useState('');
  const { loading, products, getProductByCategoryId } = useProductApi();
  const [sortedProducts, setSortedProducts] = useState(products || []);

  const handleChange = (event) => {
    setFilter(event.target.value);
    sortProducts(event.target.value);
  };
  const sortProducts = (criteria, prods) => {
    if (prods && criteria === 'A-Z') {
      const sorted = [...prods].sort((a, b) =>
        a.product.name.localeCompare(b.product.name)
      );
      setSortedProducts(sorted);
    } else if (prods && criteria === 'Z-A') {
      const sorted = [...prods].sort((a, b) =>
        b.product.name.localeCompare(a.product.name)
      );
      setSortedProducts(sorted);
    } else if (prods && criteria === 'TOP RATED') {
      const sorted = [...prods].sort(
        (a, b) => b.review.length - a.review.length
      );
      setSortedProducts(sorted);
    } else {
      if (prods) setSortedProducts([...prods]);
    }
  };

  useEffect(() => {
    if (category) {
      getProductByCategoryId(category);
    }
  }, [category, getProductByCategoryId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (products) {
      sortProducts(filter, products);
    }
  }, [products, filter]);

  useEffect(() => {
    setSortedProducts(products || []);
  }, [products]);

  return (
    <Container maxWidth='lg' sx={{ marginY: '1.5rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size='small'
          disabled={!products}
        >
          <Select value={filter} onChange={handleChange} displayEmpty>
            <MenuItem value=''>
              <em>SORT BY</em>
            </MenuItem>
            <MenuItem value='A-Z'>ALPHABETICALLY (A-Z)</MenuItem>
            <MenuItem value='Z-A'>ALPHABETICALLY (Z-A)</MenuItem>
            <MenuItem value='TOP RATED'>TOP RATED</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ marginY: '0.5rem', justifyContent: 'center' }}
      >
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
            {!loading && sortedProducts && sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
                <Grid item xs={6} sm={3} key={item.product.id}>
                  <ProductCard item={item} />
                </Grid>
              ))
            ) : (
              <Typography variant='h5'>No product found</Typography>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};
