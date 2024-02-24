import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import Cards from 'react-credit-cards-2';
import { usePayment, usePaymentFormSchema } from '../../hooks';
import { useFormik } from 'formik';
import { isError, isErrorMessage, transformError } from '../../helpers';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  Typography,
} from '@mui/material';
import { useCartContext } from '../../context';
import { AxiosClient } from '../../services';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ setActiveStep, activeStep, orderId }) => {
  const paymentFormSchema = usePaymentFormSchema();
  const { items, totalPrice, clearCart } = useCartContext();
  const { initialValues, onSubmit } = usePayment();
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const [expandedAccordion, setExpandedAccordion] = React.useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState('cash_on_delivery');

  const handleChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    console.log(selectedPaymentMethod);
  };
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isValid,
    isSubmitting,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: paymentFormSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const placeOrder = async () => {
    let payment_method = 0;
    if (selectedPaymentMethod === 'credit_card') payment_method = 1;
    else if (selectedPaymentMethod === 'cash_on_delivery') payment_method = 2;

    let products = [];
    items.forEach((item) => {
      let productObj = {
        product_id: item.product.id,
        quantity: item.quantity,
        variant: item.variant,
        price: item.totalPrice,
      };
      products.push(productObj);
    });

    const obj = {
      payment_method,
      order_id: orderId,
      products,
    };
    try {
      setLoading(true);
      const result = await AxiosClient.post(
        'api/checkout/order-detail-post',
        obj
      );
      if (result?.data?.success) {
        setActiveStep(activeStep + 1);
        clearCart();
      } else {
        toast.error('Failed to submit Order');
      }
    } catch (err) {
      toast.error(transformError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`${item.product.name} (${item.quantity} items)`}
              secondary={`color: ${item.color} size: ${item.product.size} variant: ${item.variant}`}
            />
            <Typography variant='body2'>{item.totalPrice}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            PKR {totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Typography variant='h6' gutterBottom marginTop='2rem'>
        Payment Method
      </Typography>

      <Accordion
        sx={{ my: '2rem' }}
        expanded={expandedAccordion === 'credit_card'}
        onChange={handleAccordionChange('credit_card')}
      >
        <AccordionSummary>
          <FormControlLabel
            value='credit_card'
            control={
              <Radio
                checked={selectedPaymentMethod === 'credit_card'}
                onChange={handleChange}
              />
            }
            label='Credit Card'
          />
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label='Name on card'
                  fullWidth
                  variant='standard'
                  helperText={touched.name && isErrorMessage('name', errors)}
                  error={touched.name && isError('name', errors, touched)}
                  {...getFieldProps('name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label='Card number'
                  fullWidth
                  variant='standard'
                  helperText={
                    touched.cardNumber && isErrorMessage('cardNumber', errors)
                  }
                  error={
                    touched.cardNumber && isError('cardNumber', errors, touched)
                  }
                  {...getFieldProps('cardNumber')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label='Expiry date'
                  fullWidth
                  variant='standard'
                  helperText={
                    touched.expDate && isErrorMessage('expDate', errors)
                  }
                  error={touched.expDate && isError('expDate', errors, touched)}
                  {...getFieldProps('expDate')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label='CVV'
                  fullWidth
                  variant='standard'
                  helperText={touched.cvc && isErrorMessage('cvv', errors)}
                  error={touched.cvc && isError('cvv', errors, touched)}
                  {...getFieldProps('cvv')}
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedAccordion === 'cash_on_delivery'}
        onChange={handleAccordionChange('cash_on_delivery')}
      >
        <AccordionSummary>
          <FormControlLabel
            value='cash_on_delivery'
            control={
              <Radio
                checked={selectedPaymentMethod === 'cash_on_delivery'}
                onChange={handleChange}
              />
            }
            label='Cash on Delivery'
          />
        </AccordionSummary>
      </Accordion>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type='submit'
          variant='contained'
          onClick={placeOrder}
          sx={{ mt: 3, ml: 1 }}
          // disabled={!(isValid && dirty) || isSubmitting}
        >
          {loading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            ' Place Order'
          )}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default PaymentForm;
