import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

interface CinematicHeroProps {
  onDiscoverPlaces: () => void;
  onBookJourney: () => void;
}

const rajasthanSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1673807095836-0904031b4f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjBhcmNoaXRlY3R1cmUlMjBqYWlwdXIlMjBmb3J0fGVufDF8fHx8MTc1NzY1NjQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Majestic Palaces",
    subtitle: "Jaipur's Royal Heritage"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1736323295014-9b81c7606cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwbGFrZSUyMHBhbGFjZSUyMGJvYXRzJTIwc3Vuc2V0fGVufDF8fHx8MTc1NzY1NjQyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Serene Lakes",
    subtitle: "Udaipur's Timeless Beauty"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607922276202-5007ffe552ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBjYW1lbCUyMHJpZGUlMjBqYWlzYWxtZXIlMjBkdW5lc3xlbnwxfHx8fDE3NTc2NTY0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Desert Adventures",
    subtitle: "Jaisalmer's Golden Dunes"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1633338718293-785082123de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBmb2xrJTIwZGFuY2UlMjBjdWx0dXJhbCUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc1NzY1NjQyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Cultural Heritage",
    subtitle: "Folk Dance & Traditions"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1642528922719-8876c7d17318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2RocHVyJTIwYmx1ZSUyMGNpdHklMjBtZWhyYW5nYXJoJTIwZm9ydHxlbnwxfHx8fDE3NTc2NTY0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Blue City Magic",
    subtitle: "Jodhpur's Azure Streets"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmUlMjBnb2xkZW4lMjBzdW5zZXR8ZW58MXx8fHwxNzU3NjU2NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Sacred Temples",
    subtitle: "Golden Hour Spirituality"
  }
];

export function CinematicHero({ onDiscoverPlaces, onBookJourney }: CinematicHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rajasthanSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rajasthanSlides.length) % rajasthanSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${rajasthanSlides[currentSlide].image}')`
              }}
            />
            {/* Soft dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic bars for that movie feel */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
      </div>

      {/* Media Controls */}
      <div className="absolute top-6 right-6 z-30 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="w-12 h-12 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30">
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-14 h-14 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30">
        <motion.button
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-14 h-14 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {rajasthanSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-amber-400 scale-125 shadow-lg shadow-amber-400/50' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-20 pt-32">
        <div className="text-center">
          {/* Main Headline with Cinematic Animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 mb-4 leading-tight drop-shadow-2xl"
              style={{ 
                fontFamily: 'Georgia, "Times New Roman", serif',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)'
              }}
            >
              Explore Rajasthan
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-2xl md:text-4xl lg:text-5xl font-light text-white/90 mb-8 leading-relaxed"
              style={{ 
                fontFamily: 'Georgia, "Times New Roman", serif',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
              }}
            >
              Where Royalty Meets Adventure
            </motion.h2>
          </motion.div>

          {/* Current Slide Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-xl md:text-2xl text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {rajasthanSlides[currentSlide].title}
              </p>
              <p className="text-lg text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                {rajasthanSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onDiscoverPlaces}
                size="lg"
                className="text-xl px-10 py-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-black font-bold shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 border-2 border-yellow-400/50"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                ✨ Discover Places
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onBookJourney}
                variant="outline"
                size="lg" 
                className="text-xl px-10 py-6 rounded-2xl border-3 border-white/70 text-white hover:bg-white/10 hover:border-white font-bold shadow-2xl hover:shadow-white/20 transition-all duration-300 backdrop-blur-sm"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                🚀 Book Your Journey
              </Button>
            </motion.div>
          </motion.div>

          {/* Royal Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            {/* Golden particles floating */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${50 + Math.random() * 50}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Cinematic Vignette Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
      </div>
    </section>
  );
}