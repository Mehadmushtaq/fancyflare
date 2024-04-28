import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
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
import { useProductApi, useToast } from '../../hooks';
import { ProductReview } from '../product-reviews/ProductReview';
import {GlassMagnifier, Magnifier} from 'react-image-magnifiers';

export const Product = () => {
  const { addToCart } = useCartContext();
  const { calculateAverageRating } = useProductApi();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const [isErr, setIsErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const location = useLocation();
  const productData = location?.state;
  const { product_color, product, review, image_product } = productData;

  const [variant, setVariant] = useState('');
  const [color, setColor] = useState('');

  const averageRating = calculateAverageRating(review);

  // Extracting unique colors
  const allColors = useMemo(
    () => [...new Set(product_color?.map((item) => item.color))],
    [product_color]
  );

  // Extracting sizes with quantity more than one
  const availableSizes = useMemo(
    () =>
      product_color?.reduce((sizes, product) => {
        if (product.small_size_quantity > 0) sizes.add('small');
        if (product.medium_size_quantity > 0) sizes.add('medium');
        if (product.large_size_quantity > 0) sizes.add('large');
        if (product.extra_large_size_quantity > 0) sizes.add('extra_large');
        return sizes;
      }, new Set()),
    [product_color]
  );

  let isOutOfStock = false;
  if (product?.is_stiched === 0) {
    //unstitched
    isOutOfStock =
      product?.available_stock === 0 ||
      product?.available_stock === null ||
      product?.available_stock === undefined;
  } else if (product?.is_stiched === 1) {
    //stitched
    if (
      product_color.every(
        (variant) =>
          variant.small_size_quantity === 0 &&
          variant.medium_size_quantity === 0 &&
          variant.large_size_quantity === 0 &&
          variant.extra_large_size_quantity === 0
      )
    ) {
      isOutOfStock = true;
    }
  }

  let percentage_off = 0;
  if (product?.is_discount === 1) {
    percentage_off = product.after_discount_price / 100; //after_discount_price is actually percentage off like 10%
  }

  const [selectedImage, setSelectedImage] = useState(
    image_product.find((img) => img.is_main === 1)?.image_url || null
  );
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [showMagnifier, setShowMagnifier] = useState(false);
  // const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Function to handle color change
  const handleColorChange = (event) => {
    setIsErr(false);
    setColor(event.target.value);
  };

  // Function to handle size change
  const handleSizeChange = (event) => {
    setIsErr(false);
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

    const selectedColor = product_color.find((c) => c.color === color);
    let origionalPrice;
    let discountPrice;
    switch (variant) {
      case 'small':
        origionalPrice = selectedColor?.small_size_price || 0;
        break;
      case 'medium':
        origionalPrice = selectedColor?.medium_size_price || 0;
        break;
      case 'large':
        origionalPrice = selectedColor?.large_size_price || 0;
        break;
      case 'extra_large':
        origionalPrice = selectedColor?.extra_large_size_price || 0;
        break;
      default:
        origionalPrice = product?.price || 0;
    }

    if (product.is_discount === 1) {
      discountPrice = origionalPrice - origionalPrice * percentage_off;
    }

    origionalPrice = Math.floor(origionalPrice);
    discountPrice = Math.floor(discountPrice);

    return { origionalPrice, discountPrice };
  };

  const handleAddToCart = () => {
    if (product?.is_stiched === 1 && (!color || !variant)) {
      setIsErr(true);
      setErrMessage("Please select color and variant before adding to cart.");
      return;
    }
  
    const selectedColor = product_color.find((c) => c.color === color) || {};
    const availableStock =
      selectedColor[`${variant}_size_quantity`] ||
      product?.available_stock ||
      0;
  
    // if (availableStock > 0 && availableStock >= quantity) {
      addToCart({ ...productData, quantity, variant, color });
      setIsErr(false); // Reset error state
    // } else {
    //   toast.error('Cannot add more than available stock');
    // }
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
                  
                  <Magnifier
                    imageSrc={`${process.env.REACT_APP_BACKEND_URL}${selectedImage}`}
                    alt='Main Product'
                    // magnifierSize='30%'
                    className='magnifier-image'                   
                  />
                // <img
                  //   src={`${process.env.REACT_APP_BACKEND_URL}${selectedImage}`}
                  //   alt='Main Product'
                  //   style={{
                  //     width: '100%',
                  //     height: '100%',
                  //     objectFit: 'cover',
                  //     objectPosition: '50% 50%',
                  //     transition: 'transform 0.3s ease-in-out',
                  //   }}
                  // />
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
                {image_product.map((image, index) => (
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
              {product.name.toUpperCase()}
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

            {product?.is_discount === 1 ? (
              <>
                <Typography variant='h6' mt='0.5rem'>
                  <span style={{ textDecoration: 'line-through' }}>
                    Rs. {getPrice()?.origionalPrice}
                  </span>{' '}
                  Rs. {getPrice().discountPrice}
                </Typography>
              </>
            ) : (
              <Typography variant='h6' mt='0.5rem'>
                {getPrice()?.origionalPrice}
              </Typography>
            )}
            <div
              style={{
                marginTop: '0.5rem',
              }}
            >
              {isOutOfStock && <Chip label='Out of stock' color='error' />}
            </div>

            {/* DETAILS SECTION */}
            <TableContainer sx={{ paddingLeft: 0, my: '1rem' }}>
              <Typography variant='h6'>Details: </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                    <TableCell>{product.size}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell>{product.category_name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {product?.is_stiched === 1 && (
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
                      disabled={isOutOfStock}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {isErr && (
              <Typography variant='body1' color='error' marginTop='1rem'>
                {errMessage}
              </Typography>
            )}
          </Grid>
        </Grid>
      )}

      <ProductReview reviews={review} prodId={product?.id} />
      {/* )}  */}
    </Container>
  );
};
