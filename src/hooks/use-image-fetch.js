import { useState } from 'react';
import { AxiosClient } from '../services';
import { useToast } from './useToast';
import { transformError } from '../helpers';
import axios from 'axios';

export const useFetchImages = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [heroImages, setHeroImages] = useState([]);

  const fetchHeroImages = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient.get(
        'api/slider-image/get-all?page=1&limit=5'
      );
      setHeroImages(response?.data?.result);
    } catch (err) {
      toast.error(transformError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    heroImages,
    fetchHeroImages,
  };
};
