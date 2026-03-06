import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Sun, Droplet, Ruler, Maximize2, 
  Gauge, MapPin, Leaf, TreePine 
} from 'lucide-react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await api.get(`/trees/${id}`);
        setTree(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch tree details');
        setLoading(false);
      }
    };

    fetchTree();
  }, [id]);

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;
  if (!tree) return <ErrorMessage message="Tree not found" />;

  return (
    <div className="container-custom py-8">
      <Link to="/trees" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Trees
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-96 lg:h-full">
            <img
              src={tree.image_url || 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'}
              alt={tree.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tree.name}</h1>
              <p className="text-xl text-gray-500 italic">{tree.scientific_name}</p>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {tree.category_name}
              </span>
              {tree.is_evergreen && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                  Evergreen
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{tree.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Ruler className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Height</span>
                </div>
                <p className="text-gray-700">{tree.height}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Maximize2 className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Spread</span>
                </div>
                <p className="text-gray-700">{tree.spread}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Gauge className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="font-medium">Growth Rate</span>
                </div>
                <p className="text-gray-700">{tree.growth_rate}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Soil Type</span>
                </div>
                <p className="text-gray-700">{tree.soil_type}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Sunlight</span>
                </div>
                <p className="text-gray-700">{tree.sunlight}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Water Needs</span>
                </div>
                <p className="text-gray-700">{tree.water_needs}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium">Native Region</span>
                </div>
                <p className="text-gray-700">{tree.native_region}</p>
              </div>
            </div>

            {tree.is_evergreen && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <TreePine className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Evergreen Tree</h3>
                  <p className="text-green-700 text-sm">
                    This tree retains its leaves throughout the year, providing year-round beauty and shade.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDetail;