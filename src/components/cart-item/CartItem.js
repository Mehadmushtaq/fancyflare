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
  const { product, image_product } = item;
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const handleIncrement = () => {
    if (quantity + 1 > product?.available_stock) {
      toast.error('Cannot add more than availabel stock');
      setQuantity(product.available_stock);
    } else {
      setQuantity(quantity + 1);
      increaseQuantity(product?.id);
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
        '& .MuiTypography-root.MuiTypography-body1': {
          margin: 'auto',
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-2': {
          display: 'flex',
          justifyContent: 'center',
        },
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
          <Stack direction='column'>
            <Typography>{product.name.toUpperCase()}</Typography>
            <DeleteIcon onClick={handleRemoveItem} />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={3} sm={2}>
        {product?.is_discount && (
          <Typography>{product.after_discount_price}</Typography>
        )}
        {!product?.is_discount && <Typography>{product.price}</Typography>}
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
        {product?.is_discount && (
          <Typography>{quantity * product.after_discount_price}</Typography>
        )}
        {!product?.is_discount && (
          <Typography>{quantity * product.price}</Typography>
        )}
      </Grid>
    </Grid>
  );
}
