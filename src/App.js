import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminProvider } from "./contexts/AdminContext";
import HomePage from "./components/HomePage";

// Islamic Guide Pages
import IslamicGuide from "./pages/IslamicGuide";
import HadithPage from "./pages/HadithPage";
import HadithDetailPage from "./pages/HadithDetailPage";
import PrayerTimesPage from "./pages/PrayerTimesPage";
import FastingTipsPage from "./pages/FastingTipsPage";
import Islam101Page from "./pages/Islam101Page";

// Donations Pages
import DonationsListPage from "./pages/DonationsListPage";
import DonationDetailPage from "./pages/DonationDetailPage";

// Calendar Pages
import CalendarPage from "./pages/CalendarPage";

// Volunteer Opportunities Pages
import OpportunitiesListPage from "./pages/OpportunitiesListPage";
import OpportunityDetailPage from "./pages/OpportunityDetailPage";

// Stories & Blogs Pages
import StoriesListPage from "./pages/StoriesListPage";
import StoryDetailPage from "./pages/StoryDetailPage";

// Admin Pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminDonationsPage from "./pages/AdminDonationsPage";
import AdminEventsPage from "./pages/AdminEventsPage";
import AdminJumaaPage from "./pages/AdminJumaaPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminLayout from "./components/AdminLayout";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
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

              {/* Volunteer Opportunities Routes */}
              <Route
                path="/opportunities"
                element={<OpportunitiesListPage />}
              />
              <Route
                path="/opportunities/:id"
                element={<OpportunityDetailPage />}
              />

              {/* Stories & Blogs Routes */}
              <Route path="/stories" element={<StoriesListPage />} />
              <Route path="/stories/:id" element={<StoryDetailPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDashboardPage />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDashboardPage />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/donations"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDonationsPage />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminEventsPage />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/jumaa"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminJumaaPage />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminSettingsPage />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
