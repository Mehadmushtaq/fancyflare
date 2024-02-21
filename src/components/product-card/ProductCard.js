import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProductApi } from '../../hooks';

export function ProductCard({ item }) {
  const [origionalPrice, setOrigionalPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [percentageOff, setPercentageOff] = useState(0);

  const { calculateAverageRating } = useProductApi();
  const { review, product, image_product, product_color } = item;

  const averageRating = calculateAverageRating(review);

  const imageUrl = React.useMemo(
    () =>
      `${process.env.REACT_APP_BACKEND_URL}${
        image_product.find((img) => img.is_main === 1)?.image_url
      }`,
    [item]
  );

  useState(() => {
    if (product?.is_discount === 1) {
      setPercentageOff(product.after_discount_price / 100); //after_discount_price actually percentage off like 10%
    }
    console.log(percentageOff);

    if (product_color && product_color[0] !== null) {
      setOrigionalPrice(product_color[0]?.medium_size_price);
      setNewPrice(
        product_color[0]?.medium_size_price -
          product_color[0]?.medium_size_price * percentageOff
      );
    } else {
      setOrigionalPrice(product?.price);
      setNewPrice(product?.price - product?.price * percentageOff);
    }
  }, []);

  return (
    <Link
      to={`/product/${product.id}`}
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
        }}
      >
        {/* SALE BADGE */}
        {product?.is_discount === 1 && (
          <Box
            sx={{
              width: '50px',
              height: '50px',
              backgroundColor: 'red',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: '1',
              top: '-10px',
              right: '-10px',
            }}
          >
            <Typography>Sale</Typography>
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
            }}
          >
            <Typography
              sx={{
                typography: { xs: 'subtitle2', md: 'body1' },
              }}
            >
              {product.name.toUpperCase().slice(0, 25)}
            </Typography>
            <Rating name='read-only' defaultValue={averageRating} readOnly />

            <Typography variant='body1'>
              {product.is_discount === 1 && (
                <>
                  {newPrice}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      marginLeft: '0.5rem',
                    }}
                  >
                    {origionalPrice}
                  </span>
                </>
              )}
              {!product.is_discount === 1 && `${origionalPrice} PKR`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
