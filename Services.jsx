import React, { useState, useMemo } from 'react';
import { MapPin, Search, Wrench, GraduationCap, Camera, Palette, HardDrive, Star } from 'lucide-react';

export default function Services({
  listings,
  activeCommunityId,
  setCurrentRoute,
  wishlist,
  toggleWishlist,
  users
}) {
  const [serviceSearch, setServiceSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Filter listings
  const serviceListings = useMemo(() => {
    return listings.filter(item => {
      // Must be of type service
      if (item.type !== 'service') return false;

      // Community check
      if (activeCommunityId && item.communityId !== activeCommunityId) return false;

      // Category check
      if (activeCategoryFilter !== 'All' && item.category !== activeCategoryFilter) return false;

      // Search keyword check
      if (serviceSearch.trim()) {
        const query = serviceSearch.toLowerCase().trim();
        return item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      }

      return true;
    });
  }, [listings, activeCommunityId, activeCategoryFilter, serviceSearch]);

  const categories = ['All', 'Tutoring', 'Photography', 'Repairs', 'Graphic Design'];

  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 border border-slate-200/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-premium">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/15 text-accent font-bold text-xs uppercase tracking-wider rounded-lg">
            <Wrench className="w-3.5 h-3.5" />
            Student Talent Directory
          </div>
          <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight">Community Services</h1>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl">
            Hire talented peers within your campus or neighborhood. From coding homework assistance and exam prep to laptop repairs and professional headshots.
          </p>
        </div>

        {/* Categories shortcut icons */}
        <div className="flex gap-4 items-center shrink-0">
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <GraduationCap className="w-5 h-5 text-indigo-500" />
            <span className="text-[9px] font-bold text-slate-400">Tutoring</span>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <Camera className="w-5 h-5 text-blue-500" />
            <span className="text-[9px] font-bold text-slate-400">Photos</span>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <Palette className="w-5 h-5 text-teal-500" />
            <span className="text-[9px] font-bold text-slate-400">Design</span>
          </div>
          <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-1 w-16">
            <HardDrive className="w-5 h-5 text-amber-500" />
            <span className="text-[9px] font-bold text-slate-400">Repairs</span>
          </div>
        </div>
      </div>

      {/* Search & Categories selection */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search student-led services (tutoring, photography)..."
            value={serviceSearch}
            onChange={(e) => setServiceSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-accent rounded-xl text-xs md:text-sm focus:outline-none"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-4 py-1.5 text-xs font-semibold border rounded-full transition-all whitespace-nowrap ${
                activeCategoryFilter === cat
                  ? 'bg-accent border-accent text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Services list grid */}
      {serviceListings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-premium space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">No Services Found</h3>
          <p className="text-xs text-slate-500">No professional or peer-to-peer services are currently offered matching your search selectors.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceListings.map((item) => {
            const inWishlist = wishlist.some(w => w.id === item.id);
            const provider = users.find(u => u.id === item.sellerId) || { name: 'Verified Peer', rating: 4.8, isVerified: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80' };
            
            return (
              <div
                key={item.id}
                className="premium-card flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setCurrentRoute(`product-detail-${item.id}`)}
              >
                {/* Service Visual Image */}
                <div className="relative pt-[55%] overflow-hidden bg-slate-100">
                  <img 
                    src={item.images[0]} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-108"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md text-white bg-accent">
                    Service
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

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase">
                    <span>{item.category}</span>
                    <span>{item.condition}</span>
                  </div>

                  <h3 className="font-bold font-display text-slate-800 text-sm line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  {/* Provider Info card block */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <img 
                      src={provider.avatar} 
                      alt={provider.name} 
                      className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-slate-800 truncate">{provider.name}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] text-slate-500 font-bold">{provider.rating} ({provider.reputation} rep)</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
                    <div className="font-extrabold text-sm text-slate-800">
                      ₹{item.price} <span className="text-[10px] text-slate-400 font-normal">/ {item.rentPeriod || 'hr'}</span>
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
