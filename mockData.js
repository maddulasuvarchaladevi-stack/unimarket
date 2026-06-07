// UniMarket - Mock Data Store and LocalStorage Initializer

export const INITIAL_COMMUNITIES = [
  { id: 'iitb', name: 'IIT Bombay', type: 'College Campus', city: 'Mumbai' },
  { id: 'bitsp', name: 'BITS Pilani', type: 'College Campus', city: 'Pilani' },
  { id: 'manipal', name: 'MIT Manipal', type: 'College Campus', city: 'Manipal' },
  { id: 'h3', name: 'Hostel Block 3 (IITB)', type: 'Hostel', city: 'Mumbai' },
  { id: 'prestigenqr', name: 'Prestige Apartment Complex', type: 'Neighborhood', city: 'Bangalore' },
];

export const INITIAL_USERS = [
  {
    id: 'user_1',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@iitb.ac.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80',
    communityId: 'iitb',
    hostel: 'Hostel 4, Room 302',
    isVerified: true,
    rating: 4.8,
    reputation: 92,
    joinedDate: 'Jan 2025',
    role: 'user'
  },
  {
    id: 'user_2',
    name: 'Ananya Sharma',
    email: 'ananya.s@bitsp.ac.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
    communityId: 'bitsp',
    hostel: 'Meera Bhawan, Wing C',
    isVerified: true,
    rating: 4.9,
    reputation: 97,
    joinedDate: 'Sep 2024',
    role: 'provider'
  },
  {
    id: 'user_3',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@mit.manipal.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    communityId: 'manipal',
    hostel: 'Block XVII, Flat 405',
    isVerified: true,
    rating: 4.7,
    reputation: 88,
    joinedDate: 'Aug 2025',
    role: 'provider'
  },
  {
    id: 'user_4',
    name: 'Priya Iyer',
    email: 'priya.i@iitb.ac.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80',
    communityId: 'iitb',
    hostel: 'Hostel 10, Room 102',
    isVerified: true,
    rating: 5.0,
    reputation: 99,
    joinedDate: 'Jul 2024',
    role: 'user'
  },
  {
    id: 'user_admin',
    name: 'Admin Coordinator',
    email: 'admin@unimarket.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80',
    communityId: 'iitb',
    hostel: 'Admin Office, IITB',
    isVerified: true,
    rating: 5.0,
    reputation: 100,
    joinedDate: 'Jan 2024',
    role: 'admin'
  }
];

export const INITIAL_LISTINGS = [
  // CALCULATORS (For search comparison demonstration)
  {
    id: 'list_calc_1',
    title: 'Casio FX-991ES Plus Scientific Calculator',
    description: 'Perfect for engineering, mathematics, and science courses. Features 417 functions and natural textbook display. Mint condition, used for only one semester.',
    category: 'Electronics',
    type: 'buy', // 'buy', 'rent', 'service'
    price: 650,
    condition: 'Used - Like New',
    location: 'Hostel 4, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_1',
    views: 34,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&fit=crop&q=80' // Calculator image fallback
    ],
    date: '2026-05-28'
  },
  {
    id: 'list_calc_2',
    title: 'Casio FX-82MS Scientific Calculator',
    description: 'Standard school/college scientific calculator with 240 functions. Durable 2-line display. Ideal for basic statistics and algebra. Works perfectly, battery replaced recently.',
    category: 'Electronics',
    type: 'buy',
    price: 450,
    condition: 'Used - Good',
    location: 'Hostel 10, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_4',
    views: 12,
    images: [
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=800&fit=crop&q=80'
    ],
    date: '2026-06-01'
  },
  {
    id: 'list_calc_3',
    title: 'Texas Instruments Scientific Calculator',
    description: 'Scientific calculator ideal for computer science and advanced math. Multiline display, fractions, and scientific notation inputs. Scratch-free body.',
    category: 'Electronics',
    type: 'buy',
    price: 550,
    condition: 'Used - Like New',
    location: 'Hostel 3, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_1',
    views: 25,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&fit=crop&q=80'
    ],
    date: '2026-05-30'
  },
  {
    id: 'list_calc_4',
    title: 'HP Engineering Calculator 35s',
    description: 'Professional scientific programmable calculator. Ideal for engineering, surveying, science, and medicine. RPN and Algebraic entry modes. Very powerful tool.',
    category: 'Electronics',
    type: 'buy',
    price: 400,
    condition: 'Used - Fair',
    location: 'Main Campus, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_3',
    views: 45,
    images: [
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=800&fit=crop&q=80'
    ],
    date: '2026-05-25'
  },

  // BUY ITEMS
  {
    id: 'list_buy_1',
    title: 'Concepts of Physics by HC Verma (Vol 1 & 2)',
    description: 'Essential physics reference books for JEE and college level physics. Both volumes are in great condition. No torn pages, clean margins with minimal pencil markings.',
    category: 'Books',
    type: 'buy',
    price: 350,
    condition: 'Used - Good',
    location: 'Hostel 3, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_1',
    views: 48,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&fit=crop&q=80'
    ],
    date: '2026-06-02'
  },
  {
    id: 'list_buy_2',
    title: 'Wooden Dorm Study Chair with Cushion',
    description: 'Ergonomic wooden study chair with custom foam padding for long study sessions. Sturdy built, fits perfectly in a standard hostel room desk setup.',
    category: 'Furniture',
    type: 'buy',
    price: 1200,
    condition: 'Used - Good',
    location: 'Meera Bhawan, BITS Pilani',
    communityId: 'bitsp',
    sellerId: 'user_2',
    views: 18,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&fit=crop&q=80'
    ],
    date: '2026-06-01'
  },

  // RENTAL ITEMS
  {
    id: 'list_rent_1',
    title: 'Decathlon Rockrider Mountain Bicycle',
    description: '21-Speed Gear bicycle. Well maintained, dual disk brakes, comfortable gel seat cover. Perfect for riding around the campus or going to nearby shops. Lock and helmet included.',
    category: 'Sports & Outdoors',
    type: 'rent',
    price: 50, // ₹50
    rentPeriod: 'day', // 'hour', 'day', 'week'
    condition: 'Used - Like New',
    location: 'Hostel 4 Cycle Stand, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_1',
    views: 89,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&fit=crop&q=80'
    ],
    date: '2026-06-03'
  },
  {
    id: 'list_rent_2',
    title: 'Epson Portable HD Projector (HDMI)',
    description: 'Full HD 1080p projector with built-in speaker. HDMI and VGA support. Ideal for hostel room movie nights, presentations, or project discussions. Comes with tripod stand and cables.',
    category: 'Electronics',
    type: 'rent',
    price: 300,
    rentPeriod: 'day',
    condition: 'Used - Like New',
    location: 'Block XVII, Manipal',
    communityId: 'manipal',
    sellerId: 'user_3',
    views: 67,
    images: [
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&fit=crop&q=80'
    ],
    date: '2026-05-29'
  },
  {
    id: 'list_rent_3',
    title: 'Casio Scientific Calculator FX-991EX (For Exam)',
    description: 'Need a scientific calculator just for tomorrow’s calculus exam? Rent this Casio FX-991EX for a few hours. Works perfectly, solar + battery backup.',
    category: 'Electronics',
    type: 'rent',
    price: 20,
    rentPeriod: 'hour',
    condition: 'Used - Good',
    location: 'Hostel 10, IIT Bombay',
    communityId: 'iitb',
    sellerId: 'user_4',
    views: 52,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&fit=crop&q=80'
    ],
    date: '2026-06-02'
  },

  // SERVICES
  {
    id: 'list_serv_1',
    title: '1-on-1 Coding Help & Python Tutoring',
    description: 'Struggling with CS101 or basic programming? I can help you understand algorithms, data structures, and Python syntax. Ex-TA for Computer Programming course.',
    category: 'Tutoring',
    type: 'service',
    price: 250,
    rentPeriod: 'hour',
    condition: 'Professional',
    location: 'Online or Hostel Study Room',
    communityId: 'iitb',
    sellerId: 'user_1',
    views: 120,
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&fit=crop&q=80'
    ],
    date: '2026-05-20'
  },
  {
    id: 'list_serv_2',
    title: 'Professional Event Photography & Portraits',
    description: 'Freelance student photographer with professional Canon DSLR. Available for college festivals, club events, farewell parties, and LinkedIn headshots. Check my portfolio in description.',
    category: 'Photography',
    type: 'service',
    price: 1500,
    rentPeriod: 'day', // per project or day
    condition: 'Expert',
    location: 'Anywhere on Campus',
    communityId: 'bitsp',
    sellerId: 'user_2',
    views: 94,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&fit=crop&q=80'
    ],
    date: '2026-05-24'
  },
  {
    id: 'list_serv_3',
    title: 'Macbook/Windows Fan Cleaning & RAM Upgrade',
    description: 'Laptop running slow or overheating? I can clean the dust out, replace thermal paste, and install RAM/SSD upgrades. You supply the parts, I provide the labor and tools.',
    category: 'Repairs',
    type: 'service',
    price: 400,
    rentPeriod: 'hour', // flat rate represented as hour
    condition: 'Skilled',
    location: 'Hostel 3 Common Room',
    communityId: 'iitb',
    sellerId: 'user_3',
    views: 41,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&fit=crop&q=80'
    ],
    date: '2026-05-27'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    userId: 'user_2',
    userName: 'Ananya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
    targetId: 'list_calc_1',
    rating: 5,
    comment: 'Very clean calculator, works perfectly! Real lifesaver for my midsems.',
    date: '2026-05-30'
  },
  {
    id: 'rev_2',
    userId: 'user_3',
    userName: 'Rohan Deshmukh',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    targetId: 'list_serv_1',
    rating: 5,
    comment: 'Aarav is very patient and explained concepts in data structures very clearly. Recommended!',
    date: '2026-05-25'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep_1',
    reporterId: 'user_4',
    reporterName: 'Priya Iyer',
    targetId: 'list_calc_4',
    targetTitle: 'HP Engineering Calculator 35s',
    reason: 'The price listed is reasonable, but the seller is refusing to meet on campus and demanding UPI advance payment. Potential scam.',
    date: '2026-06-05',
    status: 'Pending'
  }
];

export const loadState = () => {
  try {
    const serializedListings = localStorage.getItem('unimarket_listings');
    const serializedUsers = localStorage.getItem('unimarket_users');
    const serializedCurrentUser = localStorage.getItem('unimarket_current_user');
    const serializedWishlist = localStorage.getItem('unimarket_wishlist');
    const serializedRentals = localStorage.getItem('unimarket_my_rentals');
    const serializedCompletedOrders = localStorage.getItem('unimarket_completed_orders');
    const serializedReviews = localStorage.getItem('unimarket_reviews');
    const serializedReports = localStorage.getItem('unimarket_reports');

    return {
      listings: serializedListings ? JSON.parse(serializedListings) : INITIAL_LISTINGS,
      users: serializedUsers ? JSON.parse(serializedUsers) : INITIAL_USERS,
      currentUser: serializedCurrentUser ? JSON.parse(serializedCurrentUser) : INITIAL_USERS[0],
      wishlist: serializedWishlist ? JSON.parse(serializedWishlist) : [],
      myRentals: serializedRentals ? JSON.parse(serializedRentals) : [
        {
          id: 'rental_mock_1',
          listingId: 'list_rent_1',
          startDate: '2026-06-01',
          endDate: '2026-06-05',
          totalCost: 200,
          status: 'Active',
          daysLeft: 2
        }
      ],
      completedOrders: serializedCompletedOrders ? JSON.parse(serializedCompletedOrders) : [
        {
          id: 'order_mock_1',
          listingId: 'list_buy_1',
          purchaseDate: '2026-05-25',
          pricePaid: 350,
          sellerName: 'Aarav Mehta'
        }
      ],
      reviews: serializedReviews ? JSON.parse(serializedReviews) : INITIAL_REVIEWS,
      reports: serializedReports ? JSON.parse(serializedReports) : INITIAL_REPORTS,
      communities: INITIAL_COMMUNITIES
    };
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return {
      listings: INITIAL_LISTINGS,
      users: INITIAL_USERS,
      currentUser: INITIAL_USERS[0],
      wishlist: [],
      myRentals: [],
      completedOrders: [],
      reviews: INITIAL_REVIEWS,
      reports: INITIAL_REPORTS,
      communities: INITIAL_COMMUNITIES
    };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem('unimarket_listings', JSON.stringify(state.listings));
    localStorage.setItem('unimarket_users', JSON.stringify(state.users));
    localStorage.setItem('unimarket_current_user', JSON.stringify(state.currentUser));
    localStorage.setItem('unimarket_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('unimarket_my_rentals', JSON.stringify(state.myRentals));
    localStorage.setItem('unimarket_completed_orders', JSON.stringify(state.completedOrders));
    localStorage.setItem('unimarket_reviews', JSON.stringify(state.reviews));
    localStorage.setItem('unimarket_reports', JSON.stringify(state.reports));
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};
