import React, { useState, useEffect } from 'react';
import { MapPin, Heart, MessageSquare, Phone, Shield, ArrowLeft, Send, Check, X, ShieldAlert, Star } from 'lucide-react';

export default function ProductDetails({
  itemId,
  listings,
  users,
  currentUser,
  setCurrentRoute,
  toggleWishlist,
  wishlist,
  bookRental,
  buyItem,
  reviews = [],
  setReviews,
  reports = [],
  setReports
}) {
  // Find current listing
  const item = listings.find(l => l.id === itemId);
  
  if (!item) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-premium max-w-md mx-auto space-y-4">
        <h3 className="font-bold text-slate-800">Listing Not Found</h3>
        <p className="text-sm text-slate-500">The listing might have been removed by the seller or does not exist.</p>
        <button 
          onClick={() => setCurrentRoute('marketplace')}
          className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  // Find seller info
  const seller = users.find(u => u.id === item.sellerId) || {
    name: 'Verified Seller',
    rating: 4.8,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80',
    joinedDate: 'Feb 2025'
  };

  const inWishlist = wishlist.some(w => w.id === item.id);

  // States
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMode, setContactMode] = useState(''); // 'chat' or 'phone' or 'book' or 'buy'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'seller', text: `Hi there! Thanks for showing interest. How can I help you?` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  // Date booking states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingPeriod, setBookingPeriod] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Report abuse states
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Reviews states
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;

    const newReport = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser?.id || 'guest',
      reporterName: currentUser?.name || 'Guest User',
      targetId: item.id,
      targetTitle: item.title,
      reason: reportReason,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    setReports([newReport, ...reports]);
    setReportSuccess(true);
    setReportReason('');
    
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
    }, 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newReview = {
      id: `rev_${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Anonymous Peer',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80',
      targetId: item.id,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setReviewSuccess(true);
    setNewReviewComment('');
    setNewReviewRating(5);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 2000);
  };

  // Calculate rental cost
  const calculatedCost = item.type === 'rent' ? item.price * bookingPeriod : 0;

  // Update booking days if start/end dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setBookingPeriod(diffDays);
    }
  }, [startDate, endDate]);

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'buyer', text: inputMessage }];
    setChatMessages(newMsgs);
    setInputMessage('');

    // Simulated auto-reply from seller
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'seller', 
          text: `Sure, that sounds good! I live in ${item.location.split(',')[0]} and will be free tomorrow afternoon to meet. Does that work?` 
        }
      ]);
    }, 1500);
  };

  // Submit Rent Order
  const handleRentSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    bookRental({
      listingId: item.id,
      startDate,
      endDate,
      totalCost: calculatedCost,
      status: 'Active',
      daysLeft: bookingPeriod
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowContactModal(false);
      setCurrentRoute('dashboard-user');
    }, 2000);
  };

  // Submit Buy Order
  const handleBuySubmit = () => {
    buyItem({
      listingId: item.id,
      pricePaid: item.price,
      sellerName: seller.name
    });

    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
      setShowContactModal(false);
      setCurrentRoute('dashboard-user');
    }, 2000);
  };

  // Related products
  const relatedListings = listings
    .filter(l => l.id !== item.id && (l.category === item.category || l.type === item.type))
    .slice(0, 3);

  return (
    <div className="space-y-12 pb-16 animate-fadeInUp">
      {/* Back button */}
      <button 
        onClick={() => setCurrentRoute('marketplace')}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to marketplace</span>
      </button>

      {/* Main product structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product Gallery */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-premium p-4 md:p-6 space-y-4">
          <div className="relative pt-[70%] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
            <img 
              src={item.images[0]} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80';
              }}
            />
            <span className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg text-white ${
              item.type === 'buy' ? 'bg-primary' : item.type === 'rent' ? 'bg-secondary' : 'bg-accent'
            }`}>
              {item.type === 'buy' ? 'For Sale' : item.type === 'rent' ? 'For Rent' : 'Service Offer'}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="border-2 border-primary rounded-xl overflow-hidden bg-slate-50 aspect-video cursor-pointer">
              <img src={item.images[0]} alt="thumbnail 1" className="w-full h-full object-cover" />
            </div>
            {/* Mock image thumbnails */}
            {['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80', 
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80',
              'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&q=80'].map((thumb, idx) => (
              <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50 aspect-video cursor-pointer opacity-70 hover:opacity-100 transition">
                <img src={thumb} alt={`thumbnail ${idx+2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Panel & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-premium space-y-6">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>{item.category}</span>
                <span>{item.condition}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-800 tracking-tight leading-tight">
                {item.title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Price display in ₹ */}
            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <div>
                <p className="text-xs text-slate-500 font-medium">Price</p>
                <div className="text-3xl font-extrabold text-slate-800 font-display mt-0.5">
                  ₹{item.price.toLocaleString('en-IN')}
                  {item.type === 'rent' && <span className="text-sm font-normal text-slate-400">/{item.rentPeriod || 'day'}</span>}
                  {item.type === 'service' && <span className="text-sm font-normal text-slate-400">/{item.rentPeriod || 'hr'}</span>}
                </div>
              </div>
              
              <button
                onClick={() => toggleWishlist(item)}
                className={`p-3 rounded-full shadow-sm border transition ${
                  inWishlist 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {item.type === 'rent' ? (
                <button
                  onClick={() => { setContactMode('book'); setShowContactModal(true); }}
                  className="w-full py-3.5 bg-secondary hover:bg-secondary-hover text-white font-bold rounded-2xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Rental Booking</span>
                </button>
              ) : item.type === 'buy' ? (
                <button
                  onClick={() => { setContactMode('buy'); setShowContactModal(true); }}
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buy Item Instantly</span>
                </button>
              ) : (
                <button
                  onClick={() => { setContactMode('book'); setShowContactModal(true); }}
                  className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-2xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Hire / Book Service</span>
                </button>
              )}

              <button
                onClick={() => { setContactMode('chat'); setShowContactModal(true); }}
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-2xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Simulate In-App Chat</span>
              </button>

              <button
                onClick={() => { setContactMode('phone'); setShowContactModal(true); }}
                className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Reveal Phone / WhatsApp</span>
              </button>
            </div>

            {/* Shield advice */}
            <div className="flex gap-3 bg-slate-50 border border-slate-200/50 p-4.5 rounded-2xl text-xs text-slate-600">
              <Shield className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-slate-700">UniMarket Security Tip</p>
                <p className="leading-relaxed">Always meet in public locations on campus (like hostel lobbies or libraries) during daylight hours. Never transfer payments before inspecting the product.</p>
              </div>
            </div>

          </div>

          {/* Seller profile box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4">
            <img 
              src={seller.avatar} 
              alt={seller.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-800 truncate">{seller.name}</h3>
                {seller.isVerified && (
                  <span className="bg-green-50 border border-green-200 text-green-700 font-bold text-[9px] px-1.5 py-0.5 rounded-md uppercase">
                    Verified User
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{seller.hostel || 'Community Member'} • Joined {seller.joinedDate}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-extrabold text-sm text-slate-800">★ {seller.rating}</div>
              <p className="text-[10px] text-slate-400">Reputation: {seller.reputation || 90}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Product Description details */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="text-xl font-bold font-display text-slate-800">Listing Details</h2>
          
          {/* Report Abuse Button */}
          {currentUser && currentUser.id !== item.sellerId && (
            <button
              onClick={() => setShowReportModal(true)}
              className="text-xs text-red-500 hover:text-red-700 font-bold border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
            >
              Report Abuse / Scam
            </button>
          )}
        </div>
        <div className="text-sm text-slate-605 leading-relaxed max-w-4xl space-y-4">
          <p className="whitespace-pre-line">{item.description}</p>
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      {(() => {
        const itemReviews = reviews.filter(r => r.targetId === item.id);
        const avgRating = itemReviews.length > 0 ? (itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length).toFixed(1) : '5.0';
        return (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium space-y-8">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h2 className="text-xl font-bold font-display text-slate-800">Ratings & Reviews</h2>
              <span className="text-xs font-semibold text-slate-500">{itemReviews.length} Review(s)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Review Summary Score */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center flex flex-col justify-center items-center gap-2">
                <span className="text-5xl font-extrabold text-slate-800 font-display">{avgRating}</span>
                <div className="flex gap-1 justify-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold uppercase">Average User Rating</p>
              </div>

              {/* Reviews List */}
              <div className="md:col-span-8 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {itemReviews.length === 0 ? (
                  <div className="text-slate-400 text-xs py-12 text-center italic">
                    No reviews yet. Be the first to leave feedback!
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {itemReviews.map((rev) => (
                      <div key={rev.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
                              alt={rev.userName} 
                              className="w-7 h-7 rounded-full object-cover border" 
                            />
                            <div>
                              <span className="font-bold text-xs text-slate-800">{rev.userName}</span>
                              <span className="text-[9px] text-slate-400 block">{rev.date}</span>
                            </div>
                          </div>
                          
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-xs text-slate-600 leading-relaxed font-light pl-9">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit review Form */}
            {currentUser ? (
              <form onSubmit={handleReviewSubmit} className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="font-bold text-sm text-slate-800">Leave a Review</h3>
                
                {reviewSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl">
                    Review submitted successfully!
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-0.5 focus:outline-none"
                      >
                        <Star 
                          className={`w-5 h-5 transition-all duration-150 ${
                            star <= newReviewRating 
                              ? 'fill-amber-400 text-amber-400 scale-110' 
                              : 'text-slate-350 hover:text-amber-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Comments</label>
                  <textarea
                    required
                    rows="3"
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Write your experience with the seller, product condition, meeting location details..."
                    className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs md:text-sm text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition shadow-sm hover:shadow"
                >
                  Post Review
                </button>
              </form>
            ) : (
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-center text-xs text-slate-500">
                Please register or sign in to rate this listing.
              </div>
            )}
          </div>
        );
      })()}

      {/* Related Products list */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-display tracking-tight text-slate-800">Related Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedListings.map((rel) => (
            <div 
              key={rel.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-premium cursor-pointer flex flex-col hover:-translate-y-1 hover:border-primary/20 transition duration-300"
              onClick={() => {
                setCurrentRoute(`product-detail-${rel.id}`);
                window.scrollTo(0,0);
              }}
            >
              <div className="relative pt-[60%] overflow-hidden bg-slate-50">
                <img src={rel.images[0]} alt={rel.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col space-y-2">
                <h3 className="font-bold text-xs text-slate-800 truncate leading-snug">{rel.title}</h3>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mt-auto pt-2 border-t border-slate-100">
                  <span>₹{rel.price}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold">{rel.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact Modal System */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeInUp">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-premium overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={seller.avatar} alt="seller avatar" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-sm text-slate-800 leading-tight">{seller.name}</h3>
                  <p className="text-[10px] text-green-600 font-semibold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal content body based on contactMode */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* CHAT INTERFACE SIMULATION */}
              {contactMode === 'chat' && (
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col ${msg.sender === 'buyer' ? 'items-end' : 'items-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs md:text-sm font-medium ${
                            msg.sender === 'buyer' 
                              ? 'bg-primary text-white rounded-br-none' 
                              : 'bg-slate-100 text-slate-800 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1">
                          {msg.sender === 'buyer' ? 'Sent' : 'Replied'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs md:text-sm text-slate-700"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl transition shadow"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* PHONE REVEAL DETAILS */}
              {contactMode === 'phone' && (
                <div className="text-center py-6 space-y-6">
                  <div className="p-4 bg-teal-50 text-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-sm">
                    <Phone className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg text-slate-800">Call or WhatsApp {seller.name}</h4>
                    <p className="text-xs text-slate-500">Contact verified student peer for offline transaction coordination.</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 border-dashed p-4 rounded-2xl font-mono text-2xl font-bold tracking-wider text-slate-800 max-w-sm mx-auto">
                    +91 98765 43210
                  </div>

                  <div className="flex gap-3 justify-center">
                    <a 
                      href="tel:+919876543210" 
                      className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:shadow hover:bg-primary-hover transition"
                    >
                      Dial Phone
                    </a>
                    <a 
                      href="https://wa.me/919876543210" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 bg-green-500 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow hover:bg-green-600 transition"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* RENTAL BOOKING CALENDAR SHEET */}
              {contactMode === 'book' && (
                <div className="space-y-6">
                  {bookingSuccess ? (
                    <div className="text-center py-8 space-y-3 animate-fadeInUp">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-800">Booking Request Sent!</h4>
                      <p className="text-xs text-slate-500">Redirecting to your dashboard rentals tracker...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRentSubmit} className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 font-display">Schedule Your Rental</h4>
                        <p className="text-xs text-slate-400">Renting: {item.title}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Start Date</label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-secondary focus:outline-none text-xs text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">End Date</label>
                          <input
                            type="date"
                            required
                            min={startDate || new Date().toISOString().split('T')[0]}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-secondary focus:outline-none text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2 text-xs">
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Rental Rate</span>
                          <span>₹{item.price}/{item.rentPeriod || 'day'}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Duration Calculated</span>
                          <span>{bookingPeriod} {item.rentPeriod || 'day'}(s)</span>
                        </div>
                        <div className="flex justify-between items-center font-extrabold text-slate-800 text-sm border-t border-slate-200/80 pt-3">
                          <span>Total Estimated Cost</span>
                          <span className="text-secondary text-base">₹{calculatedCost.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded-2xl transition shadow hover:shadow-md"
                      >
                        Confirm Booking Order
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* INSTANT ITEM BUY */}
              {contactMode === 'buy' && (
                <div className="space-y-6">
                  {purchaseSuccess ? (
                    <div className="text-center py-8 space-y-3 animate-fadeInUp">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-800">Purchase Completed Successfully!</h4>
                      <p className="text-xs text-slate-500">Item recorded in your purchase history. Redirecting...</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 font-display">Confirm Purchase</h4>
                        <p className="text-xs text-slate-400">Purchasing: {item.title}</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2 text-xs">
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Subtotal</span>
                          <span>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Platform Fee</span>
                          <span className="text-green-600 font-bold uppercase">₹0 (Free)</span>
                        </div>
                        <div className="flex justify-between items-center font-extrabold text-slate-800 text-sm border-t border-slate-200/80 pt-3">
                          <span>Total Amount Payable</span>
                          <span className="text-primary text-base">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] text-indigo-700 leading-relaxed">
                        Notice: Since this is a community marketplace, we mock the payment completion. The item will be marked as sold on the seller's dashboard and added to your purchases list. You can finalize physical cash exchange on campus!
                      </div>

                      <button
                        onClick={handleBuySubmit}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-2xl transition shadow hover:shadow-md"
                      >
                        Complete Simulated Purchase
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 5. Report Abuse Modal System */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeInUp">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-premium overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-red-650">
                <ShieldAlert className="w-4 h-4" />
                <span>Flag Listing Violation</span>
              </h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-red-105 text-red-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Report Submitted</h4>
                <p className="text-xs text-slate-500">Moderators will review this listing shortly. Thank you!</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Reason for Report</label>
                  <p className="text-[10px] text-slate-400">Describe details of fraud, spam, inappropriate description, or non-peer accounts.</p>
                </div>
                
                <textarea
                  required
                  rows="4"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="e.g. Seller demands advance payment before meeting. Refuses to verify hostel room residency."
                  className="w-full px-3 py-2 border border-slate-200 focus:border-red-500 rounded-xl focus:outline-none text-xs text-slate-800"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow"
                  >
                    Submit Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
