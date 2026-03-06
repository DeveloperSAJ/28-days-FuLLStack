import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useFavorites = () => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const response = await api.get('/auth/favorites');
      setFavorites(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [isAuthenticated]);

  const addFavorite = async (itemType, itemId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return false;
    }

    try {
      await api.post('/auth/favorites', { itemType, itemId });
      await fetchFavorites();
      toast.success('Added to favorites');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to favorites');
      return false;
    }
  };

  const removeFavorite = async (itemType, itemId) => {
    if (!isAuthenticated) return false;

    try {
      await api.delete(`/auth/favorites/${itemType}/${itemId}`);
      await fetchFavorites();
      toast.success('Removed from favorites');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from favorites');
      return false;
    }
  };

  const isFavorite = (itemType, itemId) => {
    return favorites.some(fav => 
      fav.item_type === itemType && fav.item.id === itemId
    );
  };

  const getFavoritesByType = (itemType) => {
    return favorites.filter(fav => fav.item_type === itemType).map(fav => fav.item);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesByType,
    refreshFavorites: fetchFavorites
  };
};