import React, { useState, useMemo } from 'react';
import { Search, MapPin, Grid, SlidersHorizontal, Heart, Check, X, HelpCircle, ArrowRightLeft } from 'lucide-react';

export default function Marketplace({
  listings,
  communities,
  activeCommunityId,
  setCurrentRoute,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  wishlist,
  toggleWishlist
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);
  const [conditionFilter, setConditionFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  
  // Comparison state
  const [compareList, setCompareList] = useState([]);

  // Available categories
  const categories = ['All', 'Electronics', 'Books', 'Furniture', 'Sports & Outdoors', 'Academic Gear', 'Clothing'];

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(5000);
    setConditionFilter('All');
    setSearchQuery('');
    setFilterType('all');
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // 1. Community filter
      if (activeCommunityId && item.communityId !== activeCommunityId) return false;
      
      // 2. Type filter (Buy vs Rent vs Service) - default to buy if type matches
      if (filterType !== 'all' && item.type !== filterType) return false;

      // 3. Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      // 4. Price filter
      if (item.price > priceRange) return false;

      // 5. Condition filter
      if (conditionFilter !== 'All') {
        if (conditionFilter === 'New' && !item.condition.toLowerCase().includes('new')) return false;
        if (conditionFilter === 'Used' && !item.condition.toLowerCase().includes('used')) return false;
      }

      // 6. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [listings, activeCommunityId, filterType, selectedCategory, priceRange, conditionFilter, searchQuery]);

  // Sort listings
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      return list.sort((a, b) => b.views - a.views);
    } else {
      // default: latest (date descending)
      return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [filteredListings, sortBy]);

  // Add/Remove from Comparison list
  const toggleCompare = (item) => {
    if (compareList.some(c => c.id === item.id)) {
      setCompareList(compareList.filter(c => c.id !== item.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 listings at a time.");
        return;
      }
      setCompareList([...compareList, item]);
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeInUp">
      {/* 1. Header with Statistics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight">
            {filterType === 'rent' ? 'Rental Market' : filterType === 'service' ? 'Service Directory' : 'Marketplace Feed'}
          </h1>
          <p className="text-slate-500 text-sm">
            Found {sortedListings.length} active listings {activeCommunityId ? 'in your community' : 'across all communities'}.
          </p>
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium focus:border-primary focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="latest">Latest Uploads</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Popularity (Views)</option>
          </select>
        </div>
      </div>

      {/* 2. Comparison Quick Sheet (Sticky Floating Bar if items selected) */}
      {compareList.length > 0 && (
        <div className="bg-white border-2 border-primary/20 rounded-2xl p-5 shadow-premium animate-fadeInUp sticky top-20 z-40">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-slate-800">Compare Listings ({compareList.length}/3)</span>
            </div>
            <button 
              onClick={() => setCompareList([])}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              Clear all <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compareList.map((item, idx) => (
              <div key={item.id} className="relative flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <button
                  onClick={() => toggleCompare(item)}
                  className="absolute -top-2 -right-2 p-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full shadow-sm transition"
                >
                  <X className="w-3 h-3" />
                </button>
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-12 h-12 object-cover rounded-lg bg-slate-200 shrink-0" 
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-800 truncate">{item.title}</h4>
                  <p className="text-xs text-primary font-extrabold mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span className="bg-slate-200 px-1.5 py-0.5 rounded uppercase font-semibold">{item.condition.split(' ')[0]}</span>
                    <span className="truncate">{item.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className="hidden md:flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-3 text-center text-xs text-slate-400">
                Add another listing to compare
              </div>
            ))}
          </div>

          {compareList.length > 1 && (
            <div className="mt-4 pt-3 border-t border-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-semibold">
                    <th className="py-2">Feature</th>
                    {compareList.map((item) => (
                      <th key={item.id} className="py-2 px-4 font-bold text-slate-700">{item.title.substring(0, 20)}...</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 font-semibold text-slate-500">Price (₹)</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2 px-4 font-extrabold text-slate-800">
                        ₹{item.price}
                        {item.type === 'rent' && `/${item.rentPeriod}`}
                        {item.type === 'service' && `/${item.rentPeriod}`}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 font-semibold text-slate-500">Condition</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2 px-4 text-slate-700">{item.condition}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 font-semibold text-slate-500">Location</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2 px-4 text-slate-600 truncate">{item.location}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-slate-500">Action</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="py-2 px-4">
                        <button
                          onClick={() => setCurrentRoute(`product-detail-${item.id}`)}
                          className="px-3 py-1 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition text-[10px]"
                        >
                          View Details
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 3. Main Grid layout: Sidebar Filters + Cards Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS (Sticky) */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-premium">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-slate-800 font-display">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters</span>
            </div>
            <button 
              onClick={resetFilters}
              className="text-xs font-semibold text-primary hover:text-primary-hover transition"
            >
              Reset All
            </button>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Type</label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium border transition-all ${
                  filterType === 'all' 
                    ? 'bg-primary/5 border-primary text-primary font-semibold' 
                    : 'bg-transparent border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Listings
              </button>
              <button
                onClick={() => setFilterType('buy')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium border transition-all ${
                  filterType === 'buy' 
                    ? 'bg-primary/5 border-primary text-primary font-semibold' 
                    : 'bg-transparent border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Buy/Sell Products
              </button>
              <button
                onClick={() => setFilterType('rent')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium border transition-all ${
                  filterType === 'rent' 
                    ? 'bg-secondary/5 border-secondary text-secondary font-semibold' 
                    : 'bg-transparent border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Rental Items
              </button>
              <button
                onClick={() => setFilterType('service')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xl font-medium border transition-all ${
                  filterType === 'service' 
                    ? 'bg-accent/5 border-accent text-accent font-semibold' 
                    : 'bg-transparent border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Offered Services
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-all ${
                    selectedCategory === cat 
                      ? 'bg-slate-100 text-slate-800 font-bold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-primary font-extrabold lowercase">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹10</span>
              <span>₹5,000+</span>
            </div>
          </div>

          {/* Condition Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Condition</label>
            <div className="flex gap-2">
              {['All', 'New', 'Used'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`flex-1 text-center py-1.5 text-xs rounded-xl font-medium border transition-all ${
                    conditionFilter === cond 
                      ? 'bg-slate-100 border-slate-300 text-slate-800 font-bold' 
                      : 'bg-transparent border-slate-100 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MARKETPLACE ITEMS LIST */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active search queries & Clear filters indicators */}
          {searchQuery && (
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-indigo-700">Search results for:</span>
                <span className="bg-indigo-100 text-primary font-bold text-xs px-2.5 py-1 rounded-lg">"{searchQuery}"</span>
              </div>
              
              {/* Informative message for search compare */}
              <div className="text-[11px] text-slate-500 italic max-w-md">
                Tip: Search "Calculator" to see and compare multiple similar scientific models!
              </div>

              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-800 flex items-center gap-1 border-b border-indigo-200"
              >
                Clear Search
              </button>
            </div>
          )}

          {sortedListings.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-premium space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Listings Found</h3>
              <p className="text-sm text-slate-500">No items match your active filters. Try adjusting your search keywords, price limits, or category selectors.</p>
              <button 
                onClick={resetFilters}
                className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl text-xs hover:bg-primary-hover shadow-sm hover:shadow transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
              {sortedListings.map((item) => {
                const inWishlist = wishlist.some(w => w.id === item.id);
                const isComparing = compareList.some(c => c.id === item.id);
                return (
                  <div 
                    key={item.id}
                    className="premium-card flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setCurrentRoute(`product-detail-${item.id}`)}
                  >
                    <div className="relative pt-[65%] overflow-hidden bg-slate-100">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-108"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80';
                        }}
                      />
                      
                      {/* Badge type */}
                      <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white ${
                        item.type === 'buy' ? 'bg-primary' : item.type === 'rent' ? 'bg-secondary' : 'bg-accent'
                      }`}>
                        {item.type === 'buy' ? 'Buy' : item.type === 'rent' ? 'Rent' : 'Service'}
                      </span>
                      
                      {/* Compare Switch */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(item);
                        }}
                        className={`absolute top-3 left-14 px-2 py-1 flex items-center gap-1 rounded-md text-[10px] font-semibold shadow-sm transition border ${
                          isComparing
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white/90 text-slate-600 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                      </button>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-red-500 shadow-sm transition"
                      >
                        <svg 
                          className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col space-y-3">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase">
                        <span>{item.category}</span>
                        <span>{item.condition}</span>
                      </div>

                      <h3 className="font-bold font-display text-slate-800 text-sm line-clamp-2 leading-snug flex-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
                        <div className="font-extrabold text-base text-slate-800">
                          ₹{item.price.toLocaleString('en-IN')}
                          {item.type === 'rent' && (
                            <span className="text-xs text-slate-400 font-normal">/{item.rentPeriod || 'day'}</span>
                          )}
                          {item.type === 'service' && (
                            <span className="text-xs text-slate-400 font-normal">/{item.rentPeriod || 'hr'}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[90px]">{item.location.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
