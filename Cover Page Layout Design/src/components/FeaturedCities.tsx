import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeaturedCitiesProps {
  onCityClick: (cityName: string) => void;
  onViewAllCities: () => void;
}

export function FeaturedCities({ onCityClick, onViewAllCities }: FeaturedCitiesProps) {
  const featuredCities = [
    {
      name: "Udaipur",
      tagline: "Venice of the East",
      description: "City of lakes, palaces & romance",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90",
      color: "from-blue-600 to-cyan-600",
      highlights: ["Lake Pichola", "City Palace", "Jag Mandir"],
      rating: 4.8
    },
    {
      name: "Jaipur",
      tagline: "The Pink City",
      description: "Capital city with royal palaces",
      image: "https://images.unsplash.com/photo-1677868818231-b5e09bcfc5e3?w=1200&q=90",
      color: "from-pink-600 to-rose-600",
      highlights: ["Amber Fort", "Hawa Mahal", "City Palace"],
      rating: 4.7
    },
    {
      name: "Jodhpur",
      tagline: "The Blue City",
      description: "Blue houses & mighty fort",
      image: "https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=1200&q=90",
      color: "from-blue-700 to-indigo-700",
      highlights: ["Mehrangarh Fort", "Blue Houses", "Umaid Bhawan"],
      rating: 4.6
    },
    {
      name: "Jaisalmer",
      tagline: "The Golden City",
      description: "Desert fort & sand dunes",
      image: "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=1200&q=90",
      color: "from-yellow-600 to-orange-600",
      highlights: ["Golden Fort", "Desert Safari", "Sam Sand Dunes"],
      rating: 4.5
    },
    {
      name: "Pushkar",
      tagline: "The Holy City",
      description: "Sacred lake & camel fair",
      image: "https://images.unsplash.com/photo-1583261429112-e0e7fe037a49?w=1200&q=90",
      color: "from-purple-600 to-pink-600",
      highlights: ["Pushkar Lake", "Brahma Temple", "Camel Fair"],
      rating: 4.4
    },
    {
      name: "Mount Abu",
      tagline: "The Hill Station",
      description: "Cool retreat & temples",
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=1200&q=90",
      color: "from-green-600 to-emerald-600",
      highlights: ["Dilwara Temples", "Nakki Lake", "Sunset Point"],
      rating: 4.3
    }
  ];

  return (
    <section id="featured-cities" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Featured Cities of Rajasthan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each city tells a unique story of royalty, culture, and adventure. 
            Click on any city to explore places, hotels, rentals, food, and safety information.
          </p>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => onCityClick(city.name)}
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0">
                <div className="relative">
                  <div className="h-64 overflow-hidden">
                    <ImageWithFallback
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${city.color} opacity-80`}></div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {city.rating}
                    </Badge>
                  </div>

                  {/* City info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                    <p className="text-white/90 font-medium mb-2">{city.tagline}</p>
                    <p className="text-white/80 text-sm mb-3">{city.description}</p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {city.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Full city guide available</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 group-hover:text-amber-700 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Cities CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button 
            onClick={onViewAllCities}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <MapPin className="w-5 h-5" />
            View All Rajasthan Cities
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}