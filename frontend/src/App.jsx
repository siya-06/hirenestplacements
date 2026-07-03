import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading route components for code splitting & bundle performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const JobDetailsPage = lazy(() => import('./pages/JobDetailsPage'));
const SubmitResumePage = lazy(() => import('./pages/SubmitResumePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPortalPage = lazy(() => import('./pages/AdminPortalPage'));

// Standalone ScrollToTop utility on navigation transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Sleek loading screen for page Suspense fallbacks
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[400px] bg-background">
    <div className="text-center">
      <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-2">progress_activity</span>
      <p className="text-on-surface-variant font-label-md">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/submit-resume" element={<SubmitResumePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPortalPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
