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
import { useParams } from 'react-router-dom';
import { AxiosClient } from '../../services';

export const Products = () => {
  const { category } = useParams();

  const [filter, setFilter] = useState('');
  const [loading, isLoading] = useState();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const handleChange = (event) => {
    setFilter(event.target.value);
    sortProducts(event.target.value);
  };
  const sortProducts = (criteria) => {
    if (products) {
      let sorted;
      switch (criteria) {
        case 'A-Z':
          sorted = [...products].sort((a, b) =>
            a.product.name.localeCompare(b.product.name)
          );
          break;
        case 'Z-A':
          sorted = [...products].sort((a, b) =>
            b.product.name.localeCompare(a.product.name)
          );
          break;
        case 'TOP RATED':
          sorted = [...products].sort((a, b) => {
            const avgRatingA = calculateAverageRating(a.review);
            const avgRatingB = calculateAverageRating(b.review);
            return avgRatingB - avgRatingA;
          });
          break;
        default:
          sorted = [...products];
          break;
      }
      setSortedProducts(sorted);
    }
  };
  
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalStars = reviews.reduce((acc, review) => acc + review.star, 0);
    return totalStars / reviews.length;
  };
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    isLoading(true);
    var result;
    if (category) {
      result = await AxiosClient.get(
        `api/product/get-all?category_id=${category}`
      );
    } else {
      result = await AxiosClient.get('api/product/get-all');
    }

    if (result?.data?.result) {
      setProducts(result.data.result);
      setSortedProducts(result.data.result);
    } else {
      setSortedProducts('');
    }
    isLoading(false);
  };
  return (
    <Container maxWidth='lg' sx={{ marginY: '1.5rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size='small'
          disabled={!sortedProducts}
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
