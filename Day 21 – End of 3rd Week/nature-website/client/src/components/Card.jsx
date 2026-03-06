import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Droplet, Thermometer, Maximize2 } from 'lucide-react';

const Card = ({ item, type }) => {
  const isPlant = type === 'plant';
  const detailPath = `/${type}s/${item.id}`;

  return (
    <div className="card group animate-slide-up">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image_url || `https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs">
          {item.category_name}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-xl mb-1 text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 italic mb-3">{item.scientific_name}</p>
        
        <div className="space-y-2 mb-4">
          {isPlant ? (
            <>
              <div className="flex items-center text-sm text-gray-600">
                <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                <span>{item.sunlight || 'Full sun'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                <span>{item.watering || 'Moderate'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                <span>{item.temperature || 'Moderate'}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center text-sm text-gray-600">
                <Maximize2 className="h-4 w-4 mr-2 text-green-500" />
                <span>Height: {item.height || 'Varies'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                <span>{item.sunlight || 'Full sun'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                <span>Water: {item.water_needs || 'Moderate'}</span>
              </div>
            </>
          )}
        </div>

        <Link
          to={detailPath}
          className="btn-primary w-full text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;