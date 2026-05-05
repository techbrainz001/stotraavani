import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import ConnectivityToast from '@/components/ConnectivityToast';
import PwaUpdatePrompt from '@/components/ui/PwaUpdatePrompt';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import './App.css';

// Lazy loaded screens
const SplashScreen = lazy(() => import('@/screens/SplashScreen'));
const HomeScreen = lazy(() => import('@/screens/HomeScreen'));
const GodCategoryScreen = lazy(() => import('@/screens/GodCategoryScreen'));
const SubcategoryListScreen = lazy(() => import('@/screens/SubcategoryListScreen'));
const ContentScreen = lazy(() => import('@/screens/ContentScreen'));
const BookmarksScreen = lazy(() => import('@/screens/BookmarksScreen'));
const SearchScreen = lazy(() => import('@/screens/SearchScreen'));
const AboutScreen = lazy(() => import('@/screens/AboutScreen'));



const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Suspense fallback={<SkeletonLoader type="splash" />}><SplashScreen /></Suspense>} />
        <Route path="/home" element={<Suspense fallback={<SkeletonLoader type="home" />}><HomeScreen /></Suspense>} />
        <Route path="/bookmarks" element={<Suspense fallback={<SkeletonLoader type="list" />}><BookmarksScreen /></Suspense>} />
        <Route path="/search" element={<Suspense fallback={<SkeletonLoader type="list" />}><SearchScreen /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<SkeletonLoader type="list" />}><AboutScreen /></Suspense>} />
        <Route path="/god/:godId" element={<Suspense fallback={<SkeletonLoader type="grid" />}><GodCategoryScreen /></Suspense>} />
        <Route path="/god/:godId/:category" element={<Suspense fallback={<SkeletonLoader type="list" />}><SubcategoryListScreen /></Suspense>} />
        <Route path="/god/:godId/:category/:stotraId" element={<Suspense fallback={<SkeletonLoader type="content" />}><ContentScreen /></Suspense>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
        <div className="premium-app-wrapper">
          <AnimatedRoutes />
          <ConnectivityToast />
          <PwaUpdatePrompt />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
