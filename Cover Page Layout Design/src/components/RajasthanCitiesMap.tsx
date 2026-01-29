import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Plane, 
  Train, 
  Building2, 
  Utensils, 
  Camera, 
  Shield,
  Star,
  Users,
  Clock
} from "lucide-react";

interface City {
  name: string;
  position: { x: number; y: number };
  tagline: string;
  rating: number;
  highlights: string[];
  color: string;
  isHighlighted: boolean;
  population: string;
  bestTime: string;
  famousFor: string[];
}

interface RajasthanCitiesMapProps {
  onCitySelect: (cityName: string) => void;
  onBack: () => void;
}

export function RajasthanCitiesMap({ onCitySelect, onBack }: RajasthanCitiesMapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [zoomedCity, setZoomedCity] = useState<string | null>(null);

  // Rajasthan cities with their approximate positions on the map
  const cities: City[] = [
    {
      name: "Jaipur",
      position: { x: 60, y: 45 },
      tagline: "The Pink City",
      rating: 4.7,
      highlights: ["Amber Fort", "Hawa Mahal", "City Palace"],
      color: "from-pink-600 to-rose-600",
      isHighlighted: true,
      population: "3.1M",
      bestTime: "Oct-Mar",
      famousFor: ["Royal Palaces", "Pink Architecture", "Jewelry"]
    },
    {
      name: "Udaipur",
      position: { x: 45, y: 70 },
      tagline: "Venice of the East",
      rating: 4.8,
      highlights: ["Lake Pichola", "City Palace", "Jag Mandir"],
      color: "from-blue-600 to-cyan-600",
      isHighlighted: true,
      population: "451K",
      bestTime: "Sep-Mar",
      famousFor: ["Lakes", "Palaces", "Romance"]
    },
    {
      name: "Jodhpur",
      position: { x: 35, y: 55 },
      tagline: "The Blue City",
      rating: 4.6,
      highlights: ["Mehrangarh Fort", "Blue Houses", "Umaid Bhawan"],
      color: "from-blue-700 to-indigo-700",
      isHighlighted: true,
      population: "1.1M",
      bestTime: "Oct-Mar",
      famousFor: ["Blue Houses", "Mehrangarh Fort", "Desert"]
    },
    {
      name: "Jaisalmer",
      position: { x: 15, y: 50 },
      tagline: "The Golden City",
      rating: 4.5,
      highlights: ["Golden Fort", "Desert Safari", "Sam Sand Dunes"],
      color: "from-yellow-600 to-orange-600",
      isHighlighted: true,
      population: "78K",
      bestTime: "Nov-Feb",
      famousFor: ["Desert", "Golden Fort", "Camel Safari"]
    },
    {
      name: "Pushkar",
      position: { x: 50, y: 55 },
      tagline: "The Holy City",
      rating: 4.4,
      highlights: ["Pushkar Lake", "Brahma Temple", "Camel Fair"],
      color: "from-purple-600 to-pink-600",
      isHighlighted: true,
      population: "21K",
      bestTime: "Oct-Mar",
      famousFor: ["Sacred Lake", "Brahma Temple", "Camel Fair"]
    },
    {
      name: "Mount Abu",
      position: { x: 40, y: 85 },
      tagline: "The Hill Station",
      rating: 4.3,
      highlights: ["Dilwara Temples", "Nakki Lake", "Sunset Point"],
      color: "from-green-600 to-emerald-600",
      isHighlighted: true,
      population: "22K",
      bestTime: "All Year",
      famousFor: ["Hill Station", "Jain Temples", "Cool Climate"]
    },
    {
      name: "Bikaner",
      position: { x: 30, y: 30 },
      tagline: "The Camel City",
      rating: 4.2,
      highlights: ["Junagarh Fort", "Camel Breeding Farm", "Bikaneri Bhujia"],
      color: "from-orange-600 to-red-600",
      isHighlighted: false,
      population: "644K",
      bestTime: "Oct-Mar",
      famousFor: ["Camel Safari", "Sweets", "Desert Fort"]
    },
    {
      name: "Ajmer",
      position: { x: 52, y: 50 },
      tagline: "City of Sufi Saints",
      rating: 4.1,
      highlights: ["Ajmer Sharif", "Ana Sagar Lake", "Taragarh Fort"],
      color: "from-teal-600 to-blue-600",
      isHighlighted: false,
      population: "551K",
      bestTime: "Oct-Mar",
      famousFor: ["Ajmer Sharif", "Sufi Culture", "Religious Tourism"]
    },
    {
      name: "Chittorgarh",
      position: { x: 55, y: 65 },
      tagline: "City of Valor",
      rating: 4.0,
      highlights: ["Chittorgarh Fort", "Vijay Stambh", "Rana Kumbha Palace"],
      color: "from-red-600 to-orange-600",
      isHighlighted: false,
      population: "117K",
      bestTime: "Oct-Mar",
      famousFor: ["Historical Fort", "Rajput Valor", "Heritage"]
    },
    {
      name: "Alwar",
      position: { x: 65, y: 35 },
      tagline: "The Tiger Gate of Rajasthan",
      rating: 3.9,
      highlights: ["Sariska Tiger Reserve", "Bala Quila", "City Palace"],
      color: "from-green-600 to-teal-600",
      isHighlighted: false,
      population: "341K",
      bestTime: "Oct-Mar",
      famousFor: ["Tiger Reserve", "Wildlife", "Forts"]
    },
    {
      name: "Bharatpur",
      position: { x: 75, y: 40 },
      tagline: "The Eastern Gateway",
      rating: 3.8,
      highlights: ["Keoladeo National Park", "Bharatpur Palace", "Bird Sanctuary"],
      color: "from-emerald-600 to-green-600",
      isHighlighted: false,
      population: "252K",
      bestTime: "Oct-Mar",
      famousFor: ["Bird Sanctuary", "Wildlife", "Wetlands"]
    },
    {
      name: "Kota",
      position: { x: 62, y: 70 },
      tagline: "The Education City",
      rating: 3.7,
      highlights: ["City Palace", "Chambal Gardens", "Jagmandir Palace"],
      color: "from-blue-600 to-purple-600",
      isHighlighted: false,
      population: "1.0M",
      bestTime: "Oct-Mar",
      famousFor: ["Education Hub", "Coaching Centers", "River Chambal"]
    }
  ];

  const handleCityClick = (city: City) => {
    setSelectedCity(city.name);
    if (city.isHighlighted) {
      // For highlighted cities, show zoom view
      setZoomedCity(city.name);
    }
  };

  const handleCityExplore = (cityName: string) => {
    onCitySelect(cityName);
  };

  const getCityMapFeatures = (cityName: string) => {
    const features: Record<string, string[]> = {
      "Jaipur": ["Sanganer Airport", "Jaipur Railway Station", "Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
      "Udaipur": ["Maharana Pratap Airport", "Udaipur City Railway Station", "Lake Pichola", "City Palace", "Jagmandir", "Fateh Sagar Lake"],
      "Jodhpur": ["Jodhpur Airport", "Jodhpur Railway Station", "Mehrangarh Fort", "Umaid Bhawan Palace", "Clock Tower", "Mandore Gardens"],
      "Jaisalmer": ["Jaisalmer Airport", "Jaisalmer Railway Station", "Golden Fort", "Sam Sand Dunes", "Gadisar Lake", "Patwon Ki Haveli"],
      "Pushkar": ["Kishangarh Airport (60km)", "Ajmer Railway Station (15km)", "Pushkar Lake", "Brahma Temple", "Savitri Temple", "Pushkar Bazaar"],
      "Mount Abu": ["Udaipur Airport (165km)", "Abu Road Railway Station (28km)", "Dilwara Temples", "Nakki Lake", "Guru Shikhar", "Sunset Point"]
    };
    return features[cityName] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline">
              ← Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Explore All Rajasthan Cities
            </h1>
            <div className="flex gap-2">
              <Badge className="bg-amber-100 text-amber-800">
                {cities.filter(c => c.isHighlighted).length} Featured Cities
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {cities.length} Total Cities
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!zoomedCity ? (
          /* Main Map View */
          <div className="space-y-8">
            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg"></div>
                <span className="text-sm font-medium">Featured Cities (Click to explore)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                <span className="text-sm font-medium">Other Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Interactive Map Markers</span>
              </div>
            </div>

            {/* Interactive Rajasthan Map */}
            <Card className="relative overflow-hidden">
              <div className="relative h-[600px] bg-gradient-to-br from-amber-100 to-orange-100">
                {/* Background Map Outline */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M10,30 Q15,25 25,28 L35,25 Q45,20 55,25 L70,22 Q80,25 85,35 L88,50 Q85,65 80,75 L70,80 Q60,85 50,82 L35,85 Q25,82 20,75 L15,65 Q10,50 12,40 Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                {/* City Markers */}
                {cities.map((city) => (
                  <motion.div
                    key={city.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: Math.random() * 0.5 }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${city.position.x}%`,
                      top: `${city.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleCityClick(city)}
                  >
                    {/* City Marker */}
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg transition-all duration-300 group-hover:scale-125 ${
                        city.isHighlighted
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      } ${selectedCity === city.name ? 'scale-150 ring-4 ring-white' : ''}`}
                    ></div>

                    {/* City Name Label */}
                    <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      selectedCity === city.name || city.isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {city.name}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>

                    {/* Hover Card */}
                    {selectedCity === city.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-64 z-10"
                      >
                        <h3 className="font-semibold text-lg mb-1">{city.name}</h3>
                        <p className="text-amber-600 text-sm mb-2">{city.tagline}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{city.rating}</span>
                          <Users className="w-4 h-4 text-gray-500 ml-2" />
                          <span className="text-sm text-gray-600">{city.population}</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-3">
                          <div>Best Time: {city.bestTime}</div>
                          <div>Famous For: {city.famousFor.join(", ")}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleCityExplore(city.name)}
                            className={`bg-gradient-to-r ${city.color} text-white`}
                          >
                            Explore City
                          </Button>
                          {city.isHighlighted && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setZoomedCity(city.name)}
                            >
                              City Map
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Map Title */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                    राजस्थान - Land of Kings
                  </h2>
                  <p className="text-sm text-gray-600">Click on highlighted cities to explore</p>
                </div>

                {/* Distance Indicator */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-xs text-gray-600">Scale</div>
                  <div className="w-16 h-1 bg-gray-400 mt-1"></div>
                  <div className="text-xs text-gray-600 mt-1">~100km</div>
                </div>
              </div>
            </Card>

            {/* Featured Cities Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Featured Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.filter(city => city.isHighlighted).map((city) => (
                  <motion.div
                    key={city.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                          onClick={() => handleCityExplore(city.name)}>
                      <div className={`h-4 bg-gradient-to-r ${city.color}`}></div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                            <p className="text-amber-600 font-medium">{city.tagline}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            <Star className="w-3 h-3 mr-1" />
                            {city.rating}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Population: {city.population}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Best Time: {city.bestTime}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Famous For:</h4>
                          <div className="flex flex-wrap gap-1">
                            {city.famousFor.map((item, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className={`flex-1 bg-gradient-to-r ${city.color}`}>
                            <Camera className="w-4 h-4 mr-2" />
                            Explore
                          </Button>
                          <Button variant="outline" onClick={(e) => { e.stopPropagation(); setZoomedCity(city.name); }}>
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Zoomed City Map View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <Button onClick={() => setZoomedCity(null)} variant="outline">
                ← Back to Map
              </Button>
              <h2 className="text-2xl font-bold">{zoomedCity} City Map</h2>
              <Button onClick={() => handleCityExplore(zoomedCity)} className="bg-gradient-to-r from-amber-500 to-orange-500">
                Explore {zoomedCity}
              </Button>
            </div>

            {/* City Map Placeholder */}
            <Card className="relative overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {/* Google Map Style Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{zoomedCity} Interactive Map</h3>
                    <p className="text-gray-600 mb-4">Detailed city map with points of interest</p>
                    <div className="text-sm text-gray-500">
                      Integration with Google Maps API for live navigation
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" className="w-10 h-10 p-0">+</Button>
                  <Button size="sm" className="w-10 h-10 p-0">-</Button>
                </div>

                {/* Navigation Button */}
                <div className="absolute bottom-4 right-4">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                </div>
              </div>
            </Card>

            {/* City Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-500" />
                  Transportation
                </h3>
                <div className="space-y-2 text-sm">
                  {getCityMapFeatures(zoomedCity).filter(f => f.includes('Airport') || f.includes('Railway')).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {feature.includes('Airport') ? <Plane className="w-4 h-4 text-blue-500" /> : <Train className="w-4 h-4 text-green-500" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-500" />
                  Attractions
                </h3>
                <div className="space-y-2 text-sm">
                  {getCityMapFeatures(zoomedCity).filter(f => !f.includes('Airport') && !f.includes('Railway')).slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-purple-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Building2 className="w-4 h-4 mr-2" />
                    Book Hotels
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Car className="w-4 h-4 mr-2" />
                    Rent Vehicle
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Utensils className="w-4 h-4 mr-2" />
                    Find Restaurants
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Safety Info
                  </Button>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}