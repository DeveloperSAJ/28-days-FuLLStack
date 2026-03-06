import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const usePlants = (initialFilters = {}) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await api.get('/plants');
      setPlants(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch plants');
      toast.error('Failed to load plants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const getPlantById = async (id) => {
    try {
      const response = await api.get(`/plants/${id}`);
      return response.data.data;
    } catch (err) {
      toast.error('Failed to fetch plant details');
      throw err;
    }
  };

  const searchPlants = async (query) => {
    try {
      const response = await api.get(`/plants/search/${encodeURIComponent(query)}`);
      return response.data.data;
    } catch (err) {
      toast.error('Search failed');
      throw err;
    }
  };

  const getPlantsByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/plants/category/${categoryId}`);
      return response.data.data;
    } catch (err) {
      toast.error('Failed to fetch plants by category');
      throw err;
    }
  };

  const createPlant = async (plantData) => {
    try {
      const response = await api.post('/plants', plantData);
      toast.success('Plant created successfully');
      await fetchPlants();
      return response.data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create plant');
      throw err;
    }
  };

  const updatePlant = async (id, plantData) => {
    try {
      const response = await api.put(`/plants/${id}`, plantData);
      toast.success('Plant updated successfully');
      await fetchPlants();
      return response.data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update plant');
      throw err;
    }
  };

  const deletePlant = async (id) => {
    try {
      await api.delete(`/plants/${id}`);
      toast.success('Plant deleted successfully');
      await fetchPlants();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete plant');
      throw err;
    }
  };

  // Filter plants based on current filters
  const filteredPlants = plants.filter(plant => {
    let matches = true;
    
    if (filters.search) {
      matches = matches && (
        plant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        plant.scientific_name?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.category) {
      matches = matches && plant.category_id === parseInt(filters.category);
    }
    
    if (filters.sunlight) {
      matches = matches && plant.sunlight?.toLowerCase().includes(filters.sunlight.toLowerCase());
    }
    
    if (filters.watering) {
      matches = matches && plant.watering?.toLowerCase().includes(filters.watering.toLowerCase());
    }
    
    if (filters.poisonous !== undefined) {
      matches = matches && plant.is_poisonous === filters.poisonous;
    }
    
    return matches;
  });

  return {
    plants: filteredPlants,
    allPlants: plants,
    loading,
    error,
    filters,
    setFilters,
    getPlantById,
    searchPlants,
    getPlantsByCategory,
    createPlant,
    updatePlant,
    deletePlant,
    refreshPlants: fetchPlants
  };
};