import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Box, Badge, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProductApi } from '../../hooks';

export function ProductCard({ item }) {
  const { calculateAverageRating } = useProductApi();
  const { review, product, image_product, product_color } = item;

  const averageRating = calculateAverageRating(review);

  const origionalPrice = Math.floor(product.price);
  const newPrice = Math.floor(
    product.price - (product.price * product.after_discount_price) / 100
  );

  let isOutOfStock = false;
  if (product?.is_stiched === 0) {
    //unstitched
    isOutOfStock = product?.available_stock === 0 || product?.available_stock === null || product?.available_stock === undefined;
  }
  else if(product?.is_stiched === 1){
    // Stitched
    if (product_color.every(variant => variant.small_size_quantity === 0 && variant.medium_size_quantity === 0 && variant.large_size_quantity === 0 && variant.extra_large_size_quantity === 0)) {
      isOutOfStock = true;
    }
  }
  const imageUrl = React.useMemo(
    () =>
      `${process.env.REACT_APP_BACKEND_URL}${
        image_product.find((img) => img.is_main === 1)?.image_url
      }`,
    [item]
  );

  return (
    <Link
      to={`/product/${product.id}`}
      state={item}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}
    >
      <Card
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'visible',
          transition: "transform 0.3s ease",
          '&:hover': {
            transform: "scale(1.05)"
          }
        }}
      >
        {/* SALE BADGE */}
        {product?.is_discount === 1 && (
          <Box
            sx={{
              width: '50px',
              height: '50px',
              backgroundColor: '#d32f2f',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: '1',
              top: '-20px',
              right: '-10px',
            }}
          >
            <Typography>Sale</Typography>
          </Box>
        )}
         {isOutOfStock && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: '1',
              top: '-15px',
            }}
          >
            <Chip label='Out of stock' color='error' />
          </Box>
        )}
        <CardActionArea>
          <CardMedia
            component='img'
            image={imageUrl}
            alt='green iguana'
            sx={{
              height: { xs: '12rem', md: '20rem' },
              borderRadius: '0.2rem',
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                typography: { xs: 'subtitle2', md: 'body1' },
              }}
            >
              {product?.name?.length > 40
                ? product.name.toUpperCase().substring(0, 40) + '...'
                : product.name.toUpperCase()}
            </Typography>
            <Rating name='read-only' defaultValue={averageRating} readOnly />

            <Typography variant='body1'>
              {product.is_discount === 1 && (
                <>
                  {`${newPrice} PKR`}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      marginLeft: '0.5rem',
                    }}
                  >
                    {`${origionalPrice} PKR`}
                  </span>
                </>
              )}
              {product.is_discount === 0 && `${origionalPrice} PKR`}
            </Typography>
            {/* {isOutOfStock && <Chip label='Out of stock' color='error' />} */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
