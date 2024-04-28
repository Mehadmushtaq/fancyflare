import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { CartItem } from '../../components';
import { colors } from '../../utils';

import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LockIcon from '@mui/icons-material/Lock';
import { useCartContext } from '../../context';
import { AxiosClient } from '../../services';

export function Cart() {
  const { items, totalCartPrice } = useCartContext();
  const [deliveryCharges, setDeliveryCharges] = React.useState(0);

  const getDeliveryCharges = async () => {
    try {
      const result = await AxiosClient.get('api/user/get-delivery-charges');
      if (result.data.error_code === 0) {
        setDeliveryCharges(result.data.result.delivery_charges);
      } else setDeliveryCharges(0);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDeliveryCharges();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Grid container sx={{ marginBottom: '5rem' }}>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              margin: '2rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h5'>Shopping Cart</Typography>
          </Box>
          <Divider variant='middle' />
          <Box
            sx={{
              margin: '1rem',
              maxHeight: '50vh',
              overflowY: 'auto',
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'space-between',
                display: 'flex',
                '& .MuiGrid-root.MuiGrid-grid-xs-2': {
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'center',
                },
              }}
            >
              <Grid item xs={12} sm={6}>
                Products
              </Grid>
              <Grid item xs={2}>
                Price
              </Grid>
              <Grid item xs={2}>
                Quantity
              </Grid>
              <Grid item xs={2}>
                Total
              </Grid>
            </Grid>

            {items.map((item, index) => {
              return <CartItem key={index} item={item} />;
            })}
          </Box>
          <Link
            to='/products'
            style={{
              textDecoration: 'none',
              color: colors.colorBlack,
            }}
          >
            <Box
              sx={{
                margin: { sm: '1rem' },
                display: 'flex',
                py: '1rem',
              }}
            >
              <KeyboardBackspaceIcon />
              <Typography sx={{ mx: '1rem' }}>Continue Shopping</Typography>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'block' }}>
          <Box
            sx={{
              marginTop: '5vh',
              padding: '1rem 1.3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              backgroundColor: '#E9EAEF',
            }}
          >
            <Box>
              <Typography variant='h6'>Order Summary</Typography>
              <Divider dark sx={{ my: '1rem' }} />
            </Box>
            <Box>
              {/* Subtotal */}
              <Stack
                direction='row'
                justifyContent='space-between'
                sx={{ mb: '0.5rem' }}
              >
                <Typography>Sub Total:</Typography>
                <Typography>PKR {totalCartPrice}</Typography>
              </Stack>
              <Divider light sx={{ marginBottom: '0.5rem' }} />

              {items.length > 0 && (
                <>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    sx={{ mb: '0.5rem' }}
                  >
                    <Typography>Delivery Charges:</Typography>
                    <Typography>PKR {deliveryCharges}</Typography>
                  </Stack>
                  <Divider light sx={{ marginBottom: '0.5rem' }} />
                </>
              )}

              {/* <Stack
                direction='row'
                justifyContent='space-between'
                sx={{ mb: '0.5rem' }}
              >
                <Typography>Discount</Typography>
                <Typography>0</Typography>
              </Stack>
              <Divider light sx={{ marginBottom: '0.5rem' }} /> */}

              {/* Total */}
              <Stack
                direction='row'
                justifyContent='space-between'
                sx={{ mb: '1rem' }}
              >
                <Typography>Total Cost</Typography>
                {items.length === 0 && (
                  <Typography>PKR {totalCartPrice}</Typography>
                )}
                {items.length > 0 && (
                  <Typography>
                    PKR {totalCartPrice + deliveryCharges}
                  </Typography>
                )}
              </Stack>
              <Divider light sx={{ marginBottom: '1rem' }} />

              {/* Secure Checkout */}
              <Button
                variant='contained'
                size='medium'
                startIcon={<LockIcon />}
                sx={{ width: '100%', color: 'white' }}
                component={Link}
                to='/checkout'
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
