import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  MapPin,
  Clock,
  ArrowRight,
  Car,
  Hotel,
  Camera,
  Fuel,
  Info,
  Navigation,
  Route,
  X,
  Calendar,
  Users,
  Star,
  Timer
} from "lucide-react";

interface JourneyRoadmapProps {
  startCity: string;
  endCity: string;
  onBack: () => void;
  onBookServices: (service: string, city: string) => void;
}

const cityDistances: { [key: string]: { [key: string]: { distance: number; time: string; route: string[] } } } = {
  "Jaipur": {
    "Udaipur": { distance: 393, time: "6h 30m", route: ["Jaipur", "Ajmer", "Udaipur"] },
    "Jodhpur": { distance: 336, time: "5h 45m", route: ["Jaipur", "Pali", "Jodhpur"] },
    "Jaisalmer": { distance: 564, time: "9h 15m", route: ["Jaipur", "Jodhpur", "Jaisalmer"] },
    "Bikaner": { distance: 334, time: "5h 30m", route: ["Jaipur", "Sikar", "Bikaner"] },
    "Ajmer": { distance: 135, time: "2h 30m", route: ["Jaipur", "Ajmer"] },
    "Pushkar": { distance: 146, time: "2h 45m", route: ["Jaipur", "Ajmer", "Pushkar"] },
    "Mount Abu": { distance: 492, time: "8h", route: ["Jaipur", "Udaipur", "Mount Abu"] },
    "Alwar": { distance: 148, time: "2h 45m", route: ["Jaipur", "Alwar"] },
    "Bharatpur": { distance: 184, time: "3h 15m", route: ["Jaipur", "Bharatpur"] },
    "Ranthambore": { distance: 180, time: "3h", route: ["Jaipur", "Sawai Madhopur", "Ranthambore"] },
    "Chittorgarh": { distance: 312, time: "5h 15m", route: ["Jaipur", "Ajmer", "Chittorgarh"] }
  },
  "Udaipur": {
    "Jaipur": { distance: 393, time: "6h 30m", route: ["Udaipur", "Ajmer", "Jaipur"] },
    "Jodhpur": { distance: 258, time: "4h 30m", route: ["Udaipur", "Pali", "Jodhpur"] },
    "Jaisalmer": { distance: 516, time: "8h 45m", route: ["Udaipur", "Jodhpur", "Jaisalmer"] },
    "Mount Abu": { distance: 164, time: "3h", route: ["Udaipur", "Mount Abu"] },
    "Ajmer": { distance: 270, time: "4h 45m", route: ["Udaipur", "Ajmer"] },
    "Chittorgarh": { distance: 117, time: "2h", route: ["Udaipur", "Chittorgarh"] }
  },
  "Jodhpur": {
    "Jaipur": { distance: 336, time: "5h 45m", route: ["Jodhpur", "Pali", "Jaipur"] },
    "Udaipur": { distance: 258, time: "4h 30m", route: ["Jodhpur", "Pali", "Udaipur"] },
    "Jaisalmer": { distance: 285, time: "4h 45m", route: ["Jodhpur", "Jaisalmer"] },
    "Bikaner": { distance: 251, time: "4h 15m", route: ["Jodhpur", "Bikaner"] },
    "Mount Abu": { distance: 235, time: "4h", route: ["Jodhpur", "Mount Abu"] }
  },
  "Jaisalmer": {
    "Jaipur": { distance: 564, time: "9h 15m", route: ["Jaisalmer", "Jodhpur", "Jaipur"] },
    "Udaipur": { distance: 516, time: "8h 45m", route: ["Jaisalmer", "Jodhpur", "Udaipur"] },
    "Jodhpur": { distance: 285, time: "4h 45m", route: ["Jaisalmer", "Jodhpur"] },
    "Bikaner": { distance: 345, time: "5h 30m", route: ["Jaisalmer", "Bikaner"] }
  }
};

const cityInfo: { [key: string]: { attractions: string[]; specialties: string[]; bestTime: string; } } = {
  "Jaipur": {
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    specialties: ["Pink Architecture", "Royal Palaces", "Local Bazaars"],
    bestTime: "Oct-Mar"
  },
  "Udaipur": {
    attractions: ["Lake Pichola", "City Palace", "Jag Mandir", "Saheliyon Ki Bari"],
    specialties: ["Lake Views", "Marble Palaces", "Boat Rides"],
    bestTime: "Oct-Mar"
  },
  "Jodhpur": {
    attractions: ["Mehrangarh Fort", "Blue City", "Umaid Bhawan", "Jaswant Thada"],
    specialties: ["Blue Houses", "Desert Culture", "Fort Views"],
    bestTime: "Nov-Feb"
  },
  "Jaisalmer": {
    attractions: ["Golden Fort", "Desert Safari", "Sam Sand Dunes", "Patwon Ki Haveli"],
    specialties: ["Desert Experience", "Camel Safari", "Golden Architecture"],
    bestTime: "Nov-Feb"
  },
  "Bikaner": {
    attractions: ["Junagarh Fort", "Camel Breeding Farm", "Karni Mata Temple"],
    specialties: ["Camel Safari", "Desert Fort", "Local Sweets"],
    bestTime: "Oct-Mar"
  },
  "Ajmer": {
    attractions: ["Ajmer Sharif Dargah", "Ana Sagar Lake", "Adhai Din Ka Jhonpra"],
    specialties: ["Spiritual Journey", "Sufi Culture", "Religious Tourism"],
    bestTime: "Oct-Mar"
  },
  "Pushkar": {
    attractions: ["Brahma Temple", "Pushkar Lake", "Camel Fair"],
    specialties: ["Holy Lake", "Spiritual Retreat", "Desert Fair"],
    bestTime: "Oct-Mar"
  },
  "Mount Abu": {
    attractions: ["Dilwara Temples", "Sunset Point", "Nakki Lake"],
    specialties: ["Hill Station", "Cool Climate", "Jain Temples"],
    bestTime: "Mar-Jun"
  },
  "Alwar": {
    attractions: ["Bala Quila", "Sariska Tiger Reserve", "Siliserh Lake"],
    specialties: ["Wildlife Safari", "Ancient Fort", "Nature Tourism"],
    bestTime: "Oct-Apr"
  },
  "Bharatpur": {
    attractions: ["Keoladeo National Park", "Bharatpur Palace", "Bird Watching"],
    specialties: ["Bird Sanctuary", "Wildlife Photography", "Nature Tours"],
    bestTime: "Oct-Mar"
  },
  "Ranthambore": {
    attractions: ["Tiger Safari", "Ranthambore Fort", "Wildlife Photography"],
    specialties: ["Tiger Reserve", "Wildlife Safari", "Nature Photography"],
    bestTime: "Oct-Apr"
  },
  "Chittorgarh": {
    attractions: ["Chittorgarh Fort", "Vijay Stambh", "Rana Kumbha Palace"],
    specialties: ["Historic Fort", "Rajput Heritage", "Valor Stories"],
    bestTime: "Oct-Mar"
  }
};

export function JourneyRoadmap({ startCity, endCity, onBack, onBookServices }: JourneyRoadmapProps) {
  const [selectedTab, setSelectedTab] = useState<"route" | "stops" | "services">("route");
  const [expandedStop, setExpandedStop] = useState<string | null>(null);

  const journeyData = cityDistances[startCity]?.[endCity];
  const startInfo = cityInfo[startCity];
  const endInfo = cityInfo[endCity];

  if (!journeyData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Route Not Available</h2>
            <p className="text-gray-600 mb-6">
              Direct route information between {startCity} and {endCity} is not available yet.
            </p>
            <Button onClick={onBack} className="w-full">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Journey Planner
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const fuelCost = Math.round((journeyData.distance * 8) / 100 * 105); // Approximate fuel cost
  const tollCost = Math.round(journeyData.distance * 2.5); // Approximate toll cost

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
          >
            <X className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Journey Roadmap</h1>
          <div className="w-9"></div>
        </div>

        {/* Journey Overview */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-medium">{startCity}</span>
            </div>
            <Route className="w-5 h-5" />
            <div className="flex items-center gap-2">
              <span className="font-medium">{endCity}</span>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{journeyData.distance}</div>
              <div className="text-sm opacity-90">km</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{journeyData.time}</div>
              <div className="text-sm opacity-90">drive</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{journeyData.route.length}</div>
              <div className="text-sm opacity-90">stops</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="flex">
          {[
            { id: "route", label: "Route", icon: Navigation },
            { id: "stops", label: "Stops", icon: MapPin },
            { id: "services", label: "Services", icon: Car }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? "text-amber-600 border-b-2 border-amber-600 bg-amber-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {selectedTab === "route" && (
            <motion.div
              key="route"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Route Timeline */}
              <Card className="p-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Route className="w-5 h-5 text-amber-600" />
                  Route Timeline
                </h3>
                
                <div className="space-y-4">
                  {journeyData.route.map((city, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? "bg-green-500" :
                          index === journeyData.route.length - 1 ? "bg-red-500" :
                          "bg-amber-500"
                        }`}></div>
                        {index < journeyData.route.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{city}</div>
                        {index === 0 && <div className="text-sm text-green-600">Starting Point</div>}
                        {index === journeyData.route.length - 1 && <div className="text-sm text-red-600">Destination</div>}
                        {index > 0 && index < journeyData.route.length - 1 && (
                          <div className="text-sm text-amber-600">Via Stop</div>
                        )}
                      </div>
                      
                      {index > 0 && (
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {Math.round(journeyData.distance / (journeyData.route.length - 1) * index)} km
                          </div>
                          <div className="text-xs text-gray-600">cumulative</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Cost Estimate */}
              <Card className="p-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Fuel className="w-5 h-5 text-amber-600" />
                  Cost Estimate
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">₹{fuelCost}</div>
                    <div className="text-sm text-blue-700">Fuel Cost</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">₹{tollCost}</div>
                    <div className="text-sm text-green-700">Toll Cost</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-amber-800">Total Estimated Cost</span>
                    <span className="text-xl font-bold text-amber-600">₹{fuelCost + tollCost}</span>
                  </div>
                  <div className="text-xs text-amber-700 mt-1">*Excluding food & accommodation</div>
                </div>
              </Card>
            </motion.div>
          )}

          {selectedTab === "stops" && (
            <motion.div
              key="stops"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Start City */}
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="font-bold text-gray-900">{startCity}</h3>
                  <Badge className="bg-green-100 text-green-800">Starting Point</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {startInfo?.attractions.slice(0, 2).map((attraction) => (
                    <Badge key={attraction} variant="secondary" className="text-xs">
                      {attraction}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onBookServices("hotels", startCity)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <Hotel className="w-4 h-4 mr-1" />
                    Hotels
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onBookServices("attractions", startCity)}
                    className="flex-1"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Attractions
                  </Button>
                </div>
              </Card>

              {/* Via Stops */}
              {journeyData.route.slice(1, -1).map((city, index) => (
                <Card key={city} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <h3 className="font-bold text-gray-900">{city}</h3>
                    <Badge className="bg-amber-100 text-amber-800">Via Stop</Badge>
                  </div>
                  
                  {cityInfo[city] && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {cityInfo[city].attractions.slice(0, 2).map((attraction) => (
                          <Badge key={attraction} variant="secondary" className="text-xs">
                            {attraction}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onBookServices("hotels", city)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600"
                        >
                          <Hotel className="w-4 h-4 mr-1" />
                          Stay
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onBookServices("attractions", city)}
                          className="flex-1"
                        >
                          <Camera className="w-4 h-4 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}

              {/* End City */}
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h3 className="font-bold text-gray-900">{endCity}</h3>
                  <Badge className="bg-red-100 text-red-800">Destination</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {endInfo?.attractions.slice(0, 2).map((attraction) => (
                    <Badge key={attraction} variant="secondary" className="text-xs">
                      {attraction}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onBookServices("hotels", endCity)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <Hotel className="w-4 h-4 mr-1" />
                    Hotels
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onBookServices("attractions", endCity)}
                    className="flex-1"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Attractions
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {selectedTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Car Rental Services */}
              <Card className="p-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-600" />
                  Car Rental Options
                </h3>
                
                <div className="space-y-3">
                  {[
                    { type: "Economy Car", price: "₹12/km", features: ["AC", "4 Seater", "Manual"] },
                    { type: "SUV", price: "₹18/km", features: ["AC", "7 Seater", "Automatic"] },
                    { type: "Luxury Car", price: "₹25/km", features: ["AC", "5 Seater", "Premium"] }
                  ].map((car) => (
                    <div key={car.type} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{car.type}</h4>
                        <span className="font-bold text-amber-600">{car.price}</span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {car.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onBookServices("cars", startCity)}
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        Book {car.type}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Hotel Packages */}
              <Card className="p-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-amber-600" />
                  Hotel Packages
                </h3>
                
                <div className="space-y-3">
                  {[
                    { type: "Budget Stay", price: "₹1,500/night", rating: 3 },
                    { type: "Comfort Stay", price: "₹3,500/night", rating: 4 },
                    { type: "Heritage Hotel", price: "₹8,500/night", rating: 5 }
                  ].map((hotel) => (
                    <div key={hotel.type} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{hotel.type}</h4>
                        <span className="font-bold text-amber-600">{hotel.price}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">{hotel.rating} Star</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onBookServices("hotels", endCity)}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                      >
                        Book Hotels
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tour Packages */}
              <Card className="p-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-600" />
                  Tour Packages
                </h3>
                
                <div className="space-y-3">
                  {[
                    { name: "Complete Route Tour", duration: "3-4 Days", price: "₹15,000" },
                    { name: "Heritage & Culture", duration: "2-3 Days", price: "₹12,000" },
                    { name: "Photography Tour", duration: "4-5 Days", price: "₹18,000" }
                  ].map((tour) => (
                    <div key={tour.name} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{tour.name}</h4>
                        <span className="font-bold text-amber-600">{tour.price}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <Timer className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-600">{tour.duration}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onBookServices("attractions", startCity)}
                        className="w-full bg-purple-500 hover:bg-purple-600"
                      >
                        Book Tour
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={() => onBookServices("complete-package", `${startCity}-${endCity}`)}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Complete Journey Package
        </Button>
      </div>
    </div>
  );
}