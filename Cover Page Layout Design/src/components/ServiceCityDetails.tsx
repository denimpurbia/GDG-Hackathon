import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Phone, 
  CreditCard,
  CheckCircle,
  Clock,
  IndianRupee,
  Wifi,
  Car,
  Bike,
  Coffee,
  UtensilsCrossed,
  Building2,
  Shield,
  Camera,
  Route,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Navigation,
  Eye,
  Play,
  ChevronDown,
  Filter,
  SortAsc,
  Map,
  Bot,
  Globe
} from "lucide-react";

interface ServiceCityDetailsProps {
  serviceName: string;
  cityName: string;
  onBack: () => void;
  onNavigateToMap?: () => void;
  onNavigateToSafety?: () => void;
}

// Comprehensive city data for all services
const cityServiceData: Record<string, any> = {
  "Udaipur": {
    name: "Udaipur",
    tagline: "Venice of the East",
    description: "City of lakes, palaces & romance",
    heroImage: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwaG90ZWwlMjByYWphc3RoYW58ZW58MXx8fHwxNzU3NTE3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-blue-600 to-cyan-600",
    rating: 4.8,
    coordinates: "24.5854° N, 73.7125° E",
    bestTime: "October to March",
    language: "Hindi, Rajasthani, English",
    currency: "Indian Rupee (₹)",
    hotels: [
      {
        id: 1,
        name: "Lake Palace Udaipur",
        price: 32500,
        originalPrice: 40000,
        rating: 4.9,
        reviews: 847,
        location: "Lake Pichola",
        image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?w=400",
        type: "Palace Hotel",
        category: "Luxury",
        amenities: ["WiFi", "Lake View", "Royal Spa", "Heritage Tours", "Butler Service"],
        description: "Floating palace hotel with unmatched luxury and heritage.",
        safetyFeatures: ["CCTV", "Security Staff", "Emergency Contacts"],
        cityPack: "Udaipur Royal Package - ₹45,999 (2 nights + boat ride + dinner)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: true,
          payAtHotel: true,
          verified: true
        }
      },
      {
        id: 2,
        name: "Jagat Niwas Palace",
        price: 3200,
        originalPrice: 4000,
        rating: 4.5,
        reviews: 1200,
        location: "Lake Pichola",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        type: "Heritage Haveli",
        category: "Mid",
        amenities: ["Pool", "Rooftop Restaurant", "Free WiFi", "Lake View"],
        description: "Authentic heritage hotel with stunning lake views and royal architecture.",
        safetyFeatures: ["Tourist Police Contact", "Verified Staff", "Safe Location"],
        cityPack: "Udaipur Lake Package - ₹8,999 (2 nights + breakfast + boat ride)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: false,
          payAtHotel: true,
          verified: true
        }
      },
      {
        id: 3,
        name: "Hotel Udai Kothi",
        price: 1800,
        originalPrice: 2500,
        rating: 4.2,
        reviews: 650,
        location: "Near City Palace",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
        type: "Budget Stay",
        category: "Budget",
        amenities: ["Free WiFi", "Rooftop", "City View", "AC"],
        description: "Budget-friendly hotel with great city views and clean facilities.",
        safetyFeatures: ["Safe Location", "Verified Reviews", "Tourist Friendly"],
        cityPack: "Udaipur Explorer Package - ₹4,999 (2 nights + breakfast)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: true,
          payAtHotel: false,
          verified: true
        }
      }
    ],
    transportation: {
      cars: [
        {
          id: 1,
          name: "Toyota Innova Crysta",
          type: "SUV",
          capacity: "7 seater",
          price: 2500,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "GPS", "Driver", "Fuel"],
          description: "Premium SUV perfect for family trips and city tours",
          availability: "Available",
          instantBooking: true,
          includes: ["Driver charges", "Fuel for local trips", "Toll charges"]
        },
        {
          id: 2,
          name: "Maruti Swift Dzire",
          type: "Sedan",
          capacity: "4 seater",
          price: 1800,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "GPS", "Self Drive", "Fuel"],
          description: "Comfortable sedan for couples and small groups",
          availability: "Available",
          instantBooking: true,
          includes: ["Insurance", "Fuel for 150km", "24/7 Support"]
        },
        {
          id: 3,
          name: "Tata Indica",
          type: "Hatchback",
          capacity: "4 seater",
          price: 1200,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "Basic GPS", "Self Drive"],
          description: "Budget-friendly option for local city exploration",
          availability: "Limited",
          instantBooking: false,
          includes: ["Basic insurance", "Fuel for 100km"]
        }
      ],
      bikes: [
        {
          id: 1,
          name: "Royal Enfield Classic 350",
          type: "Cruiser",
          price: 800,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Insurance", "Helmet", "Lock"],
          description: "Perfect for exploring the heritage city in style",
          availability: "Available",
          instantBooking: true,
          includes: ["Helmet", "Insurance", "24/7 Support"]
        },
        {
          id: 2,
          name: "Honda Activa 6G",
          type: "Scooter",
          price: 400,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Helmet", "Lock", "Easy Ride"],
          description: "Convenient scooter for quick city tours",
          availability: "Available",
          instantBooking: true,
          includes: ["Helmet", "Basic insurance"]
        }
      ]
    },
    restaurants: [
      {
        id: 1,
        name: "Ambrai Restaurant",
        type: "Fine Dining",
        cuisine: "Rajasthani, Continental",
        price: 1200,
        priceType: "per person",
        rating: 4.6,
        reviews: 2340,
        location: "Amet Haveli, Lake Pichola",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Lake view dining with authentic Rajasthani cuisine",
        timings: "7:00 PM - 11:00 PM",
        features: ["Lake View", "Live Music", "Romantic Setting", "Vegan Options"],
        reservation: {
          required: true,
          advance: "2-3 hours",
          instantBooking: true
        }
      },
      {
        id: 2,
        name: "Upre by 1559 AD",
        type: "Rooftop",
        cuisine: "Multi-cuisine",
        price: 800,
        priceType: "per person",
        rating: 4.4,
        reviews: 1890,
        location: "Lake Palace Road",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Rooftop dining with panoramic city views",
        timings: "12:00 PM - 11:00 PM",
        features: ["City View", "Bar", "Live DJ", "Instagram Worthy"],
        reservation: {
          required: false,
          advance: "1 hour",
          instantBooking: true
        }
      },
      {
        id: 3,
        name: "Millets of Mewar",
        type: "Healthy Cafe",
        cuisine: "Organic, Health Food",
        price: 400,
        priceType: "per person",
        rating: 4.5,
        reviews: 567,
        location: "City Palace Road",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Organic and healthy food options",
        timings: "8:00 AM - 10:00 PM",
        features: ["Organic", "Vegan", "Gluten Free", "Healthy"],
        reservation: {
          required: false,
          advance: "Not required",
          instantBooking: true
        }
      }
    ],
    attractions: [
      {
        id: 1,
        name: "City Palace Complex",
        type: "Palace",
        price: 300,
        priceType: "entry fee",
        rating: 4.7,
        reviews: 5670,
        image: "https://images.unsplash.com/photo-1667205591166-0a3bfe27708e?w=400",
        description: "Magnificent palace complex showcasing Rajasthani architecture",
        timings: "9:30 AM - 5:30 PM",
        duration: "2-3 hours",
        highlights: ["Museum", "Architecture", "Lake Views", "Photography"],
        tickets: {
          online: true,
          advance: true,
          skipLine: true
        }
      },
      {
        id: 2,
        name: "Lake Pichola Boat Ride",
        type: "Experience",
        price: 800,
        priceType: "per person",
        rating: 4.8,
        reviews: 3210,
        image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?w=400",
        description: "Sunset boat ride with palace views",
        timings: "9:00 AM - 6:00 PM",
        duration: "1 hour",
        highlights: ["Sunset Views", "Palace Views", "Photography", "Romantic"],
        tickets: {
          online: true,
          advance: false,
          skipLine: false
        }
      }
    ],
    food: [
      {
        id: 1,
        name: "Dal Baati Churma",
        type: "Traditional",
        price: 180,
        description: "Authentic Rajasthani staple with lentils, baked wheat balls and sweet churma",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.7,
        availability: "All restaurants",
        spiceLevel: "Medium",
        dietType: "Vegetarian"
      },
      {
        id: 2,
        name: "Laal Maas",
        type: "Non-Vegetarian",
        price: 320,
        description: "Spicy mutton curry in red chili gravy - Rajasthani specialty",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.6,
        availability: "Select restaurants",
        spiceLevel: "High",
        dietType: "Non-Vegetarian"
      }
    ]
  },
  "Jaipur": {
    name: "Jaipur",
    tagline: "The Pink City",
    description: "Capital city with royal palaces",
    heroImage: "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU3NTE3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-pink-600 to-rose-600",
    rating: 4.7,
    coordinates: "26.9124° N, 75.7873° E",
    bestTime: "October to March",
    language: "Hindi, Rajasthani, English",
    currency: "Indian Rupee (₹)",
    hotels: [
      {
        id: 1,
        name: "Rambagh Palace",
        price: 28900,
        originalPrice: 35000,
        rating: 4.8,
        reviews: 1156,
        location: "Pink City, Jaipur",
        image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?w=400",
        type: "Heritage Palace",
        category: "Luxury",
        amenities: ["WiFi", "Palace Gardens", "Traditional Cuisine", "Elephant Rides"],
        description: "Former palace of Maharaja with royal gardens and traditional luxury.",
        safetyFeatures: ["Royal Security", "Tourist Police", "Emergency Services"],
        cityPack: "Jaipur Heritage Package - ₹39,999 (2 nights + city tour + dinner)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: true,
          payAtHotel: true,
          verified: true
        }
      }
    ],
    transportation: {
      cars: [
        {
          id: 1,
          name: "Toyota Innova Crysta",
          type: "SUV",
          capacity: "7 seater",
          price: 2200,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "GPS", "Driver", "Fuel"],
          description: "Premium SUV for exploring Pink City's attractions",
          availability: "Available",
          instantBooking: true,
          includes: ["Driver charges", "Fuel for local trips", "Toll charges"]
        }
      ],
      bikes: [
        {
          id: 1,
          name: "Royal Enfield Himalayan",
          type: "Adventure",
          price: 900,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Insurance", "Helmet", "GPS"],
          description: "Adventure bike perfect for Jaipur's fort roads",
          availability: "Available",
          instantBooking: true,
          includes: ["Helmet", "Insurance", "GPS device"]
        }
      ]
    },
    restaurants: [
      {
        id: 1,
        name: "Chokhi Dhani",
        type: "Cultural Village",
        cuisine: "Rajasthani Traditional",
        price: 950,
        priceType: "per person",
        rating: 4.5,
        reviews: 4500,
        location: "Tonk Road",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Complete Rajasthani village experience with food and entertainment",
        timings: "5:00 PM - 11:00 PM",
        features: ["Cultural Shows", "Village Experience", "Traditional Food", "Folk Dance"],
        reservation: {
          required: true,
          advance: "Same day",
          instantBooking: true
        }
      }
    ],
    attractions: [
      {
        id: 1,
        name: "Amber Fort",
        type: "Fort",
        price: 200,
        priceType: "entry fee",
        rating: 4.8,
        reviews: 8900,
        image: "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?w=400",
        description: "Magnificent hilltop fort with stunning architecture",
        timings: "8:00 AM - 6:00 PM",
        duration: "3-4 hours",
        highlights: ["Elephant Ride", "Mirror Palace", "Fort Architecture", "Valley Views"],
        tickets: {
          online: true,
          advance: true,
          skipLine: true
        }
      }
    ],
    food: [
      {
        id: 1,
        name: "Ghewar",
        type: "Sweet",
        price: 120,
        description: "Traditional Rajasthani sweet made with flour and soaked in sugar syrup",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.8,
        availability: "Sweet shops",
        spiceLevel: "Sweet",
        dietType: "Vegetarian"
      }
    ]
  },
  "Jodhpur": {
    name: "Jodhpur",
    tagline: "The Blue City",
    description: "Blue houses & mighty fort",
    heroImage: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2RocHVyJTIwYmx1ZSUyMGNpdHklMjBmb3J0fGVufDF8fHx8MTc1NzUxOTI3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-blue-700 to-indigo-700",
    rating: 4.6,
    coordinates: "26.2389° N, 73.0243° E",
    bestTime: "October to March",
    language: "Hindi, Rajasthani, English",
    currency: "Indian Rupee (₹)",
    hotels: [
      {
        id: 1,
        name: "Umaid Bhawan Palace",
        price: 45200,
        originalPrice: 55000,
        rating: 4.9,
        reviews: 623,
        location: "Blue City, Jodhpur",
        image: "https://images.unsplash.com/photo-1657108955763-77b85a86ab4d?w=400",
        type: "Palace Hotel",
        category: "Luxury",
        amenities: ["WiFi", "Museum", "Royal Gardens", "Vintage Car Collection"],
        description: "Art Deco palace with museum, vintage cars and royal suites.",
        safetyFeatures: ["Palace Security", "Museum Guards", "Tourist Assistance"],
        cityPack: "Jodhpur Royal Package - ₹55,999 (2 nights + fort tour + dinner)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: true,
          payAtHotel: true,
          verified: true
        }
      }
    ],
    transportation: {
      cars: [
        {
          id: 1,
          name: "Mahindra Scorpio",
          type: "SUV",
          capacity: "7 seater",
          price: 2000,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "GPS", "Driver", "Local Guide"],
          description: "Sturdy SUV perfect for blue city exploration",
          availability: "Available",
          instantBooking: true,
          includes: ["Driver", "Local guide", "Fuel"]
        }
      ],
      bikes: [
        {
          id: 1,
          name: "Royal Enfield Classic 350",
          type: "Cruiser",
          price: 700,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Insurance", "Helmet", "Map"],
          description: "Classic bike for blue city street exploration",
          availability: "Available",
          instantBooking: true,
          includes: ["Helmet", "City map", "Insurance"]
        }
      ]
    },
    restaurants: [
      {
        id: 1,
        name: "Indique",
        type: "Rooftop Restaurant",
        cuisine: "Continental, Indian",
        price: 600,
        priceType: "per person",
        rating: 4.5,
        reviews: 1800,
        location: "Pal Haveli, Near Fort",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Fort view dining with international cuisine",
        timings: "12:00 PM - 11:00 PM",
        features: ["Fort View", "Rooftop", "Continental Food", "Photography"],
        reservation: {
          required: false,
          advance: "1 hour",
          instantBooking: true
        }
      }
    ],
    attractions: [
      {
        id: 1,
        name: "Mehrangarh Fort",
        type: "Fort",
        price: 100,
        priceType: "entry fee",
        rating: 4.9,
        reviews: 12000,
        image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
        description: "One of India's largest forts with panoramic city views",
        timings: "9:00 AM - 5:00 PM",
        duration: "3-4 hours",
        highlights: ["Blue City Views", "Museum", "Fort Architecture", "Zip Line"],
        tickets: {
          online: true,
          advance: true,
          skipLine: true
        }
      }
    ],
    food: [
      {
        id: 1,
        name: "Makhaniya Lassi",
        type: "Beverage",
        price: 80,
        description: "Thick, creamy yogurt drink topped with cream - Jodhpur specialty",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.9,
        availability: "Local shops",
        spiceLevel: "Sweet",
        dietType: "Vegetarian"
      }
    ]
  },
  "Jaisalmer": {
    name: "Jaisalmer",
    tagline: "The Golden City",
    description: "Desert fort & sand dunes",
    heroImage: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGUlMjBzdW5uZXR8ZW58MXx8fHwxNzU3NTE3ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-yellow-600 to-orange-600",
    rating: 4.5,
    coordinates: "26.9157° N, 70.9083° E",
    bestTime: "October to March",
    language: "Hindi, Rajasthani, English",
    currency: "Indian Rupee (₹)",
    hotels: [
      {
        id: 1,
        name: "Desert Camp Jaisalmer",
        price: 12800,
        originalPrice: 16000,
        rating: 4.6,
        reviews: 394,
        location: "Thar Desert, Jaisalmer",
        image: "https://images.unsplash.com/photo-1605425368891-5533a8ede6c2?w=400",
        type: "Desert Resort",
        category: "Mid",
        amenities: ["Desert Safari", "Camel Rides", "Folk Music", "Stargazing", "Bonfire"],
        description: "Luxury desert camping with authentic Rajasthani cultural experiences.",
        safetyFeatures: ["Desert Guides", "Emergency Radio", "Safe Camping"],
        cityPack: "Jaisalmer Desert Package - ₹19,999 (2 nights + safari + dinner)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: false,
          payAtHotel: false,
          verified: true
        }
      }
    ],
    transportation: {
      cars: [
        {
          id: 1,
          name: "Mahindra Thar",
          type: "Off-Road SUV",
          capacity: "4 seater",
          price: 3000,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["4WD", "Desert Ready", "Driver", "GPS"],
          description: "Perfect off-road vehicle for desert exploration",
          availability: "Available",
          instantBooking: true,
          includes: ["Driver", "Desert guide", "Fuel", "Safety kit"]
        }
      ],
      bikes: [
        {
          id: 1,
          name: "Royal Enfield Desert Storm",
          type: "Desert Special",
          price: 1000,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Desert Ready", "GPS", "Safety Kit"],
          description: "Special desert edition bike for sand dune adventures",
          availability: "Limited",
          instantBooking: false,
          includes: ["Desert gear", "GPS", "Emergency kit"]
        }
      ]
    },
    restaurants: [
      {
        id: 1,
        name: "Desert Boy's Dhani",
        type: "Desert Camp",
        cuisine: "Rajasthani Traditional",
        price: 800,
        priceType: "per person",
        rating: 4.2,
        reviews: 890,
        location: "Sam Sand Dunes",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Desert dining under stars with folk music",
        timings: "7:00 PM - 10:00 PM",
        features: ["Desert Setting", "Folk Music", "Stargazing", "Traditional Food"],
        reservation: {
          required: true,
          advance: "Full day",
          instantBooking: false
        }
      }
    ],
    attractions: [
      {
        id: 1,
        name: "Golden Fort (Sonar Qila)",
        type: "Living Fort",
        price: 30,
        priceType: "entry fee",
        rating: 4.7,
        reviews: 6700,
        image: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?w=400",
        description: "Living fort with people still residing inside",
        timings: "9:00 AM - 6:00 PM",
        duration: "2-3 hours",
        highlights: ["Living Fort", "Havelis", "Jain Temples", "Desert Views"],
        tickets: {
          online: false,
          advance: false,
          skipLine: false
        }
      },
      {
        id: 2,
        name: "Sam Sand Dunes Safari",
        type: "Desert Experience",
        price: 1500,
        priceType: "per person",
        rating: 4.5,
        reviews: 3400,
        image: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?w=400",
        description: "Camel safari and desert camping experience",
        timings: "4:00 PM - 8:00 PM",
        duration: "4 hours",
        highlights: ["Camel Safari", "Sunset", "Folk Music", "Desert Camping"],
        tickets: {
          online: true,
          advance: true,
          skipLine: false
        }
      }
    ],
    food: [
      {
        id: 1,
        name: "Ker Sangri",
        type: "Traditional",
        price: 150,
        description: "Desert bean and berry curry - unique to Rajasthan's arid regions",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.4,
        availability: "Local restaurants",
        spiceLevel: "Medium",
        dietType: "Vegetarian"
      }
    ]
  },
  "Pushkar": {
    name: "Pushkar",
    tagline: "The Holy City", 
    description: "Sacred lake & camel fair",
    heroImage: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNoa2FyJTIwbGFrZSUyMHJhamFzdGhhbiUyMHRlbXBsZXxlbnwxfHx8fDE3NTc1MTkyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-purple-600 to-pink-600",
    rating: 4.4,
    coordinates: "26.4855° N, 74.5512° E",
    bestTime: "October to March",
    language: "Hindi, Rajasthani, English", 
    currency: "Indian Rupee (₹)",
    hotels: [
      {
        id: 1,
        name: "Hotel Pushkar Palace",
        price: 1400,
        originalPrice: 2000,
        rating: 4.2,
        reviews: 567,
        location: "Sacred Lake, Pushkar",
        image: "https://images.unsplash.com/photo-1731143468509-c4779c6d4bb9?w=400",
        type: "Budget Stay",
        category: "Budget",
        amenities: ["Free WiFi", "Temple View", "Yoga Classes", "Local Tours"],
        description: "Peaceful lakeside hotel near sacred temples with spiritual ambiance.",
        safetyFeatures: ["Safe Location", "Temple Security", "Tourist Friendly"],
        cityPack: "Pushkar Spiritual Package - ₹4,999 (2 nights + temple tour + breakfast)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: true,
          payAtHotel: true,
          verified: true
        }
      }
    ],
    transportation: {
      cars: [
        {
          id: 1,
          name: "Maruti Swift",
          type: "Hatchback",
          capacity: "4 seater",
          price: 1000,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "GPS", "Self Drive"],
          description: "Compact car perfect for Pushkar's narrow streets",
          availability: "Available",
          instantBooking: true,
          includes: ["Insurance", "Fuel for local trips"]
        }
      ],
      bikes: [
        {
          id: 1,
          name: "Honda Activa 6G",
          type: "Scooter",
          price: 300,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Helmet", "Lock", "Easy Parking"],
          description: "Perfect for navigating Pushkar's holy sites",
          availability: "Available",
          instantBooking: true,
          includes: ["Helmet", "Temple parking guide"]
        }
      ]
    },
    restaurants: [
      {
        id: 1,
        name: "Honey & Spice",
        type: "Rooftop Cafe",
        cuisine: "Multi-cuisine, Vegetarian",
        price: 300,
        priceType: "per person",
        rating: 4.2,
        reviews: 1200,
        location: "Near Brahma Temple",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Vegetarian multi-cuisine with lake views",
        timings: "8:00 AM - 10:00 PM",
        features: ["Lake View", "Vegetarian Only", "Peaceful", "Budget Friendly"],
        reservation: {
          required: false,
          advance: "Not required",
          instantBooking: true
        }
      }
    ],
    attractions: [
      {
        id: 1,
        name: "Pushkar Lake & Ghats",
        type: "Sacred Site",
        price: 0,
        priceType: "free entry",
        rating: 4.6,
        reviews: 4500,
        image: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?w=400",
        description: "Sacred lake surrounded by ghats and temples",
        timings: "24 hours",
        duration: "1-2 hours",
        highlights: ["Sacred Bath", "Temple Views", "Sunrise/Sunset", "Photography"],
        tickets: {
          online: false,
          advance: false,
          skipLine: false
        }
      },
      {
        id: 2,
        name: "Brahma Temple",
        type: "Temple",
        price: 0,
        priceType: "free entry",
        rating: 4.5,
        reviews: 3200,
        image: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?w=400",
        description: "One of the few temples dedicated to Lord Brahma",
        timings: "6:30 AM - 1:30 PM, 3:00 PM - 9:00 PM",
        duration: "30-45 minutes",
        highlights: ["Unique Temple", "Spiritual Experience", "Architecture", "Rituals"],
        tickets: {
          online: false,
          advance: false,
          skipLine: false
        }
      }
    ],
    food: [
      {
        id: 1,
        name: "Malpua",
        type: "Sweet",
        price: 60,
        description: "Traditional sweet pancake served hot with rabri and nuts",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.6,
        availability: "Sweet shops",
        spiceLevel: "Sweet",
        dietType: "Vegetarian"
      }
    ]
  },
  "Mount Abu": {
    name: "Mount Abu",
    tagline: "The Hill Station",
    description: "Cool retreat & temples",
    heroImage: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudCUyMGFidSUyMGhpbGwlMjBzdGF0aW9u&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-green-600 to-emerald-600",
    rating: 4.3,
    coordinates: "24.5925° N, 72.7156° E",
    bestTime: "March to June, September to December",
    language: "Hindi, Gujarati, English",
    currency: "Indian Rupee (₹)",
    hotels: [
      {
        id: 1,
        name: "Hilltone Resort",
        price: 4000,
        originalPrice: 5000,
        rating: 4.2,
        reviews: 890,
        location: "Dilwara Road, Mount Abu",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        type: "Hill Resort",
        category: "Mid",
        amenities: ["Hill View", "Garden", "Pool", "Valley View"],
        description: "Hill resort with beautiful valley views and cool climate.",
        safetyFeatures: ["Hill Security", "Medical Support", "Safe Trekking"],
        cityPack: "Mount Abu Hill Package - ₹8,999 (2 nights + temple tour + meals)",
        bookingFeatures: {
          instantConfirmation: true,
          freeCancellation: true,
          payAtHotel: true,
          verified: true
        }
      }
    ],
    transportation: {
      cars: [
        {
          id: 1,
          name: "Maruti Ertiga",
          type: "MPV",
          capacity: "7 seater",
          price: 1800,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1663875321979-c6f04e33b2f9?w=400",
          features: ["AC", "Hill Drive", "GPS"],
          description: "Comfortable MPV for hill station touring",
          availability: "Available",
          instantBooking: true,
          includes: ["Driver familiar with hills", "Fuel"]
        }
      ],
      bikes: [
        {
          id: 1,
          name: "Honda CB Shine",
          type: "Commuter",
          price: 400,
          priceType: "per day",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          features: ["Helmet", "Hill Ready", "Easy Ride"],
          description: "Comfortable bike for hill station exploration",
          availability: "Available",
          instantBooking: true,
          includes: ["Helmet", "Hill route map"]
        }
      ]
    },
    restaurants: [
      {
        id: 1,
        name: "Arbuda Restaurant",
        type: "Multi-cuisine",
        cuisine: "Gujarati, Rajasthani, Chinese",
        price: 400,
        priceType: "per person",
        rating: 4.1,
        reviews: 670,
        location: "Nakki Lake Road",
        image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=400",
        specialty: "Hill station dining with cool climate",
        timings: "11:00 AM - 10:00 PM",
        features: ["Cool Climate", "Lake View", "Family Friendly", "Affordable"],
        reservation: {
          required: false,
          advance: "Not required",
          instantBooking: true
        }
      }
    ],
    attractions: [
      {
        id: 1,
        name: "Dilwara Temples",
        type: "Temple Complex",
        price: 0,
        priceType: "free entry",
        rating: 4.8,
        reviews: 5600,
        image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400",
        description: "Exquisite Jain temples with intricate marble carvings",
        timings: "6:00 AM - 6:00 PM",
        duration: "2-3 hours",
        highlights: ["Marble Carvings", "Architecture", "Jain Heritage", "Peaceful"],
        tickets: {
          online: false,
          advance: false,
          skipLine: false
        }
      },
      {
        id: 2,
        name: "Nakki Lake",
        type: "Lake",
        price: 0,
        priceType: "free entry",
        rating: 4.4,
        reviews: 2800,
        image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400",
        description: "Artificial lake perfect for boating and relaxation",
        timings: "6:00 AM - 6:00 PM",
        duration: "1-2 hours",
        highlights: ["Boating", "Lake Views", "Cool Weather", "Sunset Point"],
        tickets: {
          online: false,
          advance: false,
          skipLine: false
        }
      }
    ],
    food: [
      {
        id: 1,
        name: "Gujarati Thali",
        type: "Traditional",
        price: 200,
        description: "Complete Gujarati meal with variety of dishes and unlimited servings",
        image: "https://images.unsplash.com/photo-1672477179695-7276b0602fa9?w=400",
        rating: 4.5,
        availability: "Local restaurants",
        spiceLevel: "Mild to Medium",
        dietType: "Vegetarian"
      }
    ]
  }
};

export function ServiceCityDetails({ serviceName, cityName, onBack, onNavigateToMap, onNavigateToSafety }: ServiceCityDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "all",
    rating: "all",
    type: "all",
    availability: "all"
  });
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const cityData = cityServiceData[cityName] || cityServiceData["Udaipur"];

  const getServiceData = () => {
    switch (serviceName.toLowerCase()) {
      case "hotels":
        return cityData.hotels || [];
      case "cars":
      case "cabs":
        return cityData.transportation?.cars || [];
      case "bikes":
        return cityData.transportation?.bikes || [];
      case "cafes":
      case "restaurants":
        return cityData.restaurants || [];
      case "food":
        return cityData.food || [];
      case "attractions":
        return cityData.attractions || [];
      default:
        return [];
    }
  };

  const serviceData = getServiceData();

  const handleBooking = (item: any) => {
    setSelectedItem(item);
    setBookingType(serviceName);
    setIsBookingModalOpen(true);
  };

  const getServiceIcon = () => {
    switch (serviceName.toLowerCase()) {
      case "hotels": return Building2;
      case "cars": 
      case "cabs": return Car;
      case "bikes": return Bike;
      case "cafes":
      case "restaurants": return Coffee;
      case "food": return UtensilsCrossed;
      case "attractions": return Camera;
      default: return MapPin;
    }
  };

  const ServiceIcon = getServiceIcon();

  const renderServiceCards = () => {
    return serviceData.map((item: any, index: number) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
          <div className="relative">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {item.type && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  {item.type}
                </Badge>
              )}
              {item.availability === "Available" && (
                <Badge className="bg-green-600 text-white">
                  Available Now
                </Badge>
              )}
              {item.verified && (
                <Badge className="bg-blue-600 text-white flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 text-xs px-2 py-1"
              >
                <Camera className="w-3 h-3 mr-1" />
                Gallery
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 text-xs px-2 py-1"
              >
                <Heart className="w-3 h-3 mr-1" />
                Save
              </Button>
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl mb-2 flex-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
                {item.name}
              </h3>
              {item.rating && (
                <div className="flex items-center gap-1 ml-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.rating}</span>
                </div>
              )}
            </div>
            
            {item.location && (
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-sm">{item.location}</span>
              </div>
            )}

            {item.description && (
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
            )}

            {/* Service-specific details */}
            {serviceName.toLowerCase() === "hotels" && item.amenities && (
              <div className="flex flex-wrap gap-1 mb-3">
                {item.amenities.slice(0, 3).map((amenity: string) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            )}

            {(serviceName.toLowerCase() === "cars" || serviceName.toLowerCase() === "bikes") && (
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{item.capacity || item.type}</span>
                </div>
                {item.features && (
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 3).map((feature: string) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {serviceName.toLowerCase() === "restaurants" && (
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.timings}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.features && item.features.slice(0, 3).map((feature: string) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {serviceName.toLowerCase() === "attractions" && (
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.timings} | Duration: {item.duration}</span>
                </div>
                {item.highlights && (
                  <div className="flex flex-wrap gap-1">
                    {item.highlights.slice(0, 3).map((highlight: string) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="pt-0">
            {/* Price Display */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-semibold text-gray-900 flex items-center">
                <IndianRupee className="w-5 h-5" />
                {item.price}
              </span>
              {item.originalPrice && (
                <span className="text-gray-500 line-through text-sm flex items-center">
                  <IndianRupee className="w-3 h-3" />
                  {item.originalPrice}
                </span>
              )}
              <span className="text-xs text-gray-600">{item.priceType || "per night"}</span>
            </div>

            {/* City Pack Offer for Hotels */}
            {serviceName.toLowerCase() === "hotels" && item.cityPack && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg mb-4 border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">City Pack Special</span>
                </div>
                <p className="text-xs text-amber-700 mb-2">{item.cityPack}</p>
                <Button 
                  size="sm" 
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1 w-full"
                  onClick={() => handleBooking({ ...item, type: "cityPack" })}
                >
                  Book City Pack
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex-1"
                onClick={() => handleBooking(item)}
              >
                {serviceName.toLowerCase() === "hotels" ? "Book Hotel" :
                 serviceName.toLowerCase() === "cars" || serviceName.toLowerCase() === "bikes" ? "Book Now" :
                 serviceName.toLowerCase() === "restaurants" ? "Reserve Table" :
                 serviceName.toLowerCase() === "attractions" ? "Book Tickets" :
                 "Book Now"}
              </Button>
              {item.instantBooking && (
                <Button variant="outline" size="sm" className="px-3">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={cityData.heroImage}
          alt={cityData.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${cityData.color} opacity-80`}></div>
        
        {/* Header Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between">
            <Button 
              onClick={onBack} 
              variant="outline" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={onNavigateToMap}
              >
                <Map className="w-4 h-4 mr-2" />
                Map
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={onNavigateToSafety}
              >
                <Shield className="w-4 h-4 mr-2" />
                Safety
              </Button>
            </div>
          </div>
        </div>

        {/* City Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <ServiceIcon className="w-8 h-8" />
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                {serviceName} in {cityData.name}
              </h1>
            </div>
            <p className="text-xl mb-2 opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {cityData.tagline} - {cityData.description}
            </p>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {cityData.rating} Rating
              </Badge>
              <Badge className="bg-white/20 text-white">
                {serviceData.length} Options Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* City Quick Info Bar */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span className="text-gray-600">Coordinates:</span>
              <span className="font-medium">{cityData.coordinates}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Best Time:</span>
              <span className="font-medium">{cityData.bestTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">Language:</span>
              <span className="font-medium">{cityData.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600">Currency:</span>
              <span className="font-medium">{cityData.currency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                {serviceData.length} {serviceName} Found
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SortAsc className="w-4 h-4" />
                Sort: Price
              </Button>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              onClick={() => setAiChatOpen(true)}
            >
              <Bot className="w-4 h-4" />
              Ask AI
            </Button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div>
                  <Label className="text-sm">Price Range</Label>
                  <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Budget (₹0-2000)</SelectItem>
                      <SelectItem value="mid">Mid (₹2000-10000)</SelectItem>
                      <SelectItem value="luxury">Luxury (₹10000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Rating</Label>
                  <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4+">4.0+ Stars</SelectItem>
                      <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Type</Label>
                  <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {serviceName.toLowerCase() === "hotels" && (
                        <>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="heritage">Heritage</SelectItem>
                          <SelectItem value="budget">Budget</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Availability</Label>
                  <Select value={filters.availability} onValueChange={(value) => setFilters({...filters, availability: value})}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="available">Available Now</SelectItem>
                      <SelectItem value="instant">Instant Booking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {renderServiceCards()}
        </motion.div>

        {serviceData.length === 0 && (
          <div className="text-center py-12">
            <ServiceIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No {serviceName} Found</h3>
            <p className="text-gray-500 mb-4">
              We're working on adding more {serviceName.toLowerCase()} options for {cityName}.
            </p>
            <Button variant="outline">
              Notify When Available
            </Button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900 mb-4">
              Book {selectedItem?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* Item Summary */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
                    {selectedItem.location && (
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedItem.location}
                      </p>
                    )}
                    <p className="text-amber-600 font-semibold flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {selectedItem.price} {selectedItem.priceType || "per night"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkIn">
                      {serviceName.toLowerCase() === "restaurants" ? "Date" : "Check-in"}
                    </Label>
                    <Input
                      id="checkIn"
                      type="date"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut">
                      {serviceName.toLowerCase() === "restaurants" ? "Time" : "Check-out"}
                    </Label>
                    <Input
                      id="checkOut"
                      type={serviceName.toLowerCase() === "restaurants" ? "time" : "date"}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guests">
                      {serviceName.toLowerCase() === "restaurants" ? "People" : "Guests"}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {serviceName.toLowerCase() === "hotels" && (
                    <div>
                      <Label htmlFor="rooms">Rooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Room</SelectItem>
                          <SelectItem value="2">2 Rooms</SelectItem>
                          <SelectItem value="3">3 Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Phone Number" type="tel" />
                  </div>
                  <Input placeholder="Email Address" type="email" />
                </div>

                {/* Special Requests */}
                <div>
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements or requests..."
                    className="min-h-[80px]"
                  />
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Booking Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {selectedItem.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {Math.round(selectedItem.price * 0.12)}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {Math.round(selectedItem.price * 1.12)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Safety Features */}
                {selectedItem.safetyFeatures && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Safety Features</span>
                    </div>
                    <ul className="text-sm text-green-700">
                      {selectedItem.safetyFeatures.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    {selectedItem.instantBooking ? "Confirm Booking" : "Send Request"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Chat Modal */}
      <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              AI Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                Hi! I can help you find the best {serviceName.toLowerCase()} in {cityName}. 
                What are you looking for?
              </p>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask about prices, availability, or recommendations..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setChatInput("")}
              />
              <Button size="sm">Send</Button>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full text-left justify-start">
                💰 Show me budget options under ₹2000
              </Button>
              <Button variant="outline" size="sm" className="w-full text-left justify-start">
                ⭐ What are the highest rated options?
              </Button>
              <Button variant="outline" size="sm" className="w-full text-left justify-start">
                📍 Find options near city center
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}