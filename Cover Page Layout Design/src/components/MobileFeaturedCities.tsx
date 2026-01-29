import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  ArrowRight,
  Heart,
  Camera,
  Navigation,
  Thermometer,
  Clock
} from "lucide-react";

interface MobileFeaturedCitiesProps {
  onCityClick: (cityName: string) => void;
  onViewAllCities: () => void;
}

const featuredCities = [
  {
    name: "Jaipur",
    hindiName: "जयपुर",
    tag: "Pink City",
    image: "https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=1200&q=90",
    rating: 4.8,
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace"],
    bestTime: "Oct-Mar",
    temp: "25°C",
    description: "Royal palaces and vibrant bazaars",
    specialOffer: "30% OFF Palace Tours"
  },
  {
    name: "Udaipur",
    hindiName: "उदयपुर",
    tag: "City of Lakes",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90",
    rating: 4.9,
    attractions: ["Lake Pichola", "City Palace", "Jagmandir"],
    bestTime: "Oct-Mar",
    temp: "23°C",
    description: "Romantic lakes and marble palaces",
    specialOffer: "25% OFF Lake Tours"
  },
  {
    name: "Jodhpur",
    hindiName: "जोधपुर",
    tag: "Blue City",
    image: "https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=1200&q=90",
    rating: 4.7,
    attractions: ["Mehrangarh Fort", "Blue Houses", "Umaid Palace"],
    bestTime: "Nov-Feb",
    temp: "22°C",
    description: "Majestic fort overlooking blue houses",
    specialOffer: "Free Fort Audio Guide"
  },
  {
    name: "Jaisalmer",
    hindiName: "जैसलमेर",
    tag: "Golden City",
    image: "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=1200&q=90",
    rating: 4.6,
    attractions: ["Desert Safari", "Golden Fort", "Sand Dunes"],
    bestTime: "Nov-Feb",
    temp: "20°C",
    description: "Golden desert and camel safaris",
    specialOffer: "40% OFF Desert Safari"
  },
  {
    name: "Pushkar",
    hindiName: "पुष्कर",
    tag: "Sacred City",
    image: "https://images.unsplash.com/photo-1583261429112-e0e7fe037a49?w=1200&q=90",
    rating: 4.5,
    attractions: ["Brahma Temple", "Pushkar Lake", "Camel Fair"],
    bestTime: "Oct-Mar",
    temp: "24°C",
    description: "Holy lake and divine temples",
    specialOffer: "Spiritual Tour Package"
  },
  {
    name: "Mount Abu",
    hindiName: "माउंट आबू",
    tag: "Hill Station",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=1200&q=90",
    rating: 4.4,
    attractions: ["Dilwara Temples", "Sunset Point", "Nakki Lake"],
    bestTime: "Mar-Jun",
    temp: "18°C",
    description: "Cool climate and Jain temples",
    specialOffer: "Hill Station Escape Deal"
  },
  {
    name: "Bikaner",
    hindiName: "बीकानेर",
    tag: "Camel Country",
    image: "https://images.unsplash.com/photo-1652019126778-c0937662c884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCaWthbmVyJTIwUmFqYXN0aGFuJTIwSnVuYWdhcmglMjBGb3J0fGVufDF8fHx8MTc1ODAxNTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.3,
    attractions: ["Junagarh Fort", "Camel Breeding Farm", "Karni Mata Temple"],
    bestTime: "Oct-Mar",
    temp: "26°C",
    description: "Magnificent fort and camel safaris",
    specialOffer: "Camel Safari Package"
  },
  {
    name: "Ajmer",
    hindiName: "अजमेर",
    tag: "Spiritual Hub",
    image: "https://images.unsplash.com/photo-1708674454070-0e8fbd05506f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBam1lciUyMFNoYXJpZiUyMERhcmdhaCUyMFJhamFzdGhhbnxlbnwxfHx8fDE3NTgwMTU1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    attractions: ["Ajmer Sharif Dargah", "Ana Sagar Lake", "Adhai Din Ka Jhonpra"],
    bestTime: "Oct-Mar",
    temp: "24°C",
    description: "Sacred dargah and spiritual peace",
    specialOffer: "Spiritual Tour Guide"
  },
  {
    name: "Chittorgarh",
    hindiName: "चित्तौड़गढ़",
    tag: "Land of Valor",
    image: "https://images.unsplash.com/photo-1730047617326-98582497f0aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGl0dG9yZ2FyaCUyMEZvcnQlMjBSYWphc3RoYW58ZW58MXx8fHwxNzU4MDE1NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    attractions: ["Chittorgarh Fort", "Vijay Stambh", "Rana Kumbha Palace"],
    bestTime: "Oct-Mar",
    temp: "23°C",
    description: "Largest fort complex in India",
    specialOffer: "Heritage Fort Tour"
  },
  {
    name: "Alwar",
    hindiName: "अलवर",
    tag: "Tiger Gate",
    image: "https://images.unsplash.com/photo-1568929399443-121e28f1f818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbHdhciUyMEJhbGElMjBRdWlsYSUyMEZvcnQlMjBSYWphc3RoYW58ZW58MXx8fHwxNzU4MDE1NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.2,
    attractions: ["Bala Quila", "Sariska Tiger Reserve", "Siliserh Lake"],
    bestTime: "Oct-Apr",
    temp: "22°C",
    description: "Ancient fort and wildlife sanctuary",
    specialOffer: "Wildlife Safari Deal"
  },
  {
    name: "Bharatpur",
    hindiName: "भरतपुर",
    tag: "Bird Paradise",
    image: "https://images.unsplash.com/photo-1679721123252-2c0258096a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCaGFyYXRwdXIlMjBLZW9sYWRlbyUyMEJpcmQlMjBTYW5jdHVhcnl8ZW58MXx8fHwxNzU4MDE1NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    attractions: ["Keoladeo National Park", "Bharatpur Palace", "Bird Watching"],
    bestTime: "Oct-Mar",
    temp: "21°C",
    description: "UNESCO World Heritage bird sanctuary",
    specialOffer: "Bird Watching Package"
  },
  {
    name: "Ranthambore",
    hindiName: "रणथम्भौर",
    tag: "Tiger Reserve",
    image: "https://images.unsplash.com/photo-1674579646088-9e50982c4c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYW50aGFtYm9yZSUyME5hdGlvbmFsJTIwUGFyayUyMFRpZ2VyfGVufDF8fHx8MTc1ODAxNTUzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    attractions: ["Tiger Safari", "Ranthambore Fort", "Wildlife Photography"],
    bestTime: "Oct-Apr",
    temp: "25°C",
    description: "Famous tiger reserve and ancient fort",
    specialOffer: "Tiger Safari Package"
  }
];

const quickStats = [
  { label: "Cities", value: "25+", icon: MapPin },
  { label: "Hotels", value: "1200+", icon: Star },
  { label: "Tours", value: "200+", icon: Camera },
  { label: "Travelers", value: "50K+", icon: Users }
];

export function MobileFeaturedCities({ onCityClick, onViewAllCities }: MobileFeaturedCitiesProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [likedCities, setLikedCities] = useState<Set<string>>(new Set());

  const handleLikeCity = (cityName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedCities = new Set(likedCities);
    if (likedCities.has(cityName)) {
      newLikedCities.delete(cityName);
    } else {
      newLikedCities.add(cityName);
    }
    setLikedCities(newLikedCities);
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    // Add a small delay for the animation before navigating
    setTimeout(() => {
      onCityClick(cityName);
    }, 300);
  };

  return (
    <div className="px-6 py-8 bg-gray-50">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
          <Star className="w-3 h-3 mr-1" />
          Featured Destinations
        </Badge>
        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
          Discover Royal <span className="text-amber-600">राजस्थान</span>
        </h2>
        <p className="text-gray-600 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
          Explore cities where every stone tells a story of valor and grandeur
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <stat.icon className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Cities Grid */}
      <div className="space-y-4 mb-8">
        {featuredCities.map((city, index) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => handleCitySelect(city.name)}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-52">
                <img
                  src={city.image}
                  alt={`${city.name} - ${city.tag}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&crop=center`;
                  }}
                />
                
                {/* Multi-layer Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                
                {/* City Tag */}
                <Badge className="absolute top-4 left-4 bg-white/95 text-gray-800 backdrop-blur-sm border-0 font-medium">
                  {city.tag}
                </Badge>
                
                {/* Like Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleLikeCity(city.name, e)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Heart className={`w-5 h-5 ${likedCities.has(city.name) ? 'text-red-500 fill-current' : 'text-white'}`} />
                </motion.button>

                {/* Special Offer */}
                {city.specialOffer && (
                  <Badge className="absolute bottom-4 left-4 bg-red-500 text-white animate-pulse">
                    {city.specialOffer}
                  </Badge>
                )}

                {/* City Info Overlay */}
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-xl font-bold mb-1 drop-shadow-lg" style={{ fontFamily: "Georgia, serif" }}>
                    {city.name}
                  </h3>
                  <div className="text-sm opacity-90 drop-shadow-md" style={{ fontFamily: "system-ui" }}>
                    {city.hindiName}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Rating and Weather */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">{city.rating}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-sm">{city.temp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{city.bestTime}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3">{city.description}</p>

                {/* Attractions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {city.attractions.slice(0, 3).map((attraction) => (
                    <Badge key={attraction} variant="secondary" className="text-xs">
                      {attraction}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCitySelect(city.name);
                    }}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Explore
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle quick booking
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Selection Animation */}
              <AnimatePresence>
                {selectedCity === city.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-amber-500/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="bg-white rounded-full p-4">
                      <Navigation className="w-8 h-8 text-amber-600 animate-spin" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Cities Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center"
      >
        <Button
          onClick={onViewAllCities}
          variant="outline"
          className="w-full py-6 border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300 text-amber-700"
        >
          <MapPin className="w-5 h-5 mr-2" />
          View All 25+ Cities
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <p className="text-sm text-gray-500 mt-3">
          Discover hidden gems across Rajasthan with our interactive map
        </p>
      </motion.div>
    </div>
  );
}