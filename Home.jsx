import React, { useState } from 'react';
import { Search, MapPin, ShieldCheck, ShoppingBag, CalendarRange, Wrench, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function Home({
  listings,
  communities,
  activeCommunityId,
  setActiveCommunityId,
  setCurrentRoute,
  setSearchQuery,
  setFilterType,
  wishlist,
  toggleWishlist
}) {
  const [localSearch, setLocalSearch] = useState('');
  
  // Find current community name
  const currentCommunityName = communities.find(c => c.id === activeCommunityId)?.name || 'Your Community';

  // Handle hero search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setCurrentRoute('marketplace');
  };

  // Quick category links
  const navigateToCategory = (type) => {
    setFilterType(type);
    setSearchQuery('');
    if (type === 'rent') {
      setCurrentRoute('rent');
    } else if (type === 'service') {
      setCurrentRoute('services');
    } else {
      setCurrentRoute('marketplace');
    }
  };

  // Get recently added listings
  const recentListings = [...listings]
    .filter(l => !activeCommunityId || l.communityId === activeCommunityId)
    .slice(-4)
    .reverse();

  return (
    <div className="space-y-16 pb-16 animate-fadeInUp">
      {/* 1. Hero & Search Banner */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 rounded-3xl border border-slate-100/50 p-6 md:p-12 shadow-premium">
        <div className="absolute top-0 right-0 w-80 h-80 gradient-glow -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 gradient-glow -ml-20 -mb-20"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-semibold text-xs uppercase tracking-wider rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Campus Sustainability
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight tracking-tight">
            The Smart, Trusted Marketplace for{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {currentCommunityName}
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Buy textbooks, rent bicycles, hire tutors, or sell dorm essentials safely within your community. Zero commissions. 100% verified peers.
          </p>

          {/* Community Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/70 backdrop-blur-md border border-slate-200/80 p-3 rounded-2xl max-w-lg mx-auto shadow-card">
            <div className="flex items-center gap-2 text-slate-600 px-3 py-1.5 w-full sm:w-auto">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm whitespace-nowrap">Your Community:</span>
            </div>
            <select
              value={activeCommunityId}
              onChange={(e) => setActiveCommunityId(e.target.value)}
              className="bg-transparent border-0 font-medium text-slate-800 text-sm focus:ring-0 focus:outline-none w-full sm:w-auto cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 transition"
            >
              <option value="">All Communities</option>
              {communities.map((comm) => (
                <option key={comm.id} value={comm.id}>
                  {comm.name} ({comm.type})
                </option>
              ))}
            </select>
          </div>

          {/* Intelligent Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center bg-white border-2 border-slate-200 focus-within:border-primary p-2.5 rounded-2xl shadow-card transition-all duration-300">
            <div className="flex-1 flex items-center px-3 gap-2">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search calculators, cycles, textbooks, design tutoring..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent border-0 text-slate-700 placeholder-slate-400 focus:ring-0 focus:outline-none text-sm md:text-base py-1"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 shrink-0"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 2. Fast Navigation Categories */}
      <section className="space-y-6">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold font-display tracking-tight text-slate-800">What are you looking for today?</h2>
          <p className="text-sm text-slate-500">Choose a category to browse local, verified offers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Buy */}
          <div 
            onClick={() => navigateToCategory('buy')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-hover"
          >
            <div className="flex justify-between items-start">
              <div className="p-3.5 bg-indigo-50 text-primary rounded-2xl group-hover:scale-110 transition duration-300">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition" />
            </div>
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-bold font-display text-slate-800">Buy & Sell</h3>
              <p className="text-xs md:text-sm text-slate-500">Purchase second-hand calculators, textbooks, lab equipment, or furniture directly from peers.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-primary">
              Browse listings
            </div>
          </div>

          {/* Card Rent */}
          <div 
            onClick={() => navigateToCategory('rent')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-secondary/20 hover:shadow-hover"
          >
            <div className="flex justify-between items-start">
              <div className="p-3.5 bg-blue-50 text-secondary rounded-2xl group-hover:scale-110 transition duration-300">
                <CalendarRange className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-secondary transition" />
            </div>
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-bold font-display text-slate-800">Rent Items</h3>
              <p className="text-xs md:text-sm text-slate-500">Rent bicycles, calculators, projectors, cameras, or sports equipment by the hour, day, or week.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-secondary">
              Browse rentals
            </div>
          </div>

          {/* Card Services */}
          <div 
            onClick={() => navigateToCategory('service')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-hover"
          >
            <div className="flex justify-between items-start">
              <div className="p-3.5 bg-teal-50 text-accent rounded-2xl group-hover:scale-110 transition duration-300">
                <Wrench className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-accent transition" />
            </div>
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-bold font-display text-slate-800">Local Services</h3>
              <p className="text-xs md:text-sm text-slate-500">Offer or find student-led services: coding tutoring, event photography, repairs, graphic design, and more.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-accent">
              Browse services
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recently Listed Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display tracking-tight text-slate-800">Recently Listed</h2>
            <p className="text-sm text-slate-500">Fresh listings uploaded by verified community members.</p>
          </div>
          <button 
            onClick={() => { setSearchQuery(''); setFilterType('all'); setCurrentRoute('marketplace'); }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition border-b border-primary/20 hover:border-primary pb-0.5 self-start"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentListings.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500 max-w-lg mx-auto">
            No listings found for this community yet. Be the first to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((item) => {
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
                    
                    {/* Badge type */}
                    <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white ${
                      item.type === 'buy' ? 'bg-primary' : item.type === 'rent' ? 'bg-secondary' : 'bg-accent'
                    }`}>
                      {item.type === 'buy' ? 'Buy' : item.type === 'rent' ? 'Rent' : 'Service'}
                    </span>
                    
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
                      
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[80px]">{item.location.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Trust and Benefits (Hackathon USP) */}
      <section className="bg-slate-100/50 border border-slate-200/50 rounded-3xl p-8 md:p-12 shadow-premium">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-800">Why Choose UniMarket?</h2>
          <p className="text-sm md:text-base text-slate-500">A security-first, high-trust ecosystem custom built for local neighborhoods and college campuses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 bg-teal-50 text-accent rounded-full">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Peer Verification</h3>
            <p className="text-xs md:text-sm text-slate-500">All registrations require a valid academic or community email address (e.g., @iitb.ac.in) and ID card validation to keep transactions safe.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 bg-indigo-50 text-primary rounded-full">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Zero Commissions</h3>
            <p className="text-xs md:text-sm text-slate-500">No transaction fees, subscription premiums, or middleman cutouts. 100% of the agreed price goes straight into the seller's pockets.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 bg-blue-50 text-secondary rounded-full">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Eco-Friendly & Green</h3>
            <p className="text-xs md:text-sm text-slate-500">Renting and re-using resources locally dramatically extends the lifecycle of tools, decreases paper waste, and lowers carbon footprints.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
