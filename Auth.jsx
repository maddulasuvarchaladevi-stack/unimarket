import React, { useState } from 'react';
import { ShieldAlert, LogIn, UserPlus, Mail, Lock, User, MapPin, Upload, CheckCircle2 } from 'lucide-react';

export default function Auth({
  setCurrentRoute,
  communities,
  setCurrentUser,
  users,
  setUsers
}) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCommunity, setRegCommunity] = useState(communities[0]?.id || '');
  const [regHostel, setRegHostel] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [idFileUploaded, setIdFileUploaded] = useState(false);
  const [idFileName, setIdFileName] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  // Domain verification simulation
  const checkEmailDomain = (email) => {
    if (!email) return true;
    const universityDomains = ['.edu', '.ac.in', '.org', 'smail.iitm.ac.in', 'bitsp.ac.in'];
    return universityDomains.some(domain => email.endsWith(domain));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    // Simulated login check
    const matchedUser = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setCurrentRoute('home');
    } else {
      // Create new session user dynamically for demo if user not found, so it never fails!
      const mockSessionUser = {
        id: `user_${Date.now()}`,
        name: loginEmail.split('@')[0].toUpperCase(),
        email: loginEmail,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80',
        communityId: communities[0]?.id || 'iitb',
        hostel: 'Hostel 4, Room 101',
        isVerified: true,
        rating: 5.0,
        reputation: 100,
        joinedDate: 'Jun 2026'
      };
      setCurrentUser(mockSessionUser);
      setUsers([...users, mockSessionUser]);
      setCurrentRoute('home');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!checkEmailDomain(regEmail)) {
      setRegError('Please use a valid institution email address (e.g., @.ac.in or @.edu) for community verification.');
      return;
    }

    if (!idFileUploaded) {
      setRegError('Please upload a simulated copy of your College Student ID card to verify community residence.');
      return;
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: regName,
      email: regEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80',
      communityId: regCommunity,
      hostel: regHostel,
      isVerified: true, // Auto verify for hackathon demo
      rating: 5.0,
      reputation: 100,
      joinedDate: 'Jun 2026'
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setRegSuccess(true);

    setTimeout(() => {
      setRegSuccess(false);
      setCurrentRoute('home');
    }, 2000);
  };

  const handleIdUploadSimulated = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIdFileName(e.target.files[0].name);
      setIdFileUploaded(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-premium grid grid-cols-1 md:grid-cols-12 min-h-[550px] animate-fadeInUp">
      
      {/* Left panel: Info illustration */}
      <div className="md:col-span-5 bg-gradient-to-br from-primary to-indigo-700 text-white p-8 md:p-12 flex flex-col justify-between space-y-12">
        <div className="space-y-4">
          <span className="font-extrabold text-lg md:text-xl font-display tracking-tight border-b-2 border-white/20 pb-2 inline-block">
            UniMarket
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight">
            Connecting Campus, Hostels & Neighborhoods.
          </h2>
          <p className="text-xs md:text-sm text-indigo-150 leading-relaxed font-light opacity-90">
            A secure ecosystem built specifically for academic environments. Register using your university domain email and access cheap text resources, local rides, and peer assistance.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-xs md:text-sm font-semibold">100% Peer Verified (No spammers)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-xs md:text-sm font-semibold">Zero Commission Fee (Keep your cash)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-xs md:text-sm font-semibold">Green Eco-Friendly Resources Reuse</span>
          </div>
        </div>

        <p className="text-[10px] text-indigo-200">
          © 2026 UniMarket Platform. All rights reserved.
        </p>
      </div>

      {/* Right panel: Login / Register Forms */}
      <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
        
        {/* Toggle headers */}
        <div className="flex border-b border-slate-100 pb-4 mb-8">
          <button
            onClick={() => { setIsLogin(true); setLoginError(''); setRegError(''); }}
            className={`flex-1 pb-3 text-center text-sm md:text-base font-bold transition border-b-2 ${
              isLogin 
                ? 'border-primary text-slate-800' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </span>
          </button>
          <button
            onClick={() => { setIsLogin(false); setLoginError(''); setRegError(''); }}
            className={`flex-1 pb-3 text-center text-sm md:text-base font-bold transition border-b-2 ${
              !isLogin 
                ? 'border-primary text-slate-800' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Register
            </span>
          </button>
        </div>

        {/* 1. LOGIN FORM */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <h3 className="text-xl font-bold font-display text-slate-800">Welcome Back</h3>
            
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl flex gap-2 text-xs text-red-700 items-start">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="student@iitb.ac.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition shadow-md hover:shadow-lg text-sm"
            >
              Sign In to Your Campus
            </button>
          </form>
        ) : (
          
          /* 2. REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <h3 className="text-xl font-bold font-display text-slate-800">Create Verified Account</h3>

            {regSuccess ? (
              <div className="text-center py-6 space-y-3 animate-fadeInUp">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Account Registered!</h4>
                <p className="text-xs text-slate-500">College verification simulation complete. Redirecting...</p>
              </div>
            ) : (
              <>
                {regError && (
                  <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl flex gap-2 text-xs text-red-700 items-start">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{regError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="john.doe@iitb.ac.in"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Community</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={regCommunity}
                        onChange={(e) => setRegCommunity(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none cursor-pointer"
                      >
                        {communities.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hostel & Room No.</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Hostel 4, Room 302"
                        value={regHostel}
                        onChange={(e) => setRegHostel(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-xs md:text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* File Upload Simulation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Student ID Card copy</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleIdUploadSimulated}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-600">
                      {idFileUploaded ? `Uploaded: ${idFileName}` : 'Select student ID card image'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB (Used only for local sandbox verify)</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition shadow hover:shadow-md text-xs md:text-sm"
                >
                  Verify ID & Create Account
                </button>
              </>
            )}
          </form>
        )}

      </div>
    </div>
  );
}
