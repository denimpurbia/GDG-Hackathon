import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Building2, 
  Car, 
  Utensils, 
  Camera, 
  Train, 
  Plane, 
  Bus,
  Star,
  IndianRupee,
  MessageCircle,
  Route,
  ShoppingBag,
  Shield,
  Phone,
  Heart,
  Plus,
  Zap,
  Globe,
  Bot,
  Sparkles,
  Clock,
  Users,
  X
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingModal, ItineraryModal } from "./BookingModals";

interface InteractiveRajasthanMapProps {
  onBack: () => void;
  onCitySelect?: (cityName: string) => void;
  onNavigateToSection?: (section: string) => void;
}

interface CityData {
  id: string;
  name: string;
  tagline: string;
  position: { x: number; y: number };
  isAvailable: boolean;
  image: string;
  rating: number;
  population: string;
  bestSeason: string;
  highlights: string[];
  hotels: any[];
  attractions: any[];
  transport: string[];
  restaurants: any[];
  airports: string[];
  railways: string[];
}

export function InteractiveRajasthanMap({ onBack, onCitySelect, onNavigateToSection }: InteractiveRajasthanMapProps) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(true);
  const [mapFilter, setMapFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "Hi traveler 👋 Where do you want to start your journey in Rajasthan?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isJourneyPlanning, setIsJourneyPlanning] = useState(false);
  const [startingCity, setStartingCity] = useState("");
  
  // Booking modal states
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "hotel" | "transport" | "restaurant" | "itinerary";
    item?: any;
  }>({
    isOpen: false,
    type: "hotel"
  });
  
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  // Cities data with coordinates positioned on Rajasthan map
  const cities: CityData[] = [
    {
      id: "jaipur",
      name: "Jaipur",
      tagline: "The Pink City",
      position: { x: 52, y: 42 },
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1599661046827-dacde70eb027?w=800",
      rating: 4.8,
      population: "3.1M",
      bestSeason: "Oct-Mar",
      highlights: ["Hawa Mahal", "Amber Fort", "City Palace"],
      hotels: [
        { name: "Taj Rambagh Palace", price: 25000, rating: 4.9, location: "Bhawani Singh Road" },
        { name: "ITC Rajputana", price: 8000, rating: 4.7, location: "Palace Road" },
        { name: "Hotel Pearl Palace", price: 2500, rating: 4.3, location: "Hari Kishan Somani Marg" }
      ],
      attractions: [
        { name: "Hawa Mahal", timings: "9 AM - 5 PM", fee: "₹50" },
        { name: "Amber Fort", timings: "8 AM - 6 PM", fee: "₹500" },
        { name: "City Palace", timings: "9:30 AM - 5 PM", fee: "₹300" }
      ],
      transport: ["Cabs", "Auto Rickshaw", "Bike Rental", "City Bus"],
      restaurants: [
        { name: "Peacock Rooftop", specialty: "Rajasthani Thali", rating: 4.6 },
        { name: "Handi Restaurant", specialty: "Laal Maas", rating: 4.5 }
      ],
      airports: ["Jaipur International Airport (JAI)"],
      railways: ["Jaipur Junction (JP)", "Gandhinagar Jaipur (GADJ)"]
    },
    {
      id: "udaipur",
      name: "Udaipur",
      tagline: "City of Lakes",
      position: { x: 35, y: 65 },
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?w=800",
      rating: 4.9,
      population: "475K",
      bestSeason: "Oct-Mar",
      highlights: ["Lake Pichola", "City Palace", "Jag Mandir"],
      hotels: [
        { name: "The Oberoi Udaivilas", price: 45000, rating: 4.9, location: "Haridasji Ki Magri" },
        { name: "Taj Lake Palace", price: 35000, rating: 4.8, location: "Lake Pichola" },
        { name: "Hotel Udai Kothi", price: 3500, rating: 4.4, location: "Hanuman Ghat" }
      ],
      attractions: [
        { name: "City Palace", timings: "9:30 AM - 5:30 PM", fee: "₹300" },
        { name: "Lake Pichola Boat Ride", timings: "9 AM - 6 PM", fee: "₹400" },
        { name: "Jag Mandir", timings: "9 AM - 6 PM", fee: "₹125" }
      ],
      transport: ["Boat Taxi", "Auto Rickshaw", "Bike Rental", "Car Rental"],
      restaurants: [
        { name: "Ambrai Restaurant", specialty: "Lake view dining", rating: 4.7 },
        { name: "Upre by 1559 AD", specialty: "Rooftop dining", rating: 4.6 }
      ],
      airports: ["Maharana Pratap Airport (UDR)"],
      railways: ["Udaipur City (UDZ)", "Rana Pratap Nagar (RPZ)"]
    },
    {
      id: "jodhpur",
      name: "Jodhpur",
      tagline: "The Blue City",
      position: { x: 38, y: 52 },
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=800",
      rating: 4.7,
      population: "1.03M",
      bestSeason: "Oct-Mar",
      highlights: ["Mehrangarh Fort", "Blue City", "Umaid Bhawan"],
      hotels: [
        { name: "Umaid Bhawan Palace", price: 40000, rating: 4.8, location: "Cantt Area" },
        { name: "RAAS Jodhpur", price: 15000, rating: 4.7, location: "Tunwarji Ka Jhalra" },
        { name: "Pal Haveli", price: 4000, rating: 4.3, location: "Gulab Sagar" }
      ],
      attractions: [
        { name: "Mehrangarh Fort", timings: "9 AM - 5 PM", fee: "₹600" },
        { name: "Jaswant Thada", timings: "9 AM - 5 PM", fee: "₹30" },
        { name: "Clock Tower Market", timings: "10 AM - 9 PM", fee: "Free" }
      ],
      transport: ["Auto Rickshaw", "Bike Rental", "Tuk Tuk", "Car Rental"],
      restaurants: [
        { name: "On The Rocks", specialty: "Continental & Indian", rating: 4.5 },
        { name: "Indique Restaurant", specialty: "Fort view dining", rating: 4.6 }
      ],
      airports: ["Jodhpur Airport (JDH)"],
      railways: ["Jodhpur Junction (JU)", "Bhagat Ki Kothi (BGKT)"]
    },
    {
      id: "jaisalmer",
      name: "Jaisalmer",
      tagline: "The Golden City",
      position: { x: 22, y: 48 },
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
      rating: 4.6,
      population: "78K",
      bestSeason: "Nov-Feb",
      highlights: ["Jaisalmer Fort", "Thar Desert", "Sam Sand Dunes"],
      hotels: [
        { name: "Suryagarh Jaisalmer", price: 18000, rating: 4.8, location: "Kahala Phata" },
        { name: "Fort Rajwada", price: 8000, rating: 4.5, location: "Hotel Complex" },
        { name: "Desert Haveli", price: 2800, rating: 4.2, location: "Gandhi Chowk" }
      ],
      attractions: [
        { name: "Jaisalmer Fort", timings: "24 hours", fee: "₹250" },
        { name: "Sam Sand Dunes", timings: "24 hours", fee: "₹100" },
        { name: "Patwon Ki Haveli", timings: "8 AM - 6 PM", fee: "₹250" }
      ],
      transport: ["Camel Safari", "Jeep Safari", "Auto Rickshaw", "Bike Rental"],
      restaurants: [
        { name: "Desert Boy's Dhani", specialty: "Desert camping dining", rating: 4.4 },
        { name: "The Trio Restaurant", specialty: "Rooftop fort view", rating: 4.3 }
      ],
      airports: ["Jaisalmer Airport (JSA)"],
      railways: ["Jaisalmer Railway Station (JSME)"]
    },
    {
      id: "pushkar",
      name: "Pushkar",
      tagline: "The Holy City",
      position: { x: 45, y: 55 },
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?w=800",
      rating: 4.5,
      population: "21K",
      bestSeason: "Oct-Mar",
      highlights: ["Pushkar Lake", "Brahma Temple", "Camel Fair"],
      hotels: [
        { name: "Ananta Spa & Resorts", price: 12000, rating: 4.6, location: "Village Khadgaon" },
        { name: "Hotel Pushkar Palace", price: 4500, rating: 4.3, location: "Choti Basti" },
        { name: "Zostel Pushkar", price: 1200, rating: 4.1, location: "Motilal Nehru Marg" }
      ],
      attractions: [
        { name: "Pushkar Lake", timings: "24 hours", fee: "Free" },
        { name: "Brahma Temple", timings: "5:30 AM - 9 PM", fee: "Free" },
        { name: "Savitri Temple", timings: "5 AM - 9 PM", fee: "Free" }
      ],
      transport: ["Auto Rickshaw", "Bike Rental", "Camel Ride", "Walking"],
      restaurants: [
        { name: "Sunset Cafe", specialty: "Israeli & Continental", rating: 4.4 },
        { name: "La Pizzeria", specialty: "Wood fired pizza", rating: 4.2 }
      ],
      airports: ["Kishangarh Airport (95km away)"],
      railways: ["Ajmer Junction (15km away)"]
    },
    {
      id: "mountabu",
      name: "Mount Abu",
      tagline: "Hill Station of Rajasthan",
      position: { x: 28, y: 68 },
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      rating: 4.4,
      population: "22K",
      bestSeason: "Apr-Jun, Oct-Feb",
      highlights: ["Dilwara Temples", "Nakki Lake", "Guru Shikhar"],
      hotels: [
        { name: "The Colonial Manek Manor", price: 8500, rating: 4.5, location: "Delwara Road" },
        { name: "Hotel Hillock", price: 3500, rating: 4.2, location: "Adhar Devi Road" },
        { name: "RTDC Hotel Shikhar", price: 2200, rating: 4.0, location: "Nakki Lake Road" }
      ],
      attractions: [
        { name: "Dilwara Temples", timings: "12 PM - 6 PM", fee: "Free" },
        { name: "Nakki Lake", timings: "24 hours", fee: "Boating ₹150" },
        { name: "Guru Shikhar", timings: "24 hours", fee: "Free" }
      ],
      transport: ["Shared Jeep", "Private Taxi", "Auto Rickshaw", "Walking"],
      restaurants: [
        { name: "Arbuda Restaurant", specialty: "Gujarati Thali", rating: 4.3 },
        { name: "Kanak Dining Hall", specialty: "Pure Vegetarian", rating: 4.1 }
      ],
      airports: ["Udaipur Airport (185km away)"],
      railways: ["Abu Road Railway Station (28km away)"]
    }
  ];

  const availableCities = cities.filter(city => city.isAvailable);
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityClick = (city: CityData) => {
    setSelectedCity(city);
    setAiMessages(prev => [...prev, 
      { role: "assistant", content: `Great choice! ${city.name} (${city.tagline}) is amazing! I can help you with hotels, attractions, transport, and dining options. What would you like to explore first?` }
    ]);
  };

  const handleAISendMessage = () => {
    if (aiInput.trim()) {
      setAiMessages(prev => [...prev, 
        { role: "user", content: aiInput },
        { role: "assistant", content: `I understand you're interested in "${aiInput}". Let me help you with that! I can book hotels, arrange transport, suggest attractions, or create a complete itinerary. What would you prefer?` }
      ]);
      setAiInput("");
    }
  };

  const handleJourneyStart = (cityName: string) => {
    setStartingCity(cityName);
    setIsJourneyPlanning(true);
    const city = cities.find(c => c.name === cityName);
    if (city) {
      setSelectedCity(city);
      setAiMessages(prev => [...prev, 
        { role: "assistant", content: `Perfect! Starting your journey from ${cityName}. I'll show you the best routes, nearby airports/stations, and create a step-by-step itinerary. Let me also suggest the best places to visit first!` }
      ]);
    }
  };

  const handleBookingClick = (type: "hotel" | "transport" | "restaurant", item?: any) => {
    setBookingModal({ isOpen: true, type, item });
  };

  const openGoogleMaps = (location: string, cityName: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(location + " " + cityName)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Back */}
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="outline">
                ← Back to Home
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
                Explore Rajasthan
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search city or attraction..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Select value={mapFilter} onValueChange={setMapFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="heritage">Heritage</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => onNavigateToSection?.("safety")}>
                <Shield className="w-4 h-4 mr-2" />
                Safety
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                <Globe className="w-4 h-4 mr-2" />
                EN | HI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 flex h-screen">
        {/* Left Sidebar - City List */}
        <div className="w-80 bg-white/95 backdrop-blur-sm border-r h-full overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Rajasthan Cities</h2>
            <div className="space-y-3">
              {filteredCities.map((city) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCityClick(city)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCity?.id === city.id 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500' 
                      : city.isAvailable 
                        ? 'bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-300' 
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {city.name}
                        {city.isAvailable && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </h3>
                      <p className={`text-sm ${selectedCity?.id === city.id ? 'text-white/80' : 'text-gray-600'}`}>
                        {city.tagline}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{city.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Journey Planner */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Route className="w-5 h-5 text-blue-500" />
                  Start Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleJourneyStart}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose starting city" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name} - {city.tagline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  AI will suggest routes & create itinerary
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Map Section */}
        <div className="flex-1 relative">
          {/* Rajasthan Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100">
            <div className="w-full h-full relative overflow-hidden">
              {/* Background Map Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1573490647684-928a2454f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBnZW9ncmFwaHklMjB0b3BvZ3JhcGh5JTIwZGVzZXJ0fGVufDF8fHx8MTc1Nzc0ODIzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`
                }}
              ></div>
              
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-orange-200/30" 
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                     backgroundSize: '60px 60px'
                   }}>
              </div>

              {/* Stylized Rajasthan State Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Main state shape representation */}
                  <div className="w-80 h-64 border-2 border-amber-400/40 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg transform rotate-12 bg-gradient-to-br from-amber-100/20 to-orange-100/20"></div>
                  
                  {/* Desert region indicator */}
                  <div className="absolute top-4 left-4 w-24 h-16 border border-yellow-400/30 rounded-full bg-yellow-100/10"></div>
                  
                  {/* Aravalli range indicator */}
                  <div className="absolute bottom-8 right-6 w-32 h-8 border border-green-400/30 rounded-full bg-green-100/10"></div>
                </div>
              </div>

              {/* City Pins */}
              {cities.map((city) => (
                <motion.div
                  key={city.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: city.id === 'jaipur' ? 0.2 : city.id === 'udaipur' ? 0.4 : 0.6 }}
                  onClick={() => handleCityClick(city)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${city.position.x}%`,
                    top: `${city.position.y}%`
                  }}
                >
                  {/* City Pin */}
                  <div className={`relative ${city.isAvailable ? 'animate-pulse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-300 group-hover:scale-125 ${
                      city.isAvailable 
                        ? selectedCity?.id === city.id 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 ring-4 ring-white' 
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:ring-4 hover:ring-white/50'
                        : 'bg-gray-400'
                    }`}>
                      {city.isAvailable && (
                        <div className="absolute -inset-2 bg-amber-400/30 rounded-full animate-ping"></div>
                      )}
                      <MapPin className="w-4 h-4" />
                    </div>
                    
                    {/* City Name Popup */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <div className="text-sm font-semibold">{city.name}</div>
                      <div className="text-xs text-gray-600">{city.tagline}</div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-white"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - City Information Panel */}
        <AnimatePresence>
          {selectedCity && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="w-96 bg-white/95 backdrop-blur-sm border-l h-full overflow-y-auto"
            >
              <div className="p-6">
                {/* City Header */}
                <div className="relative mb-6">
                  <div className="h-32 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={selectedCity.image}
                      alt={selectedCity.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h2 className="text-xl font-bold">{selectedCity.name}</h2>
                    <p className="text-sm opacity-90">{selectedCity.tagline}</p>
                  </div>
                  <Button
                    onClick={() => setSelectedCity(null)}
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* City Overview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600">{selectedCity.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{selectedCity.population}</div>
                    <div className="text-xs text-gray-600">Population</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{selectedCity.bestSeason}</div>
                    <div className="text-xs text-gray-600">Best Season</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-blue-600"
                    onClick={() => handleBookingClick("hotel")}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Hotels
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-green-600"
                    onClick={() => handleBookingClick("transport")}
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Transport
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-red-500"
                    onClick={() => handleBookingClick("restaurant")}
                  >
                    <Utensils className="w-4 h-4 mr-2" />
                    Dining
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-purple-600"
                    onClick={() => setIsItineraryModalOpen(true)}
                  >
                    <Route className="w-4 h-4 mr-2" />
                    Itinerary
                  </Button>
                </div>

                {/* City Sections */}
                <div className="space-y-4">
                  {/* Hotels */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-blue-500" />
                          Hotels
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigateToSection?.("hotels")}
                        >
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedCity.hotels.slice(0, 2).map((hotel, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">{hotel.name}</h4>
                            <p className="text-xs text-gray-600">{hotel.location}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{hotel.rating}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600 flex items-center">
                              <IndianRupee className="w-3 h-3" />
                              {hotel.price.toLocaleString()}
                            </div>
                            <Button 
                              size="sm" 
                              className="mt-1"
                              onClick={() => handleBookingClick("hotel", hotel)}
                            >
                              Book
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Attractions */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Camera className="w-5 h-5 text-purple-500" />
                          Attractions
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigateToSection?.("attractions")}
                        >
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedCity.attractions.map((attraction, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <h4 className="font-medium text-sm">{attraction.name}</h4>
                            <p className="text-xs text-gray-600">{attraction.timings}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openGoogleMaps(attraction.name, selectedCity.name)}
                            >
                              <Navigation className="w-3 h-3" />
                            </Button>
                            <span className="text-xs text-green-600 font-medium">{attraction.fee}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Transport */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Car className="w-5 h-5 text-green-500" />
                          Transport
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigateToSection?.("cars")}
                        >
                          Book Now
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedCity.transport.map((mode, idx) => (
                          <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-green-50">
                            {mode}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Connectivity */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-amber-500" />
                        Getting There
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Plane className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Airports</span>
                        </div>
                        {selectedCity.airports.map((airport, idx) => (
                          <p key={idx} className="text-xs text-gray-600 ml-6">{airport}</p>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Train className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Railways</span>
                        </div>
                        {selectedCity.railways.map((station, idx) => (
                          <p key={idx} className="text-xs text-gray-600 ml-6">{station}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Travel Assistant Chat Box */}
      <AnimatePresence>
        {isAIChatOpen && (
          <motion.div
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            className="fixed bottom-6 left-6 w-80 h-96 bg-white rounded-xl shadow-2xl border z-50"
          >
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">AI Travel Guide</h3>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsAIChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {aiMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[90%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t space-y-2">
              <div className="flex gap-2">
                <Input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask about hotels, routes, attractions..."
                  onKeyPress={(e) => e.key === "Enter" && handleAISendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleAISendMessage} size="sm">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex gap-1">
                {availableCities.slice(0, 3).map((city) => (
                  <Button
                    key={city.id}
                    size="sm"
                    variant="outline"
                    onClick={() => handleJourneyStart(city.name)}
                    className="text-xs"
                  >
                    {city.name}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Footer Tools */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-40">
        {!isAIChatOpen && (
          <Button
            onClick={() => setIsAIChatOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full w-14 h-14 shadow-lg"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        )}
        
        <Button
          onClick={() => onNavigateToSection?.("safety")}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-full w-14 h-14 shadow-lg"
        >
          <Shield className="w-6 h-6 text-white" />
        </Button>
        
        <Button
          onClick={() => setIsItineraryModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full w-14 h-14 shadow-lg"
        >
          <Route className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Booking Modals */}
      <BookingModal 
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, type: "hotel" })}
        type={bookingModal.type}
        item={bookingModal.item}
        cityName={selectedCity?.name || "Rajasthan"}
      />

      <ItineraryModal 
        isOpen={isItineraryModalOpen}
        onClose={() => setIsItineraryModalOpen(false)}
        cityName={selectedCity?.name || "Rajasthan"}
      />
    </div>
  );
}