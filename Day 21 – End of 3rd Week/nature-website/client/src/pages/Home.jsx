import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, TreePine, Sprout, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [categoriesRes, plantsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/plants')
        ]);
        
        setCategories(categoriesRes.data.data.slice(0, 4));
        setFeaturedPlants(plantsRes.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <LoadingSpinner size="large" />;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover the Beauty of{' '}
              <span className="text-primary-600">Nature</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our comprehensive database of plants and trees from around the world. 
              Learn about their characteristics, care instructions, and natural habitats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plants" className="btn-primary inline-flex items-center justify-center">
                Explore Plants <Leaf className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/trees" className="btn-secondary inline-flex items-center justify-center">
                Discover Trees <TreePine className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for with our organized categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={category.image_url || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600'}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/categories" className="btn-secondary inline-flex items-center">
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Plants</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover some of our most popular and interesting plant species
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlants.map((plant) => (
              <Card key={plant.id} item={plant} type="plant" />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/plants" className="btn-primary inline-flex items-center">
              View All Plants <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <Sprout className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Start Your Nature Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of nature enthusiasts and learn something new every day
          </p>
          <Link to="/plants" className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;