import React, { useState } from 'react';
import { Shield, Users, ShieldAlert, Award, FileSpreadsheet, Trash2, Check, X, ShieldCheck, RefreshCw, BarChart2 } from 'lucide-react';

export default function AdminDashboard({
  currentUser,
  users,
  setUsers,
  listings,
  removeListing,
  reports,
  setReports,
  setCurrentRoute
}) {
  const [activeTab, setActiveTab] = useState('users');
  const [listingsFilter, setListingsFilter] = useState('all');

  // Verify RBAC access - double check in component
  if (currentUser?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-white border border-red-100 rounded-3xl shadow-premium p-6">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
        <p className="text-sm text-slate-500">You must be logged in as an Admin Coordinator to access the administrative dashboard controls.</p>
        <button 
          onClick={() => setCurrentRoute('home')}
          className="px-4 py-2 bg-slate-850 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition shadow"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Dashboard Stats
  const totalUsers = users.length;
  const verifiedUsers = users.filter(u => u.isVerified).length;
  const activeListings = listings.length;
  const pendingReports = reports.filter(r => r.status === 'Pending').length;

  // Toggle Verification status of user
  const toggleUserVerification = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isVerified: !u.isVerified } : u));
  };

  // Toggle User Role
  const changeUserRole = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  // Suspend/Suspend toggle
  const toggleUserSuspension = (userId) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const isSuspended = u.role === 'suspended';
        return { 
          ...u, 
          role: isSuspended ? 'user' : 'suspended',
          reputation: isSuspended ? 50 : 0
        };
      }
      return u;
    }));
  };

  // Dismiss report
  const dismissReport = (reportId) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: 'Resolved' } : r));
  };

  // Remove listed item and resolve report
  const removeReportedListing = (reportId, targetId) => {
    // Delete the product listing
    removeListing(targetId);
    // Mark report as resolved
    setReports(reports.map(r => r.id === reportId ? { ...r, status: 'Resolved (Item Deleted)' } : r));
  };

  // Filter listings list
  const filteredListings = listings.filter(item => {
    if (listingsFilter === 'all') return true;
    return item.type === listingsFilter;
  });

  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span>Admin Control Panel</span>
          </h1>
          <p className="text-slate-500 text-sm">Monitor user verifications, resolve flagged content, and review ecosystem analytics.</p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            System Live
          </span>
        </div>
      </div>

      {/* 2. Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Users */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 font-display">{totalUsers}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Members</p>
          </div>
        </div>

        {/* Verified Students */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 font-display">{verifiedUsers}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Peers</p>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 font-display">{activeListings}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Listings</p>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 font-display">{pendingReports}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Abuse Reports</p>
          </div>
        </div>

      </div>

      {/* 3. Analytics Growth Curves (Sleek Visual SVGs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* User Registration growth graph */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              <span>Ecosystem Growth (User registrations)</span>
            </h2>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 border border-green-200 rounded">Live Tracking</span>
          </div>

          <div className="w-full aspect-[21/9] bg-slate-50 border border-slate-100/50 rounded-2xl p-2.5 flex items-center justify-center relative">
            <svg className="w-full h-full" viewBox="0 0 200 80">
              {/* Grids */}
              <line x1="15" y1="15" x2="185" y2="15" stroke="#E2E8F0" strokeWidth="0.2" />
              <line x1="15" y1="35" x2="185" y2="35" stroke="#E2E8F0" strokeWidth="0.2" />
              <line x1="15" y1="55" x2="185" y2="55" stroke="#E2E8F0" strokeWidth="0.2" />
              
              <defs>
                <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area */}
              <path 
                d="M 15 65 L 40 55 L 70 58 L 100 42 L 130 35 L 160 22 L 185 10 L 185 65 Z" 
                fill="url(#adminGrad)" 
              />

              {/* Line */}
              <path 
                d="M 15 65 L 40 55 L 70 58 L 100 42 L 130 35 L 160 22 L 185 10" 
                fill="none" 
                stroke="#4F46E5" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
              />

              {/* Nodes */}
              {[
                { x: 15, y: 65, num: '12' },
                { x: 40, y: 55, num: '24' },
                { x: 70, y: 58, num: '45' },
                { x: 100, y: 42, num: '89' },
                { x: 130, y: 35, num: '142' },
                { x: 160, y: 22, num: '215' },
                { x: 185, y: 10, num: '340' }
              ].map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="1.5" fill="#FFF" stroke="#4F46E5" strokeWidth="1.2" />
                  <text x={n.x} y={n.y - 4} fontSize="2.5" fill="#475569" fontWeight="bold" textAnchor="middle">{n.num}</text>
                </g>
              ))}

              {/* X Axis Labels */}
              <text x="15" y="72" fontSize="2.8" fill="#94A3B8" textAnchor="middle">Week 1</text>
              <text x="70" y="72" fontSize="2.8" fill="#94A3B8" textAnchor="middle">Week 2</text>
              <text x="130" y="72" fontSize="2.8" fill="#94A3B8" textAnchor="middle">Week 3</text>
              <text x="185" y="72" fontSize="2.8" fill="#94A3B8" textAnchor="middle">Week 4</text>
            </svg>
          </div>
        </div>

        {/* Listings Category split charts */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-bold text-slate-800 font-display uppercase tracking-wider">Category Split</h2>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Platform items</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { cat: 'Electronics', count: listings.filter(l => l.category === 'Electronics').length || 3, color: 'bg-primary' },
              { cat: 'Books', count: listings.filter(l => l.category === 'Books').length || 2, color: 'bg-secondary' },
              { cat: 'Furniture', count: listings.filter(l => l.category === 'Furniture').length || 1, color: 'bg-accent' },
              { cat: 'Sports & Outdoors', count: listings.filter(l => l.category === 'Sports & Outdoors').length || 1, color: 'bg-emerald-500' },
              { cat: 'Tutoring & Services', count: listings.filter(l => l.type === 'service').length || 3, color: 'bg-indigo-500' },
            ].map((bar, idx) => {
              const maxVal = Math.max(listings.length, 1);
              const percentage = Math.round((bar.count / maxVal) * 100);
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{bar.cat}</span>
                    <span>{bar.count} items ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${bar.color} transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. Tab Navigation Header */}
      <div className="flex border-b border-slate-200 pb-3 gap-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'users' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>User Profiles ({users.length})</span>
          {activeTab === 'users' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'listings' ? 'text-secondary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Listings Inventory ({listings.length})</span>
          {activeTab === 'listings' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary"></div>}
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'reports' ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Flagged Content ({pendingReports})</span>
          {activeTab === 'reports' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>}
        </button>
      </div>

      {/* 5. TAB VIEWPORTS */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium min-h-[300px]">
        
        {/* TABS: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-base font-bold font-display text-slate-800 uppercase tracking-wider">User Directory & Verification Panel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                    <th className="p-3">User Profile</th>
                    <th className="p-3">Campus Email</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Verification</th>
                    <th className="p-3 text-right">Moderator Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/40">
                      <td className="p-3 flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 block">{u.name}</span>
                          <span className="text-[10px] text-slate-400 block font-light">Reputation: {u.reputation}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 font-mono">{u.email}</td>
                      <td className="p-3 text-slate-500">{u.hostel || 'Hostel 4'}</td>
                      <td className="p-3">
                        {u.role === 'admin' ? (
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 font-bold border border-purple-200 rounded-md text-[9px] uppercase">Admin</span>
                        ) : u.role === 'provider' ? (
                          <span className="px-2 py-0.5 bg-accent/10 text-accent font-bold border border-accent/20 rounded-md text-[9px] uppercase">Provider</span>
                        ) : u.role === 'suspended' ? (
                          <span className="px-2 py-0.5 bg-red-50 text-red-700 font-bold border border-red-200 rounded-md text-[9px] uppercase">Suspended</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-50 text-slate-600 font-bold border border-slate-200 rounded-md text-[9px] uppercase">User</span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleUserVerification(u.id)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition border ${
                            u.isVerified 
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                              : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {u.isVerified ? '✓ Verified' : '+ Unverified'}
                        </button>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {u.role !== 'admin' && (
                          <>
                            {/* Role toggler */}
                            <select
                              value={u.role}
                              onChange={(e) => changeUserRole(u.id, e.target.value)}
                              className="bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[10px] rounded p-1 cursor-pointer"
                            >
                              <option value="user">Set: User</option>
                              <option value="provider">Set: Service Provider</option>
                            </select>

                            <button
                              onClick={() => toggleUserSuspension(u.id)}
                              className={`px-2 py-1 text-[10px] font-bold rounded transition ${
                                u.role === 'suspended'
                                  ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              }`}
                            >
                              {u.role === 'suspended' ? 'Unsuspend' : 'Suspend'}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABS: LISTINGS MODERATION */}
        {activeTab === 'listings' && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-base font-bold font-display text-slate-800 uppercase tracking-wider">Global Listings moderated inventory</h2>
              
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
                {['all', 'buy', 'rent', 'service'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setListingsFilter(t)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition ${
                      listingsFilter === t ? 'bg-secondary text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {t === 'all' ? 'All' : t === 'buy' ? 'Buy' : t === 'rent' ? 'Rent' : 'Service'}
                  </button>
                ))}
              </div>
            </div>

            {filteredListings.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">No listings match this filter.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                      <th className="p-3">Product Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Seller</th>
                      <th className="p-3 text-right font-bold">Mod Option</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {filteredListings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/40">
                        <td className="p-3 flex items-center gap-3">
                          <img src={item.images[0]} alt={item.title} className="w-8 h-8 rounded object-cover bg-slate-100" />
                          <div className="min-w-0 max-w-[200px]">
                            <span 
                              onClick={() => setCurrentRoute(`product-detail-${item.id}`)}
                              className="font-bold text-slate-800 block truncate hover:text-primary cursor-pointer"
                            >
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate leading-normal">{item.location}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600 font-medium">{item.category}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase text-white ${
                            item.type === 'buy' ? 'bg-primary' : item.type === 'rent' ? 'bg-secondary' : 'bg-accent'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-800">₹{item.price}</td>
                        <td className="p-3 text-slate-600">ID: {item.sellerId}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => removeListing(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                            title="Remove listing from system"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TABS: FLAG ABUSE REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fadeInUp">
            <h2 className="text-base font-bold font-display text-slate-800 uppercase tracking-wider">Ecosystem Abuse Flagged Logs</h2>
            
            {reports.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">No abuse reports found. High-trust ecosystem intact!</div>
            ) : (
              <div className="space-y-4">
                {reports.map((rep) => (
                  <div 
                    key={rep.id} 
                    className={`border p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition ${
                      rep.status.startsWith('Resolved') 
                        ? 'bg-slate-50/70 border-slate-200 opacity-60' 
                        : 'bg-red-50/20 border-red-200/50 shadow-sm'
                    }`}
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider text-white ${
                          rep.status.startsWith('Resolved') ? 'bg-slate-400' : 'bg-red-500'
                        }`}>
                          {rep.status}
                        </span>
                        <span className="text-xs text-slate-500 font-bold font-display uppercase">Report #{rep.id}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{rep.date}</span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-800">
                        Target Listing: <span className="text-primary italic">"{rep.targetTitle || 'Item Listing'}"</span>
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        <span className="font-bold text-slate-700">Flag Reason: </span>
                        {rep.reason}
                      </p>

                      <p className="text-[10px] text-slate-400">
                        Flagged by: <span className="font-bold text-slate-600">{rep.reporterName}</span> (ID: {rep.reporterId})
                      </p>
                    </div>

                    {/* Report action buttons */}
                    {rep.status === 'Pending' && (
                      <div className="flex gap-2.5 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => dismissReport(rep.id)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg transition"
                        >
                          Dismiss Report
                        </button>
                        <button
                          onClick={() => removeReportedListing(rep.id, rep.targetId)}
                          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-lg transition shadow-sm flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Item</span>
                        </button>
                      </div>
                    )}
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
