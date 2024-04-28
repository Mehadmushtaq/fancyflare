import { useState } from 'react';
import { AxiosClient } from '../services';
import { useToast } from './useToast';
import { transformError } from '../helpers';
import { useAuthContext } from '../context';

const initialValues = {
  first_name: '',
  last_name: '',
  address_line_01: '',
  address_line_02: '',
  city: '',
  state: '',
  zip_code: '',
  contact_number: '',
};

export const useAddressFormSubmit = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuthContext();
  const user = getUser();

  const onSubmit = async (values, setActiveStep, activeStep, setOrderId) => {
    try {
      setLoading(true);
      const result = await AxiosClient.post('api/checkout/checkout-post', {
        ...values,
        user_id: user.id,
      });
      if (result?.data?.success) {
        setOrderId(result.data.result.id);
        toast.success('Address submitted successfully');
        setActiveStep(activeStep + 1);
      } else {
        toast.error('Failed to submit address');
      }
    } catch (err) {
      toast.error(transformError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    initialValues,
    onSubmit,
    loading,
  };
};
