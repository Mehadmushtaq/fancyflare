import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import Cards from 'react-credit-cards-2';
import { usePayment, usePaymentFormSchema } from '../../hooks';
import { useFormik } from 'formik';
import { isError, isErrorMessage } from '../../helpers';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  Typography,
} from '@mui/material';
import { useCartContext } from '../../context';

const PaymentForm = ({ setActiveStep, activeStep }) => {
  const paymentFormSchema = usePaymentFormSchema();
  const { items, totalPrice } = useCartContext();
  const { loading, initialValues, onSubmit } = usePayment();

  const [expandedAccordion, setExpandedAccordion] = React.useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState('creditCard');

  const handleChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
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
      setActiveStep(activeStep + 1);
      onSubmit(values);
    },
  });

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
              secondary={`color: ${item.product.color} size: ${item.product.size}`}
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
        expanded={expandedAccordion === 'creditCard'}
        onChange={handleAccordionChange('creditCard')}
      >
        <AccordionSummary>
          <FormControlLabel
            value='creditCard'
            control={
              <Radio
                checked={selectedPaymentMethod === 'creditCard'}
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
        expanded={expandedAccordion === 'cashOnDelivery'}
        onChange={handleAccordionChange('cashOnDelivery')}
      >
        <AccordionSummary>
          <FormControlLabel
            value='cashOnDelivery'
            control={
              <Radio
                checked={selectedPaymentMethod === 'cashOnDelivery'}
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
          onClick={onSubmit}
          sx={{ mt: 3, ml: 1 }}
          // disabled={!(isValid && dirty) || isSubmitting}
        >
          Save & Next
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default PaymentForm;
