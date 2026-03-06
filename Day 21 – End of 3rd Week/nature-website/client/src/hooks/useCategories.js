import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategoryById = async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data.data;
    } catch (err) {
      toast.error('Failed to fetch category details');
      throw err;
    }
  };

  const getCategoryWithItems = async (id) => {
    try {
      const response = await api.get(`/categories/${id}/items`);
      return response.data.data;
    } catch (err) {
      toast.error('Failed to fetch category items');
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    getCategoryById,
    getCategoryWithItems,
    refreshCategories: fetchCategories
  };
};