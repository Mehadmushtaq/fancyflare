import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export function ProductCard({ item }) {
  const { review, product, image_product } = item;

  const imageUrl = React.useMemo(
    () => `${process.env.REACT_APP_BACKEND_URL}${image_product[0].image_url}`,
    [item]
  );

  let averageRating;

  if (review && review.length > 0) {
    let totalRatings = 0;
    for (const rev of review) {
      totalRatings += rev.review.star;
    }
    averageRating = Math.round(totalRatings / review.length);
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Card
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* SALE BADGE */}
        {item?.salePrice && (
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
              {product.name.slice(0, 30)}
            </Typography>
            <Rating name='read-only' defaultValue={averageRating} readOnly />

            <Typography variant='body1'>
              {item.salePrice && (
                <>
                  {item.salePrice}
                  <span
                    style={{
                      textDecoration: 'line-through',
                      marginLeft: '0.5rem',
                    }}
                  >
                    {item.price}
                  </span>
                </>
              )}
              {!item.salePrice && `${product?.after_discount_price} PKR`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
