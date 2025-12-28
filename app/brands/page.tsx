'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Wine,
  Star,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Brand {
  id: string;
  name: string;
  category: string;
  abv: number;
  rating: number;
  quality: string;
  region: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const regions = ['Delhi', 'Bangalore', 'Goa', 'Mumbai', 'Hyderabad', 'Punjab'];
  const categories = Array.from(new Set(brands.map(b => b.category)));

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/brands');
      const data = await response.json();
      setBrands(data.brands || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        brand.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || brand.region === selectedRegion;
    const matchesCategory = !selectedCategory || brand.category === selectedCategory;

    return matchesSearch && matchesRegion && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Premium Brand Catalog
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our complete collection of verified premium spirits
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="glass-card p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search brands or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 glass-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:w-auto px-4 py-3 glass-card rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/10 transition-colors"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Region Filter */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Filter by Region
                      </label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full glass-input px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">All Regions</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Filter by Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full glass-input px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(selectedRegion || selectedCategory) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedRegion && (
                        <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          Region: {selectedRegion}
                          <button
                            onClick={() => setSelectedRegion('')}
                            className="ml-2 hover:text-primary/80"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {selectedCategory && (
                        <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          Category: {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory('')}
                            className="ml-2 hover:text-primary/80"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-muted-foreground">
              Showing {filteredBrands.length} of {brands.length} brands
            </p>
          </motion.div>

          {/* Brands Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(index * 0.05, 1) }}
                className="glass-card p-6 hover:gold-glow transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:amber-text transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{brand.category}</p>
                  </div>
                  <Wine className="h-6 w-6 text-primary flex-shrink-0" />
                </div>

                {/* Quality Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    brand.quality === 'Luxury' ? 'bg-primary/20 text-primary' :
                    brand.quality === 'Premium' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-secondary/50 text-muted-foreground'
                  }`}>
                    {brand.quality}
                  </span>
                </div>

                {/* Region */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Region</p>
                  <p className="text-sm font-medium text-foreground">{brand.region}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-primary fill-current mr-1" />
                  <span className="text-sm font-semibold text-foreground">{brand.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground ml-1">/ 5.0</span>
                </div>

                {/* ABV */}
                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <span className="text-sm text-muted-foreground">ABV</span>
                  <span className="text-sm font-semibold text-foreground">{brand.abv}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredBrands.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Wine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No brands found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('');
                  setSelectedCategory('');
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
