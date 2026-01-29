import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Search,
  ArrowRight,
  Compass,
  Star,
  Zap,
} from "lucide-react";

interface MobileHeroProps {
  onDiscoverPlaces: () => void;
  onBookJourney: () => void;
  onQuickSearch: (query: string) => void;
  onServiceClick: (service: string) => void;
  onLocationClick: () => void; // Add new prop for location badge click
}

const quickActions = [
  {
    id: "hotels",
    icon: "🏨",
    label: "Hotels",
    color: "bg-blue-500",
  },
  {
    id: "cars",
    icon: "🚗",
    label: "Cars",
    color: "bg-green-500",
  },
  {
    id: "food",
    icon: "🍽️",
    label: "Food",
    color: "bg-orange-500",
  },
  {
    id: "places",
    icon: "🏰",
    label: "Places",
    color: "bg-purple-500",
  },
];

const featuredCities = [
  {
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=1200&q=90",
    tag: "Pink City",
  },
  {
    name: "Udaipur",
    image:
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90",
    tag: "City of Lakes",
  },
  {
    name: "Jaisalmer",
    image:
      "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=1200&q=90",
    tag: "Golden City",
  },
];

const trendingDeals = [
  { title: "Palace Hotels", discount: "30% OFF", icon: "👑" },
  { title: "Desert Safari", discount: "25% OFF", icon: "🐪" },
  { title: "Car Rentals", discount: "40% OFF", icon: "🚗" },
];

// Slideshow images of famous Rajasthan landmarks
const slideshowImages = [
  {
    url: "https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=1200&q=90",
    alt: "Hawa Mahal at Dawn",
    location: "Jaipur"
  },
  {
    url: "https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=1200&q=90",
    alt: "Mehrangarh Fort",
    location: "Jodhpur"
  },
  {
    url: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90",
    alt: "Lake Pichola Palace",
    location: "Udaipur"
  },
  {
    url: "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=1200&q=90",
    alt: "Thar Desert Camel Safari",
    location: "Jaisalmer"
  },
  {
    url: "https://images.unsplash.com/photo-1583261429112-e0e7fe037a49?w=1200&q=90",
    alt: "Traditional Rajasthani Culture",
    location: "Rajasthan"
  }
];

export function MobileHero({
  onDiscoverPlaces,
  onBookJourney,
  onQuickSearch,
  onServiceClick,
  onLocationClick,
}: MobileHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onQuickSearch(searchQuery);
    }
  };

  return (
    <div className="relative">
      {/* Dynamic Slideshow Background */}
      <div className="relative h-80 overflow-hidden">
        {/* Background Images with Smooth Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={slideshowImages[currentSlide].url}
              alt={slideshowImages[currentSlide].alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered Gradient Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-orange-900/30"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.6%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Location Badge */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-4 right-4 z-20"
        >
          <Badge 
            onClick={onLocationClick}
            className="bg-white/20 backdrop-blur-md text-white border-white/30 px-3 py-1 cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            📍 {slideshowImages[currentSlide].location}
          </Badge>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {slideshowImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Enhanced Title with Better Text Shadow */}
            <h1
              className="text-5xl font-bold mb-3 drop-shadow-2xl"
              style={{ 
                fontFamily: "Georgia, serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.3)"
              }}
            >
              Explore
            </h1>
            <h1
              className="text-4xl font-bold mb-3 text-yellow-300 drop-shadow-2xl"
              style={{ 
                fontFamily: "Georgia, serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.3)"
              }}
            >
              राजस्थान
            </h1>
            <p
              className="text-2xl font-bold mb-8 opacity-95 drop-shadow-lg"
              style={{ 
                fontFamily: "Poppins, sans-serif",
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)"
              }}
            >
              Where Royalty Meets Adventure
            </p>

            {/* Enhanced CTA Buttons with Better Contrast */}
            <div className="flex gap-3 justify-center mb-6">
              <Button
                onClick={onBookJourney}
                className="bg-white/95 backdrop-blur-sm text-amber-700 hover:bg-white hover:text-amber-800 px-4 py-2 text-sm font-bold rounded-xl shadow-2xl border border-white/20 flex-1 transition-all duration-300"
              >
                <Compass className="w-4 h-4 mr-2" />
                🗺️ Explore Map
              </Button>
              <Button
                onClick={onDiscoverPlaces}
                className="bg-amber-600/90 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-amber-500 hover:border-white px-4 py-2 text-sm font-bold rounded-xl shadow-2xl flex-1 transition-all duration-300"
              >
                <Zap className="w-4 h-4 mr-2" />⚡ Quick Book
              </Button>
            </div>

            {/* Enhanced Search with Better Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20"
            >
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search hotels, places, food..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    className="pl-10 pr-3 py-3 text-base bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white transition-all duration-300 rounded-lg"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSearch()
                    }
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-amber-500 text-white hover:bg-amber-600 px-4 py-3 text-base shadow-lg transition-all duration-300 rounded-lg"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions - Moved down and made larger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="px-6 mt-12 relative z-20"
      >
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Quick Services
            </h3>
            <Badge
              variant="secondary"
              className="text-base px-4 py-2"
            >
              <Star className="w-5 h-5 mr-2" />
              Popular
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <motion.button
                key={action.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onServiceClick(action.id)}
                className="flex items-center gap-5 p-6 rounded-3xl hover:bg-gray-50 transition-colors bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-md"
              >
                <div
                  className={`w-20 h-20 rounded-3xl ${action.color} flex items-center justify-center text-3xl shadow-lg`}
                >
                  {action.icon}
                </div>
                <div className="text-left">
                  <span className="text-xl font-bold text-gray-900 block">
                    {action.label}
                  </span>
                  <span className="text-base text-gray-600">
                    Book instantly
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Featured Cities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-6 mt-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Featured Cities
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 p-0"
          >
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 -mr-6 pr-6">
          {featuredCities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.1,
              }}
              className="flex-shrink-0"
            >
              <Card className="w-36 overflow-hidden border-0 shadow-md">
                <div className="relative h-24">
                  <ImageWithFallback
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-2 left-2 text-xs bg-white/90 text-gray-800">
                    {city.tag}
                  </Badge>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-sm text-gray-900">
                    {city.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">
                      4.8
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trending Deals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="px-6 mt-8 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Trending Deals
          </h3>
          <Badge className="bg-red-500 text-white text-sm animate-pulse px-3 py-1">
            Limited Time
          </Badge>
        </div>

        <div className="space-y-3">
          {trendingDeals.map((deal, index) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.1,
              }}
            >
              <Card className="p-4 border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{deal.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {deal.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Book now and save
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-red-500 text-white font-bold">
                    {deal.discount}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}