import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import api from '../api/axios';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [plants, setPlants] = useState([]);
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        const [plantsRes, treesRes] = await Promise.all([
          api.get(`/plants/search/${encodeURIComponent(query)}`),
          api.get(`/trees/search/${encodeURIComponent(query)}`)
        ]);

        setPlants(plantsRes.data.data);
        setTrees(treesRes.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to perform search');
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage message={error} />;

  const totalResults = plants.length + trees.length;

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <SearchIcon className="h-8 w-8 mr-3 text-primary-600" />
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          Found {totalResults} {totalResults === 1 ? 'result' : 'results'}
        </p>
      </div>

      {totalResults === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">No results found</p>
          <p className="text-gray-400">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="space-y-8">
          {plants.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Plants ({plants.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plants.map(plant => (
                  <Card key={plant.id} item={plant} type="plant" />
                ))}
              </div>
            </section>
          )}

          {trees.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Trees ({trees.length})
              </h2>
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

export default Search;