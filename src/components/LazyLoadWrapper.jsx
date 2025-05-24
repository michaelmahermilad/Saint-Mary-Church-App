import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const LazyLoadWrapper = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      }>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadWrapper; 