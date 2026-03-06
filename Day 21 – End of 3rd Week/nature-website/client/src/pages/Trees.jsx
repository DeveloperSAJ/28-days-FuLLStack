import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import api from '../api/axios';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Trees = () => {
  const [trees, setTrees] = useState([]);
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [treesRes, categoriesRes] = await Promise.all([
          api.get('/trees'),
          api.get('/categories')
        ]);
        setTrees(treesRes.data.data);
        setFilteredTrees(treesRes.data.data);
        setCategories(categoriesRes.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch trees');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = trees;

    if (searchTerm) {
      filtered = filtered.filter(tree =>
        tree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tree => tree.category_id === parseInt(selectedCategory));
    }

    setFilteredTrees(filtered);
  }, [searchTerm, selectedCategory, trees]);

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trees Database</h1>
        <p className="text-gray-600">Discover magnificent trees from forests around the world</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search trees by name or scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="md:w-64 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field pl-10 appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Showing {filteredTrees.length} {filteredTrees.length === 1 ? 'tree' : 'trees'}
      </p>

      {filteredTrees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrees.map(tree => (
            <Card key={tree.id} item={tree} type="tree" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No trees found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Trees;