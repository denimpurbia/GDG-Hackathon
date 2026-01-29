import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  UtensilsCrossed, 
  Music, 
  MapPin, 
  Star, 
  Clock, 
  Camera, 
  Users,
  Calendar,
  Crown,
  Sparkles,
  ChefHat,
  Globe,
  Heart,
  Video,
  ArrowLeft
} from "lucide-react";
import { AISpeaker } from "./AISpeaker";

const foodCategories = [
  { id: "traditional", name: "Traditional Dishes", icon: ChefHat, color: "from-orange-500 to-red-500" },
  { id: "street-food", name: "Street Food", icon: UtensilsCrossed, color: "from-yellow-500 to-orange-500" },
  { id: "sweets", name: "Rajasthani Sweets", icon: Heart, color: "from-pink-500 to-purple-500" },
  { id: "beverages", name: "Traditional Drinks", icon: Globe, color: "from-blue-500 to-cyan-500" }
];

const culturalExperiences = [
  {
    id: 1,
    title: "Folk Dance & Dinner",
    location: "Chokhi Dhani, Jaipur",
    duration: "3 hours",
    rating: 4.8,
    price: "₹1,200",
    image: "https://images.unsplash.com/photo-1633338718293-785082123de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    highlights: ["Ghoomar Dance", "Kalbelia Performance", "Traditional Thali", "Puppet Show"],
    description: "Experience authentic Rajasthani culture with folk dances and royal feast"
  },
  {
    id: 2,
    title: "Cooking Class with Local Family",
    location: "Local Home, Udaipur",
    duration: "4 hours",
    rating: 4.9,
    price: "₹2,500",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    highlights: ["Dal Baati Churma", "Local Market Visit", "Family Stories", "Recipe Cards"],
    description: "Learn to cook authentic Rajasthani dishes with a local family"
  },
  {
    id: 3,
    title: "Desert Cultural Evening",
    location: "Sam Sand Dunes, Jaisalmer",
    duration: "Evening",
    rating: 4.7,
    price: "₹1,800",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    highlights: ["Camel Safari", "Folk Music", "Desert Dinner", "Star Gazing"],
    description: "Magic evening in the desert with cultural performances under stars"
  }
];

const traditionalDishes = [
  {
    name: "Dal Baati Churma",
    description: "Rajasthan's signature dish with lentils, wheat balls, and sweet crumbs",
    origin: "Traditional Rajasthani",
    spiceLevel: "Medium",
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300"
  },
  {
    name: "Laal Maas",
    description: "Fiery red mutton curry with aromatic spices",
    origin: "Royal Kitchens",
    spiceLevel: "Hot",
    vegetarian: false,
    image: "https://images.unsplash.com/photo-1627308595216-439c00ade1d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300"
  },
  {
    name: "Gatte ki Sabzi",
    description: "Gram flour dumplings in spiced yogurt curry",
    origin: "Desert Cuisine",
    spiceLevel: "Medium",
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300"
  },
  {
    name: "Pyaaz Kachori",
    description: "Crispy pastry filled with spiced onions",
    origin: "Street Food",
    spiceLevel: "Medium",
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300"
  }
];

const festivals = [
  {
    name: "Pushkar Fair",
    date: "November 2024",
    location: "Pushkar",
    type: "Cultural Festival",
    highlights: ["Camel Trading", "Folk Performances", "Traditional Food", "Competitions"]
  },
  {
    name: "Jaipur Literature Festival",
    date: "January 2024",
    location: "Jaipur",
    type: "Literary Festival", 
    highlights: ["Author Talks", "Book Launches", "Cultural Shows", "Food Courts"]
  },
  {
    name: "Desert Festival",
    date: "February 2024",
    location: "Jaisalmer",
    type: "Desert Culture",
    highlights: ["Camel Races", "Folk Music", "Desert Cuisine", "Cultural Programs"]
  }
];

interface FoodAndCulturePageProps {
  onBack?: () => void;
}

export function FoodAndCulturePage({ onBack }: FoodAndCulturePageProps) {
  const [selectedTab, setSelectedTab] = useState("food");
  const [selectedCategory, setSelectedCategory] = useState("traditional");

  const handleBookExperience = (experience: any) => {
    alert(`Booking ${experience.title} - Advanced booking system coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* AI Speaker for Food & Culture */}
      <AISpeaker message="Rajasthan ki khushboo aur rang! Want to taste authentic Dal Baati Churma or experience Ghoomar dance? Tell me your cultural cravings!" />

      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-6 py-4">
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1633338718293-785082123de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200')`
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
              <span className="text-amber-400">खाना</span> & <span className="text-orange-400">संस्कृति</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Taste Rajasthan, Live Rajasthan - Food & Culture Combined
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="food">Traditional Food</TabsTrigger>
            <TabsTrigger value="culture">Cultural Experiences</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
            <TabsTrigger value="tours">Food Tours</TabsTrigger>
          </TabsList>

          {/* Food Section */}
          <TabsContent value="food">
            {/* Food Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Explore Authentic Flavors
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {foodCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedCategory === category.id ? 'ring-2 ring-orange-500' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Traditional Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {traditionalDishes.map((dish, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={dish.vegetarian ? "bg-green-600" : "bg-red-600"}>
                        {dish.vegetarian ? "Veg" : "Non-Veg"}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Origin:</span>
                        <span>{dish.origin}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Spice Level:</span>
                        <Badge variant="outline" className="text-xs">
                          {dish.spiceLevel}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                      Find Restaurants
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Food Experiences */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">🍽️ Rajasthani Food Journey</h2>
                <p className="text-lg opacity-90">From street food to royal kitchens - taste the authentic flavors</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <ChefHat className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Cooking Classes</h3>
                  <p className="text-sm opacity-90">Learn from local families</p>
                </div>
                <div className="text-center">
                  <UtensilsCrossed className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Food Tours</h3>
                  <p className="text-sm opacity-90">Guided culinary adventures</p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Sweet Trails</h3>
                  <p className="text-sm opacity-90">Traditional desserts tour</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Cultural Experiences Section */}
          <TabsContent value="culture">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {culturalExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-600 text-white">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {experience.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white text-gray-800">
                        <Clock className="w-3 h-3 mr-1" />
                        {experience.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                      <span className="text-lg font-semibold text-purple-600">{experience.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{experience.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{experience.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Experience Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Camera className="w-4 h-4 mr-1" />
                        Gallery
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleBookExperience(experience)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cultural Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Folk Dance", icon: "💃", desc: "Ghoomar, Kalbelia, Bhavai" },
                { title: "Music", icon: "🎵", desc: "Traditional instruments & songs" },
                { title: "Art & Craft", icon: "🎨", desc: "Blue pottery, miniature paintings" },
                { title: "Puppet Shows", icon: "🎭", desc: "Kathputli traditional performances" }
              ].map((category, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Festivals Section */}
          <TabsContent value="festivals">
            <div className="space-y-6 mb-12">
              {festivals.map((festival, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{festival.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{festival.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="text-sm">{festival.location}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-purple-600 text-white">
                        {festival.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {festival.highlights.map((highlight, idx) => (
                        <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline">Learn More</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Book Festival Tour</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Food Tours Section */}
          <TabsContent value="tours">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Jaipur Street Food Walking Tour",
                  duration: "3 hours",
                  price: "₹899",
                  includes: ["Pyaaz Kachori", "Lassi", "Kulfi", "Local Guide"],
                  rating: 4.8
                },
                {
                  title: "Udaipur Royal Kitchen Experience",
                  duration: "4 hours", 
                  price: "₹2,499",
                  includes: ["Palace Visit", "Cooking Class", "Royal Thali", "Recipe Book"],
                  rating: 4.9
                },
                {
                  title: "Jodhpur Spice Market Tour",
                  duration: "2 hours",
                  price: "₹699",
                  includes: ["Spice Tasting", "Market Visit", "Tea Session", "Spice Kit"],
                  rating: 4.7
                },
                {
                  title: "Jaisalmer Desert Food Safari",
                  duration: "Evening",
                  price: "₹1,899",
                  includes: ["Camel Ride", "Desert Cooking", "Folk Music", "Star Gazing"],
                  rating: 4.6
                }
              ].map((tour, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{tour.title}</h3>
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
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Book Food Tour
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