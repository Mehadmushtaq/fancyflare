import { useState } from 'react';
import { AxiosClient } from '../services';
import { useToast } from './useToast';
import { transformError } from '../helpers';

export const useProductApi = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const result = await AxiosClient.get(`api/product/get-all`);
      setProducts(result?.data?.result);
    } catch (error) {
      toast.error(transformError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const getProductByCategoryId = async (id) => {
    try {
      setLoading(true);
      const result = await AxiosClient.get(
        `api/product/get-all?page=1&limit=10&category_id=${id}`
      );
      setProducts(result?.data?.result);
    } catch (error) {
      toast.error(transformError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const getLatestProducts = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient.get(
        'api/product/get-all?page=1&limit=8'
      );
      setLatestProducts(response?.data?.result);
    } catch (error) {
      toast.error(transformError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryProducts = async (category) => {
    try {
      setLoading(true);
      const result = await AxiosClient.get(`api/products/category/${category}`);
      setProducts(result.data);
    } catch (error) {
      toast.error(transformError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      const response = await AxiosClient.get(`api/product/get?id=${id}`);
      return response?.data?.result;
    } catch (error) {
      toast.error(transformError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient.get(
        'api/category/get-all?page=1&limit=3'
      );
      setCategories(response?.data?.result);
    } catch (error) {
      toast.error(transformError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = (review) => {
    let averageRating;

    if (review && review.length > 0) {
      let totalRatings = 0;
      for (const rev of review) {
        totalRatings += rev.review.star;
      }
      averageRating = Math.round(totalRatings / review.length);
    }

    return averageRating;
  };

  return {
    loading,
    getAllProducts,
    getLatestProducts,
    latestProducts,
    getCategoryProducts,
    products,
    getProductById,
    getCategories,
    categories,
    calculateAverageRating,
    getProductByCategoryId,
  };
};
