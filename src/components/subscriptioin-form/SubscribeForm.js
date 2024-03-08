import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { AxiosClient } from '../../services';
import { useToast } from '../../hooks/useToast';

const SubscribeForm = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      await AxiosClient.post('api/subscribers/post', { email });
      toast.success('Subscribed Successfully');
      setEmail('');
      setError('');
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleBlur = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
      <TextField
        variant='outlined'
        label='Email'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        onBlur={handleBlur} 
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                variant='contained'
                disableElevation
                onClick={handleSubscribe}
                sx={{ borderRadius: '5rem' }}
              >
                Subscribe
              </Button>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '5rem',
            width: { xs: '90%', sm: '100%' },
          },
        }}
      />
    </div>
  );
};

export default SubscribeForm;
