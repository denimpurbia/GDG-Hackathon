import React, { useState, useEffect } from 'react'

// Better fallback SVG with gradient
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjdlZWE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNnKSIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwMCwgMzAwKSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMyI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjYwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiLz48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMzUiLz48cmVjdCB4PSItNzAiIHk9Ii04MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjMwIiByeD0iNSIvPjwvZz48dGV4dCB4PSI0MDAiIHk9IjQwMCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIG9wYWNpdHk9IjAuOSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(props.src)

  const { src, alt, style, className, loading = 'lazy', onError, onLoad, ...rest } = props

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src)
    setDidError(false)
    setIsLoading(true)
    setRetryCount(0)
  }, [src])

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Image failed to load: ${currentSrc}`)
    
    // Retry once with cache-busting
    if (retryCount < 1 && src) {
      console.log(`Retrying image load (attempt ${retryCount + 1})`)
      setRetryCount(prev => prev + 1)
      // Add timestamp to force reload
      const separator = src.includes('?') ? '&' : '?'
      setCurrentSrc(`${src}${separator}_retry=${Date.now()}`)
      return
    }

    // Give up after retry
    setDidError(true)
    setIsLoading(false)
    onError?.(event)
  }

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false)
    setDidError(false)
    onLoad?.(event)
  }

  return didError ? (
    <div
      className={`inline-block bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-center align-middle ${className ?? ''}`}
      style={style}
      data-image-component
    >
      <div className="flex items-center justify-center w-full h-full">
        <img 
          src={ERROR_IMG_SRC} 
          alt={alt || "Image not available"} 
          className="w-full h-full object-cover"
          {...rest} 
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <div className="relative w-full h-full" data-image-component>
      {isLoading && (
        <div 
          className={`absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 image-loading ${className ?? ''}`} 
          style={style}
          aria-hidden="true"
        />
      )}
      <img 
        src={currentSrc} 
        alt={alt || "Image"} 
        className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ease-in-out reveal-on-load`} 
        style={{ ...style, display: 'block', width: '100%', height: '100%' }} 
        loading={loading}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        {...rest} 
      />
    </div>
  )
}

