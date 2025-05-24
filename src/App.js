import { Navigate, Routes, useLocation } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import LazyLoadWrapper from "./components/LazyLoadWrapper";
import Footer from "./components/Footer";
import "./App.css";
 

// Lazy load components
const Login = lazy(() => import("./Pages/Login"));
const Services = lazy(() => import("./Pages/Services"));
const User = lazy(() => import("./Pages/User"));
const Attendance = lazy(() => import("./Pages/Attendance"));
 const Qr = lazy(() => import("./Pages/Qr"));

// Loading component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

// Navigation feedback component
const NavigationFeedback = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location]);

  return isLoading ? <div className="page-loading" /> : null;
};

// Main App Content
const AppContent = () => {
  const location = useLocation();

  return (
    <>
       <div className="app">
        <LazyLoadWrapper>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               
              <Route
                path="/"
                element={<> <User /></>}
              />
              <Route
                path="/user/:displayName/QR"
                element={<Attendance />}
              />
              <Route
                path="/attendance"
                element={<Attendance />}
              />
              <Route
                path="/:date/:name/:duration/:score"
                element={<Qr />}
              />
              <Route
                path=":Page"
                element={<User />}
              />
            </Routes>
          </AnimatePresence> 
        </LazyLoadWrapper>
       
      </div>
    </>
  );
};

// Root App Component
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
