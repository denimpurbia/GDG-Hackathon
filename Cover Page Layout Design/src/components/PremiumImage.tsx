import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface PremiumImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
  loading?: 'lazy' | 'eager';
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

const FALLBACK_IMAGE = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';

export function PremiumImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  showOverlay = false,
  overlayContent,
  loading = 'lazy',
  aspectRatio = '4/3',
  objectFit = 'cover',
  onLoad,
  onError,
}: PremiumImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [loading]);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const imageSrc = hasError ? FALLBACK_IMAGE : src;

  return (
    <div
      ref={imgRef}
      className={`image-container relative overflow-hidden ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {/* Loading Shimmer */}
      {isLoading && (
        <div className="absolute inset-0 image-loading" />
      )}

      {/* Image */}
      {isInView && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`premium-image ${className}`}
          style={{ objectFit }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Overlay Content */}
      {showOverlay && overlayContent && (
        <motion.div
          className="absolute inset-0 text-overlay-gradient flex items-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {overlayContent}
        </motion.div>
      )}
    </div>
  );
}

// HD Image Sizes for different breakpoints
export const getResponsiveImageUrl = (baseUrl: string, width: number): string => {
  // If using Unsplash, append size parameters
  if (baseUrl.includes('unsplash.com')) {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '85');
    url.searchParams.set('fm', 'jpg');
    return url.toString();
  }
  return baseUrl;
};

// Utility component for large hero images
export function HeroImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <PremiumImage
      src={getResponsiveImageUrl(src, 1920)}
      alt={alt}
      className={className}
      containerClassName="large-image-card"
      aspectRatio="16/9"
      loading="eager"
    />
  );
}

// Utility component for card images
export function CardImage({
  src,
  alt,
  title,
  subtitle,
  className = '',
}: {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <PremiumImage
      src={getResponsiveImageUrl(src, 800)}
      alt={alt}
      className={className}
      showOverlay={!!(title || subtitle)}
      overlayContent={
        title || subtitle ? (
          <div className="text-white">
            {title && <h3 className="text-xl md:text-2xl font-bold mb-1">{title}</h3>}
            {subtitle && <p className="text-sm md:text-base opacity-90">{subtitle}</p>}
          </div>
        ) : undefined
      }
      aspectRatio="4/3"
    />
  );
}
