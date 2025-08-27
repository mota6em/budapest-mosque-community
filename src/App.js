import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './components/HomePage';

// Islamic Guide Pages
import IslamicGuide from './pages/IslamicGuide';
import HadithPage from './pages/HadithPage';
import HadithDetailPage from './pages/HadithDetailPage';
import PrayerTimesPage from './pages/PrayerTimesPage';
import FastingTipsPage from './pages/FastingTipsPage';
import Islam101Page from './pages/Islam101Page';

// Donations Pages
import DonationsListPage from './pages/DonationsListPage';
import DonationDetailPage from './pages/DonationDetailPage';

// Calendar Pages
import CalendarPage from './pages/CalendarPage';

// Events Pages
import EventsPage from './pages/EventsPage';

// Jumaa Sermons Page (replaces Stories)
import SermonsListPage from './pages/SermonsListPage';
import SermonDetailPage from './pages/SermonDetailPage';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App bg-background text-foreground theme-transition">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Islamic Guide Routes */}
            <Route path="/islamic-guide" element={<IslamicGuide />} />
            <Route path="/hadith" element={<HadithPage />} />
            <Route path="/hadith/:id" element={<HadithDetailPage />} />
            <Route path="/prayer-times" element={<PrayerTimesPage />} />
            <Route path="/fasting-tips" element={<FastingTipsPage />} />
            <Route path="/islam-101" element={<Islam101Page />} />
            
            {/* Donations Routes */}
            <Route path="/donations" element={<DonationsListPage />} />
            <Route path="/donations/:id" element={<DonationDetailPage />} />
            
            {/* Calendar Routes */}
            <Route path="/calendar" element={<CalendarPage />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<EventsPage />} />
            
            {/* Jumaa Sermons Routes */}
            <Route path="/sermons" element={<SermonsListPage />} />
            <Route path="/sermons/:id" element={<SermonDetailPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
