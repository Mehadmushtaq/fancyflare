import { useState } from 'react';
import { AxiosClient } from '../services';
import { useToast } from './useToast';
import { transformError } from '../helpers';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  carNumber: '',
  expDate: '',
  cvv: '',
};

export const usePayment = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    console.log(values);
    // try {
    //   setLoading(true);
    //   const result = await AxiosClient.post('api/address/submit', values);
    //   if (result?.data?.success) {
    //     toast.success('Address submitted successfully');
    //     navigate('/success');
    //   } else {
    //     toast.error('Failed to submit address');
    //   }
    // } catch (err) {
    //   toast.error(transformError(err).message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return {
    initialValues,
    onSubmit,
    loading,
  };
};
