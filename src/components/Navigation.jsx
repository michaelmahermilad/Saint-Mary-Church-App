import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("go") === "7777777";

  const navItems = [
    { path: '/', label: 'الرئيسية', public: true },
    { path: '/activities', label: 'الأنشطة', public: false },
    { path: '/attendance', label: 'الحضور', public: false }
  ];

  const filteredNavItems = navItems.filter(item => item.public || isAuthenticated);

  if (filteredNavItems.length === 0) {
    return null;
  }

  return (
    <nav className="main-nav">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="nav-container"
        >
          {filteredNavItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {label}
              <motion.div
                className="nav-indicator"
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </NavLink>
          ))}
        </motion.div>
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 