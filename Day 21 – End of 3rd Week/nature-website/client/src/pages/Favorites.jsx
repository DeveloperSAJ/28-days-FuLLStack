import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const { favorites, loading, getFavoritesByType } = useFavorites();
  const [plants, setPlants] = useState([]);
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    if (favorites.length > 0) {
      setPlants(getFavoritesByType('plant'));
      setTrees(getFavoritesByType('tree'));
    }
  }, [favorites, getFavoritesByType]);

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-8 text-center">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Favorites</h2>
        <p className="text-gray-600">Please login to view your favorites.</p>
      </div>
    );
  }

  if (loading) return <LoadingSpinner size="large" />;

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>

      {plants.length === 0 && trees.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">You haven't added any favorites yet.</p>
          <p className="text-gray-400">Browse plants and trees and click the heart icon to save them here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {plants.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Plants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plants.map(plant => (
                  <Card key={plant.id} item={plant} type="plant" />
                ))}
              </div>
            </section>
          )}

          {trees.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trees</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trees.map(tree => (
                  <Card key={tree.id} item={tree} type="tree" />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;