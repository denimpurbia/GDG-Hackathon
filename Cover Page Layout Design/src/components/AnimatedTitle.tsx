import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedTitleProps {
  englishText: string;
  hindiText: string;
  className?: string;
}

export function AnimatedTitle({ englishText, hindiText, className = "" }: AnimatedTitleProps) {
  const [displayEnglish, setDisplayEnglish] = useState("");
  const [displayHindi, setDisplayHindi] = useState("");
  const [currentEnglishIndex, setCurrentEnglishIndex] = useState(0);
  const [currentHindiIndex, setCurrentHindiIndex] = useState(0);
  const [showHindi, setShowHindi] = useState(false);

  useEffect(() => {
    if (currentEnglishIndex < englishText.length) {
      const timeout = setTimeout(() => {
        setDisplayEnglish(prev => prev + englishText[currentEnglishIndex]);
        setCurrentEnglishIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    } else if (!showHindi) {
      setTimeout(() => setShowHindi(true), 300);
    }
  }, [currentEnglishIndex, englishText, showHindi]);

  useEffect(() => {
    if (showHindi && currentHindiIndex < hindiText.length) {
      const timeout = setTimeout(() => {
        setDisplayHindi(prev => prev + hindiText[currentHindiIndex]);
        setCurrentHindiIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentHindiIndex, hindiText, showHindi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`${className} flex flex-col items-center`}
    >
      {/* English Text */}
      <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-[0.15em] uppercase drop-shadow-2xl">
        <span style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          {displayEnglish}
        </span>
        {currentEnglishIndex < englishText.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 bg-white ml-1"
          >
            |
          </motion.span>
        )}
      </div>
      
      {/* Hindi Text */}
      <div className="text-6xl md:text-8xl font-black text-amber-100 tracking-wide drop-shadow-2xl">
        <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {displayHindi}
        </span>
        {showHindi && currentHindiIndex < hindiText.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 bg-amber-100 ml-1"
          >
            |
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}