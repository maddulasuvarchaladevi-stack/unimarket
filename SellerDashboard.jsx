import React, { useState } from 'react';
import { PlusCircle, DollarSign, List, TrendingUp, CheckCircle, Trash, Image, Upload } from 'lucide-react';

export default function SellerDashboard({
  currentUser,
  listings,
  addListing,
  removeListing,
  updateListingStatus,
  communities,
  setCurrentRoute
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [type, setType] = useState('buy'); // 'buy', 'rent', 'service'
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Used - Like New');
  const [location, setLocation] = useState(currentUser.hostel || 'Hostel 4, IIT Bombay');
  const [rentPeriod, setRentPeriod] = useState('day');
  const [imgUrl, setImgUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  // Filter user listings
  const myListings = listings.filter(l => l.sellerId === currentUser.id);
  
  // Calculate analytics
  const activeCount = myListings.length;
  const rentCount = myListings.filter(l => l.type === 'rent').length;
  const serviceCount = myListings.filter(l => l.type === 'service').length;
  
  // Estimated earnings calculation
  const totalEarned = myListings.reduce((sum, item) => {
    // Arbitrary multiplier to simulate views translation to earnings for hackathon demo
    return sum + (item.views * 3.5);
  }, 1250);

  // Handle local image file load (Base64 URL)
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl(reader.result);
      setImageLoading(false);
    };
    reader.onerror = () => {
      setFormError('Failed to read file. Please try another image.');
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Submit Listing form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !description.trim() || !price || !location.trim()) {
      setFormError('All fields are required.');
      return;
    }

    // Default image if none uploaded
    const defaultImage = type === 'rent' 
      ? 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80' // Bike
      : type === 'service'
        ? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' // Coding
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'; // Book

    const finalImg = imgUrl || defaultImage;

    const newListing = {
      id: `list_${Date.now()}`,
      title,
      description,
      category,
      type,
      price: Number(price),
      condition,
      location,
      communityId: currentUser.communityId,
      sellerId: currentUser.id,
      views: 0,
      images: [finalImg],
      rentPeriod: (type === 'rent' || type === 'service') ? rentPeriod : undefined,
      date: new Date().toISOString().split('T')[0]
    };

    addListing(newListing);
    
    // Clear form
    setTitle('');
    setDescription('');
    setCategory('Electronics');
    setType('buy');
    setPrice('');
    setCondition('Used - Like New');
    setLocation(currentUser.hostel || 'Hostel 4, IIT Bombay');
    setImgUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      
      {/* 1. Header with quick actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight">Seller Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage your listings, post new offers, and track your campus earnings.</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition shadow-md hover:shadow-lg flex items-center gap-2 text-xs md:text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showAddForm ? 'View Listings Analytics' : 'List a New Item'}</span>
        </button>
      </div>

      {/* 2. List New Item Form Container */}
      {showAddForm ? (
        <form onSubmit={handleFormSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold font-display text-slate-800">Add Listing Details</h2>
            <p className="text-xs text-slate-400">Your post will immediately be viewable by users in your community.</p>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left side details */}
            <div className="md:col-span-8 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-primary focus:outline-none text-xs md:text-sm text-slate-800 cursor-pointer"
                  >
                    <option value="buy">Sell (One-time Buy)</option>
                    <option value="rent">Rent Out (Temporary Booking)</option>
                    <option value="service">Offer Service (Skill Share)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-primary focus:outline-none text-xs md:text-sm text-slate-800 cursor-pointer"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Academic Gear">Academic Gear</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Photography">Photography</option>
                    <option value="Repairs">Repairs</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Casio FX-991ES Plus Scientific Calculator"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs md:text-sm text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe your item's condition, age, usage frequency, and specifications. If rental, mention lock availability etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs md:text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price (₹ INR Only)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs md:text-sm text-slate-800 font-semibold"
                  />
                </div>

                {(type === 'rent' || type === 'service') && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing Period</label>
                    <select
                      value={rentPeriod}
                      onChange={(e) => setRentPeriod(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:border-primary focus:outline-none text-xs md:text-sm text-slate-800"
                    >
                      <option value="hour">per Hour</option>
                      <option value="day">per Day</option>
                      <option value="week">per Week</option>
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:border-primary focus:outline-none text-xs md:text-sm text-slate-800"
                  >
                    <option value="Used - Like New">Used - Like New</option>
                    <option value="Used - Good">Used - Good</option>
                    <option value="Used - Fair">Used - Fair</option>
                    <option value="New">Brand New</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pickup / Meeting Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hostel 4 Common Room, Campus Gymkhana"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs md:text-sm text-slate-800"
                />
              </div>

            </div>

            {/* Right side: Real Image uploads base64 preview */}
            <div className="md:col-span-4 space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Product Image Upload</label>
              
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 hover:border-primary transition relative min-h-[180px] flex flex-col justify-center items-center gap-2">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
                
                {imageLoading ? (
                  <p className="text-xs text-slate-400 font-medium">Processing image...</p>
                ) : imgUrl ? (
                  <img src={imgUrl} alt="preview" className="w-full h-32 object-cover rounded-xl shadow-sm" />
                ) : (
                  <>
                    <Image className="w-8 h-8 text-slate-400" />
                    <p className="text-xs font-bold text-slate-700">Choose real photo file</p>
                    <p className="text-[10px] text-slate-400">Auto encodes to Base64 to save locally</p>
                  </>
                )}
              </div>

              {imgUrl && (
                <button
                  type="button"
                  onClick={() => setImgUrl('')}
                  className="w-full py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                >
                  Remove Uploaded Image
                </button>
              )}
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-2xl transition shadow"
            >
              Post Listing
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-2xl transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* 3. Analytics Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
              <div className="p-3 bg-indigo-50 text-primary rounded-2xl">
                <List className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 font-display">{activeCount}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Listings</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
              <div className="p-3 bg-blue-50 text-secondary rounded-2xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 font-display">{rentCount}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Renting Items</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent"></div>
              <div className="p-3 bg-teal-50 text-accent rounded-2xl">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 font-display">{serviceCount}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Offered Services</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 font-display">₹{totalEarned.toLocaleString('en-IN')}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Earnings</p>
              </div>
            </div>
          </div>

          {/* 4. Earnings Graph & Active Listings List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Custom SVG Earnings Graph */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-premium space-y-4">
              <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                <h2 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">Earnings Overview</h2>
                <span className="text-[10px] text-green-600 font-bold bg-green-50 border border-green-200 px-2 py-0.5 rounded uppercase">+12% vs last mo.</span>
              </div>
              
              {/* SVG Chart */}
              <div className="w-full aspect-video bg-slate-50 rounded-2xl border border-slate-100/50 p-2 flex items-center justify-center relative">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  {/* Grid Lines */}
                  <line x1="10" y1="10" x2="90" y2="10" stroke="#E2E8F0" strokeWidth="0.2" />
                  <line x1="10" y1="20" x2="90" y2="20" stroke="#E2E8F0" strokeWidth="0.2" />
                  <line x1="10" y1="30" x2="90" y2="30" stroke="#E2E8F0" strokeWidth="0.2" />
                  <line x1="10" y1="40" x2="90" y2="40" stroke="#E2E8F0" strokeWidth="0.2" />

                  {/* Gradient Area */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <path 
                    d="M 10 40 L 25 32 L 40 38 L 55 24 L 70 28 L 85 15 L 85 40 Z" 
                    fill="url(#chartGrad)" 
                  />

                  {/* Line chart */}
                  <path 
                    d="M 10 40 L 25 32 L 40 38 L 55 24 L 70 28 L 85 15" 
                    fill="none" 
                    stroke="#4F46E5" 
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                  />

                  {/* Nodes dots */}
                  {[
                    { x: 10, y: 40 },
                    { x: 25, y: 32 },
                    { x: 40, y: 38 },
                    { x: 55, y: 24 },
                    { x: 70, y: 28 },
                    { x: 85, y: 15 }
                  ].map((pt, idx) => (
                    <circle 
                      key={idx} 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="1.2" 
                      fill="#FFFFFF" 
                      stroke="#4F46E5" 
                      strokeWidth="0.8" 
                    />
                  ))}

                  {/* X Axis Labels */}
                  <text x="10" y="45" fontSize="2.5" fill="#94A3B8" textAnchor="middle">Jan</text>
                  <text x="25" y="45" fontSize="2.5" fill="#94A3B8" textAnchor="middle">Feb</text>
                  <text x="40" y="45" fontSize="2.5" fill="#94A3B8" textAnchor="middle">Mar</text>
                  <text x="55" y="45" fontSize="2.5" fill="#94A3B8" textAnchor="middle">Apr</text>
                  <text x="70" y="45" fontSize="2.5" fill="#94A3B8" textAnchor="middle">May</text>
                  <text x="85" y="45" fontSize="2.5" fill="#94A3B8" textAnchor="middle">Jun</text>
                </svg>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 px-1 pt-1">
                <span>Earned this Month:</span>
                <span className="text-slate-800 font-extrabold text-sm">₹1,850</span>
              </div>
            </div>

            {/* Right: Active Listings List */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-premium space-y-4">
              <h2 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider border-b border-slate-100 pb-2">Active Listings ({activeCount})</h2>
              
              {myListings.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No active listings posted. Click "List a New Item" to create one.
                </div>
              ) : (
                <div className="divide-y divide-slate-150 max-h-[300px] overflow-y-auto pr-1">
                  {myListings.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                      <div className="flex gap-3 items-center min-w-0">
                        <img 
                          src={item.images[0]} 
                          alt={item.title} 
                          className="w-10 h-10 object-cover rounded-xl shrink-0 bg-slate-100" 
                        />
                        <div className="min-w-0">
                          <h4 
                            onClick={() => setCurrentRoute(`product-detail-${item.id}`)}
                            className="font-bold text-xs md:text-sm text-slate-800 truncate hover:text-primary cursor-pointer"
                          >
                            {item.title}
                          </h4>
                          <div className="flex gap-2 text-[10px] text-slate-400 font-semibold items-center uppercase mt-0.5">
                            <span>{item.type}</span>
                            <span>•</span>
                            <span>{item.views} Views</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-extrabold text-xs md:text-sm text-slate-800">
                          ₹{item.price}
                        </span>

                        <button
                          onClick={() => removeListing(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                          title="Delete listing"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </>
      )}

    </div>
  );
}
