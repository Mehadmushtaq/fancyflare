import { useState } from 'react';
import { AxiosClient } from '../services';
import { useToast } from './useToast';
import { transformError } from '../helpers';
import axios from 'axios';

const useProductApi = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      // const result = await AxiosClient.get("products/all");
      const result = await axios.get('https://fakestoreapi.com/products');
      setProducts(result.data);
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

  return {
    loading,
    getAllProducts,
    getLatestProducts,
    latestProducts,
    getCategoryProducts,
    products,
    getProductById,
  };
};

export default useProductApi;
