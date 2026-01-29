import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PremiumImage, getResponsiveImageUrl } from "./PremiumImage";
import { 
  Castle, 
  Mountain, 
  Camera, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Ticket,
  Search,
  Filter,
  Heart,
  Share2,
  Navigation,
  Crown,
  TreePine,
  Waves,
  Sun,
  ArrowLeft
} from "lucide-react";
import { AISpeaker } from "./AISpeaker";

const attractionCategories = [
  { id: "forts", name: "Forts & Palaces", icon: Castle, color: "from-amber-500 to-orange-500", count: 87 },
  { id: "temples", name: "Temples", icon: Crown, color: "from-purple-500 to-pink-500", count: 156 },
  { id: "lakes", name: "Lakes & Gardens", icon: Waves, color: "from-blue-500 to-cyan-500", count: 43 },
  { id: "desert", name: "Desert & Wildlife", icon: Sun, color: "from-yellow-500 to-red-500", count: 28 },
  { id: "museums", name: "Museums & Art", icon: Camera, color: "from-green-500 to-teal-500", count: 34 },
  { id: "markets", name: "Markets & Bazaars", icon: Users, color: "from-indigo-500 to-purple-500", count: 67 }
];

const featuredAttractions = [
  {
    id: 1,
    name: "Amber Fort",
    city: "Jaipur",
    type: "Historic Fort",
    rating: 4.8,
    reviews: 12847,
    entryFee: "₹200",
    timing: "8:00 AM - 6:00 PM",
    duration: "2-3 hours",
    image: "https://images.unsplash.com/photo-1599661046289-e94464cb7ed6?w=1200&q=90",
    highlights: ["Mirror Palace", "Elephant Ride", "Light & Sound Show", "Royal Chambers"],
    description: "Magnificent hilltop palace blending Hindu and Mughal architecture",
    accessibility: "Partial",
    bestTime: "Morning"
  },
  {
    id: 2,
    name: "City Palace Udaipur",
    city: "Udaipur",
    type: "Royal Palace",
    rating: 4.9,
    reviews: 8934,
    entryFee: "₹300",
    timing: "9:30 AM - 5:30 PM",
    duration: "2-4 hours",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=90",
    highlights: ["Lake View", "Museum", "Crystal Gallery", "Vintage Cars"],
    description: "Sprawling palace complex overlooking Lake Pichola",
    accessibility: "Good",
    bestTime: "Afternoon"
  },
  {
    id: 3,
    name: "Mehrangarh Fort",
    city: "Jodhpur",
    type: "Hill Fort",
    rating: 4.8,
    reviews: 15672,
    entryFee: "₹600",
    timing: "9:00 AM - 5:00 PM",
    duration: "3-4 hours",
    image: "https://images.unsplash.com/photo-1642528922719-8876c7d17318?w=1200&q=90",
    highlights: ["City Views", "Museum", "Audio Guide", "Royal Artifacts"],
    description: "One of India's largest forts towering over the Blue City",
    accessibility: "Moderate",
    bestTime: "Morning"
  },
  {
    id: 4,
    name: "Jaisalmer Fort",
    city: "Jaisalmer",
    type: "Living Fort",
    rating: 4.7,
    reviews: 9234,
    entryFee: "₹250",
    timing: "9:00 AM - 6:00 PM",
    duration: "3-5 hours",
    image: "https://images.unsplash.com/photo-1668605105277-87816e3e2aab?w=1200&q=90",
    highlights: ["Golden Architecture", "Havelis", "Temples", "Local Life"],
    description: "UNESCO World Heritage Site - a living fort with residents",
    accessibility: "Moderate",
    bestTime: "Evening"
  }
];

const cityAttractions = {
  jaipur: [
    { name: "Hawa Mahal", type: "Palace", rating: 4.6, fee: "₹50" },
    { name: "Jantar Mantar", type: "Observatory", rating: 4.5, fee: "₹40" },
    { name: "Nahargarh Fort", type: "Fort", rating: 4.4, fee: "₹25" },
    { name: "Albert Hall Museum", type: "Museum", rating: 4.3, fee: "₹40" }
  ],
  udaipur: [
    { name: "Lake Pichola", type: "Lake", rating: 4.8, fee: "Boat ₹400" },
    { name: "Saheliyon Ki Bari", type: "Garden", rating: 4.5, fee: "₹30" },
    { name: "Fateh Sagar Lake", type: "Lake", rating: 4.6, fee: "₹30" },
    { name: "Jagdish Temple", type: "Temple", rating: 4.7, fee: "Free" }
  ],
  jodhpur: [
    { name: "Umaid Bhawan Palace", type: "Palace", rating: 4.7, fee: "₹100" },
    { name: "Jaswant Thada", type: "Memorial", rating: 4.5, fee: "₹30" },
    { name: "Clock Tower Market", type: "Market", rating: 4.4, fee: "Free" },
    { name: "Mandore Gardens", type: "Garden", rating: 4.3, fee: "₹25" }
  ],
  jaisalmer: [
    { name: "Sam Sand Dunes", type: "Desert", rating: 4.6, fee: "₹50" },
    { name: "Patwon Ki Haveli", type: "Haveli", rating: 4.5, fee: "₹250" },
    { name: "Gadisar Lake", type: "Lake", rating: 4.4, fee: "₹30" },
    { name: "Desert National Park", type: "Wildlife", rating: 4.3, fee: "₹200" }
  ]
};

interface AttractionsPageProps {
  onBack?: () => void;
}

export function AttractionsPage({ onBack }: AttractionsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("forts");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("featured");

  const handleBookTicket = (attraction: any) => {
    alert(`Booking tickets for ${attraction.name} - Advanced booking system coming soon!`);
  };

  const handleGetDirections = (attraction: any) => {
    alert(`Getting directions to ${attraction.name} - Maps integration coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* AI Speaker for Attractions */}
      <AISpeaker message="Incredible monuments await! Looking for majestic forts like Amber Fort, serene lakes like Pichola, or golden architecture in Jaisalmer?" />

      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 py-4">
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

      {/* Hero Section - Enhanced with Premium Image */}
      <div className="relative h-[500px] overflow-hidden">
        <PremiumImage
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=85"
          alt="Rajasthan Attractions"
          className="w-full h-full"
          containerClassName="h-full"
          aspectRatio="21/9"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl mb-6 font-bold tracking-tight flex items-center justify-center gap-4"
            >
              <Castle className="w-16 h-16 md:w-20 md:h-20 text-amber-400" />
              Royal Attractions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8 font-light"
            >
              Discover magnificent forts, serene lakes, and architectural wonders of Rajasthan
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
                placeholder="Search attractions, monuments, places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <select 
              className="h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">All Cities</option>
              <option value="jaipur">Jaipur</option>
              <option value="udaipur">Udaipur</option>
              <option value="jodhpur">Jodhpur</option>
              <option value="jaisalmer">Jaisalmer</option>
            </select>
            <Button className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Filter className="w-5 h-5 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {attractionCategories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} places</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="by-city">By City</TabsTrigger>
            <TabsTrigger value="heritage">Heritage Sites</TabsTrigger>
            <TabsTrigger value="tours">Guided Tours</TabsTrigger>
          </TabsList>

          {/* Featured Attractions - Enhanced */}
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredAttractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden premium-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative group">
                      <PremiumImage
                        src={getResponsiveImageUrl(attraction.image, 800)}
                        alt={attraction.name}
                        containerClassName="h-80"
                        aspectRatio="16/10"
                      />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-gray-800">
                        <MapPin className="w-3 h-3 mr-1" />
                        {attraction.city}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600 text-white">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {attraction.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-blue-600 text-white">
                        {attraction.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{attraction.name}</h3>
                      <span className="text-lg font-semibold text-green-600">{attraction.entryFee}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{attraction.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{attraction.timing}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{attraction.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {attraction.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        {attraction.reviews} reviews • Best: {attraction.bestTime}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleGetDirections(attraction)}
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                      <Button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleBookTicket(attraction)}
                      >
                        <Ticket className="w-4 h-4 mr-1" />
                        Book Tickets
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </div>
          </TabsContent>

          {/* By City */}
          <TabsContent value="by-city">
            <div className="space-y-8">
              {Object.entries(cityAttractions).map(([city, attractions]) => (
                <div key={city}>
                  <h3 className="text-xl font-semibold mb-4 capitalize" style={{ fontFamily: 'Georgia, serif' }}>
                    {city} Attractions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {attractions.map((attraction, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{attraction.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {attraction.fee}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{attraction.type}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{attraction.rating}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Heritage Sites */}
          <TabsContent value="heritage">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
              <div className="text-center">
                <Crown className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">UNESCO World Heritage Sites</h2>
                <p className="text-lg opacity-90 mb-6">Explore Rajasthan's globally recognized monuments</p>
                <Button variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
                  View Heritage Trail
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Hill Forts of Rajasthan", sites: 6, year: "2013" },
                { name: "Jantar Mantar, Jaipur", sites: 1, year: "2010" },
                { name: "The Pink City, Jaipur", sites: 1, year: "2019" }
              ].map((heritage, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Crown className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                    <h3 className="font-semibold mb-2">{heritage.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{heritage.sites} heritage sites</p>
                    <Badge className="bg-amber-600 text-white">UNESCO {heritage.year}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guided Tours */}
          <TabsContent value="tours">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Golden Triangle Heritage Tour",
                  duration: "3 Days",
                  price: "₹8,999",
                  includes: ["All Entry Fees", "Guide", "Transport", "Lunch"],
                  rating: 4.8
                },
                {
                  title: "Rajasthan Forts & Palaces",
                  duration: "5 Days",
                  price: "₹15,999",
                  includes: ["Hotel Stay", "All Meals", "Expert Guide", "Photography"],
                  rating: 4.9
                },
                {
                  title: "Desert & Heritage Combo",
                  duration: "4 Days",
                  price: "₹12,499",
                  includes: ["Camel Safari", "Desert Camp", "City Tours", "Cultural Show"],
                  rating: 4.7
                },
                {
                  title: "Photography Tour",
                  duration: "6 Days",
                  price: "₹18,999",
                  includes: ["Pro Photographer", "All Access", "Editing Tips", "Print Package"],
                  rating: 4.8
                },
                {
                  title: "Spiritual Rajasthan",
                  duration: "4 Days",
                  price: "₹11,999",
                  includes: ["Temple Visits", "Spiritual Guide", "Meditation", "Vegetarian Meals"],
                  rating: 4.6
                },
                {
                  title: "Family Adventure Tour",
                  duration: "3 Days",
                  price: "₹9,999",
                  includes: ["Kid-Friendly", "Activities", "Local Cuisine", "Shopping"],
                  rating: 4.7
                }
              ].map((tour, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold">{tour.title}</h3>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{tour.price}</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{tour.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{tour.duration}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Tour Includes:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tour.includes.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Book Tour
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}