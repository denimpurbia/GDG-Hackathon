import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PremiumImage, getResponsiveImageUrl } from "./PremiumImage";
import { Star, MapPin, Wifi, Car, Utensils, Shield, Camera, Users, Calendar, CreditCard, CheckCircle, Phone, MapIcon, Globe, Play, Eye, Headphones, ChevronDown, ArrowLeft } from "lucide-react";
import { AISpeaker } from "./AISpeaker";

// Enhanced hotel data with specific examples from requirements
const hotels = [
  {
    id: 1,
    name: "Jagat Niwas Palace",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=90",
    price: "₹3,200",
    originalPrice: "₹4,000",
    rating: 4.5,
    reviews: 1200,
    location: "Lake Pichola, Udaipur",
    city: "Udaipur",
    amenities: ["Pool", "Rooftop Restaurant", "Free WiFi", "Lake View"],
    facilities: ["Free WiFi", "Pool", "Near City Center"],
    facilityIcons: ["WiFi", "Pool", "Restaurant", "Lake View"],
    type: "Heritage Haveli",
    category: "Mid",
    guestRating: "4★",
    safetyBadge: true,
    cityPack: "Udaipur Lake Package - ₹8,999 (2 nights + breakfast + boat ride)",
    hasVR: true,
    description: "Authentic heritage hotel with stunning lake views and royal architecture."
  },
  {
    id: 2,
    name: "Lake Palace Udaipur",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90",
    price: "₹32,500",
    originalPrice: "₹40,000",
    rating: 4.9,
    reviews: 847,
    location: "Lake Pichola, Udaipur",
    city: "Udaipur",
    amenities: ["WiFi", "Lake View", "Royal Spa", "Heritage Tours", "Butler Service"],
    facilities: ["Free WiFi", "Pool", "Spa", "Near City Center"],
    facilityIcons: ["WiFi", "Pool", "Spa", "Butler"],
    type: "Palace Hotel",
    category: "Luxury",
    guestRating: "5★",
    safetyBadge: true,
    cityPack: "Udaipur Royal Package - ₹45,999 (2 nights + boat ride + dinner)",
    hasVR: true,
    description: "Floating palace hotel with unmatched luxury and heritage."
  },
  {
    id: 3,
    name: "Rambagh Palace Jaipur",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=90",
    price: "₹28,900",
    originalPrice: "₹35,000",
    rating: 4.8,
    reviews: 1156,
    location: "Pink City, Jaipur",
    city: "Jaipur",
    amenities: ["WiFi", "Palace Gardens", "Traditional Cuisine", "Elephant Rides"],
    facilities: ["Free WiFi", "Pool", "Family Friendly", "Near City Center"],
    facilityIcons: ["WiFi", "Pool", "Family", "Gardens"],
    type: "Heritage Haveli",
    category: "Luxury",
    guestRating: "5★",
    safetyBadge: true,
    cityPack: "Jaipur Heritage Package - ₹39,999 (2 nights + city tour + dinner)",
    hasVR: true,
    description: "Former palace of Maharaja with royal gardens and traditional luxury."
  },
  {
    id: 4,
    name: "Umaid Bhawan Palace Jodhpur",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=90",
    price: "₹45,200",
    originalPrice: "₹55,000",
    rating: 4.9,
    reviews: 623,
    location: "Blue City, Jodhpur",
    city: "Jodhpur",
    amenities: ["WiFi", "Museum", "Royal Gardens", "Vintage Car Collection"],
    facilities: ["Free WiFi", "Pool", "Spa", "Family Friendly"],
    facilityIcons: ["WiFi", "Pool", "Spa", "Museum"],
    type: "Palace Hotel",
    category: "Luxury",
    guestRating: "5★",
    safetyBadge: true,
    cityPack: "Jodhpur Royal Package - ₹55,999 (2 nights + fort tour + dinner)",
    hasVR: true,
    description: "Art Deco palace with museum, vintage cars and royal suites."
  },
  {
    id: 5,
    name: "Desert Camp Jaisalmer",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=90",
    price: "₹12,800",
    originalPrice: "₹16,000",
    rating: 4.6,
    reviews: 394,
    location: "Thar Desert, Jaisalmer",
    city: "Jaisalmer",
    amenities: ["Desert Safari", "Camel Rides", "Folk Music", "Stargazing", "Bonfire"],
    facilities: ["Free WiFi", "Family Friendly"],
    facilityIcons: ["WiFi", "Safari", "Music", "Stars"],
    type: "Resort",
    category: "Mid",
    guestRating: "4★",
    safetyBadge: true,
    cityPack: "Jaisalmer Desert Package - ₹19,999 (2 nights + safari + dinner)",
    hasVR: false,
    description: "Luxury desert camping with authentic Rajasthani cultural experiences."
  },
  {
    id: 6,
    name: "Hotel Pushkar Palace",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=90",
    price: "₹1,400",
    originalPrice: "₹2,000",
    rating: 4.2,
    reviews: 567,
    location: "Sacred Lake, Pushkar",
    city: "Pushkar",
    amenities: ["Free WiFi", "Temple View", "Yoga Classes", "Local Tours"],
    facilities: ["Free WiFi", "Family Friendly"],
    facilityIcons: ["WiFi", "Temple", "Yoga", "Tours"],
    type: "Budget Stay",
    category: "Budget",
    guestRating: "4★",
    safetyBadge: true,
    cityPack: "Pushkar Spiritual Package - ₹4,999 (2 nights + temple tour + breakfast)",
    hasVR: false,
    description: "Peaceful lakeside hotel near sacred temples with spiritual ambiance."
  }
];

interface HotelsPageProps {
  onBack?: () => void;
}

export function HotelsPage({ onBack }: HotelsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedFacilities, setSelectedFacilities] = useState("all");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showVRPreview, setShowVRPreview] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
    specialRequests: "",
    paymentMethod: ""
  });

  // Filter hotels based on search and filters
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "all" || hotel.city === selectedCity;
    const matchesPrice = selectedPrice === "all" || hotel.category === selectedPrice;
    const matchesType = selectedType === "all" || hotel.type === selectedType;
    const matchesRating = selectedRating === "all" || hotel.guestRating === selectedRating;
    const matchesFacilities = selectedFacilities === "all" || 
                             hotel.facilities.some(facility => facility.includes(selectedFacilities));

    return matchesSearch && matchesCity && matchesPrice && matchesType && matchesRating && matchesFacilities;
  });

  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
    
    // AI Hotel Recommender simulation
    setTimeout(() => {
      setAiRecommendations([
        `${hotel.name} is an excellent choice! Based on your preferences, you might also like nearby options.`,
        `Pro tip: Book 3+ nights for 15% discount at ${hotel.name}`,
        `This hotel has verified safety protocols including CCTV and tourist-friendly staff.`
      ]);
    }, 1000);
  };

  const handleBookingSubmit = () => {
    setShowBookingForm(false);
    setBookingConfirmed(true);
  };

  const handleCityPackBooking = (hotel: any) => {
    alert(`Booking ${hotel.cityPack} - Complete package with accommodation, meals, and experiences!`);
  };

  const handleVRPreview = (hotel: any) => {
    setSelectedHotel(hotel);
    setShowVRPreview(true);
  };

  const getFacilityIcon = (facility: string) => {
    const iconMap = {
      "WiFi": <Wifi className="w-4 h-4 text-blue-500" />,
      "Pool": <div className="w-4 h-4 bg-blue-400 rounded-full"></div>,
      "Spa": <span className="w-4 h-4 text-purple-500">🧖‍♀️</span>,
      "Restaurant": <Utensils className="w-4 h-4 text-green-500" />,
      "Lake View": <span className="w-4 h-4 text-blue-600">🏞️</span>,
      "Butler": <span className="w-4 h-4 text-amber-600">🤵</span>,
      "Family": <Users className="w-4 h-4 text-green-500" />,
      "Gardens": <span className="w-4 h-4 text-green-600">🌳</span>,
      "Museum": <span className="w-4 h-4 text-brown-500">🏛️</span>,
      "Safari": <span className="w-4 h-4 text-orange-500">🐪</span>,
      "Music": <span className="w-4 h-4 text-pink-500">🎵</span>,
      "Stars": <span className="w-4 h-4 text-yellow-500">⭐</span>,
      "Temple": <span className="w-4 h-4 text-orange-600">🕉️</span>,
      "Yoga": <span className="w-4 h-4 text-purple-600">🧘</span>,
      "Tours": <span className="w-4 h-4 text-blue-600">🗺️</span>
    };
    return iconMap[facility as keyof typeof iconMap] || <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* AI Speaker for Hotels */}
      <AISpeaker message="Looking for a lake-view hotel in Udaipur or a budget stay in Jodhpur? Tell me your budget, I'll find the best match." />

      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-6 py-4">
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

      {/* Hero Banner - Enhanced with Premium Image */}
      <div className="relative h-[500px] overflow-hidden">
        <PremiumImage
          src="https://images.unsplash.com/photo-1598762838642-cc15c1382f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwaG90ZWwlMjByYWphc3RoYW58ZW58MXx8fHwxNzU3NTE3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Rajasthan Hotels"
          className="w-full h-full"
          containerClassName="h-full"
          aspectRatio="21/9"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl mb-6 font-bold tracking-tight"
            >
              Stay in Royal Comfort Across Rajasthan
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8 font-light"
            >
              Book luxury palaces, heritage havelis, resorts, and budget stays – all verified for a safe and smooth experience.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Hotel Search & Filter Bar - Exact as specified */}
      <div className="bg-white shadow-lg border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search Box */}
            <div className="lg:col-span-2">
              <Label htmlFor="search">Enter City / Hotel Name</Label>
              <Input
                id="search"
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* City Filter */}
            <div>
              <Label>City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Jaipur">Jaipur</SelectItem>
                  <SelectItem value="Udaipur">Udaipur</SelectItem>
                  <SelectItem value="Jodhpur">Jodhpur</SelectItem>
                  <SelectItem value="Jaisalmer">Jaisalmer</SelectItem>
                  <SelectItem value="Pushkar">Pushkar</SelectItem>
                  <SelectItem value="Mount Abu">Mount Abu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Filter */}
            <div>
              <Label>Price</Label>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="Budget">Budget (&lt;₹1500)</SelectItem>
                  <SelectItem value="Mid">Mid (₹1500–₹4000)</SelectItem>
                  <SelectItem value="Luxury">Luxury (₹4000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div>
              <Label>Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Hotel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Heritage Haveli">Heritage Haveli</SelectItem>
                  <SelectItem value="Palace Hotel">Palace Hotel</SelectItem>
                  <SelectItem value="Budget Stay">Budget Stay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Guest Rating Filter */}
            <div>
              <Label>Guest Rating</Label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="3★">3★</SelectItem>
                  <SelectItem value="4★">4★</SelectItem>
                  <SelectItem value="5★">5★</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Facilities Filter */}
          <div className="mt-4">
            <Label>Facilities</Label>
            <Select value={selectedFacilities} onValueChange={setSelectedFacilities}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select Facilities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Facilities</SelectItem>
                <SelectItem value="Free WiFi">Free WiFi</SelectItem>
                <SelectItem value="Pool">Pool</SelectItem>
                <SelectItem value="Spa">Spa</SelectItem>
                <SelectItem value="Family Friendly">Family Friendly</SelectItem>
                <SelectItem value="Near City Center">Near City Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Hotel Listings - Enhanced with Premium Images and Larger Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="overflow-hidden premium-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border border-amber-100/50">
                <div className="relative group">
                  <PremiumImage
                    src={getResponsiveImageUrl(hotel.image, 800)}
                    alt={hotel.name}
                    containerClassName="h-80"
                    aspectRatio="16/10"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm px-3 py-1.5 shadow-lg">
                      {hotel.type}
                    </Badge>
                    {hotel.safetyBadge && (
                      <Badge className="bg-green-600 text-white flex items-center gap-1.5 text-sm px-3 py-1.5 shadow-lg">
                        <Shield className="w-4 h-4" />
                        Safe Stay
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    {hotel.hasVR && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/95 hover:bg-white text-gray-700 text-sm px-3 py-2 shadow-lg backdrop-blur-sm"
                        onClick={() => handleVRPreview(hotel)}
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        360° Tour
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/95 hover:bg-white text-gray-700 text-sm px-3 py-2 shadow-lg backdrop-blur-sm"
                    >
                      <Camera className="w-4 h-4 mr-1.5" />
                      Photos
                    </Button>
                  </div>

                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="pb-4 pt-6">
                  <h3 className="text-2xl mb-3 font-semibold tracking-tight">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <span className="text-base">{hotel.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{hotel.rating}</span>
                    </div>
                    <span className="text-gray-600">({hotel.reviews} reviews)</span>
                    <Badge variant="outline" className="ml-auto">{hotel.guestRating}</Badge>
                  </div>

                  {/* Facilities Icons - Enhanced */}
                  <div className="flex gap-4 mb-4 flex-wrap">
                    {hotel.facilityIcons.slice(0, 5).map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-sm text-gray-600">
                        {getFacilityIcon(facility)}
                        <span className="text-xs">{facility}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{hotel.description}</p>
                </CardHeader>

                <CardContent className="py-0 px-6">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-sm px-3 py-1">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  {/* City Pack Offer - Enhanced */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl mb-5 border border-amber-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-900">City Pack Special</span>
                    </div>
                    <p className="text-sm text-amber-700 mb-3 leading-relaxed">{hotel.cityPack}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 flex-1 shadow-md premium-button"
                        onClick={() => handleCityPackBooking(hotel)}
                      >
                        Book City Pack
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs px-2 py-1"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* AI Hotel Recommender Feature */}
                  <div className="bg-blue-50 p-2 rounded text-xs border border-blue-200 mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Headphones className="w-3 h-3 text-blue-600" />
                      <span className="font-medium text-blue-800">AI Recommends</span>
                    </div>
                    <p className="text-blue-700">
                      "Best {hotel.category.toLowerCase()} option in {hotel.city} for your dates!"
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-gray-900">{hotel.price}</span>
                    <span className="text-gray-500 line-through text-sm">{hotel.originalPrice}</span>
                    <span className="text-xs text-gray-600">per night</span>
                  </div>
                  
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6"
                    onClick={() => handleBookNow(hotel)}
                  >
                    Book Hotel
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No hotels found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("all");
                setSelectedPrice("all");
                setSelectedType("all");
                setSelectedRating("all");
                setSelectedFacilities("all");
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* AR/VR Preview Modal */}
      <Dialog open={showVRPreview} onOpenChange={setShowVRPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">360° Virtual Tour - {selectedHotel?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white bg-black/50 rounded-full p-4 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">Virtual Reality Preview</h3>
                  <p className="text-gray-600">Experience the hotel lobby, rooms, and amenities in 360°</p>
                </div>
              </div>
              
              {/* Mock VR Controls */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline" className="bg-white/90">
                    🛏️ Room Tour
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90">
                    🏨 Lobby View
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90">
                    🏊 Pool Area
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90">
                    🍽️ Restaurant
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => setShowVRPreview(false)}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Book This Hotel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Form Modal - Enhanced */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900 mb-4">
              Book {selectedHotel?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedHotel && (
            <div className="space-y-6">
              {/* Hotel Summary */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={selectedHotel.image}
                    alt={selectedHotel.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{selectedHotel.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedHotel.location}
                    </p>
                    <p className="text-amber-600 font-semibold">{selectedHotel.price} per night</p>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              {aiRecommendations.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <span className="font-medium text-blue-800">Smart Recommendations</span>
                  </div>
                  <div className="space-y-2">
                    {aiRecommendations.map((rec, idx) => (
                      <p key={idx} className="text-blue-700 text-sm">• {rec}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkin">Check-in Date</Label>
                  <Input
                    id="checkin"
                    type="date"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="checkout">Check-out Date</Label>
                  <Input
                    id="checkout"
                    type="date"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={bookingData.guests} onValueChange={(value: string) => setBookingData({...bookingData, guests: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Select value={bookingData.rooms} onValueChange={(value: string) => setBookingData({...bookingData, rooms: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Room</SelectItem>
                      <SelectItem value="2">2 Rooms</SelectItem>
                      <SelectItem value="3">3 Rooms</SelectItem>
                      <SelectItem value="4">4+ Rooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requests">Special Requests (Optional)</Label>
                <Textarea
                  id="requests"
                  placeholder="Early check-in, extra bed, airport pickup, etc."
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                />
              </div>

              {/* Payment Options - Enhanced */}
              <div>
                <Label>Payment Options</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {[
                    "UPI (Google Pay)", 
                    "UPI (PhonePe)", 
                    "UPI (Paytm)", 
                    "Debit Card", 
                    "Credit Card", 
                    "Net Banking",
                    "Wallets",
                    "International Cards"
                  ].map((method) => (
                    <Button
                      key={method}
                      variant={bookingData.paymentMethod === method ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBookingData({...bookingData, paymentMethod: method})}
                      className="text-xs"
                    >
                      {method}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Assistant Message - Exact as specified */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <span className="font-medium text-blue-800">AI Assistant</span>
                </div>
                <p className="text-blue-700 text-sm">
                  You're booking {selectedHotel.name} for 2 nights, {bookingData.guests} guests. 
                  Do you want breakfast included for just ₹500 extra per day?
                </p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Yes, Add Breakfast
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    No Thanks
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBookingSubmit}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  disabled={!bookingData.checkIn || !bookingData.checkOut || !bookingData.paymentMethod}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Modal - Enhanced */}
      <Dialog open={bookingConfirmed} onOpenChange={setBookingConfirmed}>
        <DialogContent className="max-w-lg">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed! 🎉</h2>
              <p className="text-gray-600">Your reservation has been successfully confirmed.</p>
            </div>

            {selectedHotel && (
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Booking ID:</span>
                    <span className="text-amber-600 font-mono">#RJHOT{Math.random().toString().slice(2, 7)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hotel Name:</span>
                    <span>{selectedHotel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">City:</span>
                    <span>{selectedHotel.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Guest Details:</span>
                    <span>{bookingData.guests} guests, {bookingData.rooms} room(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Stay Duration:</span>
                    <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-amber-600">
                    <span>Total Paid:</span>
                    <span>{selectedHotel.price}</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Assistant Confirmation - Exact as specified */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">AI</span>
                </div>
                <span className="font-medium text-blue-800">AI Assistant</span>
              </div>
              <p className="text-blue-700 text-sm">
                Your booking is confirmed! Do you want me to send directions to your WhatsApp or email?
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="text-xs">
                  Send to WhatsApp
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Send to Email
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => alert("Download link sent to email!")}
              >
                Download Invoice
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500"
                onClick={() => setBookingConfirmed(false)}
              >
                Done
              </Button>
            </div>

            {/* Options: Cancel / Reschedule */}
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-amber-600">
                <Phone className="w-4 h-4" />
                Call Hotel
              </button>
              <button className="flex items-center gap-1 hover:text-amber-600">
                <MapIcon className="w-4 h-4" />
                Get Directions
              </button>
              <button className="flex items-center gap-1 hover:text-red-600">
                Cancel Booking
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                Reschedule
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}