import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from '../address-form/AddressForm';
import PaymentForm from '../payment-form/PaymentForm';

const steps = ['Shipping address', 'Review order && Payment'];

export const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderId, setOrderId] = React.useState();

  return (
    <React.Fragment>
      <Container maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order has been placed. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <AddressForm
                  setActiveStep={setActiveStep}
                  activeStep={activeStep}
                  setOrderId={setOrderId}
                />
              )}
              {activeStep === 1 && (
                <PaymentForm
                  setActiveStep={setActiveStep}
                  activeStep={activeStep}
                  orderId={orderId}
                />
              )}
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};
