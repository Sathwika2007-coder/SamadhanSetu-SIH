/**
 * Samadhan Setu - Core Application Logic
 * Smart India Hackathon 2026
 * Features: Pan-India Scalability, Exact Location Interactive Map Pinning, Multi-File Evidence Upload with Previews
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEYS = {
    USER: 'samadhan_user',
    CHALLENGES: 'samadhan_challenges',
    PROJECTS: 'samadhan_projects',
    NOTIFICATIONS: 'samadhan_notifications',
    ALL_USERS: 'samadhan_all_users',
    CURRENT_STATE: 'samadhan_current_state',
    LANGUAGE: 'samadhan_language'
  };

  // SVG Icons
  const ICONS = {
    shield: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    sparkles: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    user: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    search: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    plus: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    bell: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    check: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    alert: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    arrowRight: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    building: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="12" y1="6" x2="12.01" y2="6"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="16" y1="14" x2="16.01" y2="14"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/></svg>`,
    mapPin: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    crosshair: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
    globe: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    trendingUp: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    compass: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    users: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    play: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    close: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    refresh: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>`,
    upload: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    camera: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
    video: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
    fileText: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
    paperclip: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
    mic: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
    volume: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    volume2: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    pause: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    stop: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
    bot: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="14" x="3" y="6" rx="2"/><path d="m9 2 3 4 3-4"/><circle cx="8.5" cy="12.5" r="1.5"/><circle cx="15.5" cy="12.5" r="1.5"/><path d="M9 16h6"/></svg>`,
    languages: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`
  };

  // Geographic Database: States & Districts of India
  const INDIA_GEOGRAPHY = {
    'Jharkhand': {
      code: 'JH',
      capital: 'Ranchi',
      zone: 'East',
      pilot: true,
      challengesCount: 142,
      projectsCount: 18,
      unisCount: 5,
      industryCount: 5,
      deployedCount: 6,
      benefited: 29300,
      center: { lat: 23.6102, lng: 85.2799 },
      districts: [
        'Ranchi', 'Khunti', 'Dhanbad', 'Palamu', 'West Singhbhum', 
        'East Singhbhum (Jamshedpur)', 'Bokaro', 'Hazaribagh', 'Dumka', 
        'Simdega', 'Deoghar', 'Giridih', 'Latehar', 'Gumla', 'Ramgarh',
        'Garhwa', 'Chatra', 'Koderma', 'Jamtara', 'Godda', 'Sahibganj', 
        'Pakur', 'Lohardaga', 'Seraikela Kharsawan'
      ],
      districtCoords: {
        'Khunti': { lat: 23.0734, lng: 85.2789 },
        'Ranchi': { lat: 23.3441, lng: 85.3096 },
        'Palamu': { lat: 24.0384, lng: 84.0722 },
        'Dhanbad': { lat: 23.7957, lng: 86.4304 },
        'West Singhbhum': { lat: 22.5539, lng: 85.8078 },
        'East Singhbhum (Jamshedpur)': { lat: 22.8046, lng: 86.2029 },
        'Bokaro': { lat: 23.6693, lng: 86.1511 },
        'Latehar': { lat: 23.7431, lng: 84.4988 },
        'Dumka': { lat: 24.2694, lng: 87.2483 },
        'Simdega': { lat: 22.6167, lng: 84.5000 }
      }
    },
    'Andhra Pradesh': {
      code: 'AP',
      capital: 'Amaravati',
      zone: 'South',
      pilot: false,
      challengesCount: 98,
      projectsCount: 12,
      unisCount: 4,
      industryCount: 4,
      deployedCount: 4,
      benefited: 21500,
      center: { lat: 15.9129, lng: 79.7400 },
      districts: [
        'Visakhapatnam', 'Guntur', 'Krishna (Vijayawada)', 'Anantapur', 
        'Chittoor (Tirupati)', 'Nellore', 'East Godavari (Kakinada)', 
        'West Godavari', 'Kurnool', 'YSR Kadapa', 'Prakasam', 
        'Srikakulam', 'Vizianagaram', 'Alluri Sitharama Raju', 'Anakapalli', 
        'Bapatla', 'Eluru', 'Kakinada', 'Konaseema', 'Nandyal', 'Palnadu', 
        'Parvathipuram Manyam', 'Sri Sathya Sai', 'Tirupati', 'NTR District'
      ],
      districtCoords: {
        'Nellore': { lat: 14.4426, lng: 79.9865 },
        'Anantapur': { lat: 14.6819, lng: 77.6006 },
        'Guntur': { lat: 16.3067, lng: 80.4365 },
        'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
        'Alluri Sitharama Raju': { lat: 18.0833, lng: 82.6667 },
        'West Godavari': { lat: 16.5449, lng: 81.5212 }
      }
    },
    'Maharashtra': {
      code: 'MH',
      capital: 'Mumbai',
      zone: 'West',
      pilot: false,
      challengesCount: 134,
      projectsCount: 16,
      unisCount: 6,
      industryCount: 7,
      deployedCount: 5,
      benefited: 34000,
      center: { lat: 19.7515, lng: 75.7139 },
      districts: [
        'Pune', 'Nagpur', 'Nashik', 'Mumbai City', 'Mumbai Suburban', 
        'Chhatrapati Sambhajinagar (Aurangabad)', 'Ahmednagar', 'Amravati', 
        'Solapur', 'Kolhapur', 'Thane', 'Beed', 'Nanded', 'Jalgaon', 
        'Satara', 'Raigad', 'Ratnagiri', 'Sindhudurg', 'Yavatmal', 'Wardha', 
        'Chandrapur', 'Gadchiroli', 'Bhandara', 'Gondia', 'Latur', 'Osmanabad', 
        'Parbhani', 'Hingoli', 'Jalna', 'Dhule', 'Nandurbar', 'Palghar'
      ],
      districtCoords: {
        'Amravati': { lat: 20.9374, lng: 77.7796 },
        'Nashik': { lat: 19.9975, lng: 73.7898 },
        'Beed': { lat: 18.9891, lng: 75.7601 },
        'Pune': { lat: 18.5204, lng: 73.8567 },
        'Nagpur': { lat: 21.1458, lng: 79.0882 }
      }
    },
    'Karnataka': {
      code: 'KA',
      capital: 'Bengaluru',
      zone: 'South',
      pilot: false,
      challengesCount: 86,
      projectsCount: 10,
      unisCount: 5,
      industryCount: 6,
      deployedCount: 3,
      benefited: 18200,
      center: { lat: 15.3173, lng: 75.7139 },
      districts: ['Bengaluru Urban', 'Mysuru', 'Dharwad', 'Dakshina Kannada (Mangaluru)', 'Belagavi', 'Kalaburagi', 'Ballari', 'Shivamogga', 'Tumakuru', 'Udupi']
    },
    'Bihar': {
      code: 'BR',
      capital: 'Patna',
      zone: 'East',
      pilot: false,
      challengesCount: 74,
      projectsCount: 8,
      unisCount: 3,
      industryCount: 2,
      deployedCount: 2,
      benefited: 14000,
      center: { lat: 25.0961, lng: 85.3131 },
      districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Nalanda', 'Rohtas', 'Vaishali', 'Saran']
    },
    'Odisha': {
      code: 'OD',
      capital: 'Bhubaneswar',
      zone: 'East',
      pilot: false,
      challengesCount: 68,
      projectsCount: 7,
      unisCount: 4,
      industryCount: 3,
      deployedCount: 2,
      benefited: 12500,
      center: { lat: 20.9517, lng: 85.0985 },
      districts: ['Khordha (Bhubaneswar)', 'Cuttack', 'Sundargarh (Rourkela)', 'Sambalpur', 'Ganjam', 'Balasore', 'Mayurbhanj', 'Puri', 'Koraput', 'Kalahandi']
    },
    'Tamil Nadu': {
      code: 'TN',
      capital: 'Chennai',
      zone: 'South',
      pilot: false,
      challengesCount: 92,
      projectsCount: 11,
      unisCount: 5,
      industryCount: 5,
      deployedCount: 4,
      benefited: 22000,
      center: { lat: 11.1271, lng: 78.6569 },
      districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Kanchipuram']
    },
    'Telangana': {
      code: 'TS',
      capital: 'Hyderabad',
      zone: 'South',
      pilot: false,
      challengesCount: 82,
      projectsCount: 9,
      unisCount: 4,
      industryCount: 5,
      deployedCount: 3,
      benefited: 16500,
      center: { lat: 18.1124, lng: 79.0193 },
      districts: ['Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Nalgonda', 'Mahabubnagar']
    },
    'Uttar Pradesh': {
      code: 'UP',
      capital: 'Lucknow',
      zone: 'North',
      pilot: false,
      challengesCount: 112,
      projectsCount: 13,
      unisCount: 6,
      industryCount: 4,
      deployedCount: 3,
      benefited: 28000,
      center: { lat: 26.8467, lng: 80.9462 },
      districts: ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Noida (Gautam Buddha Nagar)', 'Agra', 'Gorakhpur', 'Meerut', 'Bareilly', 'Aligarh']
    },
    'Delhi': {
      code: 'DL',
      capital: 'New Delhi',
      zone: 'North',
      pilot: false,
      challengesCount: 64,
      projectsCount: 8,
      unisCount: 5,
      industryCount: 6,
      deployedCount: 3,
      benefited: 19000,
      center: { lat: 28.7041, lng: 77.1025 },
      districts: ['Central Delhi', 'New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'North East Delhi', 'South West Delhi']
    },
    'Gujarat': {
      code: 'GJ',
      capital: 'Gandhinagar',
      zone: 'West',
      pilot: false,
      challengesCount: 78,
      projectsCount: 9,
      unisCount: 4,
      industryCount: 6,
      deployedCount: 3,
      benefited: 17500,
      center: { lat: 22.2587, lng: 71.1924 },
      districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Anand']
    },
    'West Bengal': {
      code: 'WB',
      capital: 'Kolkata',
      zone: 'East',
      pilot: false,
      challengesCount: 84,
      projectsCount: 10,
      unisCount: 5,
      industryCount: 4,
      deployedCount: 3,
      benefited: 19500,
      center: { lat: 22.9868, lng: 87.8550 },
      districts: ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly', 'Darjeeling', 'Purba Medinipur', 'Paschim Bardhaman', 'Malda']
    },
    'Madhya Pradesh': {
      code: 'MP',
      capital: 'Bhopal',
      zone: 'Central',
      pilot: false,
      challengesCount: 62,
      projectsCount: 7,
      unisCount: 3,
      industryCount: 3,
      deployedCount: 2,
      benefited: 11000,
      center: { lat: 22.9734, lng: 78.6569 },
      districts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna']
    },
    'Rajasthan': {
      code: 'RJ',
      capital: 'Jaipur',
      zone: 'North',
      pilot: false,
      challengesCount: 72,
      projectsCount: 8,
      unisCount: 4,
      industryCount: 3,
      deployedCount: 2,
      benefited: 13500,
      center: { lat: 27.0238, lng: 74.2179 },
      districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara']
    },
    'Kerala': {
      code: 'KL',
      capital: 'Thiruvananthapuram',
      zone: 'South',
      pilot: false,
      challengesCount: 58,
      projectsCount: 7,
      unisCount: 4,
      industryCount: 3,
      deployedCount: 2,
      benefited: 15000,
      center: { lat: 10.8505, lng: 76.2711 },
      districts: ['Thiruvananthapuram', 'Ernakulam (Kochi)', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kottayam', 'Wayanad']
    },
    'Punjab': {
      code: 'PB',
      capital: 'Chandigarh',
      zone: 'North',
      pilot: false,
      challengesCount: 48,
      projectsCount: 5,
      unisCount: 3,
      industryCount: 3,
      deployedCount: 2,
      benefited: 9500,
      center: { lat: 31.1471, lng: 75.3412 },
      districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'SAS Nagar (Mohali)']
    },
    'Haryana': {
      code: 'HR',
      capital: 'Chandigarh',
      zone: 'North',
      pilot: false,
      challengesCount: 52,
      projectsCount: 6,
      unisCount: 3,
      industryCount: 4,
      deployedCount: 2,
      benefited: 11500,
      center: { lat: 29.0588, lng: 76.0856 },
      districts: ['Gurugram', 'Faridabad', 'Hisar', 'Panipat', 'Ambala', 'Karnal', 'Rohtak']
    },
    'Assam': {
      code: 'AS',
      capital: 'Dispur',
      zone: 'North-East',
      pilot: false,
      challengesCount: 44,
      projectsCount: 5,
      unisCount: 3,
      industryCount: 2,
      deployedCount: 1,
      benefited: 8000,
      center: { lat: 26.2006, lng: 92.9376 },
      districts: ['Kamrup Metropolitan (Guwahati)', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tezpur']
    },
    'Chhattisgarh': {
      code: 'CG',
      capital: 'Raipur',
      zone: 'Central',
      pilot: false,
      challengesCount: 56,
      projectsCount: 6,
      unisCount: 3,
      industryCount: 3,
      deployedCount: 2,
      benefited: 10500,
      center: { lat: 21.2787, lng: 81.8661 },
      districts: ['Raipur', 'Bhilai / Durg', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Bastar (Jagdalpur)']
    },
    'Uttarakhand': {
      code: 'UK',
      capital: 'Dehradun',
      zone: 'North',
      pilot: false,
      challengesCount: 38,
      projectsCount: 4,
      unisCount: 3,
      industryCount: 2,
      deployedCount: 1,
      benefited: 7200,
      center: { lat: 30.0668, lng: 79.0193 },
      districts: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Almora', 'Pauri Garhwal']
    },
    'Himachal Pradesh': {
      code: 'HP',
      capital: 'Shimla',
      zone: 'North',
      pilot: false,
      challengesCount: 34,
      projectsCount: 4,
      unisCount: 2,
      industryCount: 2,
      deployedCount: 1,
      benefited: 6000,
      center: { lat: 31.1048, lng: 77.1734 },
      districts: ['Shimla', 'Kangra (Dharamshala)', 'Mandi', 'Solan', 'Kullu', 'Hamirpur']
    },
    'Goa': {
      code: 'GA',
      capital: 'Panaji',
      zone: 'West',
      pilot: false,
      challengesCount: 22,
      projectsCount: 3,
      unisCount: 2,
      industryCount: 2,
      deployedCount: 1,
      benefited: 4500,
      center: { lat: 15.2993, lng: 74.1240 },
      districts: ['North Goa (Panaji)', 'South Goa (Margao)']
    },
    'Arunachal Pradesh': {
      code: 'AR',
      capital: 'Itanagar',
      zone: 'North-East',
      pilot: false,
      challengesCount: 18,
      projectsCount: 2,
      unisCount: 1,
      industryCount: 1,
      deployedCount: 1,
      benefited: 3200,
      center: { lat: 28.2180, lng: 94.7278 },
      districts: ['Papum Pare (Itanagar)', 'Changlang', 'West Kameng', 'Tawang', 'Lower Subansiri']
    },
    'Other states/UTs': {
      code: 'OT',
      capital: 'National Territories',
      zone: 'Union Territories',
      pilot: false,
      challengesCount: 32,
      projectsCount: 4,
      unisCount: 3,
      industryCount: 3,
      deployedCount: 1,
      benefited: 6000,
      center: { lat: 20.5937, lng: 78.9629 },
      districts: ['Jammu', 'Srinagar', 'Chandigarh', 'Puducherry', 'Port Blair', 'Leh', 'Daman']
    }
  };

  const ALL_STATES_LIST = Object.keys(INDIA_GEOGRAPHY);

  // 12 Major Indian Languages Supported
  const SUPPORTED_LANGUAGES = {
    en: { code: 'en', bcp47: 'en-IN', name: 'English', nativeName: 'English', flag: '🇮🇳' },
    hi: { code: 'hi', bcp47: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    te: { code: 'te', bcp47: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    bn: { code: 'bn', bcp47: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    ta: { code: 'ta', bcp47: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    kn: { code: 'kn', bcp47: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    ml: { code: 'ml', bcp47: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    mr: { code: 'mr', bcp47: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    gu: { code: 'gu', bcp47: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    or: { code: 'or', bcp47: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    pa: { code: 'pa', bcp47: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    ur: { code: 'ur', bcp47: 'ur-IN', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' }
  };

  // Multilingual UI Translation Dictionary
  const TRANSLATION_DICTIONARY = {
    hi: {
      language: 'भाषा',
      state: 'राज्य',
      explore_challenges: 'चुनौतियाँ देखें',
      explore_india: 'भारत दर्शन',
      social_impact: 'सामाजिक प्रभाव',
      report_problem: 'समस्या दर्ज करें',
      speak_to_ai: 'समाधान एआई से बोलें',
      listen: 'सुनें',
      speaking: 'बोल रहा है...',
      paused: 'रुका हुआ',
      view_original: 'मूल भाषा देखें',
      view_translation: 'अंग्रेजी अनुवाद देखें',
      problem_title: 'समस्या का शीर्षक',
      problem_desc: 'सामुदायिक समस्या का विस्तृत विवरण',
      category_domain: 'श्रेणी / डोमेन',
      location_pin: 'सटीक स्थान और मैप पिन',
      confirm_location: 'स्थान की पुष्टि करें',
      use_gps: 'वर्तमान स्थान (GPS) का उपयोग करें',
      search_places: 'स्थान या पता खोजें...',
      upload_evidence: 'समस्या के साक्ष्य अपलोड करें',
      estimated_affected: 'प्रभावित नागरिकों की अनुमानित संख्या',
      urgency_level: 'प्राथमिकता स्तर',
      submit_button: 'एआई वर्गीकरण चलाएं और समस्या दर्ज करें',
      ai_categorized: 'एआई द्वारा वर्गीकृत',
      under_validation: 'सत्यापन प्रक्रियाधीन',
      university_matched: 'विश्वविद्यालय आवंटित',
      prototype_dev: 'प्रोटोटाइप विकास',
      testing_field: 'फील्ड टेस्टिंग',
      deployed_impact: 'जमीनी स्तर पर तैनात',
      critical: 'अति-गंभीर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'सामान्य',
      ask_assistant: 'समाधान एआई से कुछ भी पूछें...'
    },
    te: {
      language: 'భాష',
      state: 'రాష్ట్రం',
      explore_challenges: 'సవాళ్లను అన్వేషించండి',
      explore_india: 'భారతదేశాన్ని అన్వేషించండి',
      social_impact: 'సామాజిక ప్రభావం',
      report_problem: 'సమస్యను నివేదించండి',
      speak_to_ai: 'సమాధాన్ AI తో మాట్లాడండి',
      listen: 'వినండి',
      speaking: 'మాట్లాడుతోంది...',
      paused: 'ఆగింది',
      view_original: 'మూల భాష చూడండి',
      view_translation: 'ఆంగ్ల అనువాదం చూడండి',
      problem_title: 'సమస్య శీర్షిక',
      problem_desc: 'సమస్య యొక్క పూర్తి వివరణ',
      category_domain: 'వర్గం / డొమైన్',
      location_pin: 'ఖచ్చితమైన స్థానం & మ్యాప్ పిన్',
      confirm_location: 'స్థానాన్ని నిర్ధారించండి',
      use_gps: 'ప్రస్తుత స్థానం (GPS) ఉపయోగించండి',
      search_places: 'ప్రదేశం లేదా చిరునామాను వెతకండి...',
      upload_evidence: 'సమస్యకు సంబంధించిన ఆధారాలు అప్‌లోడ్ చేయండి',
      estimated_affected: 'బాధిత ప్రజల సంఖ్య',
      urgency_level: 'అత్యవసర స్థాయి',
      submit_button: 'AI వర్గీకరణ చేసి సమస్యను సమర్పించండి',
      ai_categorized: 'AI వర్గీకరించింది',
      under_validation: 'పరిశీలనలో ఉంది',
      university_matched: 'విశ్వవిద్యాలయం అనుసంధానించబడింది',
      prototype_dev: 'నమూనా అభివృద్ధి',
      testing_field: 'క్షేత్ర పరీక్ష',
      deployed_impact: 'క్షేత్రస్థాయిలో అమలు చేయబడింది',
      critical: 'తీవ్ర అత్యవసరం',
      high: 'అధికం',
      medium: 'మధ్యస్థం',
      low: 'సాధారణం',
      ask_assistant: 'సమాధాన్ AI ని ప్రశ్నించండి...'
    },
    bn: {
      language: 'ভাষা',
      state: 'রাজ্য',
      explore_challenges: 'চ্যালেঞ্জ অন্বেষণ',
      explore_india: 'ভারত দেখুন',
      social_impact: 'সামাজিক প্রভাব',
      report_problem: 'সমস্যা রিপোর্ট করুন',
      speak_to_ai: 'সমাধান এআই এর সাথে কথা বলুন',
      listen: 'শুনুন',
      speaking: 'বলছে...',
      paused: 'স্থগিত',
      view_original: 'মূল ভাষা দেখুন',
      view_translation: 'ইংরেজি অনুবাদ দেখুন',
      problem_title: 'সমস্যার শিরোনাম',
      problem_desc: 'সমস্যার বিস্তারিত বিবরণ',
      category_domain: 'বিভাগ / ডোমেন',
      location_pin: 'সঠিক অবস্থান ও ম্যাপ পিন',
      confirm_location: 'অবস্থান নিশ্চিত করুন',
      use_gps: 'বর্তমান অবস্থান (GPS) ব্যবহার করুন',
      search_places: 'স্থান বা ঠিকানা খুঁজুন...',
      upload_evidence: 'প্রমাণের নথি আপলোড করুন',
      estimated_affected: 'প্রভাবিত মানুষের সংখ্যা',
      urgency_level: 'জরুরী মাত্রা',
      submit_button: 'এআই বিশ্লেষণ চালান ও সমস্যা জমা দিন',
      ai_categorized: 'এআই দ্বারা শ্রেণীবদ্ধ',
      under_validation: 'যাচাই প্রক্রিয়াধীন',
      university_matched: 'বিশ্ববিদ্যালয় নির্ধারিত',
      prototype_dev: 'প্রোটোটাইপ তৈরি',
      testing_field: 'মাঠ পর্যায়ের পরীক্ষা',
      deployed_impact: 'মাঠে বাস্তবায়িত',
      critical: 'অতি জরুরী',
      high: 'উচ্চ',
      medium: 'মাঝারি',
      low: 'সাধারণ',
      ask_assistant: 'সমাধান এআই কে জিজ্ঞাসা করুন...'
    },
    ta: {
      language: 'மொழி',
      state: 'மாநிலம்',
      explore_challenges: 'சவால்களை ஆராய்க',
      explore_india: 'இந்தியாவை ஆராய்க',
      social_impact: 'சமூக தாக்கம்',
      report_problem: 'சிக்கலை புகாரளிக்கவும்',
      speak_to_ai: 'சமாதான் AI உடன் பேசுங்கள்',
      listen: 'கேளுங்கள்',
      speaking: 'பேசுகிறது...',
      paused: 'நிறுத்தப்பட்டது',
      view_original: 'அசல் உரையைப் பார்க்கவும்',
      view_translation: 'ஆங்கில மொழிபெயர்ப்பைப் பார்க்கவும்',
      problem_title: 'பிரச்சனை தலைப்பு',
      problem_desc: 'பிரச்சனையின் விரிவான விளக்கம்',
      category_domain: 'வகை / துறை',
      location_pin: 'துல்லியமான இடம் & வரைபடக் குறி',
      confirm_location: 'இருப்பிடத்தை உறுதிப்படுத்துக',
      use_gps: 'தற்போதைய இருப்பிடத்தைப் (GPS) பயன்படுத்தவும்',
      search_places: 'இடங்களைத் தேடுங்கள்...',
      upload_evidence: 'சான்றுகளை பதிவேற்றவும்',
      estimated_affected: 'பாதிக்கப்பட்ட மக்கள்',
      urgency_level: 'அவசர நிலை',
      submit_button: 'AI வகைப்படுத்தி சமர்ப்பிக்கவும்',
      ai_categorized: 'AI வகைப்படுத்தப்பட்டது',
      under_validation: 'சரிபார்க்கப்படுகிறது',
      university_matched: 'பல்கலைக்கழகம் இணைக்கப்பட்டது',
      prototype_dev: 'மாதிரி உருவாக்கம்',
      testing_field: 'கள சோதனை',
      deployed_impact: 'களத்தில் செயல்படுத்தப்பட்டது',
      critical: 'மிக அவசரம்',
      high: 'அதிகம்',
      medium: 'நடுத்தரம்',
      low: 'குறைவு',
      ask_assistant: 'சமாதான் AI யிடம் கேளுங்கள்...'
    },
    kn: {
      language: 'ಭಾಷೆ',
      state: 'ರಾಜ್ಯ',
      explore_challenges: 'ಸವಾಲುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      explore_india: 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ',
      social_impact: 'ಸಾಮಾಜಿಕ ಪರಿಣಾಮ',
      report_problem: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
      speak_to_ai: 'ಸಮಾಧಾನ್ AI ಜೊತೆ ಮಾತನಾಡಿ',
      listen: 'ಕೇಳಿ',
      speaking: 'ಮಾತನಾಡುತ್ತಿದೆ...',
      paused: 'ವಿರಾಮಗೊಂಡಿದೆ',
      view_original: 'ಮೂಲ ಪಠ್ಯ ನೋಡಿ',
      view_translation: 'ಇಂಗ್ಲಿಷ್ ಅನುವಾದ ನೋಡಿ',
      submit_button: 'AI ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ ಸಲ್ಲಿಸಿ',
      critical: 'ತೀವ್ರ',
      high: 'ಹೆಚ್ಚು',
      medium: 'ಮಧ್ಯಮ',
      low: 'ಸಾಮಾನ್ಯ'
    },
    mr: {
      language: 'भाषा',
      state: 'राज्य',
      explore_challenges: 'आव्हाने शोधा',
      explore_india: 'भारत पहा',
      social_impact: 'सामाजिक परिणाम',
      report_problem: 'समस्या नोंदवा',
      speak_to_ai: 'समाधान एआय शी बोला',
      listen: 'ऐका',
      speaking: 'बोलत आहे...',
      paused: 'थांबवले',
      view_original: 'मूळ भाषा पहा',
      view_translation: 'इंग्रजी अनुवाद पहा',
      submit_button: 'एआय वर्गीकरण करा आणि सबमिट करा',
      critical: 'अति-गंभीर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'सामान्य'
    },
    gu: {
      language: 'ભાષા',
      state: 'રાજ્ય',
      explore_challenges: 'પડકારો શોધો',
      explore_india: 'ભારત અન્વેષણ',
      social_impact: 'સામાજિક અસર',
      report_problem: 'સમસ્યા નોંધાવો',
      speak_to_ai: 'સમાધાન એઆઈ સાથે બોલો',
      listen: 'સાંભળો',
      speaking: 'બોલી રહ્યું છે...',
      paused: 'અટકેલું',
      view_original: 'મૂળ ભાષા જુઓ',
      view_translation: 'અંગ્રેજી અનુવાદ જુઓ',
      submit_button: 'AI વર્ગીકરણ ચલાવો અને સબમિટ કરો',
      critical: 'અતિ ગંભીર',
      high: 'ઉચ્ચ',
      medium: 'મધ્યમ',
      low: 'સામાન્ય'
    },
    ml: {
      language: 'ഭാഷ',
      state: 'സംസ്ഥാനം',
      explore_challenges: 'വെല്ലുവിളികൾ പര്യവേക്ഷണം ചെയ്യുക',
      explore_india: 'ഇന്ത്യയെ അറിയുക',
      social_impact: 'സാമൂഹിക സ്വാധീനം',
      report_problem: 'പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
      speak_to_ai: 'സമാധാൻ AI യുമായി സംസാരിക്കുക',
      listen: 'കേൾക്കുക',
      speaking: 'സംസാരിക്കുന്നു...',
      paused: 'താൽക്കാലികമായി നിർത്തി',
      view_original: 'യഥാർത്ഥ വാചകം കാണുക',
      view_translation: 'ഇംഗ്ലീഷ് പരിഭാഷ കാണുക',
      submit_button: 'AI വർഗ്ഗീകരണം നടത്തി സമർപ്പിക്കുക',
      critical: 'ഗുരുതരം',
      high: 'ഉയർന്നത്',
      medium: 'ഇടത്തരം',
      low: 'കുറഞ്ഞത്'
    },
    or: {
      language: 'ଭାଷା',
      state: 'ରାଜ୍ୟ',
      explore_challenges: 'ଚ୍ୟାଲେଞ୍ଜ ଅନୁସନ୍ଧାନ କରନ୍ତୁ',
      explore_india: 'ଭାରତ ଦର୍ଶନ',
      social_impact: 'ସାମାଜିକ ପ୍ରଭାବ',
      report_problem: 'ସମସ୍ୟା ଦାଖଲ କରନ୍ତୁ',
      speak_to_ai: 'ସମାଧାନ ଏଆଇ ସହିତ କଥା ହୁଅନ୍ତୁ',
      listen: 'ଶୁଣନ୍ତୁ',
      view_original: 'ମୂଳ ଭାଷା ଦେଖନ୍ତୁ',
      view_translation: 'ଇଂରାଜୀ ଅନୁବାଦ ଦେଖନ୍ତୁ',
      submit_button: 'AI ବର୍ଗୀକରଣ ଚଳାନ୍ତୁ ଏବଂ ଦାଖଲ କରନ୍ତୁ'
    },
    pa: {
      language: 'ਭਾਸ਼ਾ',
      state: 'ਰਾਜ',
      explore_challenges: 'ਚੁਣੌਤੀਆਂ ਦੀ ਪੜਚੋਲ ਕਰੋ',
      explore_india: 'ਭਾਰਤ ਦੀ ਪੜਚੋਲ',
      social_impact: 'ਸਮਾਜਿਕ ਪ੍ਰਭਾਵ',
      report_problem: 'ਸਮੱਸਿਆ ਦਰਜ ਕਰੋ',
      speak_to_ai: 'ਸਮਾਧਾਨ ਏਆਈ ਨਾਲ ਗੱਲ ਕਰੋ',
      listen: 'ਸੁਣੋ',
      view_original: 'ਅਸਲ ਭਾਸ਼ਾ ਦੇਖੋ',
      view_translation: 'ਅੰਗਰੇਜ਼ੀ ਅਨੁਵਾਦ ਦੇਖੋ',
      submit_button: 'AI ਵਰਗੀਕਰਣ ਕਰੋ ਅਤੇ ਜਮ੍ਹਾਂ ਕਰੋ'
    },
    ur: {
      language: 'زبان',
      state: 'ریاست',
      explore_challenges: 'چیلنجز تلاش کریں',
      explore_india: 'بھارت کو دریافت کریں',
      social_impact: 'سماجی اثرات',
      report_problem: 'مسئلہ درج کریں',
      speak_to_ai: 'سمادھان اے آئی سے بات کریں',
      listen: 'سنیں',
      view_original: 'اصل تحریر دیکھیں',
      view_translation: 'انگریزی ترجمہ دیکھیں',
      submit_button: 'اے آئی زمرہ بندی کریں اور جمع کرائیں'
    }
  };

  function t(key, fallback = '') {
    const lang = (typeof state !== 'undefined' && state && state.currentLanguage) ? state.currentLanguage : 'en';
    if (lang === 'en') return fallback || key;
    return TRANSLATION_DICTIONARY[lang]?.[key] || fallback || key;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Multilingual Translation Engine (Bidirectional Indian Languages ↔ English)
  const SamadhanTranslationEngine = {
    phrases: {
      // Telugu -> English
      'మా గ్రామంలో తాగునీటి సమస్య ఉంది.': 'There is a drinking water problem in our village.',
      'మా గ్రామంలో తాగునీటి సమస్య ఉంది': 'There is a drinking water problem in our village.',
      'మా గ్రామంలో తాగునీటి సమస్య మరియు ఫ్లోరైడ్ కాలుష్యం': 'Drinking Water Problem and High Fluoride Contamination in Village Clusters',
      'టమాట పంటలో ఆకు తెగులు మరియు నష్టం ఉంది': 'Foliar Blight Disease Outbreak in Tomato and Winter Crops',
      'టమాట పంటలో ఆకు తెగులు సమస్య': 'Foliar Blight Disease Outbreak in Tomato Crops',
      'గ్రామంలో రోడ్డు సరిగా లేదు': 'Poor road infrastructure and lack of transport connectivity in village',
      'పాఠశాలలో సౌకర్యాలు లేవు': 'Lack of digital classroom facilities and sanitation in village school',
      'ఆసుపత్రిలో వైద్యులు లేరు': 'Shortage of primary healthcare doctors and medicines at village clinic',
      'కరెంట్ సరిగా రావడం లేదు': 'Frequent electrical power outages and irregular farm feeder supply',

      // Hindi -> English
      'हमारे गांव में पीने के पानी की समस्या है।': 'There is a drinking water problem in our village.',
      'हमारे गांव में पीने के पानी की समस्या है': 'There is a drinking water problem in our village.',
      'टमाटर और आलू की फसलों में पत्ती झुलसा और रतुआ रोग की शीघ्र पहचान': 'Early Detection of Foliar Blight & Rust in Tomato and Potato Crops',
      'खेतों में बिजली और सिंचाई की समस्या है': 'Shortage of electricity and irrigation water for farming clusters',
      'सड़क खराब है और बारिश में पानी भर जाता है': 'Poor road condition and seasonal waterlogging in village',
      'स्वास्थ्य केंद्र में डॉक्टर और दवाइयां उपलब्ध नहीं हैं': 'Lack of doctors and essential medicines at rural healthcare center',
      'कचरा प्रबंधन और प्लास्टिक प्रदूषण की समस्या': 'Solid waste disposal and plastic pollution challenge in village habitation',

      // Bengali -> English
      'আমাদের গ্রামে পানীয় জলের তীব্র সংকট রয়েছে': 'There is a severe shortage of drinking water in our village.',
      'ফসলে পোকার আক্রমণ এবং ক্ষতি হচ্ছে': 'Pest infestation and severe damage to standing agricultural crops',
      'গ্রামের রাস্তাঘাট খুব খারাপ': 'Rural road infrastructure in deplorable condition',

      // Tamil -> English
      'எங்கள் கிராமத்தில் குடிநீர் பிரச்சனை உள்ளது': 'There is a drinking water problem in our village.',
      'பயிர்களில் நோய் தாக்குதல் மற்றும் சேதம்': 'Crop disease outbreak causing severe damage to harvest',
      'கிராமத்தில் சாலை வசதி இல்லை': 'Lack of all-weather motorable roads connecting the village',

      // Kannada -> English
      'ನಮ್ಮ ಹಳ್ಳಿಯಲ್ಲಿ ಕುಡಿಯುವ ನೀರಿನ ಸಮಸ್ಯೆ ಇದೆ': 'There is a drinking water problem in our village.',
      'ಬೆಳೆ ರೋಗ ಮತ್ತು ರೈತರ ನಷ್ಟ': 'Crop disease outbreak and financial loss for smallholder farmers',

      // Malayalam -> English
      'ഞങ്ങളുടെ ഗ്രാമത്തിൽ കുടിവെള്ള പ്രശ്നമുണ്ട്': 'There is a drinking water problem in our village.',

      // Marathi -> English
      'आमच्या गावात पिण्याच्या पाण्याची समस्या आहे': 'There is a drinking water problem in our village.',
      'पिकांवर किडीचा प्रादुर्भाव आणि नुकसान': 'Pest attack and fungal disease spreading on farm crops',

      // Gujarati -> English
      'અમારા ગામમાં પીવાના પાણીની સમસ્યા છે': 'There is a drinking water problem in our village.',

      // Odia -> English
      'ଆମ ଗାଁରେ ପିଇବା ପାଣିର ସମସ୍ୟା ରହିଛି': 'There is a drinking water problem in our village.',

      // Punjabi -> English
      'ਸਾਡੇ ਪਿੰਡ ਵਿੱਚ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੀ ਸਮੱਸਿਆ ਹੈ': 'There is a drinking water problem in our village.',

      // Urdu -> English
      'ہمارے گاؤں میں پینے کے پانی کا مسئلہ ہے': 'There is a drinking water problem in our village.'
    },

    tokens: {
      'తాగునీటి': 'drinking water',
      'నీరు': 'water',
      'నీటి': 'water',
      'సమస్య': 'problem',
      'సమస్యలు': 'problems',
      'గ్రామం': 'village',
      'గ్రామంలో': 'in our village',
      'పంట': 'crop',
      'పంటలు': 'crops',
      'తెగులు': 'blight disease',
      'రోడ్డు': 'road',
      'ఆసుపత్రి': 'hospital',
      'పాఠశాల': 'school',
      'కరెంట్': 'electricity',
      'రైతులు': 'farmers',
      'पीने': 'drinking',
      'पानी': 'water',
      'गांव': 'village',
      'गाँव': 'village',
      'फसल': 'crop',
      'झुलसा': 'blight',
      'सड़क': 'road',
      'बिजली': 'electricity',
      'জল': 'water',
      'পানীয়': 'drinking',
      'சாலை': 'road',
      'தண்ணீர்': 'water'
    },

    detectLanguage(text) {
      if (!text || typeof text !== 'string') return 'en';
      const clean = text.trim();
      if (/[\u0C00-\u0C7F]/.test(clean)) return 'te'; // Telugu
      if (/[\u0980-\u09FF]/.test(clean)) return 'bn'; // Bengali
      if (/[\u0B80-\u0BFF]/.test(clean)) return 'ta'; // Tamil
      if (/[\u0C80-\u0CFF]/.test(clean)) return 'kn'; // Kannada
      if (/[\u0D00-\u0D7F]/.test(clean)) return 'ml'; // Malayalam
      if (/[\u0A80-\u0AFF]/.test(clean)) return 'gu'; // Gujarati
      if (/[\u0B00-\u0B7F]/.test(clean)) return 'or'; // Odia
      if (/[\u0A00-\u0A7F]/.test(clean)) return 'pa'; // Punjabi
      if (/[\u0600-\u06FF]/.test(clean)) return 'ur'; // Urdu
      if (/[\u0900-\u097F]/.test(clean)) {
        return (typeof state !== 'undefined' && state && (state.selectedState === 'Maharashtra' || state.currentLanguage === 'mr')) ? 'mr' : 'hi';
      }
      return (typeof state !== 'undefined' && state && state.currentLanguage) ? state.currentLanguage : 'en';
    },

    translateToEnglish(text, explicitSourceLang = null) {
      if (!text || !text.trim()) return '';
      const trimmed = text.trim();
      const lang = explicitSourceLang || this.detectLanguage(trimmed);
      if (lang === 'en') return trimmed;

      if (this.phrases[trimmed]) return this.phrases[trimmed];

      const norm = trimmed.replace(/[।.,?!;]/g, '').trim();
      for (const [k, v] of Object.entries(this.phrases)) {
        if (k.replace(/[।.,?!;]/g, '').trim() === norm) {
          return v;
        }
      }

      if (trimmed.includes('తాగునీటి') || trimmed.includes('నీరు') || trimmed.includes('पीने के पानी') || trimmed.includes('পানীয় জল') || trimmed.includes('குடிநீர்')) {
        return 'Drinking Water Scarcity and Contamination in Village Habitation';
      }
      if (trimmed.includes('తెగులు') || trimmed.includes('పంట') || trimmed.includes('झुलसा') || trimmed.includes('फसल') || trimmed.includes('பயிர்')) {
        return 'Crop Foliar Blight Disease Outbreak and Yield Damage';
      }
      if (trimmed.includes('రోడ్డు') || trimmed.includes('सड़क') || trimmed.includes('சாலை')) {
        return 'Poor Rural Road Infrastructure and Transport Connectivity Disruption';
      }
      if (trimmed.includes('ఆసుపత్రి') || trimmed.includes('स्वास्थ्य') || trimmed.includes('மருத்துவ')) {
        return 'Primary Health Center Doctor and Diagnostic Facility Shortage';
      }
      if (trimmed.includes('కరెంట్') || trimmed.includes('बिजली') || trimmed.includes('மின்சாரம்')) {
        return 'Severe Rural Power Outages and Irrigation Supply Disruption';
      }

      let replaced = trimmed;
      for (const [tok, eng] of Object.entries(this.tokens)) {
        replaced = replaced.split(tok).join(` ${eng} `);
      }
      if (replaced !== trimmed) {
        return replaced.replace(/\s+/g, ' ').trim();
      }

      return trimmed;
    },

    translateFromEnglish(text, targetLang = 'en') {
      if (!text || !targetLang || targetLang === 'en') return text;
      for (const [regional, english] of Object.entries(this.phrases)) {
        if (english.toLowerCase() === text.trim().toLowerCase()) {
          if (this.detectLanguage(regional) === targetLang) {
            return regional;
          }
        }
      }
      return text;
    }
  };

  // Text-to-Speech (TTS) Engine with Play, Pause, Resume, Stop
  const SamadhanTTSEngine = {
    currentUtterance: null,
    activeElementId: null,
    isPaused: false,

    speak(text, langCode = 'en', elementId = null) {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        return;
      }
      this.stop();
      if (!text || !text.trim()) return;

      const utt = new SpeechSynthesisUtterance(text.trim());
      const bcp = SUPPORTED_LANGUAGES[langCode]?.bcp47 || (langCode === 'te' ? 'te-IN' : langCode === 'hi' ? 'hi-IN' : 'en-IN');
      utt.lang = bcp;
      utt.rate = 0.95;
      utt.pitch = 1.0;

      try {
        const voices = window.speechSynthesis.getVoices();
        const matched = voices.find(v => v.lang === bcp || v.lang.startsWith(langCode));
        if (matched) utt.voice = matched;
      } catch (e) {}

      this.activeElementId = elementId;
      this.isPaused = false;
      this.currentUtterance = utt;
      if (state) {
        state.ttsActiveId = elementId;
        state.ttsPaused = false;
      }

      utt.onend = () => {
        this.activeElementId = null;
        this.isPaused = false;
        this.currentUtterance = null;
        if (state) {
          state.ttsActiveId = null;
          state.ttsPaused = false;
        }
        this.updateButtons();
      };

      utt.onerror = () => {
        this.activeElementId = null;
        this.isPaused = false;
        this.currentUtterance = null;
        if (state) {
          state.ttsActiveId = null;
          state.ttsPaused = false;
        }
        this.updateButtons();
      };

      window.speechSynthesis.speak(utt);
      this.updateButtons();
    },

    pause() {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        this.isPaused = true;
        if (state) state.ttsPaused = true;
        this.updateButtons();
      }
    },

    resume() {
      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.isPaused = false;
        if (state) state.ttsPaused = false;
        this.updateButtons();
      }
    },

    stop() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.activeElementId = null;
      this.isPaused = false;
      this.currentUtterance = null;
      if (state) {
        state.ttsActiveId = null;
        state.ttsPaused = false;
      }
      this.updateButtons();
    },

    updateButtons() {
      document.querySelectorAll('[data-tts-container]').forEach(el => {
        const id = el.getAttribute('data-tts-id');
        const text = el.getAttribute('data-tts-text');
        const lang = el.getAttribute('data-tts-lang') || 'en';
        el.innerHTML = this.renderControlsInner(id, text, lang);
      });
    },

    renderControls(elementId, text, langCode = 'en') {
      const safeText = escapeHtml(text || '');
      return `
        <span data-tts-container data-tts-id="${elementId}" data-tts-text="${safeText}" data-tts-lang="${langCode}" class="inline-block">
          ${this.renderControlsInner(elementId, safeText, langCode)}
        </span>
      `;
    },

    renderControlsInner(elementId, text, langCode) {
      const isThisActive = (state && state.ttsActiveId === elementId);
      const isPaused = (isThisActive && state && state.ttsPaused);

      if (isThisActive && !isPaused) {
        return `
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm animate-fade-in">
            <span class="audio-wave-bars text-emerald-600">
              <span class="audio-wave-bar"></span>
              <span class="audio-wave-bar"></span>
              <span class="audio-wave-bar"></span>
              <span class="audio-wave-bar"></span>
            </span>
            <span class="text-[11px] font-bold">${t('speaking', 'Speaking...')}</span>
            <button type="button" data-action="tts-pause" data-tts-id="${elementId}" class="p-1 hover:bg-emerald-200 rounded text-emerald-900 transition" title="Pause">${ICONS.pause}</button>
            <button type="button" data-action="tts-stop" data-tts-id="${elementId}" class="p-1 hover:bg-emerald-200 rounded text-red-600 transition" title="Stop">${ICONS.stop}</button>
          </div>
        `;
      } else if (isThisActive && isPaused) {
        return `
          <div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">
            <span class="text-[11px] font-bold">${t('paused', 'Paused')}</span>
            <button type="button" data-action="tts-resume" data-tts-id="${elementId}" class="p-1 hover:bg-amber-200 rounded text-amber-900 transition" title="Resume">${ICONS.play}</button>
            <button type="button" data-action="tts-stop" data-tts-id="${elementId}" class="p-1 hover:bg-amber-200 rounded text-red-600 transition" title="Stop">${ICONS.stop}</button>
          </div>
        `;
      } else {
        return `
          <button type="button" data-action="tts-play" data-tts-id="${elementId}" data-tts-text="${text}" data-tts-lang="${langCode}" class="btn-tts-listen" title="Listen to audio">
            ${ICONS.volume}
            <span>${t('listen', 'Listen')}</span>
          </button>
        `;
      }
    }
  };

  // Speech-to-Text (STT) Recognition Engine
  const SamadhanSpeechEngine = {
    recognition: null,
    isListening: false,
    activeFieldId: null,

    init() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;

          this.recognition.onstart = () => {
            this.isListening = true;
            if (state) state.isRecording = true;
            this.updateUI();
          };

          this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }
            const spoken = (finalTranscript || interimTranscript).trim();
            if (spoken) {
              this.handleSpeechResult(spoken, !!finalTranscript);
            }
          };

          this.recognition.onerror = (event) => {
            console.warn('Speech recognition error/denial:', event.error);
            this.isListening = false;
            if (state) {
              state.isRecording = false;
              state.activeVoiceTarget = null;
            }
            this.showMicNotice(event.error);
            this.updateUI();
          };

          this.recognition.onend = () => {
            this.isListening = false;
            if (state) {
              state.isRecording = false;
              state.activeVoiceTarget = null;
            }
            this.updateUI();
          };
        } catch (e) {
          console.warn('Could not initialize SpeechRecognition:', e);
        }
      }
    },

    startListening(fieldId = null, targetLang = null) {
      const lang = targetLang || (state ? state.currentLanguage : 'hi');
      const bcp47 = SUPPORTED_LANGUAGES[lang]?.bcp47 || 'hi-IN';

      this.activeFieldId = fieldId;
      if (state) state.activeVoiceTarget = fieldId;

      if (!this.recognition) {
        this.init();
      }

      if (!this.recognition) {
        this.showMicNotice('not-supported');
        return;
      }

      try {
        this.recognition.lang = bcp47;
        this.recognition.start();
      } catch (err) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }
    },

    stopListening() {
      if (this.recognition && this.isListening) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }
      this.isListening = false;
      if (state) {
        state.isRecording = false;
        state.activeVoiceTarget = null;
      }
      this.updateUI();
    },

    handleSpeechResult(spokenText, isFinal) {
      if (!spokenText) return;
      const detectedLang = SamadhanTranslationEngine.detectLanguage(spokenText);
      const translated = SamadhanTranslationEngine.translateToEnglish(spokenText, detectedLang);

      if (state) {
        state.voicePreview = {
          spokenText,
          detectedLang,
          translatedText: translated,
          fieldTarget: this.activeFieldId,
          isFinal
        };
      }

      if (this.activeFieldId) {
        const inputEl = document.getElementById(this.activeFieldId);
        if (inputEl) {
          inputEl.value = spokenText;
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }

      this.updateUI();
    },

    simulateVoiceClip(text, lang) {
      this.activeFieldId = null;
      this.handleSpeechResult(text, true);
    },

    showMicNotice(type) {
      const banner = document.getElementById('mic-privacy-notice');
      if (banner) {
        if (type === 'not-allowed' || type === 'permission-denied') {
          banner.className = 'text-xs p-2.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 block';
          banner.innerHTML = `⚠️ <strong>Microphone Access Unavailable or Blocked:</strong> You can continue by typing your problem, or click the sample voice clips below to test instant speech recognition and translation.`;
        } else if (type === 'not-supported') {
          banner.className = 'text-xs p-2.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-300 block';
          banner.innerHTML = `ℹ️ <strong>Speech Recognition API:</strong> Your current browser environment is using simulation mode. Click any of the 1-click test voice clips below to demonstrate transcription and translation.`;
        }
      }
    },

    updateUI() {
      document.querySelectorAll('[data-action="voice-input-field"]').forEach(btn => {
        const target = btn.getAttribute('data-target');
        if (state && state.activeVoiceTarget === target && state.isRecording) {
          btn.classList.add('recording');
          btn.innerHTML = `${ICONS.mic} <span class="animate-pulse">Listening...</span>`;
        } else {
          btn.classList.remove('recording');
          const label = target === 'report-title' ? 'Speak Title' : target === 'report-desc' ? 'Speak Description' : target === 'report-impact' ? 'Speak Impact' : 'Speak Evidence Note';
          btn.innerHTML = `${ICONS.mic} <span>${label}</span>`;
        }
      });

      const mainVoiceBtn = document.querySelector('[data-action="voice-dictate-main"]');
      if (mainVoiceBtn) {
        if (state && state.isRecording && !state.activeVoiceTarget) {
          mainVoiceBtn.classList.add('animate-pulse', 'ring-2', 'ring-red-400');
          mainVoiceBtn.innerHTML = `${ICONS.mic} <span>🔴 Listening... Click to Stop</span>`;
        } else {
          mainVoiceBtn.classList.remove('animate-pulse', 'ring-2', 'ring-red-400');
          mainVoiceBtn.innerHTML = `${ICONS.mic} <span>Speak Problem Description</span>`;
        }
      }

      const previewContainer = document.getElementById('voice-dictation-preview-container');
      if (previewContainer) {
        if (state && state.voicePreview) {
          previewContainer.classList.remove('hidden');
          previewContainer.innerHTML = renderVoicePreviewContent();
        } else {
          previewContainer.classList.add('hidden');
        }
      }
    }
  };

  // Preview renderer for Voice Dictation
  function renderVoicePreviewContent() {
    const vp = state ? state.voicePreview : null;
    if (!vp) return '';

    const langObj = SUPPORTED_LANGUAGES[vp.detectedLang] || { name: 'Regional Language', nativeName: vp.detectedLang };

    return `
      <div class="space-y-2.5 bg-blue-50/80 p-3 rounded-lg border border-blue-200 text-xs">
        <div class="flex items-center justify-between pb-1.5 border-b border-blue-200">
          <div class="flex items-center gap-1.5">
            <span class="text-base">🎙️</span>
            <span class="font-bold text-xs text-blue-950">Samadhan AI Voice Transcription & Translation</span>
          </div>
          <span class="badge bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Detected: ${langObj.nativeName} (${langObj.name})
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-white p-2.5 rounded border border-blue-200 space-y-1">
            <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>🗣️ Spoken in Native Language:</span>
              ${SamadhanTTSEngine.renderControls('tts-spoken-preview', vp.spokenText, vp.detectedLang)}
            </div>
            <p class="text-slate-900 font-bold text-sm bg-slate-50 p-2 rounded">${escapeHtml(vp.spokenText)}</p>
          </div>

          <div class="bg-white p-2.5 rounded border border-emerald-200 space-y-1">
            <div class="flex items-center justify-between text-[11px] font-semibold text-emerald-800">
              <span>🌐 English Translation (For Universities):</span>
              ${SamadhanTTSEngine.renderControls('tts-trans-preview', vp.translatedText, 'en')}
            </div>
            <p class="text-emerald-950 font-semibold text-sm bg-emerald-50/60 p-2 rounded border border-emerald-100">${escapeHtml(vp.translatedText)}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div class="text-[11px] text-slate-500">
            Review and edit the fields below before submitting your challenge.
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-action="apply-voice-to-form" class="btn btn-primary btn-sm py-1 px-3 text-xs font-bold shadow-sm">
              ✓ Apply to Title & Description
            </button>
            <button type="button" data-action="clear-voice-preview" class="btn btn-outline btn-sm py-1 px-2.5 text-xs text-slate-600">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Floating AI Assistant Chat Logic
  const SamadhanAIAssistant = {
    init() {
      if (!state.assistantMessages || state.assistantMessages.length === 0) {
        const lang = state.currentLanguage || 'en';
        let welcome = "Namaste! I am your Samadhan AI Voice Assistant. How can I help you today? You can speak or type in Telugu, Hindi, Bengali, Tamil, or any of 12 Indian languages to report problems, check status, or get guidance.";
        if (lang === 'hi') {
          welcome = "नमस्ते! मैं आपका समाधान एआई वॉयस असिस्टेंट हूं। आज मैं आपकी क्या सहायता कर सकता हूँ? आप अपनी समस्या दर्ज करने या जानकारी के लिए बोलकर या लिखकर पूछ सकते हैं।";
        } else if (lang === 'te') {
          welcome = "నమస్కారం! నేను మీ సమాధాన్ AI వాయిస్ అసిస్టెంట్. నేను మీకు ఎలా సహాయపడగలను? సమస్యలను నివేదించడానికి లేదా స్థితిని తెలుసుకోవడానికి మీరు మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు.";
        } else if (lang === 'bn') {
          welcome = "নমস্কার! আমি আপনার সমাধান এআই ভয়েস সহকারী। সমস্যা রিপোর্ট করতে বা তথ্য পেতে আপনি যে কোনও ভারতীয় ভাষায় কথা বলতে বা লিখতে পারেন।";
        } else if (lang === 'ta') {
          welcome = "வணக்கம்! நான் உங்கள் சமாதான் AI குரல் உதவியாளர். சிக்கல்களைப் புகாரளிக்க அல்லது வழிகாட்டுதலைப் பெற நீங்கள் பேசலாம் அல்லது தட்டச்சு செய்யலாம்.";
        }

        state.assistantMessages = [
          {
            id: 'm-welcome',
            sender: 'ai',
            text: welcome,
            lang: lang,
            time: 'Just now'
          }
        ];
      }
    },

    processUserMessage(text) {
      if (!text || !text.trim()) return;
      const userText = text.trim();
      const detectedLang = SamadhanTranslationEngine.detectLanguage(userText);

      state.assistantMessages.push({
        id: 'm-' + Date.now(),
        sender: 'user',
        text: userText,
        lang: detectedLang,
        time: 'Just now'
      });

      const engQuery = SamadhanTranslationEngine.translateToEnglish(userText, detectedLang).toLowerCase();
      let replyEnglish = '';
      let replyRegional = '';

      if (engQuery.includes('report') || engQuery.includes('submit') || engQuery.includes('ఎలా నివేదించాలి') || engQuery.includes('दर्ज')) {
        replyEnglish = "To report a problem: 1. Click the saffron 'Report Problem' button. 2. Dictate or type your problem (you can speak in Telugu, Hindi, etc.). 3. Pin your exact location on the interactive map. 4. Upload photo or document evidence. Samadhan AI will automatically categorize it and route it to nearby universities!";
        if (detectedLang === 'te') {
          replyRegional = "సమస్యను నివేదించడానికి: 1. పైన ఉన్న 'సమస్యను నివేదించండి' బటన్‌ను క్లిక్ చేయండి. 2. మైక్రోఫోన్ ఉపయోగించి మీ సమస్యను తెలుగులో మాట్లాడండి. 3. మ్యాప్‌లో మీ గ్రామ స్థానాన్ని పిన్ చేయండి. 4. ఫోటో లేదా పత్రం ఆధారాలను జత చేయండి. మా AI వ్యవస్థ స్వయంచాలకంగా దీనిని సమీప విశ్వవిద్యాలయాలకు పంపుతుంది!";
        } else if (detectedLang === 'hi') {
          replyRegional = "समस्या दर्ज करने के लिए: 1. 'समस्या दर्ज करें' बटन पर क्लिक करें। 2. माइक दबाकर अपनी भाषा में समस्या बोलें। 3. मैप पर अपनी सटीक लोकेशन पिन करें। 4. फोटो या दस्तावेज साक्ष्य अपलोड करें। समाधान एआई इसे वर्गीकृत कर तुरंत संबंधित विश्वविद्यालयों को अग्रेषित करेगा!";
        }
      } else if (engQuery.includes('after') || engQuery.includes('what happens') || engQuery.includes('process') || engQuery.includes('తర్వాత')) {
        replyEnglish = "After you submit: 1. AI categorizes domain and urgency. 2. District administration validates ground reality. 3. Nearby universities (e.g. BIT Mesra, BAU) match student and faculty R&D teams. 4. Industry partners provide prototype grants. 5. Tested solution is deployed back in your village!";
        if (detectedLang === 'te') {
          replyRegional = "మీరు సమస్యను సమర్పించిన తర్వాత: 1. AI సమస్య డొమైన్ మరియు ప్రాధాన్యతను వర్గీకరిస్తుంది. 2. జిల్లా యంత్రాంగం ధృవీకరిస్తుంది. 3. సమీప విశ్వవిద్యాలయాలు విద్యార్థి బృందాలను కేటాయిస్తాయి. 4. పరిశ్రమలు నిధులు సమకూరుస్తాయి. 5. పూర్తయిన పరిష్కారం మీ గ్రామంలో అమలు చేయబడుతుంది!";
        } else if (detectedLang === 'hi') {
          replyRegional = "समस्या दर्ज करने के बाद का चक्र: 1. एआई डोमेन और तात्कालिकता तय करता है। 2. जिला प्रशासन सत्यापन करता है। 3. विश्वविद्यालय (जैसे BIT मेसरा, BAU) छात्र अनुसंधान दल बनाते हैं। 4. उद्योग पार्टनर प्रोटोटाइप अनुदान देते हैं। 5. तैयार समाधान आपके गाँव में तैनात किया जाता है!";
        }
      } else if (engQuery.includes('document') || engQuery.includes('upload') || engQuery.includes('evidence') || engQuery.includes('పత్రాలు') || engQuery.includes('दस्तावेज')) {
        replyEnglish = "You can upload: 1. Clear photographs of the issue (e.g. leaf blight, broken pipe, bad road). 2. Short video clips demonstrating the problem. 3. Water testing laboratory reports or soil survey PDFs (Max 25MB).";
        if (detectedLang === 'te') {
          replyRegional = "మీరు అప్‌లోడ్ చేయగల పత్రాలు: 1. సమస్య యొక్క స్పష్టమైన ఛాయాచిత్రాలు (ఉదా. పంట తెగులు, పైప్ లీకేజీ). 2. చిన్న వీడియో క్లిప్‌లు. 3. నీటి పరీక్ష ల్యాబ్ రిపోర్టులు లేదా మట్టి నమూనా PDFలు (గరిష్టంగా 25MB).";
        } else if (detectedLang === 'hi') {
          replyRegional = "आप अपलोड कर सकते हैं: 1. समस्या की स्पष्ट तस्वीरें (जैसे फसल की पत्ती, टूटा पाइप, सड़क)। 2. समस्या दिखाते हुए छोटे वीडियो क्लिप। 3. जल परीक्षण या मिट्टी परीक्षण प्रयोगशाला रिपोर्ट (अधिकतम 25MB)।";
        }
      } else if (engQuery.includes('water') || engQuery.includes('తాగునీటి') || engQuery.includes('पानी')) {
        replyEnglish = "For water challenges, our matched universities include BIT Mesra, NIT Jamshedpur, and IIT ISM Dhanbad, who develop gravity-fed nano-filtration and zero-electricity defluoridation units.";
        if (detectedLang === 'te') {
          replyRegional = "తాగునీటి సమస్యలకు, BIT మెస్రా, NIT జంషెడ్‌పూర్ మరియు IIT ISM ధన్‌బాద్ వంటి సంస్థలు గ్రావిటీ నానో-ఫిల్ట్రేషన్ మరియు ఫ్లోరైడ్ తొలగింపు పరికరాలను అభివృద్ధి చేస్తున్నాయి.";
        } else if (detectedLang === 'hi') {
          replyRegional = "पेयजल समस्याओं के लिए BIT मेसरा, NIT जमशेदपुर और IIT ISM धनबाद शून्य-बिजली जल शोधन और फ्लोराइड उपचार इकाइयों पर कार्य कर रहे हैं।";
        }
      } else {
        replyEnglish = "I have noted your inquiry regarding '" + userText + "'. You can report this challenge directly or browse active solutions across India in our Explore Challenges tab.";
        if (detectedLang === 'te') {
          replyRegional = "మీరు అడిగిన విషయం: '" + userText + "'. దీనిని 'సమస్యను నివేదించండి' ద్వారా సమర్పించవచ్చు లేదా మా పరిష్కారాలను చూడవచ్చు.";
        } else if (detectedLang === 'hi') {
          replyRegional = "मैंने आपकी बात दर्ज कर ली है: '" + userText + "'। आप इसे 'समस्या दर्ज करें' के माध्यम से प्रस्तुत कर सकते हैं।";
        }
      }

      const finalReply = replyRegional || replyEnglish;
      const finalLang = replyRegional ? detectedLang : 'en';

      state.assistantMessages.push({
        id: 'm-' + Date.now(),
        sender: 'ai',
        text: finalReply,
        lang: finalLang,
        time: 'Just now'
      });

      SamadhanTTSEngine.speak(finalReply, finalLang, 'tts-assistant-' + Date.now());
      render();
    }
  };

  // Floating AI Assistant Drawer Widget
  function renderAIAssistantDrawer() {
    if (!state) return '';
    SamadhanAIAssistant.init();

    return `
      <!-- Floating AI Trigger FAB -->
      <button data-action="toggle-assistant" class="samadhan-ai-fab group" title="Open Samadhan AI Voice Assistant">
        <span class="relative flex items-center justify-center">
          ${ICONS.bot}
          <span class="samadhan-ai-pulse"></span>
        </span>
        <span class="tracking-wide">Samadhan AI</span>
        <span class="text-xs bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full uppercase">Voice</span>
      </button>

      <!-- Floating Sliding Drawer / Chat Popup -->
      ${state.isAssistantOpen ? `
        <div class="samadhan-ai-drawer shadow-2xl">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-3.5 flex items-center justify-between border-b border-blue-800">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-amber-400">
                ${ICONS.bot}
              </div>
              <div>
                <div class="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Samadhan AI Assistant</span>
                  <span class="badge bg-emerald-500 text-white text-[9px] py-0 px-1">Online</span>
                </div>
                <p class="text-[10px] text-blue-200">Multilingual Voice & Civic Guidance</p>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button data-action="tts-stop" class="text-blue-200 hover:text-white p-1 rounded hover:bg-blue-800" title="Stop Audio">${ICONS.stop}</button>
              <button data-action="toggle-assistant" class="text-blue-200 hover:text-white p-1 rounded hover:bg-blue-800" title="Close">${ICONS.close}</button>
            </div>
          </div>

          <!-- Messages Container -->
          <div id="ai-chat-messages" class="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            ${state.assistantMessages.map((m, idx) => `
              <div class="flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[85%] rounded-xl p-2.5 shadow-sm space-y-1 ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}">
                  <div class="flex items-center justify-between gap-2 text-[10px] ${m.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}">
                    <span class="font-bold">${m.sender === 'user' ? 'You' : 'Samadhan AI'}</span>
                    <div class="flex items-center gap-1">
                      <span>${m.time}</span>
                      ${m.sender === 'ai' ? SamadhanTTSEngine.renderControls(`tts-msg-${idx}`, m.text, m.lang) : ''}
                    </div>
                  </div>
                  <div class="leading-relaxed whitespace-pre-wrap">${escapeHtml(m.text)}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Quick Suggested Prompts -->
          <div class="px-3 py-2 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-1 text-[10px]">
            <button data-action="ask-assistant-prompt" data-prompt="How do I report a problem?" class="px-2 py-1 rounded bg-white hover:bg-blue-50 text-blue-900 border border-slate-200 font-medium transition">How to report?</button>
            <button data-action="ask-assistant-prompt" data-prompt="What happens after I submit a problem?" class="px-2 py-1 rounded bg-white hover:bg-blue-50 text-blue-900 border border-slate-200 font-medium transition">What happens next?</button>
            <button data-action="ask-assistant-prompt" data-prompt="Which documents should I upload?" class="px-2 py-1 rounded bg-white hover:bg-blue-50 text-blue-900 border border-slate-200 font-medium transition">Which documents?</button>
            <button data-action="ask-assistant-prompt" data-prompt="మా గ్రామంలో తాగునీటి సమస్య ఉంది." class="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-medium transition">🗣️ తాగునీటి సమస్య (Telugu)</button>
          </div>

          <!-- Chat Form Input -->
          <div class="p-2.5 bg-white border-t border-slate-200">
            <form id="assistant-chat-form" class="flex items-center gap-1.5">
              <button type="button" data-action="assistant-mic" class="btn-voice-input ${state.isAssistantRecording ? 'recording' : ''} py-2 px-2.5" title="Speak to Assistant">
                ${ICONS.mic}
              </button>
              <input type="text" id="assistant-input" class="form-input text-xs py-2 px-3 flex-1" placeholder="${t('ask_assistant', 'Ask a question in any Indian language...')}" autocomplete="off" />
              <button type="submit" class="btn btn-primary text-xs py-2 px-3 font-bold">
                Send
              </button>
            </form>
          </div>
        </div>
      ` : ''}
    `;
  }

  // Application State
  const state = {
    selectedState: 'Jharkhand', // Default pilot state
    adminScope: 'State',        // 'All India' | 'State' | 'District'
    adminSelectedState: 'Jharkhand',
    adminSelectedDistrict: 'All',
    currentUser: null,
    activeTab: 'landing',
    activeRole: null,
    challenges: [],
    projects: [],
    notifications: [],
    allUsers: [],
    selectedChallenge: null,
    searchQuery: '',
    selectedCategoryFilter: 'All',
    selectedDistrictFilter: 'All',
    selectedUrgencyFilter: 'All',
    selectedStatusFilter: 'All',
    isDemoRunning: false,
    demoStepText: null,
    modal: null,
    modalData: null,

    // Multilingual & AI Voice Assistant State
    currentLanguage: localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en',
    isAssistantOpen: false,
    isAssistantRecording: false,
    assistantMessages: [],
    activeVoiceTarget: null,
    isRecording: false,
    ttsActiveId: null,
    ttsPaused: false,
    challengeLangMode: 'translated', // 'translated' | 'original'
    voicePreview: null,

    // Active Real Map State for Reporting
    reportMap: {
      lat: 23.0734,
      lng: 85.2789,
      locationName: 'Torpa Block, Village Bamhani, Khunti, Jharkhand',
      accuracy: null,
      isGpsActive: false,
      confirmed: false,
      locationSource: 'Manual Pin', // 'GPS' | 'Search' | 'Manual Pin'
      gpsStatus: 'idle' // 'idle' | 'locating' | 'granted' | 'denied' | 'error'
    },

    // Active Evidence Files for Reporting
    reportEvidenceFiles: [
      {
        id: 'ev-seed-1',
        name: 'blight_leaf_sample_1.jpg',
        type: 'image/jpeg',
        category: 'photo',
        sizeFormatted: '2.4 MB',
        previewUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252c?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'ev-seed-2',
        name: 'khunti_field_damage_report.pdf',
        type: 'application/pdf',
        category: 'document',
        sizeFormatted: '1.1 MB',
        previewUrl: '#'
      }
    ],
    reportEvidenceDescription: 'Photos demonstrate yellowing and dark concentric necrotic lesions on tomato lower leaves, spreading rapidly across 18 contiguous holdings after winter fog.'
  };

  // Geocoding & Reverse Geocoding Engine (OpenStreetMap Nominatim + Offline Indian Gazetteer)
  const GeocodingService = {
    gazetteer: [
      { name: 'China Amiram, Bhimavaram', query: 'china amiram', queries: ['china amiram', 'china amiram, bhimavaram', '534204', 'amiram', 'bhimavaram amiram'], lat: 16.5436, lng: 81.4961, state: 'Andhra Pradesh', district: 'West Godavari', pin: '534204' },
      { name: 'Bhimavaram, Andhra Pradesh', query: 'bhimavaram', queries: ['bhimavaram', '534201', '534202', 'bhimavaram town', 'bhimavaram junction'], lat: 16.5449, lng: 81.5212, state: 'Andhra Pradesh', district: 'West Godavari', pin: '534201' },
      { name: 'Torpa Block, Khunti', query: 'torpa', queries: ['torpa', '835229', 'torpa block', 'bamhani', 'bamhani village'], lat: 22.9510, lng: 85.0880, state: 'Jharkhand', district: 'Khunti', pin: '835229' },
      { name: 'Khunti, Jharkhand', query: 'khunti', queries: ['khunti', '835210'], lat: 23.0725, lng: 85.2798, state: 'Jharkhand', district: 'Khunti', pin: '835210' },
      { name: 'Ranchi, Jharkhand', query: 'ranchi', queries: ['ranchi', '834001', 'morabadi', 'doranda', 'birsa chowk'], lat: 23.3441, lng: 85.3096, state: 'Jharkhand', district: 'Ranchi', pin: '834001' },
      { name: 'Dhanbad, Jharkhand', query: 'dhanbad', queries: ['dhanbad', '826001', 'iit ism', 'matkuria'], lat: 23.7957, lng: 86.4304, state: 'Jharkhand', district: 'Dhanbad', pin: '826001' },
      { name: 'Jamshedpur, Jharkhand', query: 'jamshedpur', queries: ['jamshedpur', '831001', 'bistupur', 'sakchi', 'telco'], lat: 22.8046, lng: 86.2029, state: 'Jharkhand', district: 'East Singhbhum', pin: '831001' },
      { name: 'Bistupur, Jamshedpur', query: 'bistupur', queries: ['bistupur', 'bistupur market', '831001'], lat: 22.7987, lng: 86.1822, state: 'Jharkhand', district: 'East Singhbhum', pin: '831001' },
      { name: 'Hazaribagh, Jharkhand', query: 'hazaribagh', queries: ['hazaribagh', '825301'], lat: 23.9925, lng: 85.3637, state: 'Jharkhand', district: 'Hazaribagh', pin: '825301' },
      { name: 'Palamu, Jharkhand', query: 'palamu', queries: ['palamu', '822101', 'daltonganj', 'medininagar'], lat: 24.0416, lng: 84.0700, state: 'Jharkhand', district: 'Palamu', pin: '822101' },
      { name: 'Satbarwa, Palamu', query: 'satbarwa', queries: ['satbarwa', 'satbarwa block', '822126'], lat: 24.0384, lng: 84.0722, state: 'Jharkhand', district: 'Palamu', pin: '822126' },
      { name: 'Chainpur, Palamu', query: 'chainpur', queries: ['chainpur', '822110'], lat: 23.9972, lng: 84.0621, state: 'Jharkhand', district: 'Palamu', pin: '822110' },
      { name: 'Deoghar, Jharkhand', query: 'deoghar', queries: ['deoghar', '814112', 'baidyanath'], lat: 24.4826, lng: 86.6974, state: 'Jharkhand', district: 'Deoghar', pin: '814112' },
      { name: 'Bokaro, Jharkhand', query: 'bokaro', queries: ['bokaro', '827001', 'bokaro steel city'], lat: 23.6693, lng: 86.1511, state: 'Jharkhand', district: 'Bokaro', pin: '827001' },
      { name: 'Kadiri, Anantapur, Andhra Pradesh', query: 'kadiri', queries: ['kadiri', '515591', 'kothapalli', 'kadiri mandal'], lat: 14.1132, lng: 78.1611, state: 'Andhra Pradesh', district: 'Anantapur', pin: '515591' },
      { name: 'Visakhapatnam, Andhra Pradesh', query: 'visakhapatnam', queries: ['visakhapatnam', 'vizag', '530001'], lat: 17.6868, lng: 83.2185, state: 'Andhra Pradesh', district: 'Visakhapatnam', pin: '530001' },
      { name: 'Vijayawada, Andhra Pradesh', query: 'vijayawada', queries: ['vijayawada', '520001', 'bezawada'], lat: 16.5062, lng: 80.6480, state: 'Andhra Pradesh', district: 'NTR', pin: '520001' },
      { name: 'Guntur, Andhra Pradesh', query: 'guntur', queries: ['guntur', '522001'], lat: 16.3067, lng: 80.4365, state: 'Andhra Pradesh', district: 'Guntur', pin: '522001' },
      { name: 'Tirupati, Andhra Pradesh', query: 'tirupati', queries: ['tirupati', '517501'], lat: 13.6288, lng: 79.4192, state: 'Andhra Pradesh', district: 'Tirupati', pin: '517501' },
      { name: 'Nellore, Andhra Pradesh', query: 'nellore', queries: ['nellore', '524001', 'gudur'], lat: 14.4426, lng: 79.9865, state: 'Andhra Pradesh', district: 'Nellore', pin: '524001' },
      { name: 'Kurnool, Andhra Pradesh', query: 'kurnool', queries: ['kurnool', '518001'], lat: 15.8281, lng: 78.0373, state: 'Andhra Pradesh', district: 'Kurnool', pin: '518001' },
      { name: 'Pune, Maharashtra', query: 'pune', queries: ['pune', '411001', 'shivajinagar', 'kothrud'], lat: 18.5204, lng: 73.8567, state: 'Maharashtra', district: 'Pune', pin: '411001' },
      { name: 'Nagpur, Maharashtra', query: 'nagpur', queries: ['nagpur', '440001'], lat: 21.1458, lng: 79.0882, state: 'Maharashtra', district: 'Nagpur', pin: '440001' },
      { name: 'Nashik, Maharashtra', query: 'nashik', queries: ['nashik', '422001'], lat: 19.9975, lng: 73.7898, state: 'Maharashtra', district: 'Nashik', pin: '422001' },
      { name: 'Amravati, Maharashtra', query: 'amravati', queries: ['amravati', '444601', 'vidarbha'], lat: 20.9374, lng: 77.7796, state: 'Maharashtra', district: 'Amravati', pin: '444601' },
      { name: 'Achalpur, Amravati, Maharashtra', query: 'achalpur', queries: ['achalpur', '444806', 'chandur bazar'], lat: 21.2583, lng: 77.5097, state: 'Maharashtra', district: 'Amravati', pin: '444806' },
      { name: 'Beed, Maharashtra', query: 'beed', queries: ['beed', '431122'], lat: 18.9891, lng: 75.7601, state: 'Maharashtra', district: 'Beed', pin: '431122' },
      { name: 'Mumbai, Maharashtra', query: 'mumbai', queries: ['mumbai', '400001', 'bombay', 'andheri', 'bandra'], lat: 19.0760, lng: 72.8777, state: 'Maharashtra', district: 'Mumbai', pin: '400001' },
      { name: 'Marine Drive, Mumbai', query: 'marine drive', queries: ['marine drive', 'nariman point', '400020'], lat: 18.9432, lng: 72.8230, state: 'Maharashtra', district: 'Mumbai', pin: '400020' },
      { name: 'Bengaluru, Karnataka', query: 'bengaluru', queries: ['bengaluru', 'bangalore', '560001'], lat: 12.9716, lng: 77.5946, state: 'Karnataka', district: 'Bengaluru Urban', pin: '560001' },
      { name: 'Koramangala, Bengaluru', query: 'koramangala', queries: ['koramangala', '560034'], lat: 12.9352, lng: 77.6245, state: 'Karnataka', district: 'Bengaluru Urban', pin: '560034' },
      { name: 'Chennai, Tamil Nadu', query: 'chennai', queries: ['chennai', 'madras', '600001'], lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu', district: 'Chennai', pin: '600001' },
      { name: 'T. Nagar, Chennai', query: 't. nagar', queries: ['t nagar', 't. nagar', '600017'], lat: 13.0418, lng: 80.2341, state: 'Tamil Nadu', district: 'Chennai', pin: '600017' },
      { name: 'Hyderabad, Telangana', query: 'hyderabad', queries: ['hyderabad', '500001', 'secunderabad', 'hitec city'], lat: 17.3850, lng: 78.4867, state: 'Telangana', district: 'Hyderabad', pin: '500001' },
      { name: 'Kolkata, West Bengal', query: 'kolkata', queries: ['kolkata', 'calcutta', '700001'], lat: 22.5726, lng: 88.3639, state: 'West Bengal', district: 'Kolkata', pin: '700001' },
      { name: 'Salt Lake, Kolkata', query: 'salt lake', queries: ['salt lake', 'bidhannagar', '700064'], lat: 22.5867, lng: 88.4170, state: 'West Bengal', district: 'Kolkata', pin: '700064' },
      { name: 'Patna, Bihar', query: 'patna', queries: ['patna', '800001'], lat: 25.5941, lng: 85.1376, state: 'Bihar', district: 'Patna', pin: '800001' },
      { name: 'New Delhi, Delhi', query: 'delhi', queries: ['delhi', 'new delhi', '110001'], lat: 28.6139, lng: 77.2090, state: 'Delhi', district: 'New Delhi', pin: '110001' },
      { name: 'Connaught Place, New Delhi', query: 'connaught place', queries: ['connaught place', 'cp', 'cp delhi', '110001', 'rajiv chowk'], lat: 28.6315, lng: 77.2167, state: 'Delhi', district: 'New Delhi', pin: '110001' }
    ],

    async search(query) {
      if (!query || !query.trim()) return null;
      const q = query.trim();
      const qLower = q.toLowerCase();

      // 1. Check for 6-digit Indian PIN code in query (e.g. 534204, 835229)
      const pinMatch = q.match(/\b\d{6}\b/);
      if (pinMatch) {
        const pin = pinMatch[0];
        const matchByPin = this.gazetteer.find(item => item.pin === pin || (item.queries && item.queries.includes(pin)));
        if (matchByPin) {
          return {
            lat: matchByPin.lat,
            lng: matchByPin.lng,
            displayName: matchByPin.name,
            fullAddress: `${matchByPin.name}, PIN ${pin}, India`,
            state: matchByPin.state,
            district: matchByPin.district
          };
        }
      }

      // 2. Direct match in local Indian gazetteer (instant, handles China Amiram, Bhimavaram, etc.)
      const directMatch = this.gazetteer.find(item => {
        if (item.name.toLowerCase().includes(qLower) || qLower.includes(item.name.toLowerCase())) return true;
        if (item.query && (qLower.includes(item.query) || item.query.includes(qLower))) return true;
        if (item.queries && item.queries.some(alias => qLower.includes(alias) || alias.includes(qLower))) return true;
        return false;
      });

      if (directMatch) {
        return {
          lat: directMatch.lat,
          lng: directMatch.lng,
          displayName: directMatch.name,
          fullAddress: `${directMatch.name}, India`,
          state: directMatch.state,
          district: directMatch.district
        };
      }

      // 3. Try OpenStreetMap Nominatim Live Search
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=in&limit=5&addressdetails=1`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { 'Accept-Language': 'en' }
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const first = data[0];
            const addr = first.address || {};
            const cleanDisplay = first.display_name.split(',').slice(0, 3).join(',').trim();
            return {
              lat: parseFloat(first.lat),
              lng: parseFloat(first.lon),
              displayName: cleanDisplay,
              fullAddress: first.display_name,
              state: addr.state || null,
              district: addr.state_district || addr.county || addr.district || null,
              city: addr.city || addr.town || addr.village || addr.suburb || null
            };
          }
        }
      } catch (err) {
        console.warn('Geocoding notice:', err.message);
      }

      // 4. Fallback to known district coordinates in INDIA_GEOGRAPHY
      for (const [st, info] of Object.entries(INDIA_GEOGRAPHY)) {
        if (info.districtCoords) {
          for (const [dist, coords] of Object.entries(info.districtCoords)) {
            if (dist.toLowerCase().includes(qLower) || qLower.includes(dist.toLowerCase())) {
              return {
                lat: coords.lat,
                lng: coords.lng,
                displayName: `${dist}, ${st}`,
                fullAddress: `${dist} District, ${st}, India`,
                state: st,
                district: dist
              };
            }
          }
        }
      }

      // 5. General state-level fallback if state name mentioned
      for (const [st, info] of Object.entries(INDIA_GEOGRAPHY)) {
        if (st.toLowerCase().includes(qLower) || qLower.includes(st.toLowerCase())) {
          return {
            lat: info.center.lat,
            lng: info.center.lng,
            displayName: `${info.capital}, ${st}`,
            fullAddress: `${st}, India`,
            state: st,
            district: info.districts ? info.districts[0] : ''
          };
        }
      }

      return null;
    },

    async reverse(lat, lng) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { 'Accept-Language': 'en' }
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          if (data && data.display_name) {
            const addr = data.address || {};
            const localPlace = addr.village || addr.suburb || addr.neighbourhood || addr.town || addr.city || addr.county || '';
            const district = addr.state_district || addr.county || addr.district || '';
            const st = addr.state || '';
            let shortName = [localPlace, district, st].filter(Boolean).join(', ');
            if (!shortName) shortName = data.display_name.split(',').slice(0, 3).join(', ').trim();
            return {
              displayName: shortName,
              fullAddress: data.display_name,
              state: st,
              district: district,
              city: localPlace
            };
          }
        }
      } catch (err) {
        console.warn('Reverse geocode notice:', err.message);
      }

      return null;
    }
  };

  // Leaflet Map Instance Management
  let reportLeafletMap = null;
  let reportLeafletMarker = null;
  let detailLeafletMap = null;

  function cleanupLeafletMaps() {
    if (reportLeafletMap) {
      try { reportLeafletMap.remove(); } catch(e) {}
      reportLeafletMap = null;
      reportLeafletMarker = null;
    }
    if (detailLeafletMap) {
      try { detailLeafletMap.remove(); } catch(e) {}
      detailLeafletMap = null;
    }
  }

  function createCustomPinIcon() {
    return L.divIcon({
      html: `
        <div class="google-maps-pin-wrapper">
          <svg viewBox="0 0 36 50" width="36" height="50">
            <defs>
              <filter id="pin-shadow" x="-30%" y="-20%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
              </filter>
            </defs>
            <path d="M18 0 C8.059 0 0 8.059 0 18 C0 31.5 18 50 18 50 C18 50 36 31.5 36 18 C36 8.059 27.941 0 18 0 Z" fill="#EA4335" stroke="#B31412" stroke-width="1.2" filter="url(#pin-shadow)"/>
            <circle cx="18" cy="18" r="6.5" fill="#FFFFFF"/>
            <circle cx="18" cy="18" r="3" fill="#B31412"/>
          </svg>
        </div>
      `,
      className: 'custom-map-pin-container',
      iconSize: [36, 50],
      iconAnchor: [18, 50],
      popupAnchor: [0, -48]
    });
  }

  // Helper formatting
  function formatNumber(num) {
    if (!num && num !== 0) return '0';
    return new Intl.NumberFormat('en-IN').format(num);
  }

  function getStatusBadge(status) {
    const map = {
      'submitted': { label: 'Submitted', class: 'badge-slate' },
      'ai_categorized': { label: 'AI Categorized', class: 'badge-blue' },
      'under_review': { label: 'Under Review', class: 'badge-amber' },
      'validated': { label: 'Validated', class: 'badge-blue' },
      'university_matched': { label: 'University Matched', class: 'badge-purple' },
      'team_formed': { label: 'Team Formed', class: 'badge-blue' },
      'industry_collab': { label: 'Industry Collab', class: 'badge-saffron' },
      'prototype': { label: 'Prototype Ready', class: 'badge-amber' },
      'testing': { label: 'Field Testing', class: 'badge-emerald' },
      'deployed': { label: 'Deployed in Field', class: 'badge-emerald' },
      'impact_measured': { label: 'Impact Measured', class: 'badge-emerald' }
    };
    return map[status] || { label: status, class: 'badge-slate' };
  }

  function getUrgencyBadge(urgency) {
    const map = {
      'Critical': 'badge-red',
      'High': 'badge-amber',
      'Medium': 'badge-blue',
      'Low': 'badge-slate'
    };
    return map[urgency] || 'badge-slate';
  }

  // Cross-State Intelligent Matching Engine
  function getUniversityMatches(challenge) {
    const isJH = challenge.location.state === 'Jharkhand';
    const isAP = challenge.location.state === 'Andhra Pradesh';
    const isMH = challenge.location.state === 'Maharashtra';

    if (isJH) {
      return [
        {
          name: challenge.category === 'Agriculture' ? 'Birsa Agricultural University (BAU), Ranchi' : 'IIT (ISM) Dhanbad',
          matchScore: 94,
          scope: 'Local Pilot Institution (Jharkhand)',
          department: challenge.category === 'Agriculture' ? 'Plant Pathology & Agronomy' : 'Environmental Science & Engineering',
          reasons: ['Local Field Presence & 24 KVK Centers', 'Fungal Pathology Testing Lab', 'Immediate Ground Access'],
          facultyLead: challenge.category === 'Agriculture' ? 'Dr. Sunita Murmu' : 'Prof. Manish Kumar Tiwary'
        },
        {
          name: 'BIT Mesra, Ranchi',
          matchScore: 88,
          scope: 'State Technical Hub (Jharkhand)',
          department: 'Computer Science & Engineering',
          reasons: ['Edge AI & Mobile Computer Vision Lab', 'NIDHI-TBI Incubation Center'],
          facultyLead: 'Dr. Alok Ranjan'
        },
        {
          name: 'Andhra University / IARI Consortium',
          matchScore: 84,
          scope: 'Cross-State National Center of Excellence',
          department: 'Advanced Agritech & Remote Sensing',
          reasons: ['Cross-State Agricultural Telemetry Lab', 'Satellite Crop Disease Pattern Modeling'],
          facultyLead: 'Prof. K. Rama Rao'
        }
      ];
    } else if (isAP) {
      return [
        {
          name: 'Andhra University College of Engineering (Visakhapatnam)',
          matchScore: 95,
          scope: 'State Lead University (Andhra Pradesh)',
          department: challenge.category === 'Agriculture' ? 'Agricultural & Marine Sciences' : 'Civil & Environmental Engineering',
          reasons: ['Coastal Hydrology & Soil Salinity Lab', 'Extensive Field Survey Teams'],
          facultyLead: 'Prof. K. Rama Rao'
        },
        {
          name: 'IIT Tirupati',
          matchScore: 90,
          scope: 'National Tier Institution (AP)',
          department: 'Sensors, IoT & Water Resources',
          reasons: ['Precision Drip Telemetry Testbed', 'Smart Irrigation Incubator'],
          facultyLead: 'Dr. S. Venkatraman'
        },
        {
          name: 'IIT (ISM) Dhanbad',
          matchScore: 82,
          scope: 'Cross-State Specialized Partner (Jharkhand)',
          department: 'Groundwater Hydrology & Heavy Ion Filtration',
          reasons: ['Cross-state expertise in deep aquifer restoration', 'Proven handpump deployment record'],
          facultyLead: 'Prof. Manish Kumar Tiwary'
        }
      ];
    } else if (isMH) {
      return [
        {
          name: 'COEP Technological University (Pune)',
          matchScore: 94,
          scope: 'State Lead Institution (Maharashtra)',
          department: 'Automation, Instrumentation & Chemical Engg',
          reasons: ['Industrial Effluent Sensor Prototyping Lab', 'Rapid Fabrication Facilities'],
          facultyLead: 'Dr. Milind Bagul'
        },
        {
          name: 'Dr. Panjabrao Deshmukh Krishi Vidyapeeth (Akola / Vidarbha)',
          matchScore: 91,
          scope: 'Regional Agritech Specialist (MH)',
          department: 'Entomology & Cotton Pest Management',
          reasons: ['Dedicated Pink Bollworm Field Trials', 'Farmer Outreach Network across Vidarbha'],
          facultyLead: 'Dr. Vivek Deshmukh'
        },
        {
          name: 'BIT Mesra / BAU Consortium',
          matchScore: 80,
          scope: 'Cross-State AI & Mobile Partner (Jharkhand)',
          department: 'Edge ML & Vernacular Mobile Voice',
          reasons: ['Lightweight offline models runnable on budget Android phones'],
          facultyLead: 'Dr. Alok Ranjan'
        }
      ];
    } else {
      return [
        {
          name: 'Indian Institute of Science (IISc Bengaluru)',
          matchScore: 93,
          scope: 'National Center of Excellence',
          department: 'Interdisciplinary Centre for Water & Energy Research',
          reasons: ['Cutting-Edge Research Patents', 'High Impact Lab Testing'],
          facultyLead: 'Prof. R. Narayanan'
        },
        {
          name: 'State Technical University Hub',
          matchScore: 86,
          scope: 'Regional State Institution',
          department: 'Engineering & Rural Development',
          reasons: ['Local Ground Reach', 'Rapid Student Deployment'],
          facultyLead: 'Dr. Regional Mentor'
        }
      ];
    }
  }

  // AI Categorizer Engine
  function runAIAnalysis(title, description, category, district, stateName) {
    const text = (title + ' ' + description).toLowerCase();
    let detectedDomain = category || 'Agriculture';
    
    if (text.includes('crop') || text.includes('farmer') || text.includes('disease') || text.includes('blight') || text.includes('potato') || text.includes('tomato') || text.includes('cotton') || text.includes('chilli')) {
      detectedDomain = 'Agriculture';
    } else if (text.includes('water') || text.includes('fluoride') || text.includes('handpump') || text.includes('drinking') || text.includes('salinity') || text.includes('aquaculture') || text.includes('pond')) {
      detectedDomain = 'Water Resources';
    } else if (text.includes('health') || text.includes('sickle cell') || text.includes('patient') || text.includes('malaria') || text.includes('hospital')) {
      detectedDomain = 'Healthcare';
    } else if (text.includes('waste') || text.includes('plastic') || text.includes('pyrolysis') || text.includes('effluent') || text.includes('pollution')) {
      detectedDomain = 'Environment';
    } else if (text.includes('solar') || text.includes('microgrid') || text.includes('battery') || text.includes('energy')) {
      detectedDomain = 'Energy';
    }

    const domainTags = {
      'Agriculture': ['Crop Disease', 'Farmer Support', 'Rural Livelihood', 'Precision Agritech'],
      'Water Resources': ['Water Purification', 'Fluoride Remediation', 'Public Health', 'Zero-Electricity'],
      'Healthcare': ['Point-of-Care Diagnostics', 'Tribal Healthcare', 'Screening', 'Biomarkers'],
      'Environment': ['Circular Economy', 'Effluent Sensing', 'Emissions Control', 'Waste Sorting'],
      'Energy': ['Solar Microgrid', 'Predictive Battery Health', 'Off-Grid Telemetry', 'IoT']
    };

    const domainExpertise = {
      'Agriculture': ['Plant Pathology', 'Computer Vision / Edge AI', 'Agronomy', 'Mobile App Dev'],
      'Water Resources': ['Environmental Engineering', 'Chemical Adsorption', 'Handpump Mechanics'],
      'Healthcare': ['Biotechnology', 'Diagnostic Strips', 'Community Health', 'Genetics'],
      'Environment': ['Catalytic Cracking', 'Thermal Reactors', 'Municipal Waste Sorting'],
      'Energy': ['Power Electronics', 'Battery Management Systems (BMS)', 'LoRaWAN Telemetry']
    };

    let urgency = 'High';
    if (text.includes('critical') || text.includes('fatal') || text.includes('emergency') || text.includes('fluoride') || text.includes('cyclone')) urgency = 'Critical';
    else if (text.includes('low')) urgency = 'Low';

    return {
      detectedDomain,
      suggestedTags: domainTags[detectedDomain] || ['Grassroots Need', 'Community Solution'],
      urgency,
      estimatedAffectedPopulation: urgency === 'Critical' ? 16800 : 12500,
      suggestedExpertise: domainExpertise[detectedDomain] || ['Full Stack Dev', 'IoT', 'Hardware'],
      confidenceScore: 95
    };
  }

  // Duplicate Detector Engine
  function checkDuplicates(title, description, category, district, stateName) {
    const text = (title + ' ' + description).toLowerCase();
    for (const c of state.challenges) {
      if (c.location.state !== stateName) continue;

      const cText = (c.title + ' ' + c.description).toLowerCase();
      let matchScore = 0;
      if (c.category === category) matchScore += 30;
      if (district && c.location.district.toLowerCase() === district.toLowerCase()) matchScore += 25;
      
      const words = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      let wordMatches = 0;
      words.forEach(w => {
        if (cText.includes(w)) wordMatches++;
      });
      if (words.length > 0 && wordMatches / words.length > 0.4) {
        matchScore += 35;
      }

      if (matchScore >= 60) {
        return {
          challengeId: c.id,
          title: c.title,
          similarityScore: Math.min(94, matchScore + 15),
          district: c.location.district,
          state: c.location.state,
          category: c.category,
          status: c.status
        };
      }
    }
    return null;
  }

  // Initialize Data
  function initData() {
    const savedState = localStorage.getItem(STORAGE_KEYS.CURRENT_STATE);
    if (savedState && INDIA_GEOGRAPHY[savedState]) {
      state.selectedState = savedState;
    } else {
      state.selectedState = 'Jharkhand';
    }

    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      try { state.currentUser = JSON.parse(savedUser); state.activeRole = state.currentUser.role; } catch (e) {}
    }

    const savedChallenges = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    if (savedChallenges) {
      try { state.challenges = JSON.parse(savedChallenges); } catch (e) {}
    }

    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (savedProjects) {
      try { state.projects = JSON.parse(savedProjects); } catch (e) {}
    }

    const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (savedNotifs) {
      try { state.notifications = JSON.parse(savedNotifs); } catch (e) {}
    }

    const savedUsers = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
    if (savedUsers) {
      try { state.allUsers = JSON.parse(savedUsers); } catch (e) {}
    }

    if (!state.challenges || state.challenges.length === 0) {
      seedDefaultData();
    } else {
      // Enrich existing saved challenges if missing dual language data
      const c124 = state.challenges.find(c => c.id === 'CH-JH-2026-00124');
      if (c124 && !c124.titleOriginal) {
        c124.titleOriginal = 'टमाटर और आलू की फसलों में पत्ती झुलसा और रतुआ रोग की शुरुआती पहचान';
        c124.descriptionOriginal = 'खूंटी जिले के तोरपा और मुरहू प्रखंड के किसानों को हर सर्दी में अगेती और पछेती झुलसा कवक संक्रमण के कारण 30-45% फसल का नुकसान होता है। पत्तियों के शुरुआती घावों की पहचान करने, सटीक जैव-कवकनाशी सुझाने और पड़ोसी किसानों को सतर्क करने के लिए एक ऑफलाइन, स्मार्टफोन-आधारित डायग्नोस्टिक टूल की तत्काल आवश्यकता है।';
        c124.originalLanguage = 'hi';
      }
      const c201 = state.challenges.find(c => c.id === 'CH-AP-2026-00201');
      if (c201 && !c201.titleOriginal) {
        c201.titleOriginal = 'ఉప్పునీటి ఆక్వాకల్చర్‌లో లవణీయత & కరిగిన ఆక్సిజన్ ముందస్తు హెచ్చరిక గ్రిడ్';
        c201.descriptionOriginal = 'నెల్లూరు మరియు బాపట్లలో 4,500 కంటే ఎక్కువ మంది చిన్న తరహా రొయ్యల రైతులు అర్ధరాత్రి కరిగిన ఆక్సిజన్ క్షీణత మరియు ఆకస్మిక వర్షాకాల లవణీయత మార్పుల వల్ల భారీ నష్టాన్ని ఎదుర్కొంటున్నారు. SMS హెచ్చరికలతో కూడిన సౌరశక్తితో పనిచేసే ఆప్టికల్ IoT బోయా అవసరం.';
        c201.originalLanguage = 'te';
      }
      if (!state.challenges.some(c => c.id === 'CH-AP-2026-00202')) {
        state.challenges.splice(6, 0, {
          id: 'CH-AP-2026-00202',
          title: 'Drinking Water Problem and High Fluoride Contamination in Village Clusters',
          titleOriginal: 'మా గ్రామంలో తాగునీటి సమస్య మరియు ఫ్లోరైడ్ కాలుష్యం',
          description: 'Villagers in rural mandals face severe acute drinking water shortages and toxic fluoride mineral levels in borewells. Safe automated filtration hubs and decentralized testing are urgently needed.',
          descriptionOriginal: 'మా గ్రామంలో తాగునీటి సమస్య ఉంది. గ్రామంలోని బోరు బావులలో ఫ్లోరైడ్ మరియు కాలుష్యం ఎక్కువగా ఉండటం వల్ల ప్రజలు తీవ్ర అనారోగ్యానికి గురవుతున్నారు. సురక్షితమైన శుద్ధ తాగునీటి ఫిల్ట్రేషన్ ప్లాంట్ వెంటనే ఏర్పాటు చేయాలి.',
          originalLanguage: 'te',
          category: 'Water Resources',
          location: {
            country: 'India',
            state: 'Andhra Pradesh',
            district: 'Anantapur',
            cityVillage: 'Kadiri Mandal, Kothapalli Village',
            exactAddress: 'Near Community Water Tank & Primary Health Centre',
            latitude: 14.1132,
            longitude: 78.1611,
            mapLocationName: 'Kadiri, Anantapur, Andhra Pradesh'
          },
          evidence: {
            files: [
              {
                id: 'ev-ap-2',
                name: 'borewell_water_turbidity.jpg',
                type: 'image/jpeg',
                category: 'photo',
                sizeFormatted: '2.1 MB',
                previewUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80'
              }
            ],
            description: 'Water testing lab spectrometry report confirming 4.2 ppm fluoride and community well contamination photos.'
          },
          peopleAffected: 9800,
          urgency: 'Critical',
          expectedImpact: 'Supply 40,000 liters of potable WHO-standard drinking water daily across 8 village hamlets.',
          status: 'prototype',
          submittedBy: { name: 'K. Lakshmi Narayana', role: 'citizen' },
          submittedAt: '2026-01-25',
          tags: ['Drinking Water', 'Fluoride Filtration', 'Rural Health'],
          requiredSkills: ['Membrane Separation', 'Community Water Filtration', 'IoT Flow Monitoring'],
          assignedUniversity: 'Sri Venkateswara University College of Engineering (SVUCE)',
          progressPercentage: 65
        });
      }

      // Ensure all challenges have locationSource
      state.challenges.forEach(c => {
        if (c.location && !c.location.locationSource) {
          c.location.locationSource = c.location.gpsAccuracy ? 'GPS' : (c.location.latitude ? 'Manual Pin' : 'GPS');
        }
      });
    }
  }

  // Seed Data
  function seedDefaultData() {
    state.challenges = [
      // --- JHARKHAND PILOT CHALLENGES ---
      {
        id: 'CH-JH-2026-00124',
        title: 'Early Detection of Foliar Blight & Rust in Tomato and Potato Crops',
        titleOriginal: 'टमाटर और आलू की फसलों में पत्ती झुलसा और रतुआ रोग की शुरुआती पहचान',
        description: 'Farmers in Torpa and Murhu blocks of Khunti district suffer 30-45% harvest losses each winter due to sudden outbreaks of early blight and late blight fungal infections. An offline, smartphone-based visual diagnostic tool is urgently needed to identify initial leaf lesions, prescribe precise bio-fungicides, and alert neighboring farmers.',
        descriptionOriginal: 'खूंटी जिले के तोरपा और मुरहू प्रखंड के किसानों को हर सर्दी में अगेती और पछेती झुलसा कवक संक्रमण के कारण 30-45% फसल का नुकसान होता है। पत्तियों के शुरुआती घावों की पहचान करने, सटीक जैव-कवकनाशी सुझाने और पड़ोसी किसानों को सतर्क करने के लिए एक ऑफलाइन, स्मार्टफोन-आधारित डायग्नोस्टिक टूल की तत्काल आवश्यकता है।',
        originalLanguage: 'hi',
        category: 'Agriculture',
        location: {
          country: 'India',
          state: 'Jharkhand',
          district: 'Khunti',
          cityVillage: 'Torpa Block, Village Bamhani',
          cityVillageWard: 'Torpa Block, Village Bamhani',
          address: 'Bamhani Kisan Sabha Center, Near Weekly Haat',
          exactAddress: 'Bamhani Kisan Sabha Center, Near Weekly Haat',
          latitude: 23.0734,
          longitude: 85.2789,
          gpsAccuracy: 12,
          locationSource: 'GPS',
          mapLocationName: 'Torpa Block, Khunti, Jharkhand'
        },
        evidence: {
          files: [
            {
              id: 'ev-1',
              name: 'tomato_early_blight_lesions.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '2.4 MB',
              previewUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252c?w=600&auto=format&fit=crop&q=80'
            },
            {
              id: 'ev-2',
              name: 'khunti_field_damage_survey.pdf',
              type: 'application/pdf',
              category: 'document',
              sizeFormatted: '1.1 MB',
              previewUrl: '#'
            }
          ],
          description: 'Photographs of infected leaves showing target-board concentric necrotic spots and field survey verifying ₹18 Lakhs crop devastation across 18 villages.'
        },
        peopleAffected: 12500,
        urgency: 'High',
        expectedImpact: 'Reduce crop loss by 35%, save ₹18 Lakhs annually for 1,200 smallholder tribal vegetable farmers.',
        status: 'testing',
        submittedBy: { name: 'Rameshwar Mahato', role: 'citizen' },
        submittedAt: '2026-01-14',
        tags: ['Crop Disease', 'Farmer Support', 'Computer Vision'],
        requiredSkills: ['AI/ML', 'Computer Vision', 'Plant Pathology'],
        assignedUniversity: 'Birsa Agricultural University (BAU), Ranchi',
        progressPercentage: 85
      },
      {
        id: 'CH-JH-2026-00042',
        title: 'Acute Fluoride & Iron Contamination in Rural Handpump Drinking Water',
        description: 'Groundwater testing in 24 villages of Chainpur and Satbarwa blocks revealed fluoride concentrations as high as 5.8 mg/L (safe limit: 1.0 mg/L) causing severe dental and skeletal fluorosis among children. Zero-electricity gravity adsorption filter required.',
        category: 'Water Resources',
        location: {
          country: 'India',
          state: 'Jharkhand',
          district: 'Palamu',
          cityVillage: 'Chainpur Block, Satbarwa Habitation',
          exactAddress: 'Handpump #4, Near Satbarwa Primary School',
          latitude: 24.0384,
          longitude: 84.0722,
          mapLocationName: 'Chainpur Block, Palamu, Jharkhand'
        },
        evidence: {
          files: [
            {
              id: 'ev-3',
              name: 'palamu_water_lab_report.pdf',
              type: 'application/pdf',
              category: 'document',
              sizeFormatted: '3.8 MB',
              previewUrl: '#'
            },
            {
              id: 'ev-4',
              name: 'handpump_water_sample.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '1.9 MB',
              previewUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80'
            }
          ],
          description: 'Official PHE lab spectrometer report confirming 5.8 ppm fluoride and photographic proof of brownish dental mottled enamel in school students.'
        },
        peopleAffected: 16800,
        urgency: 'Critical',
        expectedImpact: 'Safe fluoride-free drinking water for 16,800 residents across 24 villages.',
        status: 'deployed',
        submittedBy: { name: 'Mukesh Kumar Chandravanshi', role: 'citizen' },
        submittedAt: '2025-10-02',
        tags: ['Water Safety', 'Fluoride Remediation', 'Public Health'],
        requiredSkills: ['Environmental Engineering', 'Chemical Adsorption'],
        assignedUniversity: 'IIT (ISM) Dhanbad',
        progressPercentage: 100
      },
      {
        id: 'CH-JH-2026-00088',
        title: 'Sickle Cell Anemia Early Screening & Patient Registry in Tribal Blocks',
        description: 'High prevalence of Sickle Cell Trait in Ho and Munda tribal populations in West Singhbhum. Rapid 5-minute paper microfluidic strip test and digital counseling registry needed.',
        category: 'Healthcare',
        location: {
          country: 'India',
          state: 'Jharkhand',
          district: 'West Singhbhum',
          cityVillage: 'Chaibasa, Jhinkpani Block',
          exactAddress: 'Jhinkpani Community Health Sub-Center',
          latitude: 22.5539,
          longitude: 85.8078,
          mapLocationName: 'Jhinkpani, West Singhbhum, Jharkhand'
        },
        evidence: {
          files: [
            {
              id: 'ev-5',
              name: 'tribal_health_screening_memo.pdf',
              type: 'application/pdf',
              category: 'document',
              sizeFormatted: '2.1 MB',
              previewUrl: '#'
            }
          ],
          description: 'Health sub-center register records showing 140km travel burden to Jamshedpur for solubility testing.'
        },
        peopleAffected: 8400,
        urgency: 'Critical',
        expectedImpact: 'Screen 8,000+ tribal students and expectant mothers at ₹25 per test.',
        status: 'prototype',
        submittedBy: { name: 'Salomi Biruli', role: 'citizen' },
        submittedAt: '2025-10-28',
        tags: ['Sickle Cell', 'Tribal Healthcare', 'Point-of-Care'],
        requiredSkills: ['Biomedical Diagnostics', 'Mobile Health'],
        assignedUniversity: 'Kolhan University, Chaibasa',
        progressPercentage: 70
      },
      {
        id: 'CH-JH-2026-00055',
        title: 'Municipal Solid Waste Segregation & Plastic Pyrolysis in Tier-2 Centers',
        description: 'Over 120 tonnes of legacy municipal single-use plastic waste clogs stormwater drains in Dhanbad. Low-cost catalytic pyrolysis reactor needed to convert waste into clean fuel oil.',
        category: 'Environment',
        location: {
          country: 'India',
          state: 'Jharkhand',
          district: 'Dhanbad',
          cityVillage: 'Matkuria Site, Dhanbad',
          exactAddress: 'Matkuria Municipal Dumpsite Sector 2',
          latitude: 23.7957,
          longitude: 86.4304,
          mapLocationName: 'Matkuria, Dhanbad, Jharkhand'
        },
        evidence: {
          files: [
            {
              id: 'ev-6',
              name: 'dumpsite_aerial_drone.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '3.4 MB',
              previewUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80'
            }
          ],
          description: 'Drone survey capturing 12-meter high multi-layer plastic heap adjacent to residential housing colony.'
        },
        peopleAffected: 45000,
        urgency: 'High',
        expectedImpact: 'Process 2 tonnes of non-recyclable single-use plastic per day into industrial fuel oil.',
        status: 'testing',
        submittedBy: { name: 'Sunil Sen Gupta', role: 'citizen' },
        submittedAt: '2025-09-10',
        tags: ['Waste Management', 'Plastic Pyrolysis', 'Circular Economy'],
        requiredSkills: ['Chemical Engineering', 'Thermal Reactors'],
        assignedUniversity: 'IIT (ISM) Dhanbad',
        progressPercentage: 90
      },
      {
        id: 'CH-JH-2026-00073',
        title: 'Off-Grid Solar DC Microgrid Monitoring and Predictive Battery Health',
        description: 'Standalone 2 kW solar mini-grids in 18 isolated forest settlements in Mahuadanr frequently suffer battery failure during monsoon. Long-range LoRaWAN telemetry needed for remote health prediction.',
        category: 'Energy',
        location: {
          country: 'India',
          state: 'Jharkhand',
          district: 'Latehar',
          cityVillage: 'Mahuadanr Forest Range',
          exactAddress: 'Champa Forest Hamlet Battery Bank Enclosure',
          latitude: 23.3986,
          longitude: 84.1137,
          mapLocationName: 'Mahuadanr, Latehar, Jharkhand'
        },
        evidence: {
          files: [
            {
              id: 'ev-7',
              name: 'solar_panel_remote_site.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '2.1 MB',
              previewUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80'
            }
          ],
          description: 'Physical condition of lead-acid battery bank showing sulfation and lack of telemetric monitoring.'
        },
        peopleAffected: 6200,
        urgency: 'High',
        expectedImpact: '99.5% power uptime for 800 tribal households, doubling battery lifespan.',
        status: 'deployed',
        submittedBy: { name: 'Sister Nirmala Beck', role: 'citizen' },
        submittedAt: '2025-07-22',
        tags: ['Solar Energy', 'Off-Grid Microgrid', 'IoT Telemetry'],
        requiredSkills: ['Power Electronics', 'Battery Management Systems', 'LoRaWAN'],
        assignedUniversity: 'NIT Jamshedpur',
        progressPercentage: 100
      },

      // --- ANDHRA PRADESH SCALABILITY CHALLENGES ---
      {
        id: 'CH-AP-2026-00201',
        title: 'Brackish Water Aquaculture Salinity & Dissolved Oxygen Early Warning Grid',
        titleOriginal: 'ఉప్పునీటి ఆక్వాకల్చర్‌లో లవణీయత & కరిగిన ఆక్సిజన్ ముందస్తు హెచ్చరిక గ్రిడ్',
        description: 'Over 4,500 small-scale shrimp and scampi farmers in Nellore and Bapatla face sudden mass mortality due to midnight dissolved oxygen drops and sudden monsoon salinity dilution. A solar floating optical IoT buoy with SMS alerts is required.',
        descriptionOriginal: 'నెల్లూరు మరియు బాపట్లలో 4,500 కంటే ఎక్కువ మంది చిన్న తరహా రొయ్యల రైతులు అర్ధరాత్రి కరిగిన ఆక్సిజన్ క్షీణత మరియు ఆకస్మిక వర్షాకాల లవణీయత మార్పుల వల్ల భారీ నష్టాన్ని ఎదుర్కొంటున్నారు. SMS హెచ్చరికలతో కూడిన సౌరశక్తితో పనిచేసే ఆప్టికల్ IoT బోయా అవసరం.',
        originalLanguage: 'te',
        category: 'Water Resources',
        location: {
          country: 'India',
          state: 'Andhra Pradesh',
          district: 'Nellore',
          cityVillage: 'Gudur & Indukurpet Mandals',
          exactAddress: 'Indukurpet Coastal Shrimp Hatchery Hub',
          latitude: 14.4426,
          longitude: 79.9865,
          mapLocationName: 'Gudur, Nellore, Andhra Pradesh'
        },
        evidence: {
          files: [
            {
              id: 'ev-ap-1',
              name: 'aqua_pond_die_off_sample.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '2.8 MB',
              previewUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80'
            }
          ],
          description: 'Visual record of dead shrimp harvest following rapid salinity fluctuation in Indukurpet coastal pond.'
        },
        peopleAffected: 14200,
        urgency: 'High',
        expectedImpact: 'Avert ₹34 Crores in seasonal crop losses across 1,800 coastal aqua ponds.',
        status: 'testing',
        submittedBy: { name: 'Venkata Subba Rao', role: 'citizen' },
        submittedAt: '2026-01-20',
        tags: ['Coastal Aqua', 'Salinity Sensor', 'IoT Telemetry'],
        requiredSkills: ['Optical DO Sensors', 'Solar Float Mechanics', 'Telemetry'],
        assignedUniversity: 'Andhra University College of Engineering',
        progressPercentage: 80
      },
      {
        id: 'CH-AP-2026-00202',
        title: 'Drinking Water Problem and High Fluoride Contamination in Village Clusters',
        titleOriginal: 'మా గ్రామంలో తాగునీటి సమస్య మరియు ఫ్లోరైడ్ కాలుష్యం',
        description: 'Villagers in rural mandals face severe acute drinking water shortages and toxic fluoride mineral levels in borewells. Safe automated filtration hubs and decentralized testing are urgently needed.',
        descriptionOriginal: 'మా గ్రామంలో తాగునీటి సమస్య ఉంది. గ్రామంలోని బోరు బావులలో ఫ్లోరైడ్ మరియు కాలుష్యం ఎక్కువగా ఉండటం వల్ల ప్రజలు తీవ్ర అనారోగ్యానికి గురవుతున్నారు. సురక్షితమైన శుద్ధ తాగునీటి ఫిల్ట్రేషన్ ప్లాంట్ వెంటనే ఏర్పాటు చేయాలి.',
        originalLanguage: 'te',
        category: 'Water Resources',
        location: {
          country: 'India',
          state: 'Andhra Pradesh',
          district: 'Anantapur',
          cityVillage: 'Kadiri Mandal, Kothapalli Village',
          exactAddress: 'Near Community Water Tank & Primary Health Centre',
          latitude: 14.1132,
          longitude: 78.1611,
          mapLocationName: 'Kadiri, Anantapur, Andhra Pradesh'
        },
        evidence: {
          files: [
            {
              id: 'ev-ap-2',
              name: 'borewell_water_turbidity.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '2.1 MB',
              previewUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80'
            }
          ],
          description: 'Water testing lab spectrometry report confirming 4.2 ppm fluoride and community well contamination photos.'
        },
        peopleAffected: 9800,
        urgency: 'Critical',
        expectedImpact: 'Supply 40,000 liters of potable WHO-standard drinking water daily across 8 village hamlets.',
        status: 'prototype',
        submittedBy: { name: 'K. Lakshmi Narayana', role: 'citizen' },
        submittedAt: '2026-01-25',
        tags: ['Drinking Water', 'Fluoride Filtration', 'Rural Health'],
        requiredSkills: ['Membrane Separation', 'Community Water Filtration', 'IoT Flow Monitoring'],
        assignedUniversity: 'Sri Venkateswara University College of Engineering (SVUCE)',
        progressPercentage: 65
      },

      // --- MAHARASHTRA SCALABILITY CHALLENGES ---
      {
        id: 'CH-MH-2026-00301',
        title: 'Vidarbha Cotton Pink Bollworm Automated Solar Pheromone Camera Trap',
        description: 'Cotton growers across Amravati and Yavatmal suffer catastrophic yields due to cryptic internal pink bollworm feeding. Solar pheromone camera traps with edge ML to count adult moths daily needed.',
        category: 'Agriculture',
        location: {
          country: 'India',
          state: 'Maharashtra',
          district: 'Amravati',
          cityVillage: 'Achalpur & Chandur Bazar',
          exactAddress: 'Achalpur Cotton APMC Market Field Plot #12',
          latitude: 20.9374,
          longitude: 77.7796,
          mapLocationName: 'Achalpur, Amravati, Maharashtra'
        },
        evidence: {
          files: [
            {
              id: 'ev-mh-1',
              name: 'cotton_bollworm_internal_damage.jpg',
              type: 'image/jpeg',
              category: 'photo',
              sizeFormatted: '3.1 MB',
              previewUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80'
            }
          ],
          description: 'Dissected cotton bolls showing internal locule destruction by pink bollworm caterpillars.'
        },
        peopleAffected: 26000,
        urgency: 'High',
        expectedImpact: 'Prevent 40% boll damage, boosting farmer income by ₹14,000 per acre.',
        status: 'testing',
        submittedBy: { name: 'Gajanan Patil', role: 'citizen' },
        submittedAt: '2026-01-22',
        tags: ['Cotton Agritech', 'Pheromone Trap', 'Edge Computer Vision'],
        requiredSkills: ['Entomology', 'TinyML', 'Solar Traps'],
        assignedUniversity: 'COEP Tech Pune & Dr. PDKV Akola',
        progressPercentage: 80
      }
    ];

    state.projects = [
      {
        id: 'proj-1',
        challengeId: 'CH-JH-2026-00124',
        title: 'Kisan Drishti AI - Fungal Blight Diagnostics',
        category: 'Agriculture',
        state: 'Jharkhand',
        district: 'Khunti',
        universityName: 'Birsa Agricultural University (BAU) & BIT Mesra',
        facultyMentor: 'Dr. Sunita Murmu (BAU)',
        studentLead: 'Aarav Sengupta (BIT Mesra)',
        industryPartner: 'AgNext Technologies (₹6.5 Lakhs R&D Grant)',
        progressPercentage: 85,
        status: 'testing',
        tasks: [
          { id: 't1', title: 'Gather 3,000 leaf symptom images in Khunti clusters', status: 'completed', assignee: 'Pooja Soren' },
          { id: 't2', title: 'Train quantized MobileNetV3 edge model (94% accuracy)', status: 'completed', assignee: 'Aarav Sengupta' },
          { id: 't3', title: 'Implement Hindi/Sadri voice diagnostic audio instructions', status: 'in_progress', assignee: 'Aarav Sengupta' },
          { id: 't4', title: 'Field demo workshop with 60 farmers at KVK Khunti', status: 'todo', assignee: 'Pooja Soren' }
        ],
        impact: {
          peopleBenefited: 12500,
          villagesCovered: 18,
          costReducedLakhs: 18.2,
          jobsCreated: 42,
          impactScore: 92
        }
      }
    ];

    state.notifications = [
      { id: 'n1', title: 'Exact Map Location Verified', message: 'Challenge CH-JH-2026-00124 pinned at 23.0734° N, 85.2789° E (Torpa, Khunti).', time: '5m ago', read: false },
      { id: 'n2', title: 'Evidence Media Logged', message: 'Photos and PHE lab report successfully linked to problem dossier.', time: '20m ago', read: false }
    ];

    state.allUsers = [
      { id: 'u1', name: 'Rameshwar Mahato', email: 'rameshwar@farmer.in', role: 'citizen', state: 'Jharkhand' },
      { id: 'u2', name: 'Dr. Anandita Verma, IAS', email: 'anandita.verma@gov.in', role: 'admin', state: 'Jharkhand' },
      { id: 'u3', name: 'Prof. K. K. Srivastava', email: 'dean.rnd@bitmesra.ac.in', role: 'university', state: 'Jharkhand' },
      { id: 'u4', name: 'Aarav Sengupta', email: 'aarav.cs22@bitmesra.ac.in', role: 'student', state: 'Jharkhand' },
      { id: 'u5', name: 'Rajiv Chawla', email: 'rajiv.chawla@tatasteel.com', role: 'industry', state: 'Jharkhand' }
    ];

    saveAll();
  }

  function saveAll() {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(state.challenges));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(state.projects));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(state.notifications));
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(state.allUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_STATE, state.selectedState);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, state.currentLanguage || 'en');
    if (state.currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  // Render Functions
  function render() {
    const root = document.getElementById('root');
    if (!root) return;

    let html = '';
    html += renderJudgeBar();
    html += renderNavbar();
    html += `<div class="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 py-6 gap-6">`;
    if (state.currentUser) {
      html += renderSidebar();
    }
    html += `<main class="flex-1 min-w-0">`;
    html += renderCurrentTab();
    html += `</main></div>`;
    html += renderFooter();
    html += renderModals();
    html += renderAIAssistantDrawer();

    cleanupLeafletMaps();
    root.innerHTML = html;
    attachEventListeners();
  }

  // Top Judge Presentation Sandbox Bar
  function renderJudgeBar() {
    const roles = [
      { role: 'citizen', label: 'Citizen', name: 'Rameshwar Mahato (Farmer)' },
      { role: 'admin', label: 'Admin / Govt', name: 'Dr. Anandita Verma, IAS' },
      { role: 'university', label: 'University', name: 'Prof. Srivastava (BIT Mesra)' },
      { role: 'student', label: 'Student Lead', name: 'Aarav Sengupta' },
      { role: 'industry', label: 'Industry', name: 'Rajiv Chawla (Tata Steel)' }
    ];

    return `
      <div class="bg-slate-900 text-slate-100 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-inner sticky top-0 z-50">
        <div class="flex items-center gap-2">
          <span class="flex items-center gap-1.5 font-bold tracking-wider text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            ${ICONS.shield}
            Interactive Demo Sandbox
          </span>
          <span class="text-slate-400 hidden sm:inline">| Quick Switch Persona:</span>
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          ${roles.map(r => `
            <button data-action="switch-role" data-role="${r.role}" class="px-2.5 py-1 rounded font-medium transition-all flex items-center gap-1 ${state.activeRole === r.role ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}">
              ${ICONS.user}
              <span>${r.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Presentation Demo Buttons -->
        <div class="flex items-center gap-2">
          <button data-action="run-main-sih-demo" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-2.5 py-1 rounded shadow flex items-center gap-1 transition-all" title="Run Primary Pilot Demo (Jharkhand)">
            ${ICONS.play}
            <span>Pilot Workflow Demo</span>
          </button>

          <button data-action="run-pan-india-demo" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-2.5 py-1 rounded shadow flex items-center gap-1.5 transition-all" title="Demonstrate Scalability: Jharkhand → Andhra Pradesh → Maharashtra → Pan-India">
            ${ICONS.globe}
            <span>Pan-India Scalability</span>
          </button>

          <button data-action="reset-data" title="Reset Data" class="text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition flex items-center gap-1">
            ${ICONS.refresh}
            <span class="hidden md:inline">Reset</span>
          </button>
        </div>

        ${state.isDemoRunning && state.demoStepText ? `
          <div class="w-full bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded font-medium text-center animate-pulse flex items-center justify-center gap-2 mt-1">
            ${ICONS.sparkles}
            <span>${state.demoStepText}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Header & Navbar
  function renderNavbar() {
    const unreadCount = state.notifications.filter(n => !n.read).length;
    return `
      <div class="tiranga-top"></div>
      <header class="bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm sticky top-[37px] z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 gap-3">
            <!-- Brand -->
            <div data-action="nav" data-tab="${state.currentUser ? (state.currentUser.role === 'admin' ? 'admin' : state.currentUser.role === 'student' ? 'student' : state.currentUser.role === 'university' ? 'university' : state.currentUser.role === 'industry' ? 'industry' : 'citizen') : 'landing'}" class="flex items-center gap-2.5 cursor-pointer group shrink-0">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white font-black text-xl shadow-md border border-blue-800 group-hover:scale-105 transition-transform">
                <span class="text-orange-400">स</span>
                <span class="text-emerald-400 text-sm -ml-0.5">S</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-xl tracking-tight text-slate-900 font-sans group-hover:text-blue-900 transition-colors">
                    Samadhan <span class="text-blue-700">Setu</span>
                  </span>
                </div>
                <p class="text-[10px] font-medium text-slate-500 -mt-0.5 tracking-wide hidden sm:block">
                  National Societal Problem-Solving Pipeline
                </p>
              </div>
            </div>

            <!-- Global State Selector (Default: Jharkhand) -->
            <div class="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors">
              <span class="text-blue-700">${ICONS.mapPin}</span>
              <div class="text-[10px] text-slate-500 font-semibold uppercase leading-none hidden sm:block">${t('state', 'State')}:</div>
              <select id="global-state-select" class="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1">
                ${ALL_STATES_LIST.map(st => `
                  <option value="${st}" ${state.selectedState === st ? 'selected' : ''}>
                    ${st} ${INDIA_GEOGRAPHY[st].pilot ? '(Pilot)' : ''}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Global Language Selector (12 Indian Languages) -->
            <div class="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors">
              <span class="text-emerald-700">${ICONS.globe}</span>
              <div class="text-[10px] text-slate-500 font-semibold uppercase leading-none hidden sm:block">🌐 ${t('language', 'Language')}:</div>
              <select id="global-language-select" class="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1" title="Select Platform Language">
                ${Object.values(SUPPORTED_LANGUAGES).map(lang => `
                  <option value="${lang.code}" ${state.currentLanguage === lang.code ? 'selected' : ''}>
                    ${lang.nativeName} (${lang.name})
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Global Nav Links -->
            <nav class="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700">
              <button data-action="nav" data-tab="challenges" class="px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${state.activeTab === 'challenges' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-100'}">
                ${ICONS.compass}
                <span>${t('explore_challenges', 'Explore Challenges')}</span>
              </button>
              <button data-action="nav" data-tab="explore_india" class="px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${state.activeTab === 'explore_india' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-100'}">
                ${ICONS.globe}
                <span>${t('explore_india', 'Explore India')}</span>
              </button>
              <button data-action="nav" data-tab="impact" class="px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${state.activeTab === 'impact' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-100'}">
                ${ICONS.trendingUp}
                <span>${t('social_impact', 'Social Impact')}</span>
              </button>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button data-action="toggle-assistant" class="btn btn-outline btn-sm py-1.5 px-2.5 text-xs text-blue-800 border-blue-300 hover:bg-blue-50 shadow-sm hidden md:inline-flex items-center gap-1.5" title="Speak with Samadhan AI Assistant">
                ${ICONS.mic}
                <span class="font-bold">${t('speak_to_ai', 'Speak to AI')}</span>
              </button>

              <button data-action="open-modal" data-modal="report" class="btn btn-saffron btn-sm shadow-sm hidden sm:inline-flex">
                ${ICONS.plus}
                <span>${t('report_problem', 'Report Problem')}</span>
              </button>

              <button data-action="open-modal" data-modal="notifications" class="relative p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-full transition-colors" title="Notifications">
                ${ICONS.bell}
                ${unreadCount > 0 ? `<span class="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">${unreadCount}</span>` : ''}
              </button>

              ${state.currentUser ? `
                <div class="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div class="flex items-center gap-2 text-left">
                    <div class="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-200">
                      ${state.currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="hidden md:block">
                      <div class="text-xs font-bold text-slate-800 leading-tight">${state.currentUser.name}</div>
                      <div class="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">${state.currentUser.role}</div>
                    </div>
                  </div>
                  <button data-action="logout" title="Log Out" class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                    ${ICONS.close}
                  </button>
                </div>
              ` : `
                <div class="flex items-center gap-1.5">
                  <button data-action="open-modal" data-modal="login" class="btn btn-outline btn-sm">Log In</button>
                  <button data-action="open-modal" data-modal="signup" class="btn btn-primary btn-sm">Sign Up</button>
                </div>
              `}
            </div>
          </div>
        </div>
      </header>
    `;
  }

  // Sidebar
  function renderSidebar() {
    const role = state.currentUser ? state.currentUser.role : 'citizen';
    const menuItems = [
      { id: role === 'admin' ? 'admin' : role === 'student' ? 'student' : role === 'university' ? 'university' : role === 'industry' ? 'industry' : 'citizen', label: 'Dashboard', icon: ICONS.shield },
      { id: 'challenges', label: 'Challenges', icon: ICONS.compass },
      { id: 'explore_india', label: 'Explore India', icon: ICONS.globe },
      { id: 'report_trigger', label: 'Report Problem', icon: ICONS.plus, isAction: true },
      { id: 'projects', label: 'Projects', icon: ICONS.building },
      { id: 'impact', label: 'Social Impact', icon: ICONS.trendingUp },
      { id: 'notifications_trigger', label: 'Notifications', icon: ICONS.bell, isAction: true }
    ];

    return `
      <aside class="w-full md:w-56 shrink-0">
        <div class="card p-3 sticky top-24 space-y-1">
          <div class="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Workspace (${role})
          </div>
          ${menuItems.map(item => {
            const isActive = state.activeTab === item.id;
            return `
              <button 
                data-action="${item.isAction ? 'open-modal' : 'nav'}" 
                data-tab="${item.id}"
                data-modal="${item.id === 'report_trigger' ? 'report' : 'notifications'}"
                class="w-full text-left px-3 py-2 rounded-md font-medium text-xs flex items-center gap-2.5 transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}"
              >
                <span class="${isActive ? 'text-blue-700' : 'text-slate-400'}">${item.icon}</span>
                <span>${item.label}</span>
              </button>
            `;
          }).join('')}
          <div class="pt-3 mt-3 border-t border-slate-100">
            <button data-action="logout" class="w-full text-left px-3 py-2 rounded-md font-medium text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
              ${ICONS.close}
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    `;
  }

  // Current Tab Routing
  function renderCurrentTab() {
    switch (state.activeTab) {
      case 'landing': return renderLandingPage();
      case 'citizen': return renderCitizenDashboard();
      case 'admin': return renderAdminDashboard();
      case 'university': return renderUniversityDashboard();
      case 'student': return renderStudentDashboard();
      case 'industry': return renderIndustryDashboard();
      case 'challenges': return renderExploreChallenges();
      case 'explore_india': return renderExploreIndiaPage();
      case 'projects': return renderProjectsWorkspace();
      case 'impact': return renderSocialImpactPage();
      default: return renderLandingPage();
    }
  }

  // 1. LANDING PAGE
  function renderLandingPage() {
    return `
      <div class="space-y-12">
        <!-- Hero Section -->
        <section class="govt-header rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div class="relative z-10 max-w-3xl mx-auto space-y-5">
            <!-- Exact Pilot Requirement Banner -->
            <div class="inline-flex flex-col items-center gap-1 bg-white/10 px-4 py-2 rounded-xl backdrop-blur border border-white/20">
              <span class="text-amber-300 text-xs sm:text-sm font-black tracking-wide flex items-center gap-1.5">
                ${ICONS.shield}
                Currently piloted in Jharkhand
              </span>
              <span class="text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                Built to scale across India
              </span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              From Community Challenges to <span class="text-emerald-400">Real-World Solutions</span>
            </h1>
            <p class="text-slate-200 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              Connect societal problems with universities, innovators and industry to build solutions that create measurable impact across every state and district.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button data-action="open-modal" data-modal="report" class="btn btn-saffron text-sm px-5 py-2.5 shadow-md hover:scale-105 transition-transform">
                ${ICONS.plus}
                <span>Report a Problem</span>
              </button>
              <button data-action="nav" data-tab="challenges" class="btn bg-white/10 text-white hover:bg-white/20 text-sm px-5 py-2.5 backdrop-blur border border-white/20">
                ${ICONS.compass}
                <span>Explore Challenges</span>
              </button>
              <button data-action="nav" data-tab="explore_india" class="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-5 py-2.5 shadow-md">
                ${ICONS.globe}
                <span>Explore India Map →</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Live Platform Key Statistics -->
        <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="card text-center p-4 border-t-4 border-blue-600">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">1,248</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Challenges Submitted</div>
          </div>
          <div class="card text-center p-4 border-t-4 border-indigo-600">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">736</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Challenges Validated</div>
          </div>
          <div class="card text-center p-4 border-t-4 border-purple-600">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">84</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">University Projects</div>
          </div>
          <div class="card text-center p-4 border-t-4 border-orange-500">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">42</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Industry Partners</div>
          </div>
          <div class="card text-center p-4 border-t-4 border-amber-500">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">126</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Solutions in Progress</div>
          </div>
          <div class="card text-center p-4 border-t-4 border-emerald-500">
            <div class="text-2xl sm:text-3xl font-black text-slate-900">38</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Solutions Deployed</div>
          </div>
        </section>

        <!-- 5-Step Visual Innovation Pipeline -->
        <section class="card p-6 space-y-6">
          <div class="text-center max-w-xl mx-auto space-y-1">
            <span class="badge badge-blue">Complete Collaborative Lifecycle</span>
            <h2 class="text-xl font-bold text-slate-900">How Samadhan Setu Operates</h2>
            <p class="text-xs text-slate-500">Not just a complaint portal, but a pipeline converting grassroots problems into deployable technology.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto">1</div>
              <div class="font-bold text-xs text-blue-950">Identify</div>
              <p class="text-[11px] text-blue-800 leading-tight">Citizens submit problems with exact map pin and photographic/video evidence.</p>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mx-auto">2</div>
              <div class="font-bold text-xs text-indigo-950">Match</div>
              <p class="text-[11px] text-indigo-800 leading-tight">AI Matching Engine scores universities by labs, expertise & cross-state relevance.</p>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center mx-auto">3</div>
              <div class="font-bold text-xs text-purple-950">Collaborate</div>
              <p class="text-[11px] text-purple-800 leading-tight">Faculty mentors build multidisciplinary student teams; Industry pledges R&D grants.</p>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center mx-auto">4</div>
              <div class="font-bold text-xs text-amber-950">Build & Test</div>
              <p class="text-[11px] text-amber-800 leading-tight">Sprint Kanban task boards track prototype testing under ground conditions.</p>
            </div>

            <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">5</div>
              <div class="font-bold text-xs text-emerald-950">Impact</div>
              <p class="text-[11px] text-emerald-800 leading-tight">Field deployment with verified metrics: citizens benefited, cost saved, jobs created.</p>
            </div>
          </div>
        </section>

        <!-- Featured Challenges -->
        <section class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl font-bold text-slate-900">Featured Challenges (${state.selectedState})</h2>
                ${INDIA_GEOGRAPHY[state.selectedState].pilot ? `<span class="badge badge-saffron text-[10px]">Pilot State</span>` : `<span class="badge badge-blue text-[10px]">Scale State</span>`}
              </div>
              <p class="text-xs text-slate-500">Verified community problems with exact GPS coordinates and photographic evidence</p>
            </div>
            <div class="flex items-center gap-2">
              <button data-action="nav" data-tab="explore_india" class="btn btn-outline btn-sm">
                ${ICONS.globe}
                <span>View Pan-India Map</span>
              </button>
              <button data-action="nav" data-tab="challenges" class="btn btn-primary btn-sm">
                <span>View All Challenges</span>
                ${ICONS.arrowRight}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${state.challenges.filter(c => c.location.state === state.selectedState).slice(0, 6).map(c => renderChallengeCard(c)).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // 2. PAN-INDIA EXPLORE INDIA DISCOVERY PAGE
  function renderExploreIndiaPage() {
    return `
      <div class="space-y-6">
        <div class="card p-6 govt-header rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="badge badge-saffron text-[10px] mb-2">National Scale Discovery Portal</div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Explore India — State-Wise Challenges & Projects</h1>
            <p class="text-xs text-slate-200 mt-1 max-w-2xl">
              Currently piloted in Jharkhand and architected to scale across India. Click on any State to view its challenges, participating universities, and deployed solutions.
            </p>
          </div>
          <div class="bg-white/10 backdrop-blur px-4 py-2.5 rounded-xl border border-white/20 text-right">
            <div class="text-xs text-slate-300 font-medium">Active State Filter:</div>
            <div class="text-lg font-black text-amber-300">${state.selectedState}</div>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="card p-3 border-l-4 border-blue-600">
            <div class="text-xs text-slate-500 font-semibold">Total Indian States & UTs</div>
            <div class="text-2xl font-extrabold text-slate-900">${ALL_STATES_LIST.length}</div>
            <div class="text-[10px] text-blue-600 font-bold mt-0.5">Piloted: Jharkhand</div>
          </div>
          <div class="card p-3 border-l-4 border-indigo-600">
            <div class="text-xs text-slate-500 font-semibold">Total Challenges Across India</div>
            <div class="text-2xl font-extrabold text-indigo-700">1,248</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Validated: 736</div>
          </div>
          <div class="card p-3 border-l-4 border-purple-600">
            <div class="text-xs text-slate-500 font-semibold">University R&D Projects</div>
            <div class="text-2xl font-extrabold text-purple-700">84</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Cross-state pairings active</div>
          </div>
          <div class="card p-3 border-l-4 border-emerald-600">
            <div class="text-xs text-slate-500 font-semibold">Citizens Benefited</div>
            <div class="text-2xl font-extrabold text-emerald-700">1,45,000+</div>
            <div class="text-[10px] text-emerald-600 font-bold mt-0.5">38 Solutions Deployed</div>
          </div>
        </div>

        <!-- State Directory -->
        <div class="card p-5 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900">State & Union Territory Directory</h2>
              <p class="text-xs text-slate-500">Click any state card to set it as active and view localized challenges</p>
            </div>
            <span class="badge badge-emerald text-xs">Interactive Scalability Matrix</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${ALL_STATES_LIST.map(st => {
              const meta = INDIA_GEOGRAPHY[st];
              const isSelected = state.selectedState === st;
              return `
                <div 
                  data-action="select-state" 
                  data-state="${st}" 
                  class="p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-400 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow'
                  }"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm text-slate-900">${st}</span>
                    ${meta.pilot ? `<span class="badge badge-saffron text-[9px] py-0">Pilot</span>` : `<span class="badge badge-slate text-[9px] py-0">${meta.zone}</span>`}
                  </div>

                  <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div>
                      <span class="text-slate-400">Challenges:</span>
                      <div class="font-extrabold text-slate-800">${meta.challengesCount}</div>
                    </div>
                    <div>
                      <span class="text-slate-400">Projects:</span>
                      <div class="font-extrabold text-blue-700">${meta.projectsCount}</div>
                    </div>
                    <div>
                      <span class="text-slate-400">Universities:</span>
                      <div class="font-semibold text-slate-700">${meta.unisCount}</div>
                    </div>
                    <div>
                      <span class="text-slate-400">Deployed:</span>
                      <div class="font-semibold text-emerald-700">${meta.deployedCount}</div>
                    </div>
                  </div>

                  <div class="text-[10px] text-blue-600 font-bold mt-2 flex items-center justify-between">
                    <span>${meta.districts.length} Districts</span>
                    <span>${isSelected ? '✓ Active State' : 'Select →'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Challenges Under Selected State -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-lg text-slate-900">Challenges in ${state.selectedState}</h3>
              <p class="text-xs text-slate-500">Location hierarchy: Country: <strong>India</strong> → State: <strong>${state.selectedState}</strong></p>
            </div>
            <button data-action="open-modal" data-modal="report" class="btn btn-primary btn-sm">
              ${ICONS.plus}
              <span>Report Challenge in ${state.selectedState}</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${state.challenges.filter(c => c.location.state === state.selectedState).length === 0 ? `
              <div class="col-span-full card p-8 text-center text-slate-500">
                No challenges logged for ${state.selectedState} yet in the pilot demo. Use the "Report Problem" button to submit one!
              </div>
            ` : state.challenges.filter(c => c.location.state === state.selectedState).map(c => renderChallengeCard(c)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 3. CITIZEN DASHBOARD
  function renderCitizenDashboard() {
    const user = state.currentUser || { name: 'Citizen User', email: 'user@citizen.in' };
    const myProblems = state.challenges.filter(c => c.submittedBy.name === user.name || user.id === 'user-citizen-1');
    const underReview = myProblems.filter(c => c.status === 'under_review' || c.status === 'submitted');
    const accepted = myProblems.filter(c => c.status === 'validated' || c.status === 'university_matched');
    const inProgress = myProblems.filter(c => c.status === 'team_formed' || c.status === 'industry_collab' || c.status === 'prototype' || c.status === 'testing');
    const resolved = myProblems.filter(c => c.status === 'deployed' || c.status === 'impact_measured');

    return `
      <div class="space-y-6">
        <div class="card bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="badge badge-saffron text-[10px] mb-2">Citizen Empowerment Portal (${state.selectedState})</div>
            <h1 class="text-2xl font-bold">Welcome, ${user.name}</h1>
            <p class="text-xs text-blue-200 mt-1">Submit community problems with verified GPS coordinates and photo/video evidence.</p>
          </div>
          <button data-action="open-modal" data-modal="report" class="btn btn-saffron shadow-md">
            ${ICONS.plus}
            <span>Report a Societal Challenge</span>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div class="card p-3 text-center">
            <div class="text-2xl font-bold text-slate-800">${myProblems.length}</div>
            <div class="text-[11px] font-semibold text-slate-500">Problems Submitted</div>
          </div>
          <div class="card p-3 text-center border-t-2 border-amber-500">
            <div class="text-2xl font-bold text-amber-700">${underReview.length}</div>
            <div class="text-[11px] font-semibold text-slate-500">Under Review</div>
          </div>
          <div class="card p-3 text-center border-t-2 border-blue-500">
            <div class="text-2xl font-bold text-blue-700">${accepted.length}</div>
            <div class="text-[11px] font-semibold text-slate-500">Accepted</div>
          </div>
          <div class="card p-3 text-center border-t-2 border-purple-500">
            <div class="text-2xl font-bold text-purple-700">${inProgress.length}</div>
            <div class="text-[11px] font-semibold text-slate-500">In Progress</div>
          </div>
          <div class="card p-3 text-center border-t-2 border-emerald-500">
            <div class="text-2xl font-bold text-emerald-700">${resolved.length}</div>
            <div class="text-[11px] font-semibold text-slate-500">Resolved</div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-slate-900">Your Reported Challenges</h2>
            <button data-action="open-modal" data-modal="report" class="btn btn-outline btn-sm">
              ${ICONS.plus}
              <span>New Challenge</span>
            </button>
          </div>

          ${myProblems.length === 0 ? `
            <div class="card p-8 text-center text-slate-500 space-y-3">
              <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                ${ICONS.compass}
              </div>
              <div class="text-sm font-semibold text-slate-700">No Challenges Reported Yet</div>
              <p class="text-xs max-w-sm mx-auto">Have an issue in your village or ward? Pin your exact location and upload photos to initiate university matching.</p>
              <button data-action="open-modal" data-modal="report" class="btn btn-primary btn-sm">
                ${ICONS.plus}
                <span>Report a Problem Now</span>
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${myProblems.map(c => renderChallengeCard(c)).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // 4. ADMIN DASHBOARD
  function renderAdminDashboard() {
    let currentChallenges = state.challenges;
    if (state.adminScope === 'State') {
      currentChallenges = state.challenges.filter(c => c.location.state === state.adminSelectedState);
      if (state.adminSelectedDistrict !== 'All') {
        currentChallenges = currentChallenges.filter(c => c.location.district === state.adminSelectedDistrict);
      }
    }

    const total = currentChallenges.length;
    const validated = currentChallenges.filter(c => c.status !== 'submitted' && c.status !== 'under_review').length;
    const assigned = currentChallenges.filter(c => c.assignedUniversity).length;
    const activeProj = state.projects.filter(p => state.adminScope === 'All India' || p.state === state.adminSelectedState).length;
    const deployed = currentChallenges.filter(c => c.status === 'deployed' || c.status === 'impact_measured').length;
    const meta = INDIA_GEOGRAPHY[state.adminSelectedState] || INDIA_GEOGRAPHY['Jharkhand'];
    const benefited = state.adminScope === 'All India' ? 145000 : meta.benefited;

    const domainCounts = {};
    currentChallenges.forEach(c => {
      domainCounts[c.category] = (domainCounts[c.category] || 0) + 1;
    });

    const districtCounts = {};
    currentChallenges.forEach(c => {
      districtCounts[c.location.district] = (districtCounts[c.location.district] || 0) + 1;
    });

    const districtsAvailable = INDIA_GEOGRAPHY[state.adminSelectedState]?.districts || [];

    return `
      <div class="space-y-6">
        <div class="card p-5 bg-slate-900 text-white space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="badge badge-emerald text-[10px] mb-1">State Administration & Innovation Cell</div>
              <h1 class="text-2xl font-bold">Government & Admin Analytics</h1>
              <p class="text-xs text-slate-300 mt-0.5">Monitoring crowdsourced problem-solving pipelines across states and districts.</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-400">Jurisdiction Scope:</span>
              <div class="bg-slate-800 p-1 rounded-lg border border-slate-700 flex items-center gap-1">
                <button 
                  data-action="set-admin-scope" 
                  data-scope="All India" 
                  class="px-2.5 py-1 rounded text-xs font-bold transition-all ${state.adminScope === 'All India' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}"
                >
                  All India
                </button>
                <button 
                  data-action="set-admin-scope" 
                  data-scope="State" 
                  class="px-2.5 py-1 rounded text-xs font-bold transition-all ${state.adminScope === 'State' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}"
                >
                  State / District
                </button>
              </div>
            </div>
          </div>

          ${state.adminScope === 'State' ? `
            <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-slate-400 font-semibold">Select State:</span>
                <select id="admin-state-select" class="bg-slate-800 text-white border border-slate-700 rounded px-2.5 py-1 font-bold outline-none cursor-pointer">
                  ${ALL_STATES_LIST.map(st => `
                    <option value="${st}" ${state.adminSelectedState === st ? 'selected' : ''}>${st} ${INDIA_GEOGRAPHY[st].pilot ? '(Pilot)' : ''}</option>
                  `).join('')}
                </select>
              </div>

              <div class="flex items-center gap-2">
                <span class="text-slate-400 font-semibold">Select District:</span>
                <select id="admin-district-select" class="bg-slate-800 text-white border border-slate-700 rounded px-2.5 py-1 font-medium outline-none cursor-pointer">
                  <option value="All" ${state.adminSelectedDistrict === 'All' ? 'selected' : ''}>All Districts in ${state.adminSelectedState}</option>
                  ${districtsAvailable.map(d => `
                    <option value="${d}" ${state.adminSelectedDistrict === d ? 'selected' : ''}>${d}</option>
                  `).join('')}
                </select>
              </div>
            </div>
          ` : `
            <div class="pt-2 border-t border-slate-800 text-xs text-slate-400">
              Aggregated nationwide metrics covering 28 States and 8 Union Territories.
            </div>
          `}
        </div>

        <!-- 8 KPIs -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="card p-3 border-l-4 border-blue-600">
            <div class="text-xs text-slate-500 font-semibold">Total Challenges</div>
            <div class="text-2xl font-extrabold text-slate-900">${total}</div>
          </div>
          <div class="card p-3 border-l-4 border-indigo-600">
            <div class="text-xs text-slate-500 font-semibold">Validated Challenges</div>
            <div class="text-2xl font-extrabold text-indigo-700">${validated}</div>
          </div>
          <div class="card p-3 border-l-4 border-purple-600">
            <div class="text-xs text-slate-500 font-semibold">Assigned to Universities</div>
            <div class="text-2xl font-extrabold text-purple-700">${assigned}</div>
          </div>
          <div class="card p-3 border-l-4 border-amber-600">
            <div class="text-xs text-slate-500 font-semibold">Active R&D Projects</div>
            <div class="text-2xl font-extrabold text-amber-700">${activeProj}</div>
          </div>
          <div class="card p-3 border-l-4 border-cyan-600">
            <div class="text-xs text-slate-500 font-semibold">Participating Universities</div>
            <div class="text-2xl font-extrabold text-cyan-700">${state.adminScope === 'All India' ? '28' : meta.unisCount}</div>
          </div>
          <div class="card p-3 border-l-4 border-orange-600">
            <div class="text-xs text-slate-500 font-semibold">Industry Partners</div>
            <div class="text-2xl font-extrabold text-orange-700">${state.adminScope === 'All India' ? '42' : meta.industryCount}</div>
          </div>
          <div class="card p-3 border-l-4 border-emerald-600">
            <div class="text-xs text-slate-500 font-semibold">Solutions Deployed</div>
            <div class="text-2xl font-extrabold text-emerald-700">${deployed}</div>
          </div>
          <div class="card p-3 border-l-4 border-teal-600">
            <div class="text-xs text-slate-500 font-semibold">Citizens Benefited</div>
            <div class="text-2xl font-extrabold text-teal-700">${formatNumber(benefited)}</div>
          </div>
        </div>

        <!-- Validation Queue -->
        <div class="card p-5 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-slate-900">Challenge Dossiers & Validation Queue</h3>
              <p class="text-xs text-slate-500">Includes GPS location verification and documentary evidence inspection</p>
            </div>
            <span class="badge badge-amber">${currentChallenges.filter(c => c.status === 'submitted' || c.status === 'ai_categorized' || c.status === 'under_review').length} Pending</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <tr>
                  <th class="p-2.5">ID</th>
                  <th class="p-2.5">Challenge Title</th>
                  <th class="p-2.5">Location & Coordinates</th>
                  <th class="p-2.5">Evidence Files</th>
                  <th class="p-2.5">Urgency</th>
                  <th class="p-2.5">Status</th>
                  <th class="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${currentChallenges.map(c => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5 font-mono text-[11px] font-bold text-blue-700">${c.id}</td>
                    <td class="p-2.5 font-semibold text-slate-800 max-w-xs truncate">${c.title}</td>
                    <td class="p-2.5">
                      <div class="font-medium text-slate-800">${c.location.state} (${c.location.district})</div>
                      <div class="text-[10px] text-slate-500 font-mono">${c.location.latitude?.toFixed(4)}°N, ${c.location.longitude?.toFixed(4)}°E</div>
                      <div class="flex items-center gap-1 mt-0.5">
                        <span class="badge ${c.location.locationSource === 'GPS' ? 'bg-emerald-100 text-emerald-800' : (c.location.locationSource === 'Search' ? 'bg-purple-100 text-purple-800' : 'bg-blue-50 text-blue-700')} text-[9px]">
                          ${c.location.locationSource || 'Manual Pin'}
                        </span>
                        ${(c.location.gpsAccuracy || c.location.accuracy) ? `<span class="text-[9px] text-emerald-700 font-medium">±${Math.round(c.location.gpsAccuracy || c.location.accuracy)}m</span>` : ''}
                      </div>
                    </td>
                    <td class="p-2.5">
                      <span class="badge badge-slate text-[10px]">${c.evidence?.files?.length || c.evidenceFiles?.length || 1} Files</span>
                    </td>
                    <td class="p-2.5"><span class="badge ${getUrgencyBadge(c.urgency)}">${c.urgency}</span></td>
                    <td class="p-2.5"><span class="badge ${getStatusBadge(c.status).class}">${getStatusBadge(c.status).label}</span></td>
                    <td class="p-2.5 text-right space-x-1">
                      ${c.status === 'submitted' || c.status === 'ai_categorized' || c.status === 'under_review' ? `
                        <button data-action="validate-challenge" data-id="${c.id}" class="btn btn-emerald btn-sm py-1 px-2 text-[11px]">Validate & Match</button>
                      ` : `
                        <span class="text-slate-400 font-semibold">Matched</span>
                      `}
                      <button data-action="open-modal" data-modal="challenge_detail" data-id="${c.id}" class="btn btn-outline btn-sm py-1 px-2 text-[11px]">View Dossier</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // 5. UNIVERSITY DASHBOARD
  function renderUniversityDashboard() {
    const incoming = state.challenges.filter(c => (c.status === 'validated' || c.status === 'university_matched') && c.location.state === state.selectedState);
    const myProjects = state.projects.filter(p => p.state === state.selectedState);

    return `
      <div class="space-y-6">
        <div class="card p-6 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="badge badge-purple text-[10px] mb-1">Academic & Research R&D Cell (${state.selectedState})</div>
            <h1 class="text-2xl font-bold">University Innovation Hub</h1>
            <p class="text-xs text-slate-200 mt-1">Review pinned field coordinates and documentary evidence to deploy student & faculty teams.</p>
          </div>
        </div>

        <div class="card p-5 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900">Incoming Challenges with Ground Evidence (${state.selectedState})</h2>
              <p class="text-xs text-slate-500">Every challenge contains citizen-verified location coordinates and attached evidence</p>
            </div>
          </div>

          <div class="space-y-3">
            ${incoming.map(c => {
              const matches = getUniversityMatches(c);
              const topMatch = matches[0];
              return `
                <div class="card p-4 border border-slate-200 hover:border-blue-300 space-y-3">
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span class="font-mono text-xs font-bold text-blue-700 mr-2">${c.id}</span>
                      <span class="badge ${getUrgencyBadge(c.urgency)} mr-1">${c.urgency}</span>
                      <span class="badge badge-slate">${c.category}</span>
                      <h3 class="font-bold text-sm text-slate-900 mt-1">${c.title}</h3>
                    </div>
                    <div class="text-right">
                      <div class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        ${topMatch.matchScore}% Match Score
                      </div>
                      <div class="text-[10px] text-slate-400 mt-0.5">${topMatch.department}</div>
                    </div>
                  </div>

                  <p class="text-xs text-slate-600 line-clamp-2">${c.description}</p>

                  <!-- Location & Evidence Preview Chips -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded text-xs">
                    <div class="flex items-center gap-1.5 text-slate-700">
                      <span class="text-blue-700">${ICONS.mapPin}</span>
                      <span><strong>Coordinates:</strong> ${c.location.latitude?.toFixed(4)}° N, ${c.location.longitude?.toFixed(4)}° E (${c.location.district})</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-slate-700">
                      <span class="text-orange-600">${ICONS.paperclip}</span>
                      <span><strong>Evidence:</strong> ${c.evidence?.files?.length || 2} files attached (Photos & Documents)</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button data-action="open-modal" data-modal="challenge_detail" data-id="${c.id}" class="btn btn-outline btn-sm">
                      Inspect Ground Evidence
                    </button>
                    <button data-action="open-modal" data-modal="team_create" data-id="${c.id}" class="btn btn-primary btn-sm">
                      ${ICONS.users}
                      <span>Accept & Form Team</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 6. STUDENT DASHBOARD
  function renderStudentDashboard() {
    const activeProject = state.projects.find(p => p.state === state.selectedState) || state.projects[0];

    return `
      <div class="space-y-6">
        <div class="card p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="badge badge-emerald text-[10px] mb-1">Student Innovation Team Workspace (${activeProject ? activeProject.state : state.selectedState})</div>
            <h1 class="text-2xl font-bold">My R&D Project: ${activeProject ? activeProject.title : 'Kisan Drishti AI'}</h1>
            <p class="text-xs text-blue-200 mt-1">Challenge: ${activeProject ? activeProject.challengeId : 'CH-JH-2026-00124'} | Role: Student Lead</p>
          </div>
          <button data-action="open-modal" data-modal="prototype_submit" class="btn btn-emerald shadow">
            ${ICONS.upload}
            <span>Upload Prototype Demo</span>
          </button>
        </div>

        <div class="card p-5 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900">Sprint Kanban Task Board</h2>
              <p class="text-xs text-slate-500">Tasks linked to citizen-reported field challenges</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div class="kanban-col">
              <div class="flex items-center justify-between font-bold text-xs text-slate-700 pb-1 border-b border-slate-200">
                <span>To Do</span>
                <span class="badge badge-slate">${(activeProject?.tasks || []).filter(t => t.status === 'todo').length}</span>
              </div>
              ${(activeProject?.tasks || []).filter(t => t.status === 'todo').map(t => renderKanbanCard(t)).join('')}
            </div>

            <div class="kanban-col">
              <div class="flex items-center justify-between font-bold text-xs text-blue-700 pb-1 border-b border-blue-200">
                <span>In Progress</span>
                <span class="badge badge-blue">${(activeProject?.tasks || []).filter(t => t.status === 'in_progress').length}</span>
              </div>
              ${(activeProject?.tasks || []).filter(t => t.status === 'in_progress').map(t => renderKanbanCard(t)).join('')}
            </div>

            <div class="kanban-col">
              <div class="flex items-center justify-between font-bold text-xs text-amber-700 pb-1 border-b border-amber-200">
                <span>Faculty Review</span>
                <span class="badge badge-amber">${(activeProject?.tasks || []).filter(t => t.status === 'review').length}</span>
              </div>
              ${(activeProject?.tasks || []).filter(t => t.status === 'review').map(t => renderKanbanCard(t)).join('')}
            </div>

            <div class="kanban-col">
              <div class="flex items-center justify-between font-bold text-xs text-emerald-700 pb-1 border-b border-emerald-200">
                <span>Completed</span>
                <span class="badge badge-emerald">${(activeProject?.tasks || []).filter(t => t.status === 'completed').length}</span>
              </div>
              ${(activeProject?.tasks || []).filter(t => t.status === 'completed').map(t => renderKanbanCard(t)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderKanbanCard(task) {
    const nextStatus = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'completed' : 'todo';
    return `
      <div class="kanban-card space-y-2">
        <div class="text-xs font-semibold text-slate-800 leading-snug">${task.title}</div>
        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Assignee: <strong>${task.assignee}</strong></span>
          <button data-action="move-task" data-task-id="${task.id}" data-next="${nextStatus}" class="text-blue-600 hover:text-blue-800 font-bold">
            Move →
          </button>
        </div>
      </div>
    `;
  }

  // 7. INDUSTRY DASHBOARD
  function renderIndustryDashboard() {
    return `
      <div class="space-y-6">
        <div class="card p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="badge badge-saffron text-[10px] mb-1">Corporate Social Responsibility & Startup Incubator</div>
            <h1 class="text-2xl font-bold">Industry & Startup Collaboration Hub (${state.selectedState})</h1>
            <p class="text-xs text-slate-300 mt-1">Back verified citizen problems with technical mentorship, equipment, and CSR grants.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="card p-5 space-y-3">
            <span class="badge badge-emerald">Active Tri-Party Partnership (Jharkhand)</span>
            <h3 class="font-bold text-base text-slate-900">Kisan Drishti AI Project (Khunti District)</h3>
            <p class="text-xs text-slate-600">Location: Torpa Block, Khunti (23.0734° N, 85.2789° E) | Ground Photos Vetted</p>
            <div class="bg-slate-50 p-3 rounded text-xs space-y-1">
              <div><strong>Committed CSR Grant:</strong> ₹6.5 Lakhs (AgNext Technologies)</div>
              <div><strong>Status:</strong> 85% Completed - Pilot in 18 Villages</div>
            </div>
          </div>

          <div class="card p-5 space-y-3">
            <span class="badge badge-blue">Cross-State Scale Partnership (Andhra Pradesh)</span>
            <h3 class="font-bold text-base text-slate-900">AquaSensor Telemetry (Nellore District)</h3>
            <p class="text-xs text-slate-600">Location: Gudur Coastal Belt (14.4426° N, 79.9865° E) | Salinity Sensor Grid</p>
            <div class="bg-slate-50 p-3 rounded text-xs space-y-1">
              <div><strong>Committed Grant:</strong> ₹12.0 Lakhs (Marine Biotech Alliance)</div>
              <div><strong>Status:</strong> 80% Field Tested</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 8. EXPLORE CHALLENGES MARKETPLACE
  function renderExploreChallenges() {
    let filtered = state.challenges.filter(c => {
      if (state.selectedState !== 'All' && c.location.state !== state.selectedState) return false;
      if (state.selectedCategoryFilter !== 'All' && c.category !== state.selectedCategoryFilter) return false;
      if (state.selectedDistrictFilter !== 'All' && c.location.district !== state.selectedDistrictFilter) return false;
      if (state.selectedUrgencyFilter !== 'All' && c.urgency !== state.selectedUrgencyFilter) return false;
      if (state.selectedStatusFilter !== 'All' && c.status !== state.selectedStatusFilter) return false;
      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
      }
      return true;
    });

    const categories = ['All', 'Agriculture', 'Water Resources', 'Healthcare', 'Environment', 'Energy', 'Accessibility', 'Public Administration', 'Urban Development', 'Rural Livelihoods'];
    const currentDistricts = ['All', ...(INDIA_GEOGRAPHY[state.selectedState]?.districts || [])];

    return `
      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Explore Societal Challenges</h1>
            <p class="text-xs text-slate-500">Currently showing challenges in: <strong>${state.selectedState}</strong> (${filtered.length} found)</p>
          </div>
          <button data-action="nav" data-tab="explore_india" class="btn btn-outline btn-sm">
            ${ICONS.globe}
            <span>Switch State / View India Map</span>
          </button>
        </div>

        <div class="card p-4 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-slate-400">${ICONS.search}</span>
            <input 
              type="text" 
              id="search-input"
              placeholder="Search by keywords, crop blight, fluoride, GPS coordinates, challenge ID..." 
              value="${state.searchQuery}"
              class="w-full text-xs outline-none bg-transparent"
            />
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div>
              <label class="form-label text-[10px]">Category</label>
              <select id="filter-category" class="form-select text-xs py-1">
                ${categories.map(cat => `<option value="${cat}" ${state.selectedCategoryFilter === cat ? 'selected' : ''}>${cat}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="form-label text-[10px]">District in ${state.selectedState}</label>
              <select id="filter-district" class="form-select text-xs py-1">
                ${currentDistricts.map(d => `<option value="${d}" ${state.selectedDistrictFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="form-label text-[10px]">Urgency</label>
              <select id="filter-urgency" class="form-select text-xs py-1">
                <option value="All" ${state.selectedUrgencyFilter === 'All' ? 'selected' : ''}>All Urgencies</option>
                <option value="Critical" ${state.selectedUrgencyFilter === 'Critical' ? 'selected' : ''}>Critical</option>
                <option value="High" ${state.selectedUrgencyFilter === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${state.selectedUrgencyFilter === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Low" ${state.selectedUrgencyFilter === 'Low' ? 'selected' : ''}>Low</option>
              </select>
            </div>
            <div>
              <label class="form-label text-[10px]">Lifecycle Status</label>
              <select id="filter-status" class="form-select text-xs py-1">
                <option value="All" ${state.selectedStatusFilter === 'All' ? 'selected' : ''}>All Statuses</option>
                <option value="submitted" ${state.selectedStatusFilter === 'submitted' ? 'selected' : ''}>Submitted</option>
                <option value="validated" ${state.selectedStatusFilter === 'validated' ? 'selected' : ''}>Validated</option>
                <option value="university_matched" ${state.selectedStatusFilter === 'university_matched' ? 'selected' : ''}>University Matched</option>
                <option value="team_formed" ${state.selectedStatusFilter === 'team_formed' ? 'selected' : ''}>Team Formed</option>
                <option value="testing" ${state.selectedStatusFilter === 'testing' ? 'selected' : ''}>Field Testing</option>
                <option value="deployed" ${state.selectedStatusFilter === 'deployed' ? 'selected' : ''}>Deployed</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${filtered.length === 0 ? `
            <div class="col-span-full card p-8 text-center text-slate-500">
              No challenges match your active filters for ${state.selectedState}. Try resetting filters or choosing another state.
            </div>
          ` : filtered.map(c => renderChallengeCard(c)).join('')}
        </div>
      </div>
    `;
  }

  function renderChallengeCard(c) {
    const status = getStatusBadge(c.status);
    const urgency = getUrgencyBadge(c.urgency);
    const fileCount = c.evidence?.files?.length || c.evidenceFiles?.length || 1;

    const hasOriginal = Boolean(c.titleOriginal && c.titleOriginal !== c.title);
    const isShowingOriginal = Boolean(c._showOriginal);
    const displayTitle = isShowingOriginal ? (c.titleOriginal || c.title) : c.title;
    const displayDesc = isShowingOriginal ? (c.descriptionOriginal || c.description) : c.description;
    const activeLang = isShowingOriginal ? (c.originalLanguage || 'en') : 'en';

    return `
      <div class="card p-4 space-y-3 flex flex-col justify-between hover:border-blue-300">
        <div class="space-y-2">
          <div class="flex items-center justify-between gap-1 text-[11px]">
            <span class="font-mono font-bold text-blue-700">${c.id}</span>
            <div class="flex items-center gap-1">
              <span class="badge ${urgency}">${c.urgency}</span>
              <span class="badge ${status.class}">${status.label}</span>
            </div>
          </div>

          <div class="flex items-start justify-between gap-2">
            <h3 class="font-bold text-sm text-slate-900 leading-snug line-clamp-2 flex-1">${displayTitle}</h3>
            ${SamadhanTTSEngine.renderControls('tts-card-' + c.id, displayDesc, activeLang)}
          </div>

          <p class="text-xs text-slate-500 line-clamp-2">${displayDesc}</p>

          ${hasOriginal ? `
            <div class="flex items-center justify-between text-[10px] pt-1.5 text-slate-500 border-t border-slate-100">
              <span class="flex items-center gap-1 font-medium text-slate-600">
                <span>🗣️</span>
                <span>Original: <strong>${SUPPORTED_LANGUAGES[c.originalLanguage]?.nativeName || c.originalLanguage}</strong></span>
              </span>
              <button type="button" data-action="toggle-card-lang" data-id="${c.id}" class="text-blue-700 hover:underline font-bold flex items-center gap-1">
                ${ICONS.globe}
                <span>${isShowingOriginal ? 'View English' : 'View Original'}</span>
              </button>
            </div>
          ` : ''}
        </div>

        <div class="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <!-- Pinned Coordinates Badge -->
          <div class="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded">
            <span class="flex items-center gap-1 text-blue-700 font-semibold">
              ${ICONS.mapPin}
              ${c.location.district}
            </span>
            <span class="font-mono text-slate-500 text-[10px]">
              ${c.location.latitude ? `${c.location.latitude.toFixed(2)}°N, ${c.location.longitude.toFixed(2)}°E` : 'GPS Verified'}
            </span>
          </div>

          <!-- Evidence Preview Indicator -->
          <div class="flex items-center justify-between text-slate-500 text-[11px]">
            <span class="flex items-center gap-1 text-slate-600">
              ${ICONS.paperclip}
              <strong>${fileCount}</strong> Evidence File${fileCount > 1 ? 's' : ''}
            </span>
            <span class="flex items-center gap-1 text-slate-600">
              ${ICONS.users}
              ${formatNumber(c.peopleAffected)}
            </span>
          </div>

          <button data-action="open-modal" data-modal="challenge_detail" data-id="${c.id}" class="btn btn-outline btn-sm w-full mt-2">
            <span>View Full Details & Evidence</span>
            ${ICONS.arrowRight}
          </button>
        </div>
      </div>
    `;
  }

  // 9. SOCIAL IMPACT TRACKING
  function renderSocialImpactPage() {
    return `
      <div class="space-y-6">
        <div class="card p-6 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="badge badge-emerald text-[10px] mb-1">Measurable Ground Outcomes</div>
            <h1 class="text-2xl font-bold">Social Impact Tracking Registry</h1>
            <p class="text-xs text-emerald-100 mt-1">Verified outcomes from solutions deployed in Jharkhand (Pilot) and scaled states.</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="card p-4 text-center border-t-4 border-emerald-600">
            <div class="text-3xl font-black text-slate-900">84,800+</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Citizens Benefited</div>
          </div>
          <div class="card p-4 text-center border-t-4 border-teal-600">
            <div class="text-3xl font-black text-slate-900">76</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Villages Covered</div>
          </div>
          <div class="card p-4 text-center border-t-4 border-blue-600">
            <div class="text-3xl font-black text-slate-900">7.6M L</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Safe Water Saved/Yr</div>
          </div>
          <div class="card p-4 text-center border-t-4 border-amber-600">
            <div class="text-3xl font-black text-slate-900">₹94.7 L</div>
            <div class="text-xs font-semibold text-slate-500 mt-1">Cost Saved Annually</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card p-5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="badge badge-emerald">Jharkhand Pilot Deployed</span>
              <span class="font-bold text-xs text-emerald-700">Impact Score: 92/100</span>
            </div>
            <h3 class="font-bold text-base text-slate-900">Kisan Drishti - Crop Disease Diagnostics (Khunti, JH)</h3>
            <p class="text-xs text-slate-600">Offline edge vision mobile app deployed with Birsa Agricultural University and AgNext Technologies in Torpa block.</p>
            <div class="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded text-center text-xs">
              <div>
                <div class="font-bold text-slate-800">12,500</div>
                <div class="text-[10px] text-slate-500">Farmers Benefited</div>
              </div>
              <div>
                <div class="font-bold text-slate-800">18</div>
                <div class="text-[10px] text-slate-500">Villages Covered</div>
              </div>
              <div>
                <div class="font-bold text-slate-800">₹18.2 L</div>
                <div class="text-[10px] text-slate-500">Saved in Crop Loss</div>
              </div>
            </div>
            <div class="text-[11px] text-slate-500">Verified by: District Agriculture Officer, Khunti & BAU Dean</div>
          </div>

          <div class="card p-5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="badge badge-emerald">Jharkhand Pilot Deployed</span>
              <span class="font-bold text-xs text-emerald-700">Impact Score: 95/100</span>
            </div>
            <h3 class="font-bold text-base text-slate-900">Jal Shuddhi - Fluoride Filter Units (Palamu, JH)</h3>
            <p class="text-xs text-slate-600">Zero-electricity gravity cylinder filter mounted on handpumps developed by IIT (ISM) Dhanbad and JUSCO.</p>
            <div class="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded text-center text-xs">
              <div>
                <div class="font-bold text-slate-800">16,800</div>
                <div class="text-[10px] text-slate-500">Citizens Benefited</div>
              </div>
              <div>
                <div class="font-bold text-slate-800">24</div>
                <div class="text-[10px] text-slate-500">Villages Covered</div>
              </div>
              <div>
                <div class="font-bold text-slate-800">4.8M L</div>
                <div class="text-[10px] text-slate-500">Clean Water/Yr</div>
              </div>
            </div>
            <div class="text-[11px] text-slate-500">Verified by: Drinking Water & Sanitation Dept, Govt of Jharkhand</div>
          </div>
        </div>
      </div>
    `;
  }

  // 10. PROJECTS WORKSPACE
  function renderProjectsWorkspace() {
    return `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Collaborative Projects (${state.selectedState})</h1>
          <p class="text-xs text-slate-500">Active development projects linking Universities, Students, and Industry</p>
        </div>

        <div class="space-y-4">
          ${state.projects.map(p => `
            <div class="card p-5 space-y-3">
              <div class="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span class="badge badge-blue mb-1">${p.category}</span>
                  <h3 class="font-bold text-base text-slate-900">${p.title}</h3>
                  <div class="text-xs text-slate-500 mt-0.5">Location: <strong>${p.state} (${p.district})</strong> | ID: <strong>${p.challengeId}</strong></div>
                </div>
                <div class="text-right">
                  <span class="badge ${getStatusBadge(p.status).class}">${getStatusBadge(p.status).label}</span>
                  <div class="text-sm font-bold text-blue-700 mt-1">${p.progressPercentage}% Completed</div>
                </div>
              </div>

              <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div class="bg-blue-600 h-2 rounded-full" style="width: ${p.progressPercentage}%"></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded text-xs text-slate-700">
                <div><strong>University:</strong> ${p.universityName}</div>
                <div><strong>Faculty Mentor:</strong> ${p.facultyMentor}</div>
                <div><strong>Industry Partner:</strong> ${p.industryPartner}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Footer
  function renderFooter() {
    return `
      <footer class="bg-slate-900 text-slate-400 text-xs py-8 mt-12 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-200 text-sm">Samadhan Setu</span>
              <span>— National Societal Innovation Platform (Piloted in Jharkhand, Scalable Across India)</span>
            </div>
            <div class="flex gap-4">
              <a href="#" class="hover:text-white">Explore India Map</a>
              <a href="#" class="hover:text-white">Privacy Policy</a>
              <a href="#" class="hover:text-white">State Innovation Portals</a>
            </div>
          </div>
          <div class="text-[11px] text-slate-500">
            A collaborative crowdsourcing and problem-solving bridge designed for universities, citizens, and industry partners to drive measurable grassroots transformation across India.
          </div>
        </div>
      </footer>
    `;
  }

  // Modals Controller
  function renderModals() {
    if (!state.modal) return '';
    switch (state.modal) {
      case 'login': return renderLoginModal();
      case 'signup': return renderSignupModal();
      case 'report': return renderReportModal();
      case 'ai_analysis': return renderAIAnalysisModal();
      case 'duplicate_warning': return renderDuplicateWarningModal();
      case 'team_create': return renderTeamCreateModal();
      case 'prototype_submit': return renderPrototypeSubmitModal();
      case 'notifications': return renderNotificationsModal();
      case 'how_it_works': return renderHowItWorksModal();
      case 'challenge_detail': return renderChallengeDetailModal();
      default: return '';
    }
  }

  function renderLoginModal() {
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-sm">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-base text-slate-900">Log In to Samadhan Setu</h2>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
          </div>

          <form id="login-form" class="space-y-3">
            <div>
              <label class="form-label">Email Address</label>
              <input type="email" id="login-email" required class="form-input" placeholder="e.g. rameshwar@farmer.in" />
            </div>
            <div>
              <label class="form-label">Password</label>
              <input type="password" id="login-password" required class="form-input" placeholder="••••••••" value="password123" />
            </div>
            <div>
              <label class="form-label">Select Role</label>
              <select id="login-role" class="form-select">
                <option value="citizen">Citizen</option>
                <option value="admin">Government / Administrator</option>
                <option value="university">University Faculty / Dean</option>
                <option value="student">Student</option>
                <option value="industry">Industry / Startup Partner</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-full mt-2">Log In</button>
          </form>

          <div class="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an account? 
            <button data-action="open-modal" data-modal="signup" class="text-blue-700 font-bold hover:underline">Sign Up</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSignupModal() {
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-md">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-bold text-base text-slate-900">Create New Account</h2>
              <p class="text-xs text-slate-500">Your profile starts cleanly with 0 submissions</p>
            </div>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
          </div>

          <form id="signup-form" class="space-y-3">
            <div>
              <label class="form-label">Full Name</label>
              <input type="text" id="signup-name" required class="form-input" placeholder="Enter your actual full name" />
            </div>
            <div>
              <label class="form-label">Email Address</label>
              <input type="email" id="signup-email" required class="form-input" placeholder="you@domain.com" />
            </div>
            <div>
              <label class="form-label">Password</label>
              <input type="password" id="signup-password" required class="form-input" placeholder="••••••••" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="form-label">State</label>
                <select id="signup-state" class="form-select">
                  ${ALL_STATES_LIST.map(st => `
                    <option value="${st}" ${st === state.selectedState ? 'selected' : ''}>${st}</option>
                  `).join('')}
                </select>
              </div>
              <div>
                <label class="form-label">Role</label>
                <select id="signup-role" class="form-select">
                  <option value="citizen">Citizen</option>
                  <option value="government">Government / Local Body</option>
                  <option value="university">University</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty / Researcher</option>
                  <option value="industry">Industry / Startup</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full mt-2">Create Account</button>
          </form>
        </div>
      </div>
    `;
  }

  // 11. REPORT FORM (Prominent Exact Location Map Pinning + Multi-File Evidence Previews)
  function renderReportModal() {
    const defaultState = state.selectedState;
    const districts = INDIA_GEOGRAPHY[defaultState]?.districts || [];
    const map = state.reportMap;
    const evidenceList = state.reportEvidenceFiles;

    return `
      <div class="modal-overlay">
        <div class="modal-content modal-large p-6 space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <div class="badge badge-saffron text-[10px] mb-0.5">Grassroots Problem Crowdsourcing</div>
              <h2 class="font-extrabold text-lg text-slate-900">Report a Societal Challenge</h2>
              <p class="text-xs text-slate-500">Provide exact problem location and documentary evidence for direct university matching</p>
            </div>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">${ICONS.close}</button>
          </div>

          <form id="report-form" class="space-y-6 text-xs">

            <!-- VOICE ASSISTANT DICTATION HUB -->
            <div class="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-4 rounded-xl shadow-md space-y-3 border border-blue-700">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-amber-400 shrink-0">
                    ${ICONS.mic}
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-white flex items-center gap-2">
                      <span>🎙️ Speak to Samadhan AI (Voice Problem Dictation)</span>
                      <span class="badge bg-emerald-500 text-white text-[10px]">12 Languages Supported</span>
                    </h3>
                    <p class="text-[11px] text-blue-200">
                      Speak in Telugu, Hindi, Bengali, Tamil, or any regional language. AI detects language, transcribes, and translates for national university matching.
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button type="button" data-action="voice-dictate-main" class="btn btn-saffron text-xs py-1.5 px-3.5 shadow-md flex items-center gap-1.5 font-bold ${state.isRecording && !state.activeVoiceTarget ? 'animate-pulse ring-2 ring-red-400' : ''}">
                    ${ICONS.mic}
                    <span>${state.isRecording && !state.activeVoiceTarget ? '🔴 Listening... Click to Stop' : 'Speak Problem Description'}</span>
                  </button>
                </div>
              </div>

              <!-- Microphone Privacy Notice Banner -->
              <div id="mic-privacy-notice" class="text-[11px] bg-blue-950/70 border border-blue-800/80 p-2 rounded-lg text-blue-200 flex items-center gap-2">
                <span class="text-amber-400">ℹ️</span>
                <span><strong>Microphone Access:</strong> Samadhan AI needs microphone access to convert your speech into text. Audio is processed directly. If microphone is unavailable, use the test clips below or type your problem.</span>
              </div>

              <!-- Sample Voice Simulation Chips (Works anywhere without microphone permission) -->
              <div class="bg-blue-950/60 p-2.5 rounded-lg border border-blue-800/60 space-y-1.5">
                <div class="text-[11px] font-semibold text-amber-300 flex items-center justify-between">
                  <span>⚡ 1-Click Voice Test Clips (Evaluator & Demo Sandbox):</span>
                  <span class="text-[10px] text-slate-300">Click to test instant transcription and auto-translation</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" data-action="test-voice-clip" data-text="మా గ్రామంలో తాగునీటి సమస్య ఉంది." data-lang="te" class="px-2.5 py-1 rounded bg-blue-800/90 hover:bg-blue-700 text-white text-[11px] font-medium border border-blue-500/60 transition flex items-center gap-1">
                    <span>🗣️ Telugu:</span>
                    <span class="italic font-normal">"మా గ్రామంలో తాగునీటి సమస్య ఉంది."</span>
                  </button>
                  <button type="button" data-action="test-voice-clip" data-text="हमारे गांव में पीने के पानी की समस्या है।" data-lang="hi" class="px-2.5 py-1 rounded bg-blue-800/90 hover:bg-blue-700 text-white text-[11px] font-medium border border-blue-500/60 transition flex items-center gap-1">
                    <span>🗣️ Hindi:</span>
                    <span class="italic font-normal">"हमारे गांव में पीने के पानी की समस्या है।"</span>
                  </button>
                  <button type="button" data-action="test-voice-clip" data-text="టమాట పంటలో ఆకు తెగులు మరియు నష్టం ఉంది" data-lang="te" class="px-2.5 py-1 rounded bg-blue-800/90 hover:bg-blue-700 text-white text-[11px] font-medium border border-blue-500/60 transition flex items-center gap-1">
                    <span>🗣️ Telugu Crop:</span>
                    <span class="italic font-normal">"టమాట పంటలో ఆకు తెగులు..."</span>
                  </button>
                  <button type="button" data-action="test-voice-clip" data-text="আমাদের গ্রামে পানীয় জলের তীব্র সংকট রয়েছে" data-lang="bn" class="px-2.5 py-1 rounded bg-blue-800/90 hover:bg-blue-700 text-white text-[11px] font-medium border border-blue-500/60 transition flex items-center gap-1">
                    <span>🗣️ Bengali:</span>
                    <span class="italic font-normal">"আমাদের গ্রামে পানীয় জল..."</span>
                  </button>
                </div>
              </div>

              <!-- Live Spoken & Translated Preview Container -->
              <div id="voice-dictation-preview-container" class="${state.voicePreview ? '' : 'hidden'} bg-white text-slate-900 p-3 rounded-lg border border-slate-300 space-y-2 text-xs shadow-inner">
                ${renderVoicePreviewContent()}
              </div>
            </div>
            
            <!-- SECTION 1: PROBLEM DESCRIPTION -->
            <div class="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-200">
              <div class="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">1</span>
                <span>Describe Problem & Domain</span>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="form-label mb-0">${t('problem_title', 'Problem Title')} *</label>
                  <button type="button" data-action="voice-input-field" data-target="report-title" class="btn-voice-input ${state.activeVoiceTarget === 'report-title' ? 'recording' : ''}">
                    ${ICONS.mic}
                    <span>Speak Title</span>
                  </button>
                </div>
                <input type="text" id="report-title" required class="form-input" placeholder="e.g. Sudden foliar blight outbreak in tomato crop clusters" value="Foliar Blight Disease Outbreak in Winter Crops" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="form-label mb-0">${t('problem_desc', 'Detailed Description of the Community Problem')} *</label>
                  <button type="button" data-action="voice-input-field" data-target="report-desc" class="btn-voice-input ${state.activeVoiceTarget === 'report-desc' ? 'recording' : ''}">
                    ${ICONS.mic}
                    <span>Speak Description</span>
                  </button>
                </div>
                <textarea id="report-desc" rows="3" required class="form-textarea" placeholder="Explain the root symptoms, severity, and community impact...">Smallholder vegetable growers in Torpa block suffer 35% crop harvest loss due to rapid fungal pathogen spread. Late evening winter fog accelerates leaf necrosis. Extension officers are unable to visit in time, causing immense financial distress.</textarea>
              </div>

              <div>
                <label class="form-label">Category Domain *</label>
                <select id="report-category" class="form-select font-semibold">
                  <option value="Agriculture" selected>Agriculture & Precision Farming</option>
                  <option value="Water Resources">Water Resources & Safe Drinking Water</option>
                  <option value="Healthcare">Healthcare & Disease Diagnostics</option>
                  <option value="Education">Education & Assistive Learning</option>
                  <option value="Environment">Environment & Waste Management</option>
                  <option value="Energy">Energy & Solar Microgrids</option>
                  <option value="Urban Development">Urban Development & Sanitation</option>
                  <option value="Accessibility">Accessibility & Disability Inclusion</option>
                  <option value="Public Administration">Public Administration & Grievance Redressal</option>
                  <option value="Rural Livelihoods">Rural Livelihoods & Agro-Processing</option>
                </select>
              </div>
            </div>

            <!-- SECTION 2: EXACT LOCATION & INTERACTIVE MAP PINNING -->
            <div class="space-y-3 bg-blue-50/40 p-4 rounded-xl border border-blue-200">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="font-bold text-sm text-blue-950 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full bg-blue-700 text-white text-[11px] flex items-center justify-center">2</span>
                  <span>📍 Problem Location & Exact Map Pin</span>
                </div>
                <div class="text-[11px] text-blue-700 font-medium">
                  Hierarchy: India → State → District → Village/Ward → Exact Landmark
                </div>
              </div>

              <!-- Location Hierarchy Form Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="form-label">Country</label>
                  <input type="text" value="India" disabled class="form-input bg-slate-100 text-slate-600 font-bold" />
                </div>

                <div>
                  <label class="form-label">State *</label>
                  <select id="report-state" class="form-select font-bold">
                    ${ALL_STATES_LIST.map(st => `
                      <option value="${st}" ${st === defaultState ? 'selected' : ''}>${st} ${INDIA_GEOGRAPHY[st].pilot ? '(Pilot)' : ''}</option>
                    `).join('')}
                  </select>
                </div>

                <div>
                  <label class="form-label">District * (Auto-Updated)</label>
                  <select id="report-district" class="form-select font-bold">
                    ${districts.map(d => `
                      <option value="${d}" ${d === 'Khunti' ? 'selected' : ''}>${d}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="form-label">City / Town / Village / Ward *</label>
                  <input type="text" id="report-village" required class="form-input" placeholder="e.g. Torpa Block, Village Bamhani" value="Torpa Block, Village Bamhani" />
                </div>
                <div>
                  <label class="form-label">Exact Address / Landmark *</label>
                  <input type="text" id="report-exact-location" required class="form-input" placeholder="e.g. Near Weekly Farmer Haat / KVK Nursery" value="Bamhani Kisan Sabha Center, Near Weekly Haat" />
                </div>
              </div>

              <!-- SECTION 2: REAL INTERACTIVE GEOGRAPHIC MAP (GOOGLE MAPS EXPERIENCE) -->
              <div class="space-y-3 pt-2 border-t border-blue-200">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <span class="text-base">📍</span>
                    <span class="text-sm font-extrabold">Pin Exact Location on Map</span>
                    <span class="text-[11px] font-normal text-slate-500 hidden sm:inline">(Interactive geographic map with real roads & landmarks)</span>
                  </div>
                </div>

                <!-- 1. GOOGLE MAPS-STYLE LOCATION SEARCH AT TOP -->
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2 bg-white p-2 rounded-xl border-2 border-slate-300 shadow-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 transition">
                    <span class="text-slate-400 pl-2 text-sm">${ICONS.search}</span>
                    <input type="text" id="map-search-query" class="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900 font-medium" placeholder="Search for a place, village, street, landmark or address (e.g. China Amiram, Bhimavaram)..." value="${map.locationName || 'Torpa, Khunti'}" />
                    <button type="button" data-action="clear-map-search" class="text-slate-400 hover:text-slate-600 p-1 text-xs" title="Clear search">✕</button>
                    <button type="button" data-action="search-map-location" class="btn btn-primary btn-sm py-1.5 px-4 text-xs font-bold shadow-sm whitespace-nowrap">
                      Search
                    </button>
                  </div>

                  <!-- Quick Suggestion Chips for Real Locations -->
                  <div class="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                    <span class="font-semibold text-slate-500 text-[10px] uppercase">Suggestions:</span>
                    <button type="button" data-action="quick-search-loc" data-query="China Amiram, Bhimavaram" class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition cursor-pointer">
                      📍 China Amiram, Bhimavaram
                    </button>
                    <button type="button" data-action="quick-search-loc" data-query="Torpa, Khunti" class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition cursor-pointer">
                      📍 Torpa, Khunti
                    </button>
                    <button type="button" data-action="quick-search-loc" data-query="Bistupur, Jamshedpur" class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition cursor-pointer">
                      📍 Bistupur, Jamshedpur
                    </button>
                    <button type="button" data-action="quick-search-loc" data-query="Satbarwa, Palamu" class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition cursor-pointer">
                      📍 Satbarwa, Palamu
                    </button>
                    <button type="button" data-action="quick-search-loc" data-query="534204" class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-medium transition cursor-pointer">
                      📮 PIN: 534204
                    </button>
                  </div>
                </div>

                <!-- 2. FULL INTERACTIVE MAP CONTAINER -->
                <div class="relative rounded-xl overflow-hidden shadow-md border-2 border-slate-300">
                  <div id="real-leaflet-map" class="real-map-container"></div>
                  <!-- Floating Google Maps-style controls -->
                  <div class="absolute top-3 right-3 z-[400] flex flex-col gap-2">
                    <button type="button" data-action="recenter-map" class="w-9 h-9 bg-white rounded-lg shadow-md border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer" title="Re-center map on marker">
                      ${ICONS.crosshair}
                    </button>
                  </div>
                  <!-- Floating Map Attribution Badge -->
                  <div class="absolute bottom-2 left-2 z-[400] bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 border border-slate-200 shadow-sm pointer-events-none">
                    🗺️ Real Geographic Map • Roads, Towns & Landmarks
                  </div>
                </div>

                <!-- 3. CURRENT-LOCATION BUTTON -->
                <div class="space-y-1.5">
                  <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    <button type="button" data-action="use-my-gps" class="btn bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-400 font-bold py-2 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition hover:shadow cursor-pointer">
                      <span class="text-blue-600">${ICONS.crosshair}</span>
                      <span class="text-xs sm:text-sm font-extrabold">📍 Use My Current Location</span>
                    </button>
                    <span class="text-[11px] text-slate-500 text-center sm:text-right flex items-center justify-center sm:justify-end gap-1">
                      <span>💡</span>
                      <span>Click or drag the red marker anywhere on the map to adjust</span>
                    </span>
                  </div>

                  <!-- GPS Status / Permission Alert Banner -->
                  <div id="gps-status-banner" class="hidden text-xs p-2.5 rounded-lg border"></div>
                </div>

                <!-- 4. SELECTED LOCATION INFORMATION -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50/40 p-4 rounded-xl border border-blue-200 shadow-sm space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="font-bold text-sm text-blue-950 flex items-center gap-1.5">
                      <span class="text-base">📍</span>
                      <span class="text-sm font-extrabold">Selected Problem Location</span>
                    </div>
                    <span id="location-source-badge" class="badge ${map.locationSource === 'GPS' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : (map.locationSource === 'Search' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300')} border text-[10px] font-bold">
                      Source: ${map.locationSource || 'Manual Pin'}
                    </span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                    <div class="bg-white p-2.5 rounded-lg border border-blue-100 shadow-2xs space-y-1 md:col-span-2">
                      <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address:</div>
                      <div id="location-name-display" class="font-semibold text-slate-900 text-xs sm:text-sm leading-relaxed">${map.locationName}</div>
                    </div>

                    <div class="bg-white p-2.5 rounded-lg border border-blue-100 shadow-2xs flex items-center justify-between font-mono">
                      <span class="text-[10px] font-bold text-slate-500 font-sans uppercase">Latitude:</span>
                      <span id="coord-lat-display" class="font-bold text-slate-900 text-xs">${map.lat.toFixed(6)}° N</span>
                    </div>

                    <div class="bg-white p-2.5 rounded-lg border border-blue-100 shadow-2xs flex items-center justify-between font-mono">
                      <span class="text-[10px] font-bold text-slate-500 font-sans uppercase">Longitude:</span>
                      <span id="coord-lng-display" class="font-bold text-slate-900 text-xs">${map.lng.toFixed(6)}° E</span>
                    </div>

                    <div class="bg-white p-2.5 rounded-lg border border-blue-100 shadow-2xs flex items-center justify-between md:col-span-2">
                      <span class="text-[10px] font-bold text-slate-500 uppercase">Accuracy:</span>
                      <span id="gps-accuracy-chip" class="font-semibold ${map.accuracy ? 'text-emerald-700' : 'text-slate-500'} text-xs">
                        ${map.accuracy ? `±${Math.round(map.accuracy)} meters (High Accuracy GPS)` : 'Manual Pinpoint Precision'}
                      </span>
                    </div>
                  </div>

                  <!-- 5. CONFIRM LOCATION BUTTON -->
                  <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-blue-200/60">
                    <span class="text-[11px] text-slate-600">Lock these exact coordinates before submitting your challenge dossier.</span>
                    <button type="button" data-action="confirm-map-location" class="btn btn-primary py-2 px-5 text-xs font-extrabold shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
                      <span>✅</span>
                      <span>Confirm Location</span>
                    </button>
                  </div>
                </div>

                <!-- Confirmation Notice Banner -->
                <div id="location-confirmed-banner" class="${map.confirmed ? '' : 'hidden'} text-xs p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center gap-2 font-medium shadow-2xs">
                  <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">✓</span>
                  <span id="location-confirmed-text">Location confirmed and locked for submission: <strong>${map.locationName}</strong> (${map.lat.toFixed(4)}° N, ${map.lng.toFixed(4)}° E)</span>
                </div>
              </div>
            </div>

            <!-- SECTION 3: UPLOAD EVIDENCE (PHOTOS, VIDEOS, DOCUMENTS) -->
            <div class="space-y-3 bg-orange-50/40 p-4 rounded-xl border border-orange-200">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="font-bold text-sm text-orange-950 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center">3</span>
                  <span>📎 Upload Evidence of the Problem</span>
                </div>
                <div class="badge badge-saffron text-xs font-bold" id="evidence-counter-badge">
                  Evidence uploaded: ${evidenceList.length} files
                </div>
              </div>

              <p class="text-[11px] text-slate-600">
                Attach visual or documentary evidence demonstrating the issue. Supported formats: <strong>JPG, PNG, WEBP, MP4, MOV, PDF, DOC, DOCX</strong> (Max 25MB).
              </p>

              <!-- Drag & Drop Upload Zone -->
              <div id="evidence-dropzone" class="evidence-dropzone space-y-2">
                <input type="file" id="evidence-file-input" multiple accept="image/*,video/*,.pdf,.doc,.docx" class="hidden" />
                <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                  ${ICONS.upload}
                </div>
                <div>
                  <span class="font-bold text-blue-700 hover:underline">Click to browse files</span>
                  <span class="text-slate-500"> or drag and drop photos, video clips, or PDF test reports here</span>
                </div>
                <div class="flex justify-center gap-3 text-[10px] text-slate-400 pt-1">
                  <span class="flex items-center gap-1">${ICONS.camera} Photos</span>
                  <span class="flex items-center gap-1">${ICONS.video} Videos</span>
                  <span class="flex items-center gap-1">${ICONS.fileText} PDFs / Docs</span>
                </div>
              </div>

              <!-- Upload Error Alert Container -->
              <div id="evidence-error-banner" class="hidden text-[11px] p-2 rounded bg-red-100 text-red-800 border border-red-200"></div>

              <!-- Evidence Preview Cards Grid -->
              <div class="space-y-1.5 pt-2">
                <div class="font-bold text-xs text-slate-800">Uploaded Evidence Previews:</div>
                <div id="evidence-preview-grid" class="evidence-preview-grid">
                  ${renderEvidenceCards(evidenceList)}
                </div>
              </div>

              <!-- Evidence Description Field -->
              <div class="pt-2">
                <div class="flex items-center justify-between mb-1">
                  <label class="form-label mb-0">Describe the Evidence (Optional but recommended)</label>
                  <button type="button" data-action="voice-input-field" data-target="report-evidence-desc" class="btn-voice-input ${state.activeVoiceTarget === 'report-evidence-desc' ? 'recording' : ''}">
                    ${ICONS.mic}
                    <span>Speak Note</span>
                  </button>
                </div>
                <textarea id="report-evidence-desc" rows="2" class="form-textarea" placeholder="Explain what the uploaded photo/video/document shows (e.g. Leaf discoloration captured on Feb 12th; soil test report confirming acidity)...">${state.reportEvidenceDescription}</textarea>
              </div>
            </div>

            <!-- SECTION 4: IMPACT & URGENCY -->
            <div class="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-200">
              <div class="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center">4</span>
                <span>Impact & Urgency</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="form-label">${t('estimated_affected', 'Estimated People Affected')} *</label>
                  <input type="number" id="report-affected" required class="form-input font-bold" value="12500" />
                </div>
                <div>
                  <label class="form-label">${t('urgency_level', 'Urgency Level')} *</label>
                  <select id="report-urgency" class="form-select font-bold text-red-600">
                    <option value="High" selected>High (Urgent action needed)</option>
                    <option value="Critical">Critical (Severe emergency hazard)</option>
                    <option value="Medium">Medium (Moderate degradation)</option>
                    <option value="Low">Low (General community request)</option>
                  </select>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="form-label mb-0">Expected Social Impact</label>
                  <button type="button" data-action="voice-input-field" data-target="report-impact" class="btn-voice-input ${state.activeVoiceTarget === 'report-impact' ? 'recording' : ''}">
                    ${ICONS.mic}
                    <span>Speak Impact</span>
                  </button>
                </div>
                <textarea id="report-impact" rows="2" class="form-textarea" placeholder="What difference will solving this make?">Reduce crop loss by 35%, save ₹18 Lakhs annually for 1,200 smallholder tribal vegetable farmers, and eliminate toxic over-spraying.</textarea>
              </div>
            </div>

            <!-- SUBMIT BUTTON WITH AI CATEGORIZATION TRIGGER -->
            <div class="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="text-[11px] text-slate-500">
                Location & Evidence will be cryptographically tagged with unique ID <strong>CH-${INDIA_GEOGRAPHY[defaultState]?.code || 'JH'}-2026-XXXXX</strong>.
              </div>

              <button type="submit" id="submit-challenge-btn" class="btn btn-primary text-sm px-6 py-2.5 shadow-md hover:scale-105 transition-transform w-full sm:w-auto">
                ${ICONS.sparkles}
                <span>Run AI Categorization & Submit Challenge</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // Render Evidence Cards
  function renderEvidenceCards(files) {
    if (!files || files.length === 0) {
      return `<div class="col-span-full text-slate-400 text-center py-4 bg-white rounded border border-dashed text-xs">No evidence files uploaded yet. Add photos, videos or documents above.</div>`;
    }

    return files.map((f, idx) => {
      let previewEl = '';
      if (f.category === 'photo') {
        previewEl = `<img src="${f.previewUrl}" alt="${f.name}" />`;
      } else if (f.category === 'video') {
        previewEl = `
          <video controls class="w-full h-[95px] object-cover rounded bg-black">
            <source src="${f.previewUrl}" type="${f.type}">
            Your browser does not support video.
          </video>
        `;
      } else {
        previewEl = `
          <div class="w-full h-[95px] bg-slate-100 rounded flex flex-col items-center justify-center text-slate-600 gap-1 p-2">
            ${ICONS.fileText}
            <span class="badge badge-slate text-[9px] uppercase">${f.name.split('.').pop()} Document</span>
          </div>
        `;
      }

      return `
        <div class="evidence-card">
          <button type="button" data-action="remove-evidence" data-index="${idx}" class="evidence-remove-btn" title="Remove file">✕</button>
          ${previewEl}
          <div class="truncate text-[11px] font-bold text-slate-800" title="${f.name}">${f.name}</div>
          <div class="flex items-center justify-between text-[10px] text-slate-400">
            <span class="uppercase font-semibold">${f.category}</span>
            <span>${f.sizeFormatted || 'Verified'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // 12. CHALLENGE DETAILS MODAL (Full Location Pin & Evidence Showcase)
  function renderChallengeDetailModal() {
    const c = state.challenges.find(ch => ch.id === state.modalData?.id) || state.challenges[0];
    const status = getStatusBadge(c.status);
    const matches = getUniversityMatches(c);
    const evidenceFiles = c.evidence?.files || c.evidenceFiles || [];
    const evidenceDesc = c.evidence?.description || c.description;

    const hasOriginal = Boolean(c.titleOriginal && c.titleOriginal !== c.title);
    const isShowingOriginal = Boolean(c._showOriginal);
    const displayTitle = isShowingOriginal ? (c.titleOriginal || c.title) : c.title;
    const displayDesc = isShowingOriginal ? (c.descriptionOriginal || c.description) : c.description;
    const activeLang = isShowingOriginal ? (c.originalLanguage || 'en') : 'en';

    return `
      <div class="modal-overlay">
        <div class="modal-content modal-large p-6 space-y-5">
          <!-- Header -->
          <div class="flex items-start justify-between pb-3 border-b border-slate-200">
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${c.id}</span>
                <span class="badge ${status.class}">${status.label}</span>
                <span class="badge ${getUrgencyBadge(c.urgency)}">${c.urgency} Urgency</span>
                ${c.originalLanguage && c.originalLanguage !== 'en' ? `
                  <span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px]">
                    🗣️ Citizen Dialect: ${SUPPORTED_LANGUAGES[c.originalLanguage]?.nativeName || c.originalLanguage} (${SUPPORTED_LANGUAGES[c.originalLanguage]?.name || 'Regional'})
                  </span>
                ` : ''}
              </div>
              <h2 class="text-xl font-extrabold text-slate-900">${displayTitle}</h2>
              <div class="text-xs text-slate-500 mt-0.5">Submitted by: <strong>${c.submittedBy?.name}</strong> (${c.submittedBy?.role}) on ${c.submittedAt}</div>
            </div>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">${ICONS.close}</button>
          </div>

          <div class="space-y-5 text-xs">
            <!-- Problem Description with Dual Language & TTS -->
            <div class="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>${t('problem_desc', 'Problem Overview')}</span>
                  ${hasOriginal ? `
                    <span class="text-[11px] font-normal text-slate-500">
                      (${isShowingOriginal ? 'Original Regional Submission' : 'English Academic Translation'})
                    </span>
                  ` : ''}
                </div>
                <div class="flex items-center gap-2">
                  ${hasOriginal ? `
                    <button type="button" data-action="toggle-detail-lang" data-id="${c.id}" class="btn btn-outline btn-sm py-1 px-2.5 text-xs font-bold text-blue-700 border-blue-300 hover:bg-blue-50">
                      ${ICONS.globe}
                      <span>${isShowingOriginal ? 'View English Translation' : `View Original (${SUPPORTED_LANGUAGES[c.originalLanguage]?.nativeName || 'Regional'})`}</span>
                    </button>
                  ` : ''}
                  ${SamadhanTTSEngine.renderControls('tts-modal-overview', displayDesc, activeLang)}
                </div>
              </div>

              <div class="bg-white p-3.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed text-sm shadow-sm">
                ${displayDesc}
              </div>

              ${hasOriginal ? `
                <div class="text-[11px] bg-blue-50/70 p-2.5 rounded border border-blue-200 text-blue-900 flex items-center justify-between">
                  <span>
                    ℹ️ <strong>Two-Way Translation Active:</strong> The citizen submitted this challenge in <strong>${SUPPORTED_LANGUAGES[c.originalLanguage]?.name || 'Regional Language'}</strong>, preserved verbatim while providing translated English for university matching.
                  </span>
                </div>
              ` : ''}

              <div class="flex flex-wrap gap-1.5 pt-1">
                ${(c.tags || []).map(t => `<span class="badge badge-slate text-[10px]">${t}</span>`).join('')}
              </div>
            </div>

            <!-- PROMINENT EXACT LOCATION SECTION WITH MAP PIN -->
            <div class="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-200">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-sm text-blue-950 flex items-center gap-1.5">
                  <span class="text-blue-700">${ICONS.mapPin}</span>
                  <span>📍 Verified Ground Location</span>
                </h3>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="badge ${c.location.locationSource === 'GPS' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : (c.location.locationSource === 'Search' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300')} border text-[10px] font-bold">
                    Source: ${c.location.locationSource || 'Manual Pin'}
                  </span>
                  ${(c.location.gpsAccuracy || c.location.accuracy) ? `
                    <span class="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      GPS ±${Math.round(c.location.gpsAccuracy || c.location.accuracy)}m
                    </span>
                  ` : ''}
                  <div class="flex items-center gap-2 font-mono text-[11px] font-bold text-blue-800 bg-white px-2.5 py-1 rounded border border-blue-200 shadow-sm">
                    <span>Lat: ${(c.location.latitude || c.location.lat || 23.0734).toFixed(6)}° N</span>
                    <span>|</span>
                    <span>Lng: ${(c.location.longitude || c.location.lng || 85.2789).toFixed(6)}° E</span>
                  </div>
                </div>
              </div>

              <div class="bg-white p-3 rounded-lg border border-blue-100 space-y-1.5">
                <div class="text-slate-700">
                  <strong>Location Hierarchy:</strong> Country: <strong>${c.location.country || 'India'}</strong> → State: <strong>${c.location.state}</strong> → District: <strong>${c.location.district}</strong>
                </div>
                <div class="text-slate-700">
                  <strong>Settlement / Village / Ward:</strong> ${c.location.cityVillage}
                </div>
                <div class="text-slate-700">
                  <strong>Exact Address / Landmark:</strong> ${c.location.exactAddress || c.location.exactLocation || 'Local Habitation Center'}
                </div>
                ${c.location.mapLocationName ? `
                  <div class="text-xs text-blue-900 font-semibold pt-1 border-t border-slate-100">
                    📍 OpenStreetMap Reverse-Geocoded: ${c.location.mapLocationName}
                  </div>
                ` : ''}
              </div>

              <!-- Real Leaflet Geographic Map for Challenge Details -->
              <div id="detail-leaflet-map" class="real-map-detail-container"></div>
            </div>

            <!-- PROMINENT EVIDENCE SECTION (PHOTOS, VIDEOS, DOCUMENTS) -->
            <div class="space-y-2 bg-orange-50/50 p-4 rounded-xl border border-orange-200">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-sm text-orange-950 flex items-center gap-1.5">
                  <span class="text-orange-600">${ICONS.paperclip}</span>
                  <span>📎 Attached Documentary & Visual Evidence (${evidenceFiles.length} files)</span>
                </h3>
              </div>

              <!-- Previews Grid -->
              <div class="evidence-preview-grid">
                ${evidenceFiles.map(f => {
                  let el = '';
                  const previewUrl = f.url || f.previewUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252c?w=600&auto=format&fit=crop&q=80';
                  if (f.category === 'photo' || (f.type && f.type.startsWith('image/')) || (f.name && f.name.match(/\.(jpg|jpeg|png|webp)$/i))) {
                    el = `<img src="${previewUrl}" alt="${f.name}" class="hover:scale-105 transition-transform" />`;
                  } else if (f.category === 'video' || (f.type && f.type.startsWith('video/')) || (f.name && f.name.match(/\.(mp4|mov|webm)$/i))) {
                    el = `<video controls class="w-full h-[95px] object-cover rounded bg-black"><source src="${previewUrl}" type="video/mp4"></video>`;
                  } else {
                    el = `
                      <div class="w-full h-[95px] bg-slate-100 rounded flex flex-col items-center justify-center text-slate-600 gap-1 p-2">
                        ${ICONS.fileText}
                        <span class="badge badge-slate text-[9px] uppercase">${f.name ? f.name.split('.').pop() : 'DOC'}</span>
                      </div>
                    `;
                  }
                  return `
                    <div class="evidence-card">
                      ${el}
                      <div class="truncate text-[11px] font-bold text-slate-800" title="${f.name}">${f.name}</div>
                      <div class="flex items-center justify-between text-[10px] text-slate-400">
                        <span class="uppercase font-semibold">${f.size || f.sizeFormatted || '1.2 MB'}</span>
                        <span class="text-blue-600 font-bold">Verified</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Citizen Evidence Description Callout -->
              ${evidenceDesc ? `
                <div class="bg-white p-3 rounded-lg border border-orange-200 mt-2">
                  <div class="font-bold text-slate-800 mb-1">Citizen's Evidence Description:</div>
                  <p class="text-slate-600 italic">“${evidenceDesc}”</p>
                </div>
              ` : ''}
            </div>

            <!-- Impact & University Matching -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <div class="font-bold text-slate-800">Impact Metrics & Beneficiaries</div>
                <div>People Affected: <strong class="text-slate-900">${formatNumber(c.peopleAffected)}</strong></div>
                <div>Expected Impact: <span class="text-slate-600">${c.expectedImpact}</span></div>
              </div>

              <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <div class="font-bold text-slate-800">Top Matched Institution</div>
                <div class="text-blue-900 font-bold">${matches[0]?.name}</div>
                <div class="text-[11px] text-slate-500">${matches[0]?.department} (${matches[0]?.matchScore}% Match)</div>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button data-action="close-modal" class="btn btn-outline btn-sm">Close</button>
              ${c.status === 'submitted' || c.status === 'ai_categorized' || c.status === 'under_review' ? `
                <button data-action="validate-challenge" data-id="${c.id}" class="btn btn-emerald btn-sm">
                  ${ICONS.check}
                  <span>Validate Location & Evidence</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAIAnalysisModal() {
    const data = state.modalData || {};
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-md text-slate-800">
          <div class="flex items-center justify-between">
            <span class="badge badge-emerald text-xs">${ICONS.sparkles} AI Problem Categorization</span>
            <div class="flex items-center gap-1.5">
              ${SamadhanTTSEngine.renderControls('tts-ai-modal', `Challenge analyzed. Domain detected is ${data.ai?.detectedDomain || 'Agriculture'}, urgency evaluated as ${data.ai?.urgency || 'High'}, affecting estimated ${formatNumber(data.ai?.estimatedAffectedPopulation || 12500)} citizens.`, 'en')}
              <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <h3 class="font-bold text-sm text-slate-900">${data.title}</h3>

            <div class="bg-blue-50 p-3 rounded border border-blue-200 space-y-1.5">
              <div class="flex justify-between">
                <span class="text-blue-700 font-semibold">Detected Domain:</span>
                <strong class="text-blue-950">${data.ai?.detectedDomain || 'Agriculture'}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-700 font-semibold">Evaluated Urgency:</span>
                <span class="badge ${getUrgencyBadge(data.ai?.urgency || 'High')}">${data.ai?.urgency || 'High'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-700 font-semibold">Estimated Affected:</span>
                <strong>${formatNumber(data.ai?.estimatedAffectedPopulation || 12500)} Citizens</strong>
              </div>
            </div>

            <div>
              <span class="font-semibold text-slate-700">Suggested Tags:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                ${(data.ai?.suggestedTags || ['Crop Disease', 'Farmer Support', 'Rural Livelihood']).map(t => `
                  <span class="badge badge-slate text-[10px]">${t}</span>
                `).join('')}
              </div>
            </div>

            <div>
              <span class="font-semibold text-slate-700">Suggested Expertise Needed:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                ${(data.ai?.suggestedExpertise || ['Plant Pathology', 'Computer Vision', 'Mobile Dev']).map(e => `
                  <span class="badge badge-blue text-[10px]">${e}</span>
                `).join('')}
              </div>
            </div>

            <div class="flex gap-2 pt-3">
              <button data-action="accept-classification" class="btn btn-primary btn-sm flex-1">
                ${ICONS.check}
                <span>Accept Classification</span>
              </button>
              <button data-action="close-modal" class="btn btn-outline btn-sm">Edit</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderDuplicateWarningModal() {
    const dup = state.modalData?.duplicate;
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-lg border-2 border-amber-400">
          <div class="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <span class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              ${ICONS.alert}
            </span>
            <span>Possible Duplicate Challenge Found</span>
          </div>

          <div class="bg-amber-50 p-4 rounded-lg border border-amber-200 space-y-2 text-xs text-amber-900">
            <div class="flex justify-between font-bold">
              <span>Similarity Score: ${dup?.similarityScore || 87}%</span>
              <span class="font-mono text-blue-700">${dup?.challengeId || 'CH-JH-2026-00042'}</span>
            </div>
            <div><strong>Existing Title:</strong> ${dup?.title}</div>
            <div><strong>Location:</strong> ${dup?.state}, ${dup?.district}</div>
            <p class="text-[11px] text-amber-800 mt-1">Our duplicate engine detected an existing active challenge with matching parameters.</p>
          </div>

          <div class="space-y-2 pt-2 text-xs">
            <button data-action="close-modal" class="btn btn-primary btn-sm w-full">
              Add Evidence to Existing Challenge
            </button>
            <button data-action="close-modal" class="btn btn-outline btn-sm w-full">
              Submit as Distinct New Challenge
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderTeamCreateModal() {
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-md">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-base text-slate-900">Create Multidisciplinary Solution Team</h2>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
          </div>

          <form id="team-form" class="space-y-3 text-xs">
            <div>
              <label class="form-label">Team Name</label>
              <input type="text" id="team-name" required class="form-input" value="Kisan Drishti Innovators" />
            </div>

            <div>
              <label class="form-label">Faculty Mentor</label>
              <select id="team-mentor" class="form-select">
                <option value="Dr. Sunita Murmu (Plant Pathology, BAU)">Dr. Sunita Murmu (Plant Pathology, BAU)</option>
                <option value="Dr. Alok Ranjan (Computer Vision, BIT Mesra)">Dr. Alok Ranjan (Computer Vision, BIT Mesra)</option>
                <option value="Prof. K. Rama Rao (Andhra University)">Prof. K. Rama Rao (Andhra University - Cross State)</option>
              </select>
            </div>

            <div>
              <label class="form-label">Select Student Researchers</label>
              <div class="space-y-1.5 border border-slate-200 p-2.5 rounded bg-slate-50">
                <label class="flex items-center gap-2">
                  <input type="checkbox" checked />
                  <span>Aarav Sengupta (Final Year CSE - AI Model Lead)</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" checked />
                  <span>Pooja Soren (M.Sc Agri - Plant Pathology)</span>
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-full mt-2">
              ${ICONS.check}
              <span>Accept Challenge & Launch Project</span>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  function renderPrototypeSubmitModal() {
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-md">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-base text-slate-900">Upload Prototype / Solution Demo</h2>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
          </div>

          <form id="prototype-form" class="space-y-3 text-xs">
            <div>
              <label class="form-label">Prototype Repository / Live URL</label>
              <input type="url" id="proto-url" required class="form-input" value="https://github.com/samadhan-setu/kisan-drishti-ai" />
            </div>

            <div>
              <label class="form-label">Specifications / Benchmark Notes</label>
              <textarea id="proto-notes" rows="3" class="form-textarea" placeholder="e.g. Model inference time < 350ms, quantized MobileNetV3 with 94.2% precision."></textarea>
            </div>

            <button type="submit" class="btn btn-emerald w-full mt-2">Submit Prototype for Validation</button>
          </form>
        </div>
      </div>
    `;
  }

  function renderNotificationsModal() {
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-md">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-base text-slate-900">Notifications</h2>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
          </div>

          <div class="space-y-2.5 max-h-80 overflow-y-auto">
            ${state.notifications.map(n => `
              <div class="p-3 rounded border ${n.read ? 'bg-white border-slate-200' : 'bg-blue-50/60 border-blue-200'} space-y-1 text-xs">
                <div class="flex justify-between font-bold text-slate-800">
                  <span>${n.title}</span>
                  <span class="text-[10px] text-slate-400 font-normal">${n.time}</span>
                </div>
                <p class="text-slate-600">${n.message}</p>
              </div>
            `).join('')}
          </div>
          <button data-action="mark-all-read" class="btn btn-outline btn-sm w-full">Mark All as Read</button>
        </div>
      </div>
    `;
  }

  function renderHowItWorksModal() {
    return `
      <div class="modal-overlay">
        <div class="modal-content p-6 space-y-4 max-w-xl">
          <div class="flex items-center justify-between">
            <h2 class="font-bold text-base text-slate-900">How Samadhan Setu Works (Pan-India Scalability)</h2>
            <button data-action="close-modal" class="text-slate-400 hover:text-slate-600">${ICONS.close}</button>
          </div>

          <div class="space-y-4 text-xs text-slate-600">
            <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium">
              <strong>Pilot Status:</strong> Currently piloted in Jharkhand, and architected with dynamic location hierarchies (Country → State → District → Village → Exact Coordinates) to scale across India.
            </div>

            <p><strong>Samadhan Setu</strong> is a digital pipeline connecting citizens, government bodies, universities, students, faculty, and industry partners to solve real societal problems.</p>
            
            <div class="space-y-2">
              <div class="font-bold text-slate-800">Workflow:</div>
              <div class="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5 font-mono text-[11px] text-blue-900">
                Citizen Problem → AI Classification → Validation → University Matching → Team Formation → Industry Collaboration → Prototype → Deployment → Impact
              </div>
            </div>

            <button data-action="close-modal" class="btn btn-primary w-full">Got It</button>
          </div>
        </div>
      </div>
    `;
  }

  // Handle Location Selection (from click, drag, search, or GPS)
  async function handleLocationSelected(lat, lng, accuracy = null, autoCenter = false, source = 'Manual Pin') {
    state.reportMap.lat = lat;
    state.reportMap.lng = lng;
    state.reportMap.accuracy = accuracy;
    state.reportMap.confirmed = false;
    state.reportMap.locationSource = source;

    // Update DOM Coordinate Displays
    const latDisp = document.getElementById('coord-lat-display');
    const lngDisp = document.getElementById('coord-lng-display');
    const nameDisp = document.getElementById('location-name-display');
    const accChip = document.getElementById('gps-accuracy-chip');
    const sourceBadge = document.getElementById('location-source-badge');

    if (latDisp) latDisp.textContent = `${lat.toFixed(6)}° N`;
    if (lngDisp) lngDisp.textContent = `${lng.toFixed(6)}° E`;

    if (sourceBadge) {
      sourceBadge.textContent = 'Source: ' + source;
      sourceBadge.className = source === 'GPS' 
        ? 'badge bg-emerald-100 text-emerald-800 border-emerald-300 border text-[10px] font-bold'
        : (source === 'Search' 
          ? 'badge bg-purple-100 text-purple-800 border-purple-300 border text-[10px] font-bold' 
          : 'badge bg-blue-100 text-blue-800 border-blue-300 border text-[10px] font-bold');
    }

    if (accChip) {
      if (accuracy) {
        accChip.textContent = `±${Math.round(accuracy)} meters (High Accuracy GPS)`;
        accChip.className = 'font-semibold text-emerald-700 text-xs';
      } else {
        accChip.textContent = 'Manual Pinpoint Precision';
        accChip.className = 'font-semibold text-slate-500 text-xs';
      }
    }

    if (nameDisp) nameDisp.innerHTML = `<span class="text-blue-600 animate-pulse">Resolving location address...</span>`;

    if (autoCenter && reportLeafletMap) {
      reportLeafletMap.flyTo([lat, lng], Math.max(reportLeafletMap.getZoom(), 15), { duration: 1.2 });
      if (reportLeafletMarker) reportLeafletMarker.setLatLng([lat, lng]);
    }

    // Reverse Geocode using Nominatim / Fallback
    const rev = await GeocodingService.reverse(lat, lng);
    if (rev && rev.displayName) {
      state.reportMap.locationName = rev.displayName;
    } else {
      const curState = document.getElementById('report-state')?.value || state.selectedState;
      const curDist = document.getElementById('report-district')?.value || '';
      const curVill = document.getElementById('report-village')?.value || 'Local Area';
      state.reportMap.locationName = [curVill, curDist, curState].filter(Boolean).join(', ');
    }

    if (nameDisp) nameDisp.textContent = state.reportMap.locationName;

    if (reportLeafletMarker) {
      reportLeafletMarker.bindPopup(`
        <div class="google-maps-popup text-xs p-1.5 max-w-[240px]">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
            <span class="font-bold text-slate-900 text-xs">Problem Location</span>
          </div>
          <div class="font-semibold text-slate-800 text-[11px] leading-tight">${state.reportMap.locationName}</div>
          <div class="font-mono text-[10px] text-blue-700 mt-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
            ${lat.toFixed(6)}° N, ${lng.toFixed(6)}° E
          </div>
          <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span>✋</span> Drag marker to adjust exact spot
          </div>
        </div>
      `).openPopup();
    }
  }

  // Initialize Real Leaflet Map for Report Modal
  function initReportLeafletMap() {
    const container = document.getElementById('real-leaflet-map');
    if (!container || typeof L === 'undefined') return;

    if (reportLeafletMap) {
      try { reportLeafletMap.remove(); } catch(e) {}
      reportLeafletMap = null;
      reportLeafletMarker = null;
    }

    const startLat = state.reportMap.lat || 23.0734;
    const startLng = state.reportMap.lng || 85.2789;

    reportLeafletMap = L.map('real-leaflet-map', {
      center: [startLat, startLng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Real OpenStreetMap geographic tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(reportLeafletMap);

    const pinIcon = createCustomPinIcon();

    reportLeafletMarker = L.marker([startLat, startLng], {
      icon: pinIcon,
      draggable: true,
      autoPan: true
    }).addTo(reportLeafletMap);

    reportLeafletMarker.bindPopup(`
      <div class="google-maps-popup text-xs p-1.5 max-w-[240px]">
        <div class="flex items-center gap-1.5 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
          <span class="font-bold text-slate-900 text-xs">Problem Location</span>
        </div>
        <div class="font-semibold text-slate-800 text-[11px] leading-tight">${state.reportMap.locationName}</div>
        <div class="font-mono text-[10px] text-blue-700 mt-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
          ${startLat.toFixed(6)}° N, ${startLng.toFixed(6)}° E
        </div>
        <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
          <span>✋</span> Drag marker to adjust exact spot
        </div>
      </div>
    `);

    // Click anywhere on map to reposition pin
    reportLeafletMap.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      reportLeafletMarker.setLatLng([lat, lng]);
      await handleLocationSelected(lat, lng, null, false, 'Manual Pin');
    });

    // Drag marker to adjust location
    reportLeafletMarker.on('dragend', async () => {
      const pos = reportLeafletMarker.getLatLng();
      await handleLocationSelected(pos.lat, pos.lng, null, false, 'Manual Pin');
    });

    // Ensure Leaflet calculates tile boundaries after modal animation
    setTimeout(() => {
      if (reportLeafletMap) {
        reportLeafletMap.invalidateSize();
      }
    }, 150);
  }

  // Initialize Real Leaflet Map for Challenge Details View
  function initDetailLeafletMap(c) {
    const container = document.getElementById('detail-leaflet-map');
    if (!container || typeof L === 'undefined') return;

    if (detailLeafletMap) {
      try { detailLeafletMap.remove(); } catch(e) {}
      detailLeafletMap = null;
    }

    const lat = c.location?.latitude || c.location?.lat || 23.0734;
    const lng = c.location?.longitude || c.location?.lng || 85.2789;

    detailLeafletMap = L.map('detail-leaflet-map', {
      center: [lat, lng],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(detailLeafletMap);

    const pinIcon = createCustomPinIcon();
    const marker = L.marker([lat, lng], { icon: pinIcon }).addTo(detailLeafletMap);

    marker.bindPopup(`
      <div class="google-maps-popup text-xs p-1.5 max-w-[240px]">
        <div class="font-bold text-slate-900 text-xs">${c.title}</div>
        <div class="text-[11px] text-slate-700 mt-1">📍 ${c.location.cityVillage}, ${c.location.district}</div>
        <div class="font-mono text-[10px] text-blue-700 mt-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
          ${lat.toFixed(6)}° N, ${lng.toFixed(6)}° E
        </div>
        <div class="mt-1 flex items-center gap-1">
          <span class="badge ${c.location.locationSource === 'GPS' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-blue-100 text-blue-800 border-blue-300'} text-[9px] font-bold">
            Source: ${c.location.locationSource || 'Manual Pin'}
          </span>
        </div>
      </div>
    `).openPopup();

    setTimeout(() => {
      if (detailLeafletMap) {
        detailLeafletMap.invalidateSize();
      }
    }, 150);
  }

  // Event Listeners
  function attachEventListeners() {
    // Global State Selector in Header
    const stateSelect = document.getElementById('global-state-select');
    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        state.selectedState = e.target.value;
        state.selectedDistrictFilter = 'All';
        saveAll();
        render();
      });
    }

    // Global Language Selector in Header
    const langSelect = document.getElementById('global-language-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        state.currentLanguage = e.target.value;
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, state.currentLanguage);
        saveAll();
        render();
      });
    }

    // State Selector in Explore India cards
    document.querySelectorAll('[data-action="select-state"]').forEach(el => {
      el.addEventListener('click', () => {
        const st = el.getAttribute('data-state');
        state.selectedState = st;
        state.selectedDistrictFilter = 'All';
        saveAll();
        render();
      });
    });

    // Admin Jurisdiction Scope Switcher
    document.querySelectorAll('[data-action="set-admin-scope"]').forEach(el => {
      el.addEventListener('click', () => {
        state.adminScope = el.getAttribute('data-scope');
        render();
      });
    });

    const adminStateSelect = document.getElementById('admin-state-select');
    if (adminStateSelect) {
      adminStateSelect.addEventListener('change', (e) => {
        state.adminSelectedState = e.target.value;
        state.adminSelectedDistrict = 'All';
        render();
      });
    }

    const adminDistSelect = document.getElementById('admin-district-select');
    if (adminDistSelect) {
      adminDistSelect.addEventListener('change', (e) => {
        state.adminSelectedDistrict = e.target.value;
        render();
      });
    }

    // Initialize Real Leaflet Map if Report Modal is active
    if (document.getElementById('real-leaflet-map')) {
      initReportLeafletMap();
    }

    // Initialize Real Leaflet Map if Challenge Detail Modal is active
    if (document.getElementById('detail-leaflet-map') && state.modalData) {
      initDetailLeafletMap(state.modalData);
    }

    // Report Form: State -> Dependent District Dropdown & Map Center
    const reportStateSelect = document.getElementById('report-state');
    if (reportStateSelect) {
      reportStateSelect.addEventListener('change', async (e) => {
        const chosenState = e.target.value;
        const distDropdown = document.getElementById('report-district');
        if (distDropdown) {
          const list = INDIA_GEOGRAPHY[chosenState]?.districts || [];
          distDropdown.innerHTML = list.map(d => `<option value="${d}">${d}</option>`).join('');
        }

        // Center map to selected state
        const stateCenter = INDIA_GEOGRAPHY[chosenState]?.center || { lat: 23.6102, lng: 85.2799 };
        if (reportLeafletMap) {
          reportLeafletMap.flyTo([stateCenter.lat, stateCenter.lng], 9);
          if (reportLeafletMarker) reportLeafletMarker.setLatLng([stateCenter.lat, stateCenter.lng]);
        }
        await handleLocationSelected(stateCenter.lat, stateCenter.lng, null, false);
      });
    }

    // Report Form: District Change -> Update Coordinates & Center Pin
    const reportDistSelect = document.getElementById('report-district');
    if (reportDistSelect) {
      reportDistSelect.addEventListener('change', async (e) => {
        const chosenDist = e.target.value;
        const chosenState = document.getElementById('report-state')?.value || state.selectedState;
        const coords = INDIA_GEOGRAPHY[chosenState]?.districtCoords?.[chosenDist];
        if (coords) {
          if (reportLeafletMap) {
            reportLeafletMap.flyTo([coords.lat, coords.lng], 12);
            if (reportLeafletMarker) reportLeafletMarker.setLatLng([coords.lat, coords.lng]);
          }
          await handleLocationSelected(coords.lat, coords.lng, null, false);
        } else {
          // If no specific district coords, search district via GeocodingService
          const res = await GeocodingService.search(`${chosenDist}, ${chosenState}`);
          if (res) {
            if (reportLeafletMap) {
              reportLeafletMap.flyTo([res.lat, res.lng], 12);
              if (reportLeafletMarker) reportLeafletMarker.setLatLng([res.lat, res.lng]);
            }
            await handleLocationSelected(res.lat, res.lng, null, false);
          }
        }
      });
    }

    // GPS "Use Current Location" Button
    const gpsBtn = document.querySelector('[data-action="use-my-gps"]');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        const banner = document.getElementById('gps-status-banner');
        if (!navigator.geolocation) {
          if (banner) {
            banner.className = 'text-xs p-2.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 block';
            banner.innerHTML = '⚠️ Geolocation is not supported by your browser. Please search or click on the real map to pin your exact location.';
          }
          return;
        }

        if (banner) {
          banner.className = 'text-xs p-2.5 rounded-lg bg-blue-100 text-blue-900 border border-blue-200 block animate-pulse';
          banner.innerHTML = '📍 Requesting browser location permission...';
        }

        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;

            state.reportMap.isGpsActive = true;
            if (reportLeafletMap) {
              reportLeafletMap.flyTo([lat, lng], 16, { duration: 1.2 });
              if (reportLeafletMarker) reportLeafletMarker.setLatLng([lat, lng]);
            }

            await handleLocationSelected(lat, lng, accuracy, false, 'GPS');

            if (banner) {
              banner.className = 'text-xs p-2.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200 block';
              banner.innerHTML = `✓ Exact GPS coordinates locked: <strong>${lat.toFixed(6)}° N, ${lng.toFixed(6)}° E</strong> (Accuracy: ±${Math.round(accuracy)}m)`;
            }
          },
          (err) => {
            state.reportMap.isGpsActive = false;
            if (banner) {
              banner.className = 'text-xs p-2.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 block';
              banner.innerHTML = `⚠️ <strong>GPS Permission Denied or Unavailable:</strong> You can search for your place above or click/drag the red marker directly on the real map to position the pin manually.`;
            }
          },
          { timeout: 8000, enableHighAccuracy: true }
        );
      });
    }

    // Search Map Location (OpenStreetMap Nominatim + Gazetteer + PIN code)
    const searchMapBtn = document.querySelector('[data-action="search-map-location"]');
    const searchMapInput = document.getElementById('map-search-query');
    const doSearchPin = async () => {
      const q = searchMapInput?.value?.trim();
      if (!q) return;

      const banner = document.getElementById('gps-status-banner');
      if (banner) {
        banner.className = 'text-xs p-2 rounded bg-blue-50 text-blue-900 border border-blue-200 block animate-pulse';
        banner.innerHTML = `🔍 Searching geographic map for <strong>"${q}"</strong>...`;
      }

      const match = await GeocodingService.search(q);
      if (match) {
        if (reportLeafletMap) {
          reportLeafletMap.flyTo([match.lat, match.lng], 15, { duration: 1.2 });
          if (reportLeafletMarker) reportLeafletMarker.setLatLng([match.lat, match.lng]);
        }

        await handleLocationSelected(match.lat, match.lng, null, false, 'Search');

        // Auto-synchronize State & District dropdowns if detected in matched result
        if (match.state && ALL_STATES_LIST.includes(match.state)) {
          const stDropdown = document.getElementById('report-state');
          if (stDropdown && stDropdown.value !== match.state) {
            stDropdown.value = match.state;
            const distDropdown = document.getElementById('report-district');
            if (distDropdown) {
              const list = INDIA_GEOGRAPHY[match.state]?.districts || [];
              distDropdown.innerHTML = list.map(d => `<option value="${d}">${d}</option>`).join('');
            }
          }
        }

        if (match.district) {
          const distDropdown = document.getElementById('report-district');
          if (distDropdown) {
            for (let i = 0; i < distDropdown.options.length; i++) {
              if (distDropdown.options[i].value.toLowerCase().includes(match.district.toLowerCase())) {
                distDropdown.selectedIndex = i;
                break;
              }
            }
          }
        }

        if (match.city) {
          const villInput = document.getElementById('report-village');
          if (villInput && (!villInput.value || villInput.value.includes('Bamhani'))) {
            villInput.value = match.city;
          }
        }

        if (banner) {
          banner.className = 'text-xs p-2 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 block';
          banner.innerHTML = `✓ Located: <strong>${match.displayName}</strong> (${match.lat.toFixed(6)}° N, ${match.lng.toFixed(6)}° E)`;
        }
      } else {
        if (banner) {
          banner.className = 'text-xs p-2 rounded bg-amber-100 text-amber-900 border border-amber-300 block';
          banner.innerHTML = `⚠️ Location "${q}" could not be auto-resolved. You can pan and click directly on the real map to pin the exact coordinates.`;
        }
      }
    };

    if (searchMapBtn) searchMapBtn.addEventListener('click', doSearchPin);
    if (searchMapInput) {
      searchMapInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          doSearchPin();
        }
      });
    }

    // Quick Search Suggestion Chips
    document.querySelectorAll('[data-action="quick-search-loc"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (searchMapInput && query) {
          searchMapInput.value = query;
          doSearchPin();
        }
      });
    });

    // Clear Search Input Button
    const clearSearchBtn = document.querySelector('[data-action="clear-map-search"]');
    if (clearSearchBtn && searchMapInput) {
      clearSearchBtn.addEventListener('click', () => {
        searchMapInput.value = '';
        searchMapInput.focus();
      });
    }

    // Re-center Map on Marker Button
    const recenterBtn = document.querySelector('[data-action="recenter-map"]');
    if (recenterBtn) {
      recenterBtn.addEventListener('click', () => {
        if (reportLeafletMap) {
          reportLeafletMap.flyTo([state.reportMap.lat, state.reportMap.lng], 15, { duration: 1.0 });
          if (reportLeafletMarker) reportLeafletMarker.openPopup();
        }
      });
    }

    // Confirm Location Button
    const confirmLocBtn = document.querySelector('[data-action="confirm-map-location"]');
    if (confirmLocBtn) {
      confirmLocBtn.addEventListener('click', () => {
        state.reportMap.confirmed = true;
        const confirmBanner = document.getElementById('location-confirmed-banner');
        const confirmText = document.getElementById('location-confirmed-text');
        if (confirmBanner && confirmText) {
          confirmBanner.classList.remove('hidden');
          confirmText.innerHTML = `✓ Location confirmed at <strong>${state.reportMap.locationName}</strong> (${state.reportMap.lat.toFixed(6)}° N, ${state.reportMap.lng.toFixed(6)}° E) [Source: ${state.reportMap.locationSource || 'Manual Pin'}]. Coordinates locked for submission.`;
        }
      });
    }

    // EVIDENCE UPLOAD: File Input & Drag and Drop Handling
    const dropzone = document.getElementById('evidence-dropzone');
    const fileInput = document.getElementById('evidence-file-input');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('bg-blue-100');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('bg-blue-100');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('bg-blue-100');
        if (e.dataTransfer.files) {
          handleUploadedFiles(e.dataTransfer.files);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files) {
          handleUploadedFiles(e.target.files);
        }
      });
    }

    // Remove Evidence File Handler
    document.querySelectorAll('[data-action="remove-evidence"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'));
        if (!isNaN(idx)) {
          state.reportEvidenceFiles.splice(idx, 1);
          // Re-render preview grid and badge
          updateEvidenceGridDisplay();
        }
      });
    });

    // Navigation
    document.querySelectorAll('[data-action="nav"]').forEach(el => {
      el.addEventListener('click', () => {
        state.activeTab = el.getAttribute('data-tab');
        render();
      });
    });

    // Role Switcher
    document.querySelectorAll('[data-action="switch-role"]').forEach(el => {
      el.addEventListener('click', () => {
        const role = el.getAttribute('data-role');
        const user = state.allUsers.find(u => u.role === role);
        if (user) {
          state.currentUser = user;
          state.activeRole = role;
          state.activeTab = role === 'admin' ? 'admin' : role === 'student' ? 'student' : role === 'university' ? 'university' : role === 'industry' ? 'industry' : 'citizen';
          saveAll();
          render();
        }
      });
    });

    // Main SIH Pilot Demo Tour (Jharkhand)
    const mainDemoBtn = document.querySelector('[data-action="run-main-sih-demo"]');
    if (mainDemoBtn) {
      mainDemoBtn.addEventListener('click', () => {
        runMainSIHDemo();
      });
    }

    // Pan-India Scalability Tour
    const panIndiaDemoBtn = document.querySelector('[data-action="run-pan-india-demo"]');
    if (panIndiaDemoBtn) {
      panIndiaDemoBtn.addEventListener('click', () => {
        runPanIndiaScalabilityDemo();
      });
    }

    // Reset Data
    const resetBtn = document.querySelector('[data-action="reset-data"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.clear();
        state.currentUser = null;
        state.selectedState = 'Jharkhand';
        state.activeTab = 'landing';
        initData();
        render();
      });
    }

    // Modals
    document.querySelectorAll('[data-action="open-modal"]').forEach(el => {
      el.addEventListener('click', () => {
        state.modal = el.getAttribute('data-modal');
        const id = el.getAttribute('data-id');
        if (id) state.modalData = { id };
        render();
      });
    });

    document.querySelectorAll('[data-action="close-modal"]').forEach(el => {
      el.addEventListener('click', () => {
        state.modal = null;
        render();
      });
    });

    // Assistant Drawer Toggle
    document.querySelectorAll('[data-action="toggle-assistant"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.isAssistantOpen = !state.isAssistantOpen;
        render();
      });
    });

    // Assistant Chat Submission
    const assistantForm = document.getElementById('assistant-chat-form');
    if (assistantForm) {
      assistantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inp = document.getElementById('assistant-input');
        if (inp && inp.value.trim()) {
          const q = inp.value.trim();
          inp.value = '';
          SamadhanAIAssistant.processUserMessage(q);
        }
      });
    }

    document.querySelectorAll('[data-action="ask-assistant-prompt"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = btn.getAttribute('data-prompt');
        if (p) {
          SamadhanAIAssistant.processUserMessage(p);
        }
      });
    });

    const assistantMicBtn = document.querySelector('[data-action="assistant-mic"]');
    if (assistantMicBtn) {
      assistantMicBtn.addEventListener('click', () => {
        if (state.isAssistantRecording) {
          SamadhanSpeechEngine.stopListening();
          state.isAssistantRecording = false;
        } else {
          state.isAssistantRecording = true;
          SamadhanSpeechEngine.startListening('assistant-input', state.currentLanguage);
        }
        render();
      });
    }

    // Text-to-Speech (TTS) Controls
    document.querySelectorAll('[data-action="tts-play"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-tts-id');
        const text = btn.getAttribute('data-tts-text');
        const lang = btn.getAttribute('data-tts-lang') || 'en';
        SamadhanTTSEngine.speak(text, lang, id);
      });
    });

    document.querySelectorAll('[data-action="tts-pause"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        SamadhanTTSEngine.pause();
      });
    });

    document.querySelectorAll('[data-action="tts-resume"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        SamadhanTTSEngine.resume();
      });
    });

    document.querySelectorAll('[data-action="tts-stop"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        SamadhanTTSEngine.stop();
      });
    });

    // Voice Dictation in Problem Report Form
    const mainVoiceBtn = document.querySelector('[data-action="voice-dictate-main"]');
    if (mainVoiceBtn) {
      mainVoiceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.isRecording) {
          SamadhanSpeechEngine.stopListening();
        } else {
          SamadhanSpeechEngine.startListening('report-desc', state.currentLanguage);
        }
      });
    }

    document.querySelectorAll('[data-action="voice-input-field"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = btn.getAttribute('data-target');
        if (state.isRecording && state.activeVoiceTarget === target) {
          SamadhanSpeechEngine.stopListening();
        } else {
          SamadhanSpeechEngine.startListening(target, state.currentLanguage);
        }
      });
    });

    // Interactive Sample Voice Simulation Chips for Testing
    document.querySelectorAll('[data-action="test-voice-clip"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.getAttribute('data-text');
        const lang = btn.getAttribute('data-lang') || 'te';
        SamadhanSpeechEngine.simulateVoiceClip(text, lang);
      });
    });

    // Apply Recognized & Translated Text to Form
    const applyVoiceBtn = document.querySelector('[data-action="apply-voice-to-form"]');
    if (applyVoiceBtn) {
      applyVoiceBtn.addEventListener('click', () => {
        const vp = state.voicePreview;
        if (!vp) return;

        state.reportOriginalLanguage = vp.detectedLang;
        state.reportTitleOriginal = vp.spokenText;
        state.reportDescOriginal = vp.spokenText;
        state.reportTitleTranslated = vp.translatedText;
        state.reportDescTranslated = vp.translatedText;

        const titleEl = document.getElementById('report-title');
        const descEl = document.getElementById('report-desc');

        if (descEl) descEl.value = vp.spokenText;
        if (titleEl) {
          if (vp.detectedLang !== 'en') {
            titleEl.value = vp.translatedText;
          } else {
            titleEl.value = vp.spokenText;
          }
        }

        const catEl = document.getElementById('report-category');
        if (catEl) {
          const lower = vp.translatedText.toLowerCase();
          if (lower.includes('water') || lower.includes('fluoride')) catEl.value = 'Water Resources';
          else if (lower.includes('crop') || lower.includes('blight') || lower.includes('disease') || lower.includes('farmer')) catEl.value = 'Agriculture';
          else if (lower.includes('hospital') || lower.includes('doctor') || lower.includes('health')) catEl.value = 'Healthcare';
          else if (lower.includes('road')) catEl.value = 'Urban Development';
          else if (lower.includes('power') || lower.includes('electricity')) catEl.value = 'Energy';
        }

        state.voicePreview = null;
        SamadhanSpeechEngine.updateUI();
      });
    }

    const clearVoiceBtn = document.querySelector('[data-action="clear-voice-preview"]');
    if (clearVoiceBtn) {
      clearVoiceBtn.addEventListener('click', () => {
        state.voicePreview = null;
        SamadhanSpeechEngine.updateUI();
      });
    }

    // Toggle Challenge Card / Modal Language
    document.querySelectorAll('[data-action="toggle-card-lang"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const c = state.challenges.find(ch => ch.id === id);
        if (c) {
          c._showOriginal = !c._showOriginal;
          render();
        }
      });
    });

    document.querySelectorAll('[data-action="toggle-detail-lang"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const c = state.challenges.find(ch => ch.id === id);
        if (c) {
          c._showOriginal = !c._showOriginal;
          render();
        }
      });
    });

    // Logout
    document.querySelectorAll('[data-action="logout"]').forEach(el => {
      el.addEventListener('click', () => {
        state.currentUser = null;
        state.activeRole = null;
        state.activeTab = 'landing';
        saveAll();
        render();
      });
    });

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const role = document.getElementById('login-role').value;
        let user = state.allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
          user = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0].replace('.', ' ').replace(/^./, c => c.toUpperCase()),
            email,
            role,
            state: state.selectedState
          };
          state.allUsers.push(user);
        }
        state.currentUser = user;
        state.activeRole = user.role;
        state.activeTab = user.role === 'admin' ? 'admin' : user.role === 'student' ? 'student' : user.role === 'university' ? 'university' : user.role === 'industry' ? 'industry' : 'citizen';
        state.modal = null;
        saveAll();
        render();
      });
    }

    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const role = document.getElementById('signup-role').value;
        const userState = document.getElementById('signup-state').value;

        const newUser = {
          id: 'user-' + Date.now(),
          name,
          email,
          role,
          state: userState
        };
        state.allUsers.push(newUser);
        state.currentUser = newUser;
        state.activeRole = role;
        state.selectedState = userState;
        state.activeTab = role === 'admin' ? 'admin' : role === 'student' ? 'student' : role === 'university' ? 'university' : role === 'industry' ? 'industry' : 'citizen';
        state.modal = null;
        saveAll();
        render();
      });
    }

    // Report Challenge Form Submission with Dual Storage & AI Categorization
    const reportForm = document.getElementById('report-form');
    if (reportForm) {
      reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('report-title').value;
        const desc = document.getElementById('report-desc').value;
        const category = document.getElementById('report-category').value;
        const stateName = document.getElementById('report-state').value;
        const district = document.getElementById('report-district').value;
        const village = document.getElementById('report-village').value;
        const exactLoc = document.getElementById('report-exact-location').value;
        const affected = parseInt(document.getElementById('report-affected').value) || 5000;
        const urgency = document.getElementById('report-urgency').value;
        const impact = document.getElementById('report-impact').value;
        const evidenceDesc = document.getElementById('report-evidence-desc')?.value || '';

        // Duplicate Check
        const dup = checkDuplicates(title, desc, category, district, stateName);
        if (dup) {
          state.modal = 'duplicate_warning';
          state.modalData = {
            duplicate: dup,
            pendingChallenge: { title, desc, category, stateName, district, village, exactLoc, affected, urgency, impact }
          };
          render();
          return;
        }

        // Detect language & compute dual storage fields
        const detectedL = state.reportOriginalLanguage || SamadhanTranslationEngine.detectLanguage(title + ' ' + desc);
        const finalTitle = (detectedL !== 'en' && state.reportTitleTranslated) ? state.reportTitleTranslated : (detectedL !== 'en' ? SamadhanTranslationEngine.translateToEnglish(title, detectedL) : title);
        const finalDesc = (detectedL !== 'en' && state.reportDescTranslated) ? state.reportDescTranslated : (detectedL !== 'en' ? SamadhanTranslationEngine.translateToEnglish(desc, detectedL) : desc);

        // AI Analysis
        const ai = runAIAnalysis(finalTitle || title, finalDesc || desc, category, district, stateName);
        const stateCode = INDIA_GEOGRAPHY[stateName]?.code || 'JH';

        const newChallenge = {
          id: `CH-${stateCode}-2026-00${state.challenges.length + 135}`,
          title: finalTitle,
          description: finalDesc,
          titleOriginal: state.reportTitleOriginal || title,
          descriptionOriginal: state.reportDescOriginal || desc,
          originalLanguage: detectedL,
          category: ai.detectedDomain,
          location: {
            country: 'India',
            state: stateName,
            district,
            cityVillage: village,
            cityVillageWard: village,
            address: exactLoc,
            exactAddress: exactLoc,
            latitude: state.reportMap.lat,
            longitude: state.reportMap.lng,
            gpsAccuracy: state.reportMap.accuracy || null,
            accuracy: state.reportMap.accuracy || null,
            locationSource: state.reportMap.locationSource || (state.reportMap.isGpsActive ? 'GPS' : 'Manual Pin'),
            mapLocationName: state.reportMap.locationName
          },
          evidence: {
            files: [...state.reportEvidenceFiles],
            description: evidenceDesc
          },
          peopleAffected: affected,
          urgency: ai.urgency,
          expectedImpact: impact,
          status: 'ai_categorized',
          submittedBy: { name: state.currentUser ? state.currentUser.name : 'Citizen User', role: 'citizen' },
          submittedAt: new Date().toISOString().split('T')[0],
          tags: ai.suggestedTags,
          requiredSkills: ai.suggestedExpertise,
          progressPercentage: 15
        };

        // Reset temporary voice dictation variables
        state.reportOriginalLanguage = null;
        state.reportTitleOriginal = null;
        state.reportDescOriginal = null;
        state.reportTitleTranslated = null;
        state.reportDescTranslated = null;
        state.voicePreview = null;

        state.challenges.unshift(newChallenge);
        state.selectedState = stateName;
        state.notifications.unshift({
          id: 'n-' + Date.now(),
          title: `Challenge Submitted: ${newChallenge.id}`,
          message: `AI categorized your issue as "${ai.detectedDomain}" with ${newChallenge.evidence.files.length} evidence files pinned at ${newChallenge.location.latitude.toFixed(4)}° N, ${newChallenge.location.longitude.toFixed(4)}° E.`,
          time: 'Just now',
          read: false
        });

        saveAll();
        state.modal = 'ai_analysis';
        state.modalData = { title: finalTitle, ai };
        render();
      });
    }

    // Accept Classification button
    const acceptClassBtn = document.querySelector('[data-action="accept-classification"]');
    if (acceptClassBtn) {
      acceptClassBtn.addEventListener('click', () => {
        state.modal = null;
        state.activeTab = 'challenges';
        render();
      });
    }

    // Move Kanban Task
    document.querySelectorAll('[data-action="move-task"]').forEach(el => {
      el.addEventListener('click', () => {
        const taskId = el.getAttribute('data-task-id');
        const next = el.getAttribute('data-next');
        const proj = state.projects[0];
        if (proj && proj.tasks) {
          const task = proj.tasks.find(t => t.id === taskId);
          if (task) {
            task.status = next;
            const completed = proj.tasks.filter(t => t.status === 'completed').length;
            proj.progressPercentage = Math.min(100, Math.round((completed / proj.tasks.length) * 80) + 20);
            saveAll();
            render();
          }
        }
      });
    });

    // Validate Challenge button
    document.querySelectorAll('[data-action="validate-challenge"]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const c = state.challenges.find(ch => ch.id === id);
        if (c) {
          c.status = 'validated';
          c.assignedUniversity = c.location.state === 'Jharkhand' ? 'Birsa Agricultural University (BAU), Ranchi' : c.location.state === 'Andhra Pradesh' ? 'Andhra University College of Engg' : 'COEP Technological University';
          state.notifications.unshift({
            id: 'n-' + Date.now(),
            title: `Challenge ${id} Validated!`,
            message: `Ground GPS location and evidence files verified by administration. Intelligent matching initiated.`,
            time: 'Just now',
            read: false
          });
          saveAll();
          render();
        }
      });
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') render();
      });
    }

    // Filters
    const fCat = document.getElementById('filter-category');
    if (fCat) fCat.addEventListener('change', (e) => { state.selectedCategoryFilter = e.target.value; render(); });

    const fDist = document.getElementById('filter-district');
    if (fDist) fDist.addEventListener('change', (e) => { state.selectedDistrictFilter = e.target.value; render(); });

    const fUrg = document.getElementById('filter-urgency');
    if (fUrg) fUrg.addEventListener('change', (e) => { state.selectedUrgencyFilter = e.target.value; render(); });

    const fStat = document.getElementById('filter-status');
    if (fStat) fStat.addEventListener('change', (e) => { state.selectedStatusFilter = e.target.value; render(); });
  }

  // Coordinate DOM Display Helper
  function updateMapPinDisplay() {
    const latDisplay = document.getElementById('coord-lat-display');
    if (latDisplay) latDisplay.textContent = `${state.reportMap.lat.toFixed(4)}° N`;

    const lngDisplay = document.getElementById('coord-lng-display');
    if (lngDisplay) lngDisplay.textContent = `${state.reportMap.lng.toFixed(4)}° E`;

    const locNameDisplay = document.getElementById('location-name-display');
    if (locNameDisplay) locNameDisplay.textContent = state.reportMap.locationName;
  }

  // Handle uploaded files (photos, videos, documents)
  function handleUploadedFiles(fileList) {
    const errorBanner = document.getElementById('evidence-error-banner');
    if (errorBanner) errorBanner.classList.add('hidden');

    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm', 'pdf', 'doc', 'docx'];
    const maxSizeBytes = 25 * 1024 * 1024; // 25MB

    Array.from(fileList).forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!validExtensions.includes(ext)) {
        if (errorBanner) {
          errorBanner.classList.remove('hidden');
          errorBanner.textContent = `❌ Unsupported file format: "${file.name}". Supported: JPG, PNG, WEBP, MP4, MOV, PDF, DOC/DOCX.`;
        }
        return;
      }

      if (file.size > maxSizeBytes) {
        if (errorBanner) {
          errorBanner.classList.remove('hidden');
          errorBanner.textContent = `❌ File "${file.name}" exceeds maximum 25MB limit.`;
        }
        return;
      }

      // Determine category
      let category = 'document';
      if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) category = 'photo';
      else if (['mp4', 'mov', 'webm'].includes(ext)) category = 'video';

      const sizeFormatted = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`;

      // Read file with FileReader API
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileObj = {
          id: 'ev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          name: file.name,
          type: file.type || ext,
          category,
          sizeFormatted,
          previewUrl: e.target.result
        };
        state.reportEvidenceFiles.push(fileObj);
        updateEvidenceGridDisplay();
      };
      reader.readAsDataURL(file);
    });
  }

  // Update Evidence Grid in DOM
  function updateEvidenceGridDisplay() {
    const grid = document.getElementById('evidence-preview-grid');
    if (grid) {
      grid.innerHTML = renderEvidenceCards(state.reportEvidenceFiles);
      // re-attach remove listeners
      grid.querySelectorAll('[data-action="remove-evidence"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.getAttribute('data-index'));
          if (!isNaN(idx)) {
            state.reportEvidenceFiles.splice(idx, 1);
            updateEvidenceGridDisplay();
          }
        });
      });
    }

    const badge = document.getElementById('evidence-counter-badge');
    if (badge) {
      badge.textContent = `Evidence uploaded: ${state.reportEvidenceFiles.length} files`;
    }
  }

  // 1. MAIN PILOT WORKFLOW DEMO (Jharkhand Focus)
  function runMainSIHDemo() {
    state.isDemoRunning = true;
    state.selectedState = 'Jharkhand';
    state.demoStepText = 'Pilot Step 1/6: Citizen pins exact location in Khunti (23.0734° N, 85.2789° E) & uploads crop blight photos...';
    const citizen = state.allUsers.find(u => u.role === 'citizen') || state.allUsers[0];
    state.currentUser = citizen;
    state.activeRole = 'citizen';
    state.activeTab = 'citizen';
    render();

    setTimeout(() => {
      state.demoStepText = 'Pilot Step 2/6: AI engine categorizes domain as Agriculture, analyzes evidence & checks duplicates...';
      render();

      setTimeout(() => {
        state.demoStepText = 'Pilot Step 3/6: Jharkhand Admin verifies GPS coordinates & validates challenge; AI matches BAU & BIT Mesra...';
        const admin = state.allUsers.find(u => u.role === 'admin') || state.allUsers[1];
        state.currentUser = admin;
        state.activeRole = 'admin';
        state.adminSelectedState = 'Jharkhand';
        state.activeTab = 'admin';
        render();

        setTimeout(() => {
          state.demoStepText = 'Pilot Step 4/6: University Dean inspects evidence & forms multidisciplinary student team...';
          const uni = state.allUsers.find(u => u.role === 'university') || state.allUsers[2];
          state.currentUser = uni;
          state.activeRole = 'university';
          state.activeTab = 'university';
          render();

          setTimeout(() => {
            state.demoStepText = 'Pilot Step 5/6: Industry Partner (AgNext Technologies) joins with ₹6.5L grant & edge testing...';
            const ind = state.allUsers.find(u => u.role === 'industry') || state.allUsers[4];
            state.currentUser = ind;
            state.activeRole = 'industry';
            state.activeTab = 'industry';
            render();

            setTimeout(() => {
              state.demoStepText = 'Pilot Step 6/6: Student team tests prototype, deploys solution & records 12,500 beneficiaries in Khunti!';
              state.activeTab = 'impact';
              render();

              setTimeout(() => {
                state.isDemoRunning = false;
                state.demoStepText = null;
                render();
              }, 4000);
            }, 3000);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 2500);
  }

  // 2. PAN-INDIA SCALABILITY DEMO SEQUENCE
  function runPanIndiaScalabilityDemo() {
    state.isDemoRunning = true;

    // Stage 1: Jharkhand Primary Pilot
    state.selectedState = 'Jharkhand';
    state.adminSelectedState = 'Jharkhand';
    state.demoStepText = 'Scalability Stage 1/4: Primary Pilot in Jharkhand (Crop disease & Water fluoride deployments)...';
    state.activeTab = 'challenges';
    render();

    setTimeout(() => {
      // Stage 2: Scale to Andhra Pradesh
      state.selectedState = 'Andhra Pradesh';
      state.adminSelectedState = 'Andhra Pradesh';
      state.demoStepText = 'Scalability Stage 2/4: Expanding to Andhra Pradesh (Aquaculture salinity & Rayalaseema drought drip)...';
      state.activeTab = 'challenges';
      render();

      setTimeout(() => {
        // Stage 3: Scale to Maharashtra
        state.selectedState = 'Maharashtra';
        state.adminSelectedState = 'Maharashtra';
        state.demoStepText = 'Scalability Stage 3/4: Expanding to Maharashtra (Vidarbha pink bollworm & Godavari effluent network)...';
        state.activeTab = 'challenges';
        render();

        setTimeout(() => {
          // Stage 4: Pan-India Discovery & Cross-State Matching
          state.selectedState = 'Jharkhand';
          state.adminScope = 'All India';
          state.demoStepText = 'Scalability Stage 4/4: Nationwide Discovery & Cross-State University R&D Orchestration!';
          state.activeTab = 'explore_india';
          render();

          setTimeout(() => {
            state.isDemoRunning = false;
            state.demoStepText = null;
            render();
          }, 4500);
        }, 3200);
      }, 3200);
    }, 3000);
  }

  // Start on load
  window.addEventListener('DOMContentLoaded', () => {
    initData();
    render();
  });
})();
