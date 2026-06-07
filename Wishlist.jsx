import React from 'react';
import { Heart, MapPin, Trash2, ArrowRight } from 'lucide-react';

export default function Wishlist({
  wishlist,
  toggleWishlist,
  setCurrentRoute
}) {
  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      <div>
        <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight flex items-center gap-2">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <span>Your Wishlist</span>
        </h1>
        <p className="text-slate-500 text-sm">Save items you are interested in buying or renting to view them here later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-premium max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800">Your Wishlist is Empty</h3>
          <p className="text-sm text-slate-500">Explore our campus catalogs and click the heart icon on listings to save them.</p>
          <button
            onClick={() => setCurrentRoute('marketplace')}
            className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-hover shadow transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp">
          {wishlist.map((item) => (
            <div 
              key={item.id}
              className="premium-card flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setCurrentRoute(`product-detail-${item.id}`)}
            >
              <div className="relative pt-[65%] overflow-hidden bg-slate-100">
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80';
                  }}
                />
                
                <span className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md text-white ${
                  item.type === 'buy' ? 'bg-primary' : item.type === 'rent' ? 'bg-secondary' : 'bg-accent'
                }`}>
                  {item.type === 'buy' ? 'Buy' : item.type === 'rent' ? 'Rent' : 'Service'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white text-red-500 shadow-sm transition"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
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

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
                  <div className="font-extrabold text-sm text-slate-800">
                    ₹{item.price}
                    {item.type === 'rent' && <span className="text-[10px] text-slate-400 font-normal">/{item.rentPeriod}</span>}
                    {item.type === 'service' && <span className="text-[10px] text-slate-400 font-normal">/{item.rentPeriod}</span>}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[80px]">{item.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
