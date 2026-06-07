import React, { useState, useMemo } from 'react';
import { MapPin, Search, CalendarDays, Bike, Calculator, Monitor, BookOpen } from 'lucide-react';

export default function RentItems({
  listings,
  activeCommunityId,
  setCurrentRoute,
  wishlist,
  toggleWishlist
}) {
  const [rentSearch, setRentSearch] = useState('');
  const [activePeriodFilter, setActivePeriodFilter] = useState('All'); // 'All', 'hour', 'day', 'week'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Filter listings
  const rentalListings = useMemo(() => {
    return listings.filter(item => {
      // Must be of type rent
      if (item.type !== 'rent') return false;

      // Community check
      if (activeCommunityId && item.communityId !== activeCommunityId) return false;

      // Category check
      if (activeCategoryFilter !== 'All' && item.category !== activeCategoryFilter) return false;

      // Period filter check
      if (activePeriodFilter !== 'All' && item.rentPeriod !== activePeriodFilter) return false;

      // Search keyword check
      if (rentSearch.trim()) {
        const query = rentSearch.toLowerCase().trim();
        return item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      }

      return true;
    });
  }, [listings, activeCommunityId, activePeriodFilter, activeCategoryFilter, rentSearch]);

  const categories = ['All', 'Electronics', 'Sports & Outdoors', 'Books', 'Furniture'];

  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-slate-200/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-premium">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary/15 text-secondary font-bold text-xs uppercase tracking-wider rounded-lg">
            <CalendarDays className="w-3.5 h-3.5" />
            Temporary Access Made Simple
          </div>
          <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight">Rental Marketplace</h1>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl">
            Need a scientific calculator for an exam? A bicycle for a quick run? Pay only for what you use, and save money by renting from peers.
          </p>
        </div>

        {/* Categories shortcut icons */}
        <div className="flex gap-4 items-center shrink-0">
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <Bike className="w-5 h-5 text-indigo-500" />
            <span className="text-[9px] font-bold text-slate-400">Cycles</span>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <Calculator className="w-5 h-5 text-blue-500" />
            <span className="text-[9px] font-bold text-slate-400">Calculators</span>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <Monitor className="w-5 h-5 text-teal-500" />
            <span className="text-[9px] font-bold text-slate-400">Projectors</span>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-[9px] font-bold text-slate-400">Books</span>
          </div>
        </div>
      </div>

      {/* Search & Period Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search only rentals (e.g. calculator, bicycle)..."
            value={rentSearch}
            onChange={(e) => setRentSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-secondary rounded-xl text-xs md:text-sm focus:outline-none"
          />
        </div>

        {/* Period Filter Tabs */}
        <div className="flex gap-2 bg-slate-100 border border-slate-200/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {['All', 'hour', 'day', 'week'].map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriodFilter(period)}
              className={`flex-1 md:flex-none text-center px-4 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wider transition ${
                activePeriodFilter === period 
                  ? 'bg-secondary text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {period === 'All' ? 'All Rates' : `per ${period}`}
            </button>
          ))}
        </div>

      </div>

      {/* Categories chips selection */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-4 py-2 text-xs font-semibold border rounded-full transition-all whitespace-nowrap ${
              activeCategoryFilter === cat
                ? 'bg-slate-800 border-slate-800 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rentals grid list */}
      {rentalListings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-premium space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">No Rentals Available</h3>
          <p className="text-xs text-slate-500">We couldn't find any rentals matching these search keywords and filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rentalListings.map((item) => {
            const inWishlist = wishlist.some(w => w.id === item.id);
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
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md text-white bg-secondary">
                    Rent
                  </span>

                  <span className="absolute top-3 left-16 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md text-white bg-slate-800/80">
                    ₹{item.price}/{item.rentPeriod || 'day'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-red-500 shadow-sm transition"
                  >
                    <svg className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col space-y-2">
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
                    <div className="font-extrabold text-sm text-slate-800">
                      ₹{item.price} <span className="text-[10px] text-slate-400 font-normal">/ {item.rentPeriod}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[80px]">{item.location.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
