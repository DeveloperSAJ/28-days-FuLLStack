import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useTrees = (initialFilters = {}) => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchTrees = async () => {
    try {
      setLoading(true);
      const response = await api.get('/trees');
      setTrees(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch trees');
      toast.error('Failed to load trees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  const getTreeById = async (id) => {
    try {
      const response = await api.get(`/trees/${id}`);
      return response.data.data;
    } catch (err) {
      toast.error('Failed to fetch tree details');
      throw err;
    }
  };

  const searchTrees = async (query) => {
    try {
      const response = await api.get(`/trees/search/${encodeURIComponent(query)}`);
      return response.data.data;
    } catch (err) {
      toast.error('Search failed');
      throw err;
    }
  };

  const getTreesByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/trees/category/${categoryId}`);
      return response.data.data;
    } catch (err) {
      toast.error('Failed to fetch trees by category');
      throw err;
    }
  };

  const createTree = async (treeData) => {
    try {
      const response = await api.post('/trees', treeData);
      toast.success('Tree created successfully');
      await fetchTrees();
      return response.data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create tree');
      throw err;
    }
  };

  // Filter trees based on current filters
  const filteredTrees = trees.filter(tree => {
    let matches = true;
    
    if (filters.search) {
      matches = matches && (
        tree.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        tree.scientific_name?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.category) {
      matches = matches && tree.category_id === parseInt(filters.category);
    }
    
    if (filters.sunlight) {
      matches = matches && tree.sunlight?.toLowerCase().includes(filters.sunlight.toLowerCase());
    }
    
    if (filters.evergreen !== undefined) {
      matches = matches && tree.is_evergreen === filters.evergreen;
    }
    
    if (filters.growthRate) {
      matches = matches && tree.growth_rate?.toLowerCase() === filters.growthRate.toLowerCase();
    }
    
    return matches;
  });

  return {
    trees: filteredTrees,
    allTrees: trees,
    loading,
    error,
    filters,
    setFilters,
    getTreeById,
    searchTrees,
    getTreesByCategory,
    createTree,
    refreshTrees: fetchTrees
  };
};