import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * LazyImage — drops in as a replacement for <img>.
 *
 * Features:
 *   • Native browser lazy loading (loading="lazy")
 *   • Intersection Observer: only starts loading once near viewport
 *   • Pulsing skeleton shown while image is loading
 *   • Smooth fade-in once loaded
 *   • Accepts all standard <img> props
 *
 * Usage:
 *   <LazyImage src="goku.png" alt="Goku" className="h-200" />
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  skeletonClassName = '',
  // pixels before the image enters the viewport at which loading begins
  rootMargin = '200px',
  ...imgProps
}) => {
  const [loaded, setLoaded] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,  // only fire once, no repeated loading
    rootMargin,
  });

  return (
    <div ref={ref} className={`relative inline-block ${className}`} style={{ lineHeight: 0 }}>
      {/* Skeleton — shown until the image finishes loading */}
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse bg-gray-700/40 rounded ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Image — only set src once it's near the viewport */}
      <img
        src={inView ? src : undefined}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ display: 'block' }}
        {...imgProps}
      />
    </div>
  );
};

export default LazyImage;
