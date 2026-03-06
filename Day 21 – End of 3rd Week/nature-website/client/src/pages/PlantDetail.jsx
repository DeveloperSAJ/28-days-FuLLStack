import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Sun, Droplet, Thermometer, MapPin, 
  Calendar, AlertCircle, Sprout, Leaf 
} from 'lucide-react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await api.get(`/plants/${id}`);
        setPlant(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch plant details');
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;
  if (!plant) return <ErrorMessage message="Plant not found" />;

  return (
    <div className="container-custom py-8">
      {/* Back button */}
      <Link to="/plants" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Plants
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="h-96 lg:h-full">
            <img
              src={plant.image_url || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800'}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{plant.name}</h1>
              <p className="text-xl text-gray-500 italic">{plant.scientific_name}</p>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {plant.category_name}
              </span>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{plant.description}</p>

            {/* Care Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sprout className="h-5 w-5 mr-2 text-primary-600" />
                Care Instructions
              </h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{plant.care_instructions}</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Sunlight</span>
                </div>
                <p className="text-gray-700">{plant.sunlight}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Watering</span>
                </div>
                <p className="text-gray-700">{plant.watering}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium">Temperature</span>
                </div>
                <p className="text-gray-700">{plant.temperature}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Soil Type</span>
                </div>
                <p className="text-gray-700">{plant.soil_type}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium">Native Region</span>
                </div>
                <p className="text-gray-700">{plant.native_region}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="font-medium">Bloom Time</span>
                </div>
                <p className="text-gray-700">{plant.bloom_time}</p>
              </div>
            </div>

            {/* Poisonous Warning */}
            {plant.is_poisonous && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Warning: Poisonous Plant</h3>
                  <p className="text-red-700 text-sm">
                    This plant is toxic if ingested. Handle with care and keep away from children and pets.
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

export default PlantDetail;