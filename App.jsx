import React, { useState, useEffect } from 'react';
import { loadState, saveState } from './utils/mockData';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import RentItems from './pages/RentItems';
import Services from './pages/Services';
import Auth from './pages/Auth';
import UserDashboard from './pages/UserDashboard';
import SellerDashboard from './pages/SellerDashboard';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import SystemBlueprint from './pages/SystemBlueprint';

// Icons
import { 
  Store, 
  ShoppingBag, 
  CalendarRange, 
  Wrench, 
  Heart, 
  User, 
  PlusCircle, 
  MessageSquare, 
  MapPin, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  ShieldCheck,
  Search,
  Shield
} from 'lucide-react';

export default function App() {
  // 1. Initialize persistent state from localStorage
  const [state, setState] = useState(() => loadState());
  const [currentRoute, setCurrentRoute] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeCommunityId, setActiveCommunityId] = useState('iitb');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Verification complete! Welcome to UniMarket.", read: false },
    { id: 2, text: "Casio FX-991ES Plus is trending in your hostel block.", read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sync state back to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  // State modification helpers
  const setCurrentUser = (user) => {
    setState(prev => ({ ...prev, currentUser: user }));
  };

  const setUsers = (usersList) => {
    setState(prev => ({ ...prev, users: usersList }));
  };

  const setReviews = (reviewsList) => {
    setState(prev => ({ ...prev, reviews: reviewsList }));
  };

  const setReports = (reportsList) => {
    setState(prev => ({ ...prev, reports: reportsList }));
  };

  const addListing = (newListing) => {
    setState(prev => ({ ...prev, listings: [...prev.listings, newListing] }));
  };

  const removeListing = (listingId) => {
    setState(prev => ({ ...prev, listings: prev.listings.filter(l => l.id !== listingId) }));
  };

  const updateListingStatus = (listingId, newStatus) => {
    // simulated status toggle e.g. Sold/Active
    setState(prev => ({
      ...prev,
      listings: prev.listings.map(l => l.id === listingId ? { ...l, condition: newStatus } : l)
    }));
  };

  const toggleWishlist = (item) => {
    setState(prev => {
      const exists = prev.wishlist.some(w => w.id === item.id);
      let updated;
      if (exists) {
        updated = prev.wishlist.filter(w => w.id !== item.id);
      } else {
        updated = [...prev.wishlist, item];
      }
      return { ...prev, wishlist: updated };
    });
  };

  const bookRental = (newRental) => {
    setState(prev => ({ ...prev, myRentals: [newRental, ...prev.myRentals] }));
  };

  const buyItem = (newOrder) => {
    setState(prev => ({
      ...prev,
      completedOrders: [newOrder, ...prev.completedOrders],
      // Mark listing as sold by deleting/removing or updating its condition status
      listings: prev.listings.filter(l => l.id !== newOrder.listingId)
    }));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRoute('login');
  };

  // Nav routing helpers
  const navigateTo = (route, type = 'all') => {
    setFilterType(type);
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo(0,0);
  };

  // Read notifications
  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HEADER SECTION (STICKY GLOBAL NAVIGATION) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => navigateTo('home')} 
                className="flex items-center gap-2 text-xl font-extrabold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent focus:outline-none"
              >
                <Store className="w-6 h-6 text-primary shrink-0" />
                <span>UniMarket</span>
              </button>

              {/* Desktop menu links */}
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => navigateTo('marketplace')} 
                  className={`text-sm font-semibold transition ${currentRoute === 'marketplace' ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Marketplace
                </button>
                <button 
                  onClick={() => navigateTo('rent', 'rent')} 
                  className={`text-sm font-semibold transition ${currentRoute === 'rent' ? 'text-secondary' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Rentals
                </button>
                <button 
                  onClick={() => navigateTo('services', 'service')} 
                  className={`text-sm font-semibold transition ${currentRoute === 'services' ? 'text-accent' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Services
                </button>
                <button 
                  onClick={() => navigateTo('blueprint')} 
                  className={`text-sm font-semibold transition ${currentRoute === 'blueprint' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Blueprint
                </button>
                {state.currentUser?.role === 'admin' && (
                  <button 
                    onClick={() => navigateTo('dashboard-admin')} 
                    className={`text-sm font-semibold transition ${currentRoute === 'dashboard-admin' ? 'text-red-500 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Admin Portal
                  </button>
                )}
                <button 
                  onClick={() => navigateTo('contact')} 
                  className={`text-sm font-semibold transition ${currentRoute === 'contact' ? 'text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* Actions: Wishlist, Notification bell, Dashboard, User profile */}
            <div className="flex items-center gap-4">
              
              {state.currentUser ? (
                <>
                  {/* Dashboard Buttons */}
                  <div className="hidden sm:flex items-center gap-3">
                    <button
                      onClick={() => navigateTo('dashboard-seller')}
                      className={`px-3 py-1.5 border border-slate-200 hover:border-primary/20 text-xs font-semibold rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition flex items-center gap-1.5 ${
                        currentRoute === 'dashboard-seller' ? 'bg-slate-50 border-primary/25' : ''
                      }`}
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Post listing</span>
                    </button>
                  </div>

                  {/* Wishlist Icon */}
                  <button
                    onClick={() => navigateTo('wishlist')}
                    className="p-2 text-slate-400 hover:text-red-500 transition relative"
                    title="View Wishlist"
                  >
                    <Heart className="w-5 h-5" />
                    {state.wishlist.length > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border border-white rounded-full alert-dot"></span>
                    )}
                  </button>

                  {/* Bell Notification Icon */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 text-slate-400 hover:text-primary transition relative"
                      title="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 border border-white rounded-full"></span>
                      )}
                    </button>

                    {/* Notifications Dropdown Panel */}
                    {showNotifications && (
                      <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-premium py-3 px-4 z-50 space-y-3 animate-fadeInUp">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <span className="font-bold text-xs text-slate-800">Notifications</span>
                          <button onClick={clearNotifications} className="text-[10px] text-slate-400 hover:text-slate-600 font-medium">Clear All</button>
                        </div>
                        <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="text-xs text-slate-400 text-center py-4">No new updates.</p>
                          ) : (
                            notifications.map(n => (
                              <div key={n.id} className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                {n.text}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Profile avatar dropdown */}
                  <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                    <button
                      onClick={() => navigateTo('dashboard-user')}
                      className="flex items-center gap-2 group focus:outline-none"
                    >
                      <img 
                        src={state.currentUser.avatar} 
                        alt={state.currentUser.name} 
                        className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 group-hover:border-primary transition" 
                      />
                      <span className="hidden lg:block text-xs font-bold text-slate-700 group-hover:text-primary transition max-w-[80px] truncate">{state.currentUser.name}</span>
                    </button>

                    {/* Log out */}
                    <button
                      onClick={handleLogout}
                      className="p-1.5 text-slate-400 hover:text-slate-600 transition"
                      title="Log Out"
                    >
                      <LogOut className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </>
              ) : (
                /* Auth action trigger */
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition"
                >
                  Join Community
                </button>
              )}

              {/* Mobile menu hamburger toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-500 md:hidden hover:bg-slate-100 rounded-lg focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu expanded */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3 shadow-md">
            <button 
              onClick={() => navigateTo('marketplace')} 
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-primary transition"
            >
              Marketplace
            </button>
            <button 
              onClick={() => navigateTo('rent', 'rent')} 
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-secondary transition"
            >
              Rentals
            </button>
            <button 
              onClick={() => navigateTo('services', 'service')} 
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-accent transition"
            >
              Services
            </button>
            <button 
              onClick={() => navigateTo('contact')} 
              className="block w-full text-left py-2 px-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition"
            >
              Contact
            </button>
            {state.currentUser && (
              <div className="border-t border-slate-100 pt-3 flex gap-2">
                <button
                  onClick={() => navigateTo('dashboard-seller')}
                  className="flex-1 py-2 text-center text-xs font-semibold border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Seller Dashboard
                </button>
                <button
                  onClick={() => navigateTo('dashboard-user')}
                  className="flex-1 py-2 text-center text-xs font-semibold border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  My Profile
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* 2. MAIN CORE PAGES VIEWPORT CONTAINER */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {(() => {
          // Render based on currentRoute
          if (currentRoute === 'home') {
            return (
              <Home 
                listings={state.listings}
                communities={state.communities}
                activeCommunityId={activeCommunityId}
                setActiveCommunityId={setActiveCommunityId}
                setCurrentRoute={setCurrentRoute}
                setSearchQuery={setSearchQuery}
                setFilterType={setFilterType}
                wishlist={state.wishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          }
          
          if (currentRoute === 'marketplace') {
            return (
              <Marketplace
                listings={state.listings}
                communities={state.communities}
                activeCommunityId={activeCommunityId}
                setCurrentRoute={setCurrentRoute}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterType={filterType}
                setFilterType={setFilterType}
                wishlist={state.wishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          }

          if (currentRoute === 'rent') {
            return (
              <RentItems
                listings={state.listings}
                activeCommunityId={activeCommunityId}
                setCurrentRoute={setCurrentRoute}
                wishlist={state.wishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          }

          if (currentRoute === 'services') {
            return (
              <Services
                listings={state.listings}
                activeCommunityId={activeCommunityId}
                setCurrentRoute={setCurrentRoute}
                wishlist={state.wishlist}
                toggleWishlist={toggleWishlist}
                users={state.users}
              />
            );
          }

          if (currentRoute === 'login' || currentRoute === 'register') {
            return (
              <Auth
                setCurrentRoute={setCurrentRoute}
                communities={state.communities}
                setCurrentUser={setCurrentUser}
                users={state.users}
                setUsers={setUsers}
              />
            );
          }

          if (currentRoute === 'dashboard-user') {
            return (
              <UserDashboard
                currentUser={state.currentUser}
                wishlist={state.wishlist}
                toggleWishlist={toggleWishlist}
                myRentals={state.myRentals}
                completedOrders={state.completedOrders}
                listings={state.listings}
                setCurrentRoute={setCurrentRoute}
              />
            );
          }

          if (currentRoute === 'dashboard-seller') {
            return (
              <SellerDashboard
                currentUser={state.currentUser}
                listings={state.listings}
                addListing={addListing}
                removeListing={removeListing}
                updateListingStatus={updateListingStatus}
                communities={state.communities}
                setCurrentRoute={setCurrentRoute}
              />
            );
          }

          if (currentRoute === 'wishlist') {
            return (
              <Wishlist 
                wishlist={state.wishlist}
                toggleWishlist={toggleWishlist}
                setCurrentRoute={setCurrentRoute}
              />
            );
          }

          if (currentRoute === 'dashboard-admin') {
            return (
              <AdminDashboard
                currentUser={state.currentUser}
                users={state.users}
                setUsers={setUsers}
                listings={state.listings}
                removeListing={removeListing}
                reports={state.reports}
                setReports={setReports}
                setCurrentRoute={setCurrentRoute}
              />
            );
          }

          if (currentRoute === 'blueprint') {
            return <SystemBlueprint />;
          }

          if (currentRoute === 'contact') {
            return <Contact />;
          }

          // Handle dynamic listing product-detail page: e.g. "product-detail-{id}"
          if (currentRoute.startsWith('product-detail-')) {
            const itemId = currentRoute.replace('product-detail-', '');
            return (
              <ProductDetails 
                itemId={itemId}
                listings={state.listings}
                users={state.users}
                currentUser={state.currentUser}
                setCurrentRoute={setCurrentRoute}
                toggleWishlist={toggleWishlist}
                wishlist={state.wishlist}
                bookRental={bookRental}
                buyItem={buyItem}
                reviews={state.reviews}
                setReviews={setReviews}
                reports={state.reports}
                setReports={setReports}
              />
            );
          }

          return <div className="text-center py-20 text-slate-500">Page not found.</div>;
        })()}
      </main>

      {/* 3. FOOTER COMPONENT */}
      <footer className="bg-slate-900 text-white mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="flex items-center gap-2 text-lg font-extrabold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <Store className="w-5 h-5 text-primary shrink-0" />
                UniMarket
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Securing peer-to-peer commerce and sharing in local dormitories, neighborhoods, and academic communities.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Discover Feed</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('marketplace')} className="hover:text-white transition">Explore Marketplace</button></li>
                <li><button onClick={() => navigateTo('rent', 'rent')} className="hover:text-white transition">Bicycles & Equipment</button></li>
                <li><button onClick={() => navigateTo('services', 'service')} className="hover:text-white transition">Tutoring & Coding Help</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Ambassadors</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition">Support Desk</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition">Campus Guidelines</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition">Ambassador Program</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Verifications</h4>
              <div className="flex gap-2.5 items-center p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl max-w-xs">
                <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
                <p className="text-[10px] text-slate-400 leading-normal">
                  All listings are moderated by campus coordinators. Security meets convenience.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 UniMarket Inc. Designed for Academic Communities.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 transition cursor-pointer">Terms of Use</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Demo Simulator Control Panel */}
      <div className="fixed bottom-4 right-4 z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-2xl p-4 shadow-2xl max-w-sm w-full animate-fadeInUp">
        <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-300">Demo Role Switcher</span>
          </div>
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">RBAC Simulator</span>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] text-slate-400 leading-normal font-light">
            Toggle user roles to instantly verify the platform access controls (Guest vs Registered vs Provider vs Admin).
          </p>
          
          <div className="flex gap-2">
            <select
              value={state.currentUser ? (state.currentUser.role || 'user') : 'guest'}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'guest') {
                  setCurrentUser(null);
                  navigateTo('home');
                } else {
                  // Find matching user from database
                  const found = state.users.find(u => u.role === val);
                  if (found) {
                    setCurrentUser(found);
                    if (val === 'admin') {
                      navigateTo('dashboard-admin');
                    } else {
                      navigateTo('home');
                    }
                  }
                }
              }}
              className="w-full bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl p-2 cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="guest">Guest User (Logged Out)</option>
              <option value="user">Registered User (Aarav Mehta)</option>
              <option value="provider">Service Provider (Ananya Sharma)</option>
              <option value="admin">System Admin (Admin Coordinator)</option>
            </select>
          </div>
          
          <div className="text-[10px] bg-slate-800/40 p-2 rounded-lg text-slate-300 leading-relaxed font-light border border-slate-800">
            {(!state.currentUser) && (
              <span><strong>Guest Mode:</strong> Can browse listings and search, but cannot create posts, contact sellers, or view dashboards.</span>
            )}
            {(state.currentUser?.role === 'user') && (
              <span><strong>User Mode:</strong> Can buy products, rent equipment, submit reviews, and post sell/rent listings.</span>
            )}
            {(state.currentUser?.role === 'provider') && (
              <span><strong>Provider Mode:</strong> Can offer services, manage bookings, and view earnings dashboards.</span>
            )}
            {(state.currentUser?.role === 'admin') && (
              <span><strong>Admin Mode:</strong> Full system access. Can edit users, toggle verified badges, delete listings, and handle abuse reports.</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
