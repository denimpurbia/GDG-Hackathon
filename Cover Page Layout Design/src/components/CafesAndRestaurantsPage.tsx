import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Coffee, 
  UtensilsCrossed, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Wifi, 
  Car,
  Search,
  Filter,
  Heart,
  Phone,
  Camera,
  Crown,
  Globe,
  ArrowLeft
} from "lucide-react";
import { AISpeaker } from "./AISpeaker";

const restaurantCategories = [
  { id: "all", name: "All Restaurants", icon: UtensilsCrossed, count: 247 },
  { id: "fine-dining", name: "Fine Dining", icon: Crown, count: 45 },
  { id: "rooftop", name: "Rooftop Cafes", icon: Coffee, count: 38 },
  { id: "traditional", name: "Traditional", icon: Globe, count: 89 },
  { id: "quick-bites", name: "Quick Bites", icon: Clock, count: 75 }
];

const featuredRestaurants = [
  {
    id: 1,
    name: "1135 AD",
    city: "Jaipur",
    cuisine: "Royal Rajasthani",
    rating: 4.8,
    reviews: 1247,
    priceRange: "₹₹₹₹",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    speciality: "Heritage Dining",
    timing: "7:00 PM - 11:30 PM",
    features: ["Live Music", "Palace View", "Valet Parking"],
    location: "Amber Fort"
  },
  {
    id: 2,
    name: "Ambrai Restaurant",
    city: "Udaipur",
    cuisine: "Continental & Indian",
    rating: 4.9,
    reviews: 2156,
    priceRange: "₹₹₹",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    speciality: "Lake View Dining",
    timing: "12:00 PM - 11:00 PM",
    features: ["Lake View", "Outdoor Seating", "Photography"],
    location: "Lake Pichola"
  },
  {
    id: 3,
    name: "Indique",
    city: "Jodhpur",
    cuisine: "Multi-Cuisine",
    rating: 4.7,
    reviews: 891,
    priceRange: "₹₹₹",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    speciality: "Rooftop with Fort View",
    timing: "11:00 AM - 11:30 PM",
    features: ["Fort View", "Rooftop", "Bar"],
    location: "Pal Haveli"
  },
  {
    id: 4,
    name: "Desert Boy's Dhani",
    city: "Jaisalmer",
    cuisine: "Rajasthani",
    rating: 4.6,
    reviews: 743,
    priceRange: "₹₹",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    speciality: "Desert Dining Experience",
    timing: "6:00 PM - 10:30 PM",
    features: ["Cultural Show", "Desert View", "Camel Ride"],
    location: "Sam Sand Dunes"
  }
];

const quickFilters = [
  { name: "Open Now", active: false },
  { name: "Pure Veg", active: true },
  { name: "Free WiFi", active: false },
  { name: "Parking", active: false },
  { name: "Air Conditioned", active: false },
];

interface CafesAndRestaurantsPageProps {
  onBack?: () => void;
}

export function CafesAndRestaurantsPage({ onBack }: CafesAndRestaurantsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("restaurants");

  const handleBookTable = (restaurant: any) => {
    alert(`Booking table at ${restaurant.name} - Advanced booking system coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* AI Speaker for Restaurants */}
      <AISpeaker message="Namaste! Looking for the perfect dining experience? Tell me your mood - romantic lakeside, royal heritage, or rooftop with fort views?" />

      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-6 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl mb-4"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}
            >
              <Coffee className="inline-block w-16 h-16 mr-4 text-amber-400" />
              Dine Like Royalty
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              From palace dining to lakeside cafes - discover Rajasthan's finest culinary experiences
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search restaurants, cuisines, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <select className="h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="all">All Cities</option>
              <option value="jaipur">Jaipur</option>
              <option value="udaipur">Udaipur</option>
              <option value="jodhpur">Jodhpur</option>
              <option value="jaisalmer">Jaisalmer</option>
            </select>
            <Button className="h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Filter className="w-5 h-5 mr-2" />
              Apply Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            {quickFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant={filter.active ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer hover:bg-orange-100"
              >
                {filter.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Choose Your Experience
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {restaurantCategories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} options</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="cafes">Cafes</TabsTrigger>
            <TabsTrigger value="special">Special Dining</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            {/* Featured Restaurants */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-800">
                        <MapPin className="w-3 h-3 mr-1" />
                        {restaurant.city}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-600 text-white">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {restaurant.rating}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                      <span className="text-lg font-medium text-orange-600">{restaurant.priceRange}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{restaurant.cuisine} • {restaurant.speciality}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{restaurant.timing}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {restaurant.reviews} reviews • {restaurant.location}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => handleBookTable(restaurant)}
                        >
                          Book Table
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cafes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-coffee-400 to-amber-500 rounded-full flex items-center justify-center">
                        <Coffee className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Cafe {i}</h3>
                        <p className="text-sm text-gray-600">Premium Coffee & Snacks</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">4.{i} (234 reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Free WiFi</span>
                      </div>
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      Reserve Table
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special">
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Crown className="w-12 h-12" />
                    <div>
                      <h3 className="text-2xl font-bold">Royal Dining Experiences</h3>
                      <p className="text-purple-100">Dine like a Maharaja in authentic palace settings</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <h4 className="font-semibold">Palace Dining</h4>
                      <p className="text-sm text-purple-100">Historic palaces</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold">Cultural Shows</h4>
                      <p className="text-sm text-purple-100">Live performances</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold">Private Events</h4>
                      <p className="text-sm text-purple-100">Exclusive bookings</p>
                    </div>
                  </div>
                  <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
                    Explore Royal Dining
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Dining Experiences */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Signature Dining Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Desert Dining", icon: "🏜️", desc: "Under stars in Jaisalmer" },
              { title: "Lake View", icon: "🏞️", desc: "Romantic settings in Udaipur" },
              { title: "Heritage Haveli", icon: "🏰", desc: "Royal palaces in Jaipur" },
              { title: "Rooftop Cafes", icon: "🌅", desc: "City views in Jodhpur" }
            ].map((exp, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{exp.icon}</div>
                  <h3 className="font-semibold mb-2">{exp.title}</h3>
                  <p className="text-sm text-gray-600">{exp.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}