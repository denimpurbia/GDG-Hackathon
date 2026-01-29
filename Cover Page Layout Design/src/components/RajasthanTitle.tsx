import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface RajasthanTitleProps {
  className?: string;
}

export function RajasthanTitle({ className = "" }: RajasthanTitleProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Explore Rajasthan";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`${className} flex flex-col items-center`}
    >
      {/* Main Title */}
      <div className="text-5xl md:text-7xl font-black text-white mb-4 tracking-wide drop-shadow-2xl text-center">
        <span style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          {displayText}
        </span>
        {currentIndex < fullText.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 bg-white ml-1"
          >
            |
          </motion.span>
        )}
      </div>
      
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="text-2xl md:text-4xl font-black text-amber-200 tracking-[0.1em] drop-shadow-xl text-center"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        Where Royalty Meets Adventure
      </motion.div>
    </motion.div>
  );
}