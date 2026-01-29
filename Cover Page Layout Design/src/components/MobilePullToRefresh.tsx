import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
import { RefreshCw, Sparkles } from "lucide-react";

interface MobilePullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

export function MobilePullToRefresh({ 
  children, 
  onRefresh, 
  threshold = 80 
}: MobilePullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, threshold / 2, threshold], [0, 0.5, 1]);
  const rotate = useTransform(y, [0, threshold], [0, 180]);
  const scale = useTransform(y, [0, threshold / 2, threshold], [0.8, 0.9, 1]);

  const handlePanStart = () => {
    // Only allow refresh when at the top of the page
    if (window.scrollY === 0) {
      setCanRefresh(true);
    }
  };

  const handlePan = (event: any, info: PanInfo) => {
    if (!canRefresh || isRefreshing) return;
    
    if (info.delta.y > 0 && y.get() >= 0) {
      y.set(Math.min(info.point.y, threshold * 1.5));
    }
  };

  const handlePanEnd = async () => {
    if (!canRefresh || isRefreshing) return;
    
    if (y.get() >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    y.set(0);
    setCanRefresh(false);
  };

  useEffect(() => {
    if (isRefreshing) {
      y.set(threshold);
    } else {
      y.set(0);
    }
  }, [isRefreshing, y, threshold]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull to Refresh Indicator */}
      <motion.div
        style={{ 
          y: y,
          opacity,
          scale
        }}
        className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center justify-center h-20 bg-gradient-to-b from-amber-50 to-transparent"
      >
        <motion.div
          style={{ rotate }}
          className="mb-2"
        >
          {isRefreshing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-6 h-6 text-amber-600" />
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <RefreshCw className="w-6 h-6 text-amber-600" />
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
          )}
        </motion.div>
        
        <motion.p 
          className="text-sm text-amber-700 font-medium text-center"
          animate={{ opacity: isRefreshing ? 1 : canRefresh && y.get() >= threshold ? 1 : 0.7 }}
        >
          {isRefreshing 
            ? "Refreshing your journey..." 
            : y.get() >= threshold 
              ? "Release to refresh" 
              : "Pull down to refresh"
          }
        </motion.p>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.2, bottom: 0 }}
        className="touch-pan-y"
      >
        {children}
      </motion.div>

      {/* Loading Overlay */}
      {isRefreshing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 z-40"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-white/30"
          />
        </motion.div>
      )}
    </div>
  );
}