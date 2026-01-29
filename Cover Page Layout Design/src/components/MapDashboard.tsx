import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { motion } from "motion/react";
import { GoogleMapIntegration } from "./GoogleMapIntegration";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Bike, 
  Hotel, 
  Utensils, 
  Castle, 
  ShoppingBag, 
  Music, 
  Fuel, 
  Shield, 
  Phone,
  MessageCircle,
  Mic,
  Route,
  Clock,
  Star,
  Wifi,
  Users,
  Camera,
  ScanLine,
  Compass,
  Download,
  AlertTriangle,
  MapIcon,
  Home,
  ArrowLeft
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Mock data for different categories
const mockData = {
  hotels: [
    {
      id: 1,
      name: "Jagat Niwas Palace",
      rating: 4.5,
      price: "₹2,200",
      distance: "0.5 km",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=90",
      location: "Lake Pichola, Udaipur"
    },
    {
      id: 2,
      name: "Lake Palace Hotel",
      rating: 4.9,
      price: "₹32,500",
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90",
      location: "Lake Pichola, Udaipur"
    }
  ],
  rides: [
    {
      id: 1,
      name: "Ola Cab",
      type: "Sedan",
      price: "₹200",
      time: "10 mins",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
    },
    {
      id: 2,
      name: "Bike Rental",
      type: "Honda Activa",
      price: "₹100/day",
      time: "Available now",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80"
    }
  ],
  food: [
    {
      id: 1,
      name: "Ambrai Restaurant",
      cuisine: "Rajasthani",
      rating: 4.7,
      distance: "1 km",
      price: "₹1,200/person",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
      specialty: "Rooftop Lake View"
    }
  ],
  attractions: [
    {
      id: 1,
      name: "City Palace",
      type: "Heritage Palace",
      rating: 4.8,
      distance: "2 km",
      entry: "₹300",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90"
    }
  ],
  safety: [
    {
      id: 1,
      name: "Hathipole Police Station",
      type: "Police Station",
      distance: "1.5 km",
      contact: "100"
    },
    {
      id: 2,
      name: "MB Hospital",
      type: "Hospital",
      distance: "2.5 km",
      contact: "108"
    }
  ]
};

const categories = [
  { id: "rides", name: "Rides", icon: Car, color: "bg-blue-500", description: "Cabs, Bikes, Cars" },
  { id: "hotels", name: "Hotels", icon: Hotel, color: "bg-purple-500", description: "Hotels / PG / Resorts" },
  { id: "food", name: "Food & Cafés", icon: Utensils, color: "bg-red-500", description: "Restaurants & Cafés" },
  { id: "attractions", name: "Attractions", icon: Castle, color: "bg-amber-500", description: "Forts, Palaces, Museums" },
  { id: "shopping", name: "Shopping", icon: ShoppingBag, color: "bg-green-500", description: "Markets & Malls" },
  { id: "events", name: "Events", icon: Music, color: "bg-pink-500", description: "Events & Nightlife" },
  { id: "essentials", name: "Essentials", icon: Fuel, color: "bg-orange-500", description: "Petrol, ATMs, Hospitals" },
  { id: "safety", name: "Safety", icon: Shield, color: "bg-gray-500", description: "Police, Emergency Routes" }
];

interface MapDashboardProps {
  onBack?: () => void;
}

export function MapDashboard({ onBack }: MapDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("hotels");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelMode, setTravelMode] = useState("car");
  const [aiMessage, setAiMessage] = useState("");
  const [showRouteOptions, setShowRouteOptions] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const currentData = mockData[selectedCategory] || [];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFindRoute = () => {
    if (pickupLocation && dropLocation) {
      setShowRouteOptions(true);
    }
  };

  const handleAiQuery = (query: string) => {
    setAiMessage("");
    // Simulate AI processing
    setTimeout(() => {
      let response = "";
      if (query.toLowerCase().includes("hotel")) {
        response = "I found 5 great hotels near City Palace. Jagat Niwas Palace offers the best lake view at ₹2,200/night.";
      } else if (query.toLowerCase().includes("cafe") || query.toLowerCase().includes("restaurant")) {
        response = "Ambrai Restaurant has amazing rooftop lake views, just 1km from your location. Perfect for dinner!";
      } else if (query.toLowerCase().includes("cab") || query.toLowerCase().includes("ride")) {
        response = "I can book you an Ola cab to Jagdish Temple for ₹150. It'll arrive in 5 minutes.";
      } else if (query.toLowerCase().includes("safe")) {
        response = "The route via City Palace Road is well-lit and safe. I've marked the nearest police station on your map.";
      } else {
        response = "I'm here to help! Ask me about hotels, restaurants, rides, or safety information.";
      }
      setAiMessage(response);
    }, 1000);
  };

  const handleBookNow = (item: any) => {
    setSelectedItem(item);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header/Navbar */}
      <div className="bg-white shadow-lg border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center gap-3">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Button>
              )}
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <MapIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Explore <span className="text-amber-600">राजस्थान</span>
                </h1>
                <p className="text-sm text-gray-600">Smart Travel Map</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              {[
                { icon: Home, label: "Home", id: "home" },
                { icon: Hotel, label: "Hotels", id: "hotels" },
                { icon: Utensils, label: "Food", id: "food" },
                { icon: Car, label: "Rides", id: "rides" },
                { icon: Castle, label: "Attractions", id: "attractions" },
                { icon: Music, label: "Events", id: "events" },
                { icon: Shield, label: "Safety", id: "safety" },
                { icon: Phone, label: "Contact", id: "contact" }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={tab.id === "map" ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-1 ${tab.id === "map" ? "bg-amber-500 text-white" : ""}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
          {/* Left Panel - Filters */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Search Services</h3>
              <Input
                placeholder="Type your destination / service"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
              
              {/* Category Buttons */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full justify-start gap-3 ${
                      selectedCategory === category.id 
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" 
                        : ""
                    }`}
                  >
                    <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center`}>
                      <category.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs opacity-70">{category.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Center - Interactive Map */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            {/* Pickup & Drop Panel */}
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Location</label>
                  <Input
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drop Location</label>
                  <Input
                    placeholder="Enter drop location"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <label className="text-sm font-medium">Travel Mode:</label>
                <div className="flex gap-2">
                  {[
                    { id: "car", icon: Car, label: "Car" },
                    { id: "bike", icon: Bike, label: "Bike" },
                    { id: "walk", icon: Navigation, label: "Walk" }
                  ].map((mode) => (
                    <Button
                      key={mode.id}
                      variant={travelMode === mode.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTravelMode(mode.id)}
                      className="flex items-center gap-1"
                    >
                      <mode.icon className="w-3 h-3" />
                      {mode.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleFindRoute}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                disabled={!pickupLocation || !dropLocation}
              >
                <Route className="w-4 h-4 mr-2" />
                Find Best Route
              </Button>
            </Card>

            {/* Map Container - Google Maps Integration */}
            <Card className="flex-1 p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Interactive Map of Rajasthan</h3>
                <p className="text-sm text-gray-600">Click on markers to view hotels and attractions</p>
              </div>
              <GoogleMapIntegration className="w-full" />
            </Card>
          </div>

          {/* Right Panel - AI Assistant */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">AI Travel Assistant</h3>
                <Button
                  size="sm"
                  variant={isVoiceMode ? "default" : "outline"}
                  onClick={() => setIsVoiceMode(!isVoiceMode)}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              {/* AI Chat Input */}
              <div className="space-y-3 mb-4">
                <Input
                  placeholder="Ask me anything..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAiQuery((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                
                {/* Quick Query Buttons */}
                <div className="flex flex-wrap gap-1">
                  {[
                    "Budget hotels near City Palace",
                    "Rooftop cafés Lake Pichola",
                    "Book cab to Jagdish Temple",
                    "Safest night route"
                  ].map((query, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => handleAiQuery(query)}
                      className="text-xs"
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Response */}
              {aiMessage && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-800">AI Assistant</span>
                  </div>
                  <p className="text-sm text-blue-700">{aiMessage}</p>
                </div>
              )}

              {/* AI Recommendations */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Smart Recommendations</h4>
                <div className="space-y-2">
                  <div className="bg-amber-50 p-2 rounded text-xs">
                    💡 <strong>Best hotel near you:</strong> Jagat Niwas Palace (4.5★)
                  </div>
                  <div className="bg-green-50 p-2 rounded text-xs">
                    🍽️ <strong>Must-try café:</strong> Ambrai Restaurant on your route
                  </div>
                  <div className="bg-orange-50 p-2 rounded text-xs">
                    ⛽ <strong>Fuel stop:</strong> HP Petrol Pump 2km ahead
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Panel - Smart Cards */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            {categories.find(c => c.id === selectedCategory)?.name} Near You
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  {item.image && (
                    <div className="relative h-32">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader className="pb-2">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    {item.location && (
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    )}
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{item.rating}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="py-0">
                    <div className="space-y-1 text-xs">
                      {item.price && <div className="font-medium text-amber-600">{item.price}</div>}
                      {item.distance && <div className="text-gray-500">{item.distance} away</div>}
                      {item.time && <div className="text-blue-600">{item.time}</div>}
                      {item.type && <Badge variant="secondary" className="text-xs">{item.type}</Badge>}
                      {item.specialty && <div className="text-green-600">{item.specialty}</div>}
                      {item.contact && <div className="text-red-600">📞 {item.contact}</div>}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3">
                    <div className="flex gap-2 w-full">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        onClick={() => handleBookNow(item)}
                      >
                        {selectedCategory === 'safety' ? 'Call' : 'Book Now'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedItem?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium">{selectedItem?.name}</h4>
              <p className="text-sm text-gray-600">{selectedItem?.location}</p>
              <p className="text-amber-600 font-medium">{selectedItem?.price}</p>
            </div>

            <div className="space-y-3">
              <Input placeholder="Your Name" />
              <Input placeholder="Phone Number" />
              <Input type="date" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">9:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="afternoon">12:00 PM - 6:00 PM</SelectItem>
                  <SelectItem value="evening">6:00 PM - 9:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowBookingModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500">
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}