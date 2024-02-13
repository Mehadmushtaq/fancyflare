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
                touched.first_name && isErrorMessage('first_name', errors)
              }
              error={
                touched.first_name && isError('first_name', errors, touched)
              }
              {...getFieldProps('first_name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Last name'
              fullWidth
              variant='standard'
              helperText={
                touched.last_name && isErrorMessage('last_name', errors)
              }
              error={touched.last_name && isError('last_name', errors, touched)}
              {...getFieldProps('last_name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Address line 1'
              fullWidth
              variant='standard'
              helperText={
                touched.address_line_01 &&
                isErrorMessage('address_line_01', errors)
              }
              error={
                touched.address_line_01 &&
                isError('address_line_01', errors, touched)
              }
              {...getFieldProps('address_line_01')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Address line 2'
              fullWidth
              variant='standard'
              helperText={
                touched.address_Line_02 &&
                isErrorMessage('address_Line_02', errors)
              }
              error={
                touched.address_Line_02 &&
                isError('address_Line_02', errors, touched)
              }
              {...getFieldProps('address_Line_02')}
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
              helperText={
                touched.zip_code && isErrorMessage('zip_code', errors)
              }
              error={touched.zip_code && isError('zip_code', errors, touched)}
              {...getFieldProps('zip_code')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label='Contact Number'
              fullWidth
              variant='standard'
              helperText={
                touched.contact_number &&
                isErrorMessage('contact_number', errors)
              }
              error={
                touched.contact_number &&
                isError('contact_number', errors, touched)
              }
              {...getFieldProps('contact_number')}
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
