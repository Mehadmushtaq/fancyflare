import {
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartContext } from '../../context';
import { useToast } from '../../hooks/useToast';

export function CartItem({ item }) {
  const toast = useToast();
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartContext();

  const { product, image_product, color, variant, product_color, itemTotal } =
    item;
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const getPrice = () => {
    //percentage Off
    let percentageOff = 0;
    if (product?.is_discount === 1) {
      percentageOff = product?.after_discount_price / 100;
    }

    //unstitch scenerio
    if (product?.is_stiched === 0) {
      const price = product?.price - product?.price * percentageOff;
      return Math.floor(price);
    } else {
      //stitch scenerio
      const selectedColor = product_color.find((c) => c.color === color);

      let price;
      switch (variant) {
        case 'small':
          price = selectedColor?.small_size_price || 0;
          break;
        case 'medium':
          price = selectedColor?.medium_size_price || 0;
          break;
        case 'large':
          price = selectedColor?.large_size_price || 0;
          break;
        case 'extra_large':
          price = selectedColor?.extra_large_size_price || 0;
          break;
        default:
          price = product?.price || 0;
      }

      const finalPrice =
        product.is_discount === 1 ? price - price * percentageOff : price;

      // Calculate the total price for the item
      return Math.floor(finalPrice);
    }
  };

  const handleIncrement = () => {
    const selectedColor = product_color.find((c) => c.color === color);

    let availableStock;
    switch (variant) {
      case 'small':
        availableStock = selectedColor?.small_size_quantity || 0;
        break;
      case 'medium':
        availableStock = selectedColor?.medium_size_quantity || 0;
        break;
      case 'large':
        availableStock = selectedColor?.large_size_quantity || 0;
        break;
      case 'extra_large':
        availableStock = selectedColor?.extra_large_size_quantity || 0;
        break;
      default:
        availableStock = product?.available_stock || 0;
    }

    if (quantity + 1 > availableStock) {
      toast.error('Cannot add more than available stock');
      setQuantity(availableStock);
    } else {
      setQuantity(quantity + 1);
      increaseQuantity(product.id);
    }
  };

  const handleDecrement = () => {
    if (quantity - 1 < 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
      decreaseQuantity(product?.id);
    }
  };

  const handleRemoveItem = () => removeFromCart(product.id);

  return (
    <Grid
      container
      sx={{
        my: '1.5rem',
        '& .MuiGrid-root.MuiGrid-item': {
          margin: 'auto',
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-2': {
          display: 'flex',
          justifyContent: 'center',
        },
        '& .MuiStack-root': {},
      }}
    >
      <Grid item xs={12} sm={6}>
        <Stack direction='row' spacing={2}>
          <Box
            component='img'
            src={`${process.env.REACT_APP_BACKEND_URL}${
              image_product.find((img) => img.is_main === 1)?.image_url
            }`}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '0.1rem',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}
          >
            <Typography>{product.name.toUpperCase()}</Typography>
            
            {product?.is_stiched === 1 && (
              <Typography>
                  color:{color} variant:{variant}
             </Typography>
            )}
           
            <DeleteIcon onClick={handleRemoveItem} />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Typography>{getPrice()}</Typography>
      </Grid>
      <Grid item xs={5} sm={2}>
        <Stack direction='row'>
          <IconButton color='primary' onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <TextField
            type='tel'
            value={quantity}
            disabled
            variant='outlined'
            size='small'
            inputProps={{
              style: {
                textAlign: 'center',
                width: '1rem',
              },
            }}
          />
          <IconButton color='primary' onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Typography>{quantity * getPrice()}</Typography>
      </Grid>
    </Grid>
  );
}
