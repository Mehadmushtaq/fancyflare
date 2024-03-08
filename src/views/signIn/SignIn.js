import * as React from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLoginFormSchema, useLoginSubmit } from '../../hooks';
import { useFormik } from 'formik';
import { isError, isErrorMessage } from '../../helpers';
import { colors } from '../../utils';
import toast from 'react-hot-toast';

export function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const loginFormSchema = useLoginFormSchema();
  const { initialValues, onSubmit, loading } = useLoginSubmit();
  const location = useLocation();

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
    validationSchema: loginFormSchema,
    onSubmit,
  });
  
  
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  
    if (location?.state) {
      toast.error(location.state);
    }
  }, []); 
  
  return (
    <Grid container maxWidth='xl' margin='1rem auto'>
      <Grid item xs={false} sm={6} md={7} padding='0.5rem'>
        <Box
          sx={{
            backgroundImage:
              'url(https://images.pexels.com/photos/10557901/pexels-photo-10557901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: 'auto',
            height: '100%',
            borderRadius: '0.5rem 0rem 0rem 0.5rem',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            margin: { xs: '2rem', md: '3rem', lg: '5rem' },
          }}
        >
          <Typography variant='h5'>WELCOME</Typography>
          <Typography variant='body1'>
            Provide your login details to continue
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              fullWidth
              label='Email'
              helperText={touched.email && isErrorMessage('email', errors)}
              error={touched.email && isError('email', errors, touched)}
              {...getFieldProps('email')}
            />
            <TextField
              margin='normal'
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              helperText={
                touched.password && isErrorMessage('password', errors)
              }
              error={touched.password && isError('password', errors, touched)}
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />

              <Link
                to='/forget-password'
                style={{
                  textDecoration: 'none',
                  color: colors.colorBlack,
                }}
              >
                <Typography>Forget Password ?</Typography>
              </Link>
            </Box> */}
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ mt: 3, mb: 2, borderRadius: '5rem' }}
              disabled={!(isValid && dirty) || isSubmitting}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Login'
              )}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  to='/signup'
                  variant='body2'
                  style={{
                    textDecoration: 'none',
                    color: colors.colorBlack,
                  }}
                >
                  Don't have account? CREATE NEW
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
