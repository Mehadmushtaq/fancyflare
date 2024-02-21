import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { colors } from '../../utils';
import { useCartContext } from '../../context/cart/CartContainer';
import { useProductApi } from '../../hooks';

export const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const { loading, getProductById, calculateAverageRating } = useProductApi();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const fetchData = async () => {
      if (selectedImage) {
        return; // No need to fetch data again
      }
      try {
        const data = await getProductById(id);
        setProductData(data);
        //initialize by main image
        setSelectedImage(
          data?.image_product?.find((img) => img.is_main === 1)?.image_url ||
            null
        );
      } catch (error) {
        console.error('Error fetching product data:', error);
        setProductData(null);
      }
    };
    fetchData();
  }, []);

  let averageRating;
  if (productData?.review) {
    averageRating = calculateAverageRating(productData?.review);
  }

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

  const handleMouseHover = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
    setShowMagnifier(true);
  };

  const handleAddToCart = () => {
    if (productData) {
      addToCart({ ...productData, quantity });
    }
  };

  let percentage_off = 1;
  if (productData?.is_discount === 1) {
    percentage_off = productData.after_discount_price / 100; //after_discount_price is actually percentage off like 10%
  }

  const [origionalPrice, setOrigionalPrice] = useState(
    productData?.medium_size_price || ''
  );

  const [newPrice, setNewPrice] = useState(
    productData?.medium_size_price * percentage_off || ''
  );

  const [variant, setVariant] = React.useState('medium');

  useEffect(() => {
    if (variant === 'small') {
      setOrigionalPrice(productData?.small_size_price);
      setNewPrice(productData?.small_size_price * percentage_off);
    } else if (variant === 'medium') {
      setOrigionalPrice(productData?.medium_size_price);
      setNewPrice(productData?.medium_size_price * percentage_off);
    } else if (variant === 'large') {
      setOrigionalPrice(productData?.large_size_price);
      setNewPrice(productData?.large_size_price * percentage_off);
    } else if (variant === 'extra_large') {
      setOrigionalPrice(productData?.extra_large_size_price);
      setNewPrice(productData?.extra_large_size_price * percentage_off);
    }
  }, [variant]);

  const handleChange = (event) => {
    setVariant(event.target.value);
  };

  const calculatePrice = () => {};

  console.log('productData', productData);

  return (
    <Container maxWidth='lg' disableGutters>
      {loading && (
        <Grid container maxWidth='xl'>
          <Grid item xs={12} sm={6}>
            <Skeleton variant='rectangle' width='100%' height='60vh' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction='column' p='1rem'>
              <Skeleton width={400} height={50} />
              <Skeleton width={150} />
              <Skeleton width={150} />
              <Skeleton width={75} />
              <Skeleton width={50} />
            </Stack>
          </Grid>
        </Grid>
      )}

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
                onMouseMove={handleMouseHover}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
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
                        width: '250px',
                        height: '250px',
                        backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${selectedImage})`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                      }}
                    />
                  </Box>
                )}
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
            {productData.product?.is_discount ? (
              <>
                <Typography variant='h6' mt='0.5rem'>
                  <span style={{ textDecoration: 'line-through' }}>
                    Rs. {origionalPrice}
                  </span>{' '}
                  Rs. {newPrice}
                </Typography>
              </>
            ) : (
              <Typography variant='h6' mt='0.5rem'>
                {origionalPrice}
              </Typography>
            )}

            {/* DETAILS SECTION */}
            <TableContainer sx={{ paddingLeft: 0, my: '1rem' }}>
              <Typography variant='h6'>Details: </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '30%', fontWeight: 'bold' }}>
                      Color
                    </TableCell>
                    <TableCell style={{ width: '70%' }}>
                      {productData.product.color}
                    </TableCell>
                  </TableRow>
                </TableHead>
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

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>variant</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={variant}
                label='variant'
                onChange={handleChange}
              >
                <MenuItem value='small'>Small</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='large'>Large</MenuItem>
                <MenuItem value='extra_large'>Extra Large</MenuItem>
              </Select>
            </FormControl>

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
    </Container>
  );
};
