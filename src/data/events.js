// Events data for the mosque community
export const eventsData = [
  {
    id: 1,
    title: "Friday Prayer Service",
    description: "Weekly Friday prayer service with khutbah. Join us for the blessed Friday prayer and listen to an inspiring sermon.",
    date: "2025-08-15",
    time: "1:30 PM",
    location: "Main Prayer Hall",
    category: "Prayer",
    type: "recurring",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop",
    attendees: 150,
    needsVolunteers: false,
    volunteerDetails: null,
    volunteerFormLink: null
  },
  {
    id: 2,
    title: "Islamic Studies Class",
    description: "Weekly Islamic studies class for adults covering various topics including Quran, Hadith, and Islamic history.",
    date: "2025-08-12",
    time: "7:00 PM",
    location: "Classroom 2",
    category: "Education",
    type: "recurring",
    image: "https://images.unsplash.com/photo-1523240794102-9c5f2a0b0b0b?w=400&h=300&fit=crop",
    attendees: 25,
    needsVolunteers: true,
    volunteerDetails: "Help with classroom setup, materials distribution, and student assistance",
    volunteerFormLink: "https://forms.google.com/volunteer-education"
  },
  {
    id: 3,
    title: "Ramadan Iftar Community Dinner",
    description: "Community iftar dinner during Ramadan. Share the blessed meal with fellow Muslims and strengthen community bonds.",
    date: "2025-08-18",
    time: "7:30 PM",
    location: "Community Hall",
    category: "Community",
    type: "special",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    attendees: 200,
    needsVolunteers: true,
    volunteerDetails: "Help with food preparation, serving, cleanup, and welcoming guests",
    volunteerFormLink: "https://forms.google.com/volunteer-iftar"
  },
  {
    id: 4,
    title: "Youth Group Meeting",
    description: "Weekly youth group activities and discussions. A safe space for young Muslims to connect, learn, and grow together.",
    date: "2025-08-20",
    time: "6:00 PM",
    location: "Youth Center",
    category: "Youth",
    type: "recurring",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    attendees: 40,
    needsVolunteers: true,
    volunteerDetails: "Mentor youth, help organize activities, and provide guidance",
    volunteerFormLink: "https://forms.google.com/volunteer-youth"
  },
  {
    id: 5,
    title: "Quran Recitation Circle",
    description: "Weekly Quran recitation and memorization circle. Perfect your tajweed and memorize verses in a supportive environment.",
    date: "2025-08-22",
    time: "8:00 PM",
    location: "Library",
    category: "Spiritual",
    type: "recurring",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop",
    attendees: 30,
    needsVolunteers: false,
    volunteerDetails: null,
    volunteerFormLink: null
  },
  {
    id: 6,
    title: "Eid al-Fitr Celebration",
    description: "Community celebration for Eid al-Fitr. Join us for prayers, festivities, and community bonding on this blessed day.",
    date: "2025-08-25",
    time: "10:00 AM",
    location: "Main Hall",
    category: "Holiday",
    type: "special",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    attendees: 500,
    needsVolunteers: true,
    volunteerDetails: "Help with event setup, crowd management, food service, and cleanup",
    volunteerFormLink: "https://forms.google.com/volunteer-eid"
  },
  {
    id: 7,
    title: "Islamic Art Workshop",
    description: "Learn the beautiful art of Islamic calligraphy and geometric patterns. All skill levels welcome.",
    date: "2025-08-28",
    time: "2:00 PM",
    location: "Art Studio",
    category: "Education",
    type: "special",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop",
    attendees: 20,
    needsVolunteers: true,
    volunteerDetails: "Assist with materials preparation, help participants, and manage supplies",
    volunteerFormLink: "https://forms.google.com/volunteer-art"
  },
  {
    id: 8,
    title: "Community Service Day",
    description: "Join us for a day of community service. We'll be cleaning local parks and helping elderly community members.",
    date: "2025-08-30",
    time: "9:00 AM",
    location: "Various Locations",
    category: "Community",
    type: "special",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    attendees: 75,
    needsVolunteers: true,
    volunteerDetails: "Lead service groups, coordinate activities, and provide support",
    volunteerFormLink: "https://forms.google.com/volunteer-service"
  },
  {
    id: 9,
    title: "Weekly Prayer Circle",
    description: "Join our weekly prayer circle for spiritual growth and community bonding.",
    date: "2025-09-01",
    time: "6:30 PM",
    location: "Prayer Room",
    category: "Prayer",
    type: "recurring",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop",
    attendees: 45,
    needsVolunteers: false,
    volunteerDetails: null,
    volunteerFormLink: null
  },
  {
    id: 10,
    title: "Islamic Finance Workshop",
    description: "Learn about Islamic banking, halal investments, and financial planning according to Islamic principles.",
    date: "2025-09-03",
    time: "3:00 PM",
    location: "Conference Room",
    category: "Education",
    type: "special",
    image: "https://images.unsplash.com/photo-1523240794102-9c5f2a0b0b0b?w=400&h=300&fit=crop",
    attendees: 35,
    needsVolunteers: true,
    volunteerDetails: "Help with registration, materials distribution, and Q&A session",
    volunteerFormLink: "https://forms.google.com/volunteer-finance"
  }
];

// Event categories
export const eventCategories = ['all', 'Prayer', 'Education', 'Community', 'Youth', 'Spiritual', 'Holiday'];

// Event types
export const eventTypes = ['all', 'recurring', 'special'];

// Helper functions
export const getCategoryColor = (category) => {
  switch (category) {
    case 'Prayer': return 'bg-blue-500 text-white';
    case 'Education': return 'bg-green-500 text-white';
    case 'Community': return 'bg-purple-500 text-white';
    case 'Youth': return 'bg-orange-500 text-white';
    case 'Spiritual': return 'bg-indigo-500 text-white';
    case 'Holiday': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const getTypeColor = (type) => {
  switch (type) {
    case 'special': return 'bg-yellow-500 text-black';
    case 'recurring': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatTime = (timeString) => {
  return timeString;
};

// Convert events data to FullCalendar format
export const getFullCalendarEvents = (events) => {
  return events.map(event => ({
    id: event.id.toString(),
    title: event.title,
    start: event.date,
    end: event.date,
    extendedProps: {
      description: event.description,
      time: event.time,
      location: event.location,
      category: event.category,
      type: event.type,
      image: event.image,
      attendees: event.attendees,
      needsVolunteers: event.needsVolunteers,
      volunteerDetails: event.volunteerDetails,
      volunteerFormLink: event.volunteerFormLink
    },
    backgroundColor: event.needsVolunteers ? '#f97316' : '#3b82f6',
    borderColor: event.needsVolunteers ? '#ea580c' : '#2563eb',
    textColor: '#ffffff'
  }));
};
