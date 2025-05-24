import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div 
      className={`optimized-image-container ${className || ''}`}
      style={{
        width: width || '100%',
        height: height || 'auto',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden'
      }}
    >
      {!isLoaded && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="loading-spinner" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        loading="lazy"
      />
    </div>
  );
};

export default OptimizedImage; 