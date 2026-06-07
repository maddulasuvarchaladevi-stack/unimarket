import React, { useState } from 'react';
import { Database, FileText, Share2, ShieldAlert, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SystemBlueprint() {
  const [activeTab, setActiveTab] = useState('schemas');

  // RBAC permissions data
  const rbacMatrix = [
    { permission: 'View Listings', guest: true, user: true, provider: true, admin: true },
    { permission: 'Search Products', guest: true, user: true, provider: true, admin: true },
    { permission: 'Create Listing', guest: false, user: true, provider: true, admin: true },
    { permission: 'Rent Products', guest: false, user: true, provider: true, admin: true },
    { permission: 'Offer Services', guest: false, user: false, provider: true, admin: true },
    { permission: 'Wishlist Access', guest: false, user: true, provider: true, admin: true },
    { permission: 'User Management', guest: false, user: false, provider: false, admin: true },
    { permission: 'Listing Moderation', guest: false, user: false, provider: false, admin: true },
    { permission: 'Analytics Access', guest: false, user: false, provider: false, admin: true },
  ];

  // API design endpoints
  const apiEndpoints = [
    { group: 'Authentication APIs', method: 'POST', path: '/register', desc: 'Registers a new user; requires university email verification and ID card scan.' },
    { group: 'Authentication APIs', method: 'POST', path: '/login', desc: 'Authenticates user, returns JWT Token and profile object.' },
    { group: 'Authentication APIs', method: 'POST', path: '/logout', desc: 'Blacklists active JWT token and terminates current session.' },
    
    { group: 'Product APIs', method: 'GET', path: '/products', desc: 'Retrieves active listings, filterable by type, category, price, and campus location.' },
    { group: 'Product APIs', method: 'GET', path: '/products/:id', desc: 'Fetches single product details including seller metadata and ratings.' },
    { group: 'Product APIs', method: 'POST', path: '/products', desc: 'Creates a product listing. Requires JWT authentication and input validation.' },
    { group: 'Product APIs', method: 'PUT', path: '/products/:id', desc: 'Updates product fields (title, description, price, status).' },
    { group: 'Product APIs', method: 'DELETE', path: '/products/:id', desc: 'Deletes listing. Allowed only for creator or administrator.' },

    { group: 'Rental APIs', method: 'GET', path: '/rentals', desc: 'Fetches active rental transactions in the community.' },
    { group: 'Rental APIs', method: 'POST', path: '/rentals', desc: 'Submits rental booking request with start/end dates and calculates duration cost.' },
    { group: 'Rental APIs', method: 'PUT', path: '/rentals/:id', desc: 'Updates rental booking status (Approved, Active, Returned).' },

    { group: 'Service APIs', method: 'GET', path: '/services', desc: 'Retrieves all student-offered services.' },
    { group: 'Service APIs', method: 'POST', path: '/services', desc: 'Creates a service skill-share listing.' },
    { group: 'Service APIs', method: 'PUT', path: '/services/:id', desc: 'Updates details of an offered service.' },
    { group: 'Service APIs', method: 'DELETE', path: '/services/:id', desc: 'Removes service listing.' },

    { group: 'Wishlist APIs', method: 'GET', path: '/wishlist', desc: 'Retrieves the user\'s saved items.' },
    { group: 'Wishlist APIs', method: 'POST', path: '/wishlist', desc: 'Adds a product/service to user wishlist.' },
    { group: 'Wishlist APIs', method: 'DELETE', path: '/wishlist/:id', desc: 'Removes item from user wishlist.' },

    { group: 'Admin APIs', method: 'GET', path: '/admin/users', desc: 'Fetches all registered platform users with verification status (Admin only).' },
    { group: 'Admin APIs', method: 'GET', path: '/admin/reports', desc: 'Retrieves reported abuse logs flagged by users (Admin only).' },
    { group: 'Admin APIs', method: 'DELETE', path: '/admin/listings', desc: 'Removes any flagged or inappropriate listing globally (Admin only).' },
  ];

  // Database models
  const dbModels = [
    {
      name: 'Users Table',
      fields: [
        { name: 'userId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'name', type: 'String', desc: 'Full Name' },
        { name: 'email', type: 'String', desc: 'Campus/Verified domain email' },
        { name: 'phone', type: 'String', desc: 'Contact details' },
        { name: 'role', type: 'String', desc: 'Guest | User | Service Provider | Admin' },
        { name: 'password', type: 'String', desc: 'Bcrypt hashed password' },
        { name: 'verificationStatus', type: 'Boolean', desc: 'True if student ID approved' },
        { name: 'reputation', type: 'Number', desc: 'Peer rating score (0 - 100)' },
      ]
    },
    {
      name: 'Products Table',
      fields: [
        { name: 'productId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'title', type: 'String', desc: 'Listing Title' },
        { name: 'description', type: 'String', desc: 'Product summary & details' },
        { name: 'category', type: 'String', desc: 'Electronics | Books | Furniture etc.' },
        { name: 'price', type: 'Number', desc: 'Listed sales price (INR)' },
        { name: 'images', type: 'Array[String]', desc: 'Cloudinary hosting URLs' },
        { name: 'sellerId', type: 'ObjectId', desc: 'ForeignKey -> Users.userId' },
        { name: 'status', type: 'String', desc: 'Active | Sold' },
      ]
    },
    {
      name: 'Rentals Table',
      fields: [
        { name: 'rentalId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'productId', type: 'ObjectId', desc: 'ForeignKey -> Products.productId' },
        { name: 'ownerId', type: 'ObjectId', desc: 'ForeignKey -> Users.userId' },
        { name: 'rentalPrice', type: 'Number', desc: 'Price per period (INR)' },
        { name: 'rentalDuration', type: 'String', desc: 'hour | day | week' },
        { name: 'availability', type: 'Boolean', desc: 'True if not currently rented' },
      ]
    },
    {
      name: 'Services Table',
      fields: [
        { name: 'serviceId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'providerId', type: 'ObjectId', desc: 'ForeignKey -> Users.userId' },
        { name: 'title', type: 'String', desc: 'Service title' },
        { name: 'description', type: 'String', desc: 'Description of service offered' },
        { name: 'pricing', type: 'Number', desc: 'Flat rate or hourly rate (INR)' },
        { name: 'category', type: 'String', desc: 'Tutoring | Photography | Repairs etc.' },
      ]
    },
    {
      name: 'Wishlist Table',
      fields: [
        { name: 'wishlistId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'userId', type: 'ObjectId', desc: 'ForeignKey -> Users.userId' },
        { name: 'productId', type: 'ObjectId', desc: 'ForeignKey -> Products.productId' },
      ]
    },
    {
      name: 'Reviews Table',
      fields: [
        { name: 'reviewId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'userId', type: 'ObjectId', desc: 'ForeignKey -> Users.userId (reviewer)' },
        { name: 'targetId', type: 'ObjectId', desc: 'ForeignKey -> Products/Services ID (target)' },
        { name: 'rating', type: 'Number', desc: 'Star rating (1 - 5)' },
        { name: 'comment', type: 'String', desc: 'Written feedback review' },
      ]
    },
    {
      name: 'Reports Table',
      fields: [
        { name: 'reportId', type: 'ObjectId', desc: 'Primary Key' },
        { name: 'reporterId', type: 'ObjectId', desc: 'ForeignKey -> Users.userId' },
        { name: 'targetId', type: 'ObjectId', desc: 'ForeignKey -> Products/Services ID' },
        { name: 'reason', type: 'String', desc: 'Violation flag details (UPI Scam, Abuse)' },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-16 animate-fadeInUp">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-indigo-200 font-bold text-xs uppercase tracking-wider rounded-full">
            <Database className="w-3.5 h-3.5" />
            System Architect Center
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight leading-tight">
            UniMarket System Blueprint
          </h1>
          <p className="text-indigo-200 text-sm md:text-base leading-relaxed opacity-90">
            Interactive guide mapping the database schema schemas, backend REST APIs, Role-Based Access Control matrix, and entity relations.
          </p>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-premium flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('schemas')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'schemas' 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('er')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'er' 
              ? 'bg-secondary text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Entity Relations (ER)</span>
        </button>

        <button
          onClick={() => setActiveTab('apis')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'apis' 
              ? 'bg-accent text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>API Specification</span>
        </button>

        <button
          onClick={() => setActiveTab('rbac')}
          className={`flex-1 py-3 text-center text-xs md:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'rbac' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Security & RBAC</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium min-h-[350px]">
        
        {/* TABS: SCHEMA DESIGN */}
        {activeTab === 'schemas' && (
          <div className="space-y-8 animate-fadeInUp">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-800">NoSQL Database Schema</h2>
              <p className="text-xs text-slate-400 mt-1">Platform data store structured in MongoDB Atlas schemas showing schema definitions and data types.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dbModels.map((model, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50/50">
                  <div className="bg-slate-100/80 px-4.5 py-3.5 border-b border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-800 uppercase tracking-wider font-display">{model.name}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">MongoDB</span>
                  </div>

                  <div className="divide-y divide-slate-150 p-1.5 bg-white">
                    {model.fields.map((field, fIdx) => (
                      <div key={fIdx} className="p-3 flex justify-between items-center gap-4 text-xs">
                        <div className="min-w-[120px]">
                          <span className="font-mono font-bold text-slate-800">{field.name}</span>
                          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{field.type}</span>
                        </div>
                        <div className="text-slate-500 text-right font-light leading-normal">{field.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABS: ENTITY RELATIONSHIPS */}
        {activeTab === 'er' && (
          <div className="space-y-8 animate-fadeInUp">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-800">Entity Relationship Mapping</h2>
              <p className="text-xs text-slate-400 mt-1">Visual graph demonstrating how users, listings, purchases, reviews, and admins interface with each other.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center space-y-12 overflow-x-auto">
              
              {/* Top Row: User Entities */}
              <div className="flex justify-center gap-12 w-full min-w-[600px]">
                <div className="border-2 border-indigo-600 bg-indigo-50/20 p-5 rounded-2xl w-48 text-center shadow-sm relative">
                  <span className="font-bold text-sm text-indigo-700 block uppercase">User Node</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Buyer / Seller / Provider</span>
                  
                  {/* Connectors Down */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>
                </div>

                <div className="border-2 border-slate-700 bg-slate-100 p-5 rounded-2xl w-48 text-center shadow-sm relative">
                  <span className="font-bold text-sm text-slate-800 block uppercase">Admin Node</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Mod / Auditor</span>
                  
                  {/* Connectors Down */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>
                </div>
              </div>

              {/* Middle Row: Relations arrows */}
              <div className="flex justify-center gap-12 w-full min-w-[600px] text-slate-400 h-1 flex-shrink-0">
                {/* Visual connectors representation */}
              </div>

              {/* Bottom Row: Child Nodes */}
              <div className="grid grid-cols-5 gap-6 w-full min-w-[700px]">
                
                {/* 1. Products */}
                <div className="border border-slate-200 bg-white p-4.5 rounded-2xl text-center shadow-sm relative">
                  <span className="font-bold text-xs text-slate-800 block uppercase">Products</span>
                  <span className="text-[9px] text-slate-400 mt-1 block">1-to-Many by User</span>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>
                  
                  <div className="border-t border-slate-100 mt-3 pt-3 flex flex-col gap-1 text-[9px] text-slate-500">
                    <span>- Reviews</span>
                    <span>- Wishlists</span>
                  </div>
                </div>

                {/* 2. Rentals */}
                <div className="border border-slate-200 bg-white p-4.5 rounded-2xl text-center shadow-sm relative">
                  <span className="font-bold text-xs text-slate-800 block uppercase">Rentals</span>
                  <span className="text-[9px] text-slate-400 mt-1 block">1-to-Many by Owner</span>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>
                  
                  <div className="border-t border-slate-100 mt-3 pt-3 flex flex-col gap-1 text-[9px] text-slate-500">
                    <span>- Availability</span>
                    <span>- Bookings</span>
                  </div>
                </div>

                {/* 3. Services */}
                <div className="border border-slate-200 bg-white p-4.5 rounded-2xl text-center shadow-sm relative">
                  <span className="font-bold text-xs text-slate-800 block uppercase">Services</span>
                  <span className="text-[9px] text-slate-400 mt-1 block">1-to-Many by Provider</span>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>

                  <div className="border-t border-slate-100 mt-3 pt-3 flex flex-col gap-1 text-[9px] text-slate-500">
                    <span>- Bookings</span>
                    <span>- Service Reviews</span>
                  </div>
                </div>

                {/* 4. Reviews */}
                <div className="border border-slate-200 bg-white p-4.5 rounded-2xl text-center shadow-sm relative">
                  <span className="font-bold text-xs text-slate-800 block uppercase">Reviews</span>
                  <span className="text-[9px] text-slate-400 mt-1 block">Linked to Listings</span>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>

                  <div className="border-t border-slate-100 mt-3 pt-3 flex flex-col gap-1 text-[9px] text-slate-500">
                    <span>- User Rating</span>
                    <span>- Feedback Log</span>
                  </div>
                </div>

                {/* 5. Reports */}
                <div className="border border-red-200 bg-red-50/20 p-4.5 rounded-2xl text-center shadow-sm relative">
                  <span className="font-bold text-xs text-red-800 block uppercase">Reports</span>
                  <span className="text-[9px] text-red-400 mt-1 block">Checked by Admin</span>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300"></div>

                  <div className="border-t border-red-100 mt-3 pt-3 flex flex-col gap-1 text-[9px] text-red-500">
                    <span>- Abusive Post</span>
                    <span>- Violation Detail</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TABS: API SPECIFICATION */}
        {activeTab === 'apis' && (
          <div className="space-y-8 animate-fadeInUp">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-800">REST API Reference Manual</h2>
              <p className="text-xs text-slate-400 mt-1">REST API endpoints powering the frontend client. Structured for quick integration.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="p-4">Module</th>
                      <th className="p-4">Method</th>
                      <th className="p-4">Endpoint</th>
                      <th className="p-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {apiEndpoints.map((api, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40">
                        <td className="p-4 font-bold text-slate-600 font-display">{api.group}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider text-white ${
                            api.method === 'GET' ? 'bg-blue-500' : 
                            api.method === 'POST' ? 'bg-green-600' : 
                            api.method === 'PUT' ? 'bg-amber-500' : 'bg-red-500'
                          }`}>
                            {api.method}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-semibold text-slate-800">{api.path}</td>
                        <td className="p-4 text-slate-500 font-light leading-relaxed">{api.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TABS: SECURITY & RBAC */}
        {activeTab === 'rbac' && (
          <div className="space-y-8 animate-fadeInUp">
            
            {/* RBAC Table Matrix */}
            <div>
              <h2 className="text-xl font-bold font-display text-slate-800">Role-Based Access Control (RBAC) Matrix</h2>
              <p className="text-xs text-slate-400 mt-1">Granular authorization policy defining accessible operations for Guest, Registered User, Service Provider, and Admin accounts.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="p-4">Permission / Operation</th>
                      <th className="p-4 text-center">Guest</th>
                      <th className="p-4 text-center">Registered User</th>
                      <th className="p-4 text-center">Service Provider</th>
                      <th className="p-4 text-center">Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {rbacMatrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40">
                        <td className="p-4 font-semibold text-slate-800">{row.permission}</td>
                        <td className="p-4 text-center">
                          {row.guest ? (
                            <span className="inline-block px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold rounded">YES</span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold rounded">NO</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.user ? (
                            <span className="inline-block px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold rounded">YES</span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold rounded">NO</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.provider ? (
                            <span className="inline-block px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold rounded">YES</span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold rounded">NO</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {row.admin ? (
                            <span className="inline-block px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold rounded">YES</span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold rounded">NO</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Security Architecture practices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">Authentication Protocols</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  JSON Web Tokens (JWT) store user identity in stateless browser local/session storage. Passwords hashed using standard `bcrypt` hashing algorithms.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">API Safeguards</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Rate limiting restricts malicious flooding. Input schemas validated via Express-Validator to check query strings, prevent XSS scripts, and secure SQL/NoSQL parameters.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">Peer Trust Engine</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Institution domain verification blocks external spammers. Simulated image uploads verify student residence before unlocking platform listing capabilities.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
