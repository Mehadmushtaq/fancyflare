import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { colors } from '../../utils';
import { useCartContext } from '../../context/cart/CartContainer';
import { useProductApi } from '../../hooks';
import { useToast } from '../../hooks/useToast';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const Product = () => {
  const { addToCart } = useCartContext();
  const { calculateAverageRating } = useProductApi();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const productData = location?.state;

  const [variant, setVariant] = useState('');
  const [color, setColor] = useState('');
  
  const averageRating = calculateAverageRating(productData?.reviews);
  
  // Extracting unique colors
  const allColors = Array.from(
    new Set(productData?.product_color?.map((item) => item.color))
  );

  // Extracting sizes with quantity more than one
  const availableSizes = productData?.product_color?.reduce(
    (sizes, product) => {
      if (product.available_stock > 0) {
        if (product.small_size_quantity > 0) sizes.add('small');
        if (product.medium_size_quantity > 0) sizes.add('medium');
        if (product.large_size_quantity > 0) sizes.add('large');
        if (product.extra_large_size_quantity > 0) sizes.add('extra_large');
      }
      return sizes;
    },
    new Set()
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  let percentage_off = 0;
  if (productData?.product?.is_discount === 1) {
    percentage_off = productData.product.after_discount_price / 100; //after_discount_price is actually percentage off like 10%
  }

  const [selectedImage, setSelectedImage] = useState(
    productData?.image_product.find((img) => img.is_main === 1)?.image_url ||
      null
  );
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [showMagnifier, setShowMagnifier] = useState(false);
  // const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Function to handle color change
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  // Function to handle size change
  const handleSizeChange = (event) => {
    setVariant(event.target.value);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // const handleMouseHover = (e) => {
  //   console.log('e.pageX', e.pageX);
  //   console.log('e.pageY', e.pageY);

  //   const { left, top, width, height } =
  //     e.currentTarget.getBoundingClientRect();

  //   console.log('left', left);
  //   console.log('top', top);
  //   console.log('width', width);
  //   console.log('height', height);

  //   const x = ((e.pageX - left) / width) * 100;
  //   const y = ((e.pageY - top) / height) * 100;

  //   console.log('x', x);
  //   console.log('y', y);

  //   console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-');
  //   setPosition({ x, y });
  //   setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  //   setShowMagnifier(true);
  // };

  const getPrice = () => {
    const selectedColor = productData.product_color.find((c) => c.color === color);

    let origionalPrice;
    let discountPrice;
    switch (variant) {
      case 'small':
        origionalPrice = selectedColor.small_size_price || 0;
        break;
      case 'medium':
        origionalPrice = selectedColor.medium_size_price || 0;
        break;
      case 'large':
        origionalPrice = selectedColor.large_size_price || 0;
        break;
      case 'extra_large':
        origionalPrice = selectedColor.extra_large_size_price || 0;
        break;
      default:
        origionalPrice = productData.product.price || 0;
    }

    if (productData.product.is_discount === 1) {
      discountPrice = origionalPrice - origionalPrice * percentage_off;
    }

    return { origionalPrice, discountPrice };
  };

  const handleAddToCart = () => {
    let selectedColor;

    if (productData?.product?.is_stiched === 1) {
      selectedColor = productData.product_color.find((c) => c.color === color);
      if (!selectedColor) return;
    }

    let availableStock;
    switch (variant) {
      case 'small':
        availableStock = selectedColor.small_size_quantity || 0;
        break;
      case 'medium':
        availableStock = selectedColor.medium_size_quantity || 0;
        break;
      case 'large':
        availableStock = selectedColor.large_size_quantity || 0;
        break;
      case 'extra_large':
        availableStock = selectedColor.extra_large_size_quantity || 0;
        break;
      default:
        // availableStock = selectedColor.medium_size_quantity || 0;
        availableStock = productData?.product?.available_stock || 0;
    }

    // Check if stock is available
    if (availableStock > 0 && availableStock >= quantity) {
      addToCart({ ...productData, quantity, variant, color });
    } else {
      toast.error('Cannot add more than available stock');
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container maxWidth='lg' disableGutters>
      {productData && (
        <Grid
          container
          spacing={0}
          sx={{
            '& .MuiButtonBase-root.MuiIconButton-root': {
              backgroundColor: colors.lightMediumGray,
              borderRadius: '0px',
            },
            '& .MuiInputBase-root': { borderRadius: '0' },
          }}
        >
          <Grid item xs={12} sm={6} sx={{ p: '1rem' }}>
            <Paper elevation={0}>
              {/* Main Image */}
              <Box
                sx={{
                  height: { xs: '30rem', md: '40rem' },
                  overflow: 'hidden',
                  position: 'relative',
                }}
                // onMouseMove={handleMouseHover}
                // onMouseEnter={() => setShowMagnifier(true)}
                // onMouseLeave={() => setShowMagnifier(false)}
              >
                {selectedImage && (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${selectedImage}`}
                    alt='Main Product'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: '50% 50%',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                )}
                {/* <>
                {showMagnifier && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${cursorPosition.x - 100}px`,
                      top: `${cursorPosition.y - 100}px`,
                      pointerEvents: 'none',
                      display: { xs: 'none', sm: 'inline' },
                    }}
                  >
                    <Box
                      className='magnifier-image'
                      sx={{
                        width: '200px',
                        height: '200px',
                        backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${selectedImage})`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                      }}
                    />
                  </Box>
                )}
                </> */}
              </Box>

              {/* Thumbnails */}
              <Grid
                container
                spacing={1}
                style={{ marginTop: '0.2rem', justifyContent: 'center' }}
              >
                {productData.image_product.map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${image.image_url}`}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '10rem',
                        objectFit: 'cover',
                        objectPosition: '50% 50%',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                      onClick={() => handleImageClick(image.image_url)}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = 'scale(1.05)')
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = 'scale(1)')
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: '1rem' }}>
            <Typography variant='h5' marginTop='1rem'>
              {productData.product.name.toUpperCase()}
            </Typography>
            <Stack direction='row' alignItems='center' marginTop='0.5rem'>
              <Typography variant='body1'>Rating: </Typography>
              <Rating
                name='read-only'
                value={averageRating}
                readOnly
                size='small'
                sx={{ color: 'black' }}
              />
            </Stack>
            {productData.product?.is_discount === 1 ? (
              <>
                <Typography variant='h6' mt='0.5rem'>
                  <span style={{ textDecoration: 'line-through' }}>
                    Rs. {getPrice().origionalPrice}
                  </span>{' '}
                  Rs. {getPrice().discountPrice}
                </Typography>
              </>
            ) : (
              <Typography variant='h6' mt='0.5rem'>
                {getPrice().origionalPrice}
              </Typography>
            )}

            {/* DETAILS SECTION */}
            <TableContainer sx={{ paddingLeft: 0, my: '1rem' }}>
              <Typography variant='h6'>Details: </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                    <TableCell>{productData.product.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell>{productData.product.category_name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {productData.product?.is_stiched === 1 && (
              <>
                {' '}
                <FormControl sx={{ minWidth: { xs: 175, md: 275 } }}>
                  <InputLabel id='color-select-label'>Color</InputLabel>
                  <Select
                    labelId='color-select-label'
                    id='color-select'
                    value={color}
                    label='Color'
                    onChange={handleColorChange}
                  >
                    {allColors.map((color, index) => (
                      <MenuItem key={index} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: { xs: 175, md: 275 } }}>
                  <InputLabel id='variant-select-label'>variant</InputLabel>
                  <Select
                    labelId='variant-select-label'
                    id='variant-select'
                    value={variant}
                    label='variant'
                    onChange={handleSizeChange}
                  >
                    {[...availableSizes].map((size, index) => (
                      <MenuItem key={index} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Stack direction='row'>
                      <IconButton color='primary' onClick={handleDecrement}>
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        type='tel'
                        value={quantity}
                        variant='outlined'
                        size='small'
                        inputProps={{ style: { textAlign: 'center' } }}
                        disabled
                      />
                      <IconButton color='primary' onClick={handleIncrement}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {productData?.review && productData?.review.length > 0 && (
        <Carousel responsive={responsive}>
          {productData.review.map((review, index) => {
            return (
              <div key={index}>
                <Box>
                  <Typography variant='h6'>{review.review}</Typography>
                  <Rating
                    name='read-only'
                    value={review.start}
                    readOnly
                    size='small'
                    sx={{ color: 'black' }}
                  />
                  <Typography variant='body1'>{review.review}</Typography>
                </Box>
              </div>
            );
          })}
        </Carousel>
      )}
    </Container>
  );
};
