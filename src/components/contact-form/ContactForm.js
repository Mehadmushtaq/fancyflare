import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { AxiosClient } from '../../services';
import { useToast } from '../../hooks/useToast';

const ContactForm = () => {
  const toast = useToast();
  const [phone, setPhone] = useState('');

  const handleSubscribe = async () => {
    try {
      await AxiosClient.post('api/subscribers-phone/post', { phone });
      toast.success('Joined Succesfuly');
    } catch (error) {
      toast.error(error?.message);
    }
    setPhone('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
      <TextField
        variant='outlined'
        label='Whatsapp Number'
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
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
