import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { AxiosClient } from '../../services';
import { useToast } from '../../hooks/useToast';

const ContactForm = () => {
  const toast = useToast();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(\+92|92|0)?[3456789]\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleSubscribe = async () => {
    if (!validatePhoneNumber(phone)) {
      setError('Invalid phone number');
      return;
    }

    try {
      await AxiosClient.post('api/subscribers-phone/post', { phone });
      toast.success('Joined Successfully');
      setPhone('');
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
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
      <TextField
        variant='outlined'
        label='WhatsApp Number'
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError('');
        }}
        error={!!error}
        onBlur={handleBlur} 
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                variant='contained'
                disableElevation
                onClick={handleSubscribe}
                sx={{ borderRadius: '5rem', width: '100%' }}
              >
                Join us
              </Button>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '5rem',
            width: { xs: '98%', sm: '108%', md: '100%' },
          },
        }}
      />
    </div>
  );
};

export default ContactForm;
