import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/categories/${id}/items`);
        setCategory(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch category details');
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;
  if (!category) return <ErrorMessage message="Category not found" />;

  const hasPlants = category.plants && category.plants.length > 0;
  const hasTrees = category.trees && category.trees.length > 0;

  return (
    <div className="container-custom py-8">
      <Link to="/categories" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Categories
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="h-64 relative">
          <img
            src={category.image_url || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200'}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-lg opacity-90 max-w-3xl">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {hasPlants && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Plants in this Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.plants.map(plant => (
              <Card key={plant.id} item={plant} type="plant" />
            ))}
          </div>
        </section>
      )}

      {hasTrees && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trees in this Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.trees.map(tree => (
              <Card key={tree.id} item={tree} type="tree" />
            ))}
          </div>
        </section>
      )}

      {!hasPlants && !hasTrees && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No items found in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;