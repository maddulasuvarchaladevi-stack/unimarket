import React, { useState } from 'react';
import { CalendarRange, Heart, History, User, MapPin, Award, Trash2 } from 'lucide-react';

export default function UserDashboard({
  currentUser,
  wishlist,
  toggleWishlist,
  myRentals,
  completedOrders,
  listings,
  setCurrentRoute
}) {
  const [activeTab, setActiveTab] = useState('rentals');

  // Handle click detail
  const viewItemDetail = (id) => {
    setCurrentRoute(`product-detail-${id}`);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      {/* 1. Profile Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-primary/20 shadow-sm" 
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-extrabold font-display text-slate-800 tracking-tight">{currentUser.name}</h1>
              {currentUser.isVerified && (
                <span className="bg-green-50 border border-green-200 text-green-700 font-extrabold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Verified Student
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-medium">{currentUser.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.hostel || 'Hostel 4'}</span>
            </div>
          </div>
        </div>

        {/* User reputation */}
        <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-auto">
          <div className="p-2.5 bg-indigo-50 text-primary rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="font-extrabold text-lg text-slate-800">{currentUser.reputation || 90}</div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Reputation Score</p>
          </div>
        </div>
      </div>

      {/* 2. Tabs Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-premium flex gap-2">
        <button
          onClick={() => setActiveTab('rentals')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'rentals' 
              ? 'bg-secondary text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <CalendarRange className="w-4 h-4" />
          <span>Active Rentals ({myRentals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'purchases' 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Purchase History ({completedOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'wishlist' 
              ? 'bg-accent text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>My Wishlist ({wishlist.length})</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium min-h-[250px]">
        
        {/* ACTIVE RENTALS TAB */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-800">Your Active Rentals</h2>
            {myRentals.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                You do not have any active rental bookings.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {myRentals.map((rental) => {
                  const item = listings.find(l => l.id === rental.listingId) || {};
                  return (
                    <div key={rental.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex gap-4 items-center min-w-0">
                        <img 
                          src={item.images ? item.images[0] : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100'} 
                          alt={item.title || 'Rental Item'} 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100" 
                        />
                        <div className="min-w-0">
                          <h4 
                            onClick={() => item.id && viewItemDetail(item.id)}
                            className="font-bold text-sm text-slate-800 hover:text-secondary cursor-pointer truncate"
                          >
                            {item.title || 'Rental Item'}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Period: {rental.startDate} to {rental.endDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap gap-6 items-center w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <div className="font-extrabold text-sm text-slate-800">₹{rental.totalCost}</div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Paid</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase rounded-md">
                            {rental.status}
                          </span>
                          <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-md">
                            {rental.daysLeft} days remaining
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PURCHASE HISTORY TAB */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-800">Completed Purchases</h2>
            {completedOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                You haven't bought anything yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {completedOrders.map((order) => {
                  const item = listings.find(l => l.id === order.listingId) || {};
                  return (
                    <div key={order.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex gap-4 items-center min-w-0">
                        <img 
                          src={item.images ? item.images[0] : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100'} 
                          alt={item.title || 'Bought Item'} 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100" 
                        />
                        <div className="min-w-0">
                          <h4 
                            onClick={() => item.id && viewItemDetail(item.id)}
                            className="font-bold text-sm text-slate-800 hover:text-primary cursor-pointer truncate"
                          >
                            {item.title || 'Bought Item'}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Purchased on {order.purchaseDate} from {order.sellerName || 'Verified Seller'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 justify-between w-full sm:w-auto">
                        <div className="text-right">
                          <div className="font-extrabold text-sm text-slate-800">₹{order.pricePaid}</div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase font-sans">Price Paid</p>
                        </div>
                        <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded uppercase">
                          Purchased
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-800">Saved Wishlist</h2>
            {wishlist.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                Your wishlist is empty. Save listings in the marketplace to view them here.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {wishlist.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                    <div className="flex gap-4 items-center min-w-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100" 
                      />
                      <div className="min-w-0">
                        <h4 
                          onClick={() => viewItemDetail(item.id)}
                          className="font-bold text-sm text-slate-800 hover:text-accent cursor-pointer truncate"
                        >
                          {item.title}
                        </h4>
                        <div className="flex gap-2 items-center text-[10px] text-slate-400 mt-0.5 uppercase font-semibold">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.condition}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="font-extrabold text-sm text-slate-800">₹{item.price}</div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Price</p>
                      </div>

                      <button
                        onClick={() => toggleWishlist(item)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-xl transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
