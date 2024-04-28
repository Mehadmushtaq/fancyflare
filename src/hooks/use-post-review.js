import { useState } from 'react';
import { AxiosClient } from '../services';
import { useToast } from './useToast';
import { transformError } from '../helpers';

export const usePostReview = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const result = await AxiosClient.post('api/checkout/checkout-post', values);
      if (result?.data?.success) {
        toast.success('Reviewe submitted successfully');
      } else {
        toast.error('Failed to submit review');
      }
    } catch (err) {
      toast.error(transformError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
  };
};
