import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useAddressFormSchema, useAddressFormSubmit } from '../../hooks';
import { useFormik } from 'formik';
import { isError, isErrorMessage } from '../../helpers';

const AddressForm = ({ setActiveStep, activeStep }) => {
  const addressFormSchema = useAddressFormSchema();
  const { loading, onSubmit, initialValues } = useAddressFormSubmit();

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
    validationSchema: addressFormSchema,
    onSubmit: (values) => {
      setActiveStep(activeStep + 1);
      onSubmit(values);
    },
  });

  return (
    <Box sx={{ my: '2rem' }}>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='First name'
              fullWidth
              variant='standard'
              helperText={
                touched.firstName && isErrorMessage('firstName', errors)
              }
              error={touched.firstName && isError('firstName', errors, touched)}
              {...getFieldProps('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Last name'
              fullWidth
              variant='standard'
              helperText={
                touched.lastName && isErrorMessage('lastName', errors)
              }
              error={touched.lastName && isError('lastName', errors, touched)}
              {...getFieldProps('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Address line 1'
              fullWidth
              variant='standard'
              helperText={
                touched.addressLine1 && isErrorMessage('addressLine1', errors)
              }
              error={
                touched.addressLine1 && isError('addressLine1', errors, touched)
              }
              {...getFieldProps('addressLine1')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Address line 2'
              fullWidth
              variant='standard'
              helperText={
                touched.addressLine2 && isErrorMessage('addressLine2', errors)
              }
              error={
                touched.addressLine2 && isError('addressLine2', errors, touched)
              }
              {...getFieldProps('addressLine2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='City'
              fullWidth
              variant='standard'
              helperText={touched.city && isErrorMessage('city', errors)}
              error={touched.city && isError('city', errors, touched)}
              {...getFieldProps('city')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='State/Province/Region'
              fullWidth
              variant='standard'
              helperText={touched.state && isErrorMessage('state', errors)}
              error={touched.state && isError('state', errors, touched)}
              {...getFieldProps('state')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Zip / Postal code'
              fullWidth
              variant='standard'
              helperText={touched.zipcode && isErrorMessage('zipcode', errors)}
              error={touched.zipcode && isError('zipcode', errors, touched)}
              {...getFieldProps('zipcode')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='Contact Number'
              fullWidth
              variant='standard'
              helperText={
                touched.contactNumber && isErrorMessage('contactNumber', errors)
              }
              error={
                touched.contactNumber &&
                isError('contactNumber', errors, touched)
              }
              {...getFieldProps('contactNumber')}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='submit'
            variant='contained'
            onClick={onSubmit}
            sx={{ mt: 3, ml: 1 }}
            disabled={!(isValid && dirty) || isSubmitting}
          >
            Save & Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressForm;
