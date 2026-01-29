import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  MapPin, 
  Car, 
  Bike, 
  Building2, 
  Utensils, 
  Church, 
  ShoppingBag, 
  Calendar, 
  Shield, 
  Star, 
  Phone, 
  Clock,
  Users,
  IndianRupee,
  MessageCircle,
  Navigation,
  Camera,
  Heart,
  Plus,
  Map,
  BookOpen,
  Route
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingModal, ItineraryModal } from "./BookingModals";

interface CityData {
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  color: string;
  rating: number;
  hotels: Array<{
    name: string;
    price: number;
    location: string;
    rating: number;
    image: string;
    features: string[];
  }>;
  transportation: Array<{
    type: string;
    options: string[];
    priceRange: string;
  }>;
  attractions: Array<{
    name: string;
    description: string;
    image: string;
    timings: string;
    entryFee: string;
  }>;
  food: Array<{
    name: string;
    type: string;
    specialty: string;
    location: string;
    rating: number;
  }>;
  temples: Array<{
    name: string;
    significance: string;
    timings: string;
    location: string;
  }>;
  markets: Array<{
    name: string;
    speciality: string;
    timings: string;
    location: string;
  }>;
  events: Array<{
    name: string;
    date: string;
    description: string;
    venue: string;
  }>;
  experiences: string[];
}

interface CityDashboardProps {
  cityName: string;
  onBack: () => void;
  onNavigateToSection?: (section: string) => void;
}

export function CityDashboard({ cityName, onBack, onNavigateToSection }: CityDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: `Hi! I'm your AI guide for ${cityName}. I can help you plan your trip, make bookings, and answer any questions about the city. What would you like to explore first?` }
  ]);
  const [chatInput, setChatInput] = useState("");
  
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
  const [isMapViewOpen, setIsMapViewOpen] = useState(false);

  // Mock city data - in real app, this would come from an API
  const cityData: Record<string, CityData> = {
    "Udaipur": {
      name: "Udaipur",
      tagline: "Venice of the East",
      description: "City of lakes, palaces & romance",
      heroImage: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwaG90ZWwlMjByYWphc3RoYW58ZW58MXx8fHwxNzU3NTE3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-blue-600 to-cyan-600",
      rating: 4.8,
      hotels: [
        {
          name: "The Oberoi Udaivilas",
          price: 45000,
          location: "Lake Pichola",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1633605015660-b0f2dbad3bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBob3RlbCUyMGx1eHVyeSUyMHJvb218ZW58MXx8fHwxNzU3NzM3ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          features: ["Lake View", "Spa", "Heritage", "Pool"]
        },
        {
          name: "Taj Lake Palace",
          price: 38000,
          location: "Lake Pichola",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
          features: ["Floating Palace", "Luxury", "Restaurant", "Heritage"]
        },
        {
          name: "Hotel Lakend",
          price: 2500,
          location: "Near City Palace",
          rating: 4.2,
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
          features: ["Budget", "Clean", "Rooftop", "AC"]
        }
      ],
      transportation: [
        { type: "City Cabs", options: ["Auto Rickshaw", "Taxi", "Ola/Uber"], priceRange: "₹10-15/km" },
        { type: "Bike Rentals", options: ["Activa", "Royal Enfield", "Scooty"], priceRange: "₹300-800/day" },
        { type: "Car Rentals", options: ["Sedan", "SUV", "Hatchback"], priceRange: "₹1200-3000/day" }
      ],
      attractions: [
        {
          name: "City Palace",
          description: "A magnificent palace complex showcasing Rajasthani architecture",
          image: "https://images.unsplash.com/photo-1667205591166-0a3bfe27708e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBmb3J0JTIwcGFsYWNlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NzczNzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          timings: "9:30 AM - 5:30 PM",
          entryFee: "₹300 for Indians, ₹600 for Foreigners"
        },
        {
          name: "Lake Pichola",
          description: "Artificial lake with stunning sunset boat rides",
          image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?w=400",
          timings: "24 hours (Boat: 9 AM - 6 PM)",
          entryFee: "Boat ride: ₹400-1200"
        },
        {
          name: "Jag Mandir",
          description: "Beautiful palace on an island in Lake Pichola",
          image: "https://images.unsplash.com/photo-1609920658665-4e4e3e12b31a?w=400",
          timings: "9 AM - 6 PM",
          entryFee: "₹125 + Boat charges"
        }
      ],
      food: [
        { name: "Ambrai Restaurant", type: "Fine Dining", specialty: "Rajasthani Thali", location: "Amet Haveli", rating: 4.6 },
        { name: "Jagat Niwas Palace Hotel", type: "Heritage", specialty: "Lake view dining", location: "Lake Pichola", rating: 4.5 },
        { name: "Millets of Mewar", type: "Healthy", specialty: "Organic Food", location: "City Palace Road", rating: 4.4 }
      ],
      temples: [
        { name: "Jagdish Temple", significance: "Largest temple in Udaipur", timings: "4 AM - 1 PM, 4 PM - 10 PM", location: "City Palace Complex" },
        { name: "Eklingji Temple", significance: "Ancient temple dedicated to Lord Shiva", timings: "4:30 AM - 12:30 PM, 5 PM - 7:30 PM", location: "22 km from Udaipur" }
      ],
      markets: [
        { name: "Hathi Pol Bazaar", speciality: "Miniature paintings & handicrafts", timings: "10 AM - 9 PM", location: "Old City" },
        { name: "Bapu Bazaar", speciality: "Textiles & jewelry", timings: "10 AM - 9 PM", location: "Near Clock Tower" }
      ],
      events: [
        { name: "Dharohar Dance Show", date: "Daily", description: "Traditional Rajasthani folk dance", venue: "Bagore ki Haveli" },
        { name: "Shilpgram Festival", date: "December 21-30", description: "Arts and crafts festival", venue: "Shilpgram" }
      ],
      experiences: [
        "Sunset boat ride at Lake Pichola",
        "Heritage walk through old city",
        "Rooftop dinner with palace view",
        "Vintage car ride to Eklingji",
        "Hot air balloon over the city"
      ]
    },
    "Jaipur": {
      name: "Jaipur",
      tagline: "The Pink City",
      description: "Capital city with royal palaces",
      heroImage: "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU3NTE3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-pink-600 to-rose-600",
      rating: 4.7,
      hotels: [
        {
          name: "Rambagh Palace",
          price: 40000,
          location: "Civil Lines",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          features: ["Palace Hotel", "Gardens", "Spa", "Heritage"]
        },
        {
          name: "Hotel Pearl Palace",
          price: 1800,
          location: "Hathroi Fort",
          rating: 4.3,
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
          features: ["Budget", "Rooftop", "Heritage View", "AC"]
        }
      ],
      transportation: [
        { type: "Metro & Cabs", options: ["Jaipur Metro", "Auto", "Taxi"], priceRange: "₹8-12/km" },
        { type: "Bike Rentals", options: ["Activa", "Pulsar", "Royal Enfield"], priceRange: "₹250-700/day" },
        { type: "Car Rentals", options: ["Sedan", "SUV", "Luxury"], priceRange: "₹1000-2500/day" }
      ],
      attractions: [
        {
          name: "Amber Fort",
          description: "Magnificent hilltop fort with stunning architecture",
          image: "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?w=400",
          timings: "8 AM - 6 PM",
          entryFee: "₹200 for Indians, ₹550 for Foreigners"
        },
        {
          name: "Hawa Mahal",
          description: "Palace of Winds with intricate latticework",
          image: "https://images.unsplash.com/photo-1609920658665-4e4e3e12b31a?w=400",
          timings: "9 AM - 4:30 PM",
          entryFee: "₹50 for Indians, ₹200 for Foreigners"
        }
      ],
      food: [
        { name: "Chokhi Dhani", type: "Cultural Village", specialty: "Rajasthani Village Experience", location: "Tonk Road", rating: 4.5 },
        { name: "LMB", type: "Traditional", specialty: "Rajasthani Sweets", location: "Johari Bazaar", rating: 4.4 }
      ],
      temples: [
        { name: "Govind Dev Ji Temple", significance: "Krishna temple in City Palace", timings: "4:30 AM - 12 PM, 4 PM - 9:30 PM", location: "City Palace" },
        { name: "Birla Mandir", significance: "Modern temple in white marble", timings: "6 AM - 12 PM, 3 PM - 9 PM", location: "Moti Dungri" }
      ],
      markets: [
        { name: "Johari Bazaar", speciality: "Jewelry & gems", timings: "10 AM - 9 PM", location: "Old City" },
        { name: "Bapu Bazaar", speciality: "Textiles & shoes", timings: "10 AM - 9 PM", location: "Sanganeri Gate" }
      ],
      events: [
        { name: "Sound & Light Show", date: "Daily", description: "At Amber Fort", venue: "Amber Fort" },
        { name: "Jaipur Literature Festival", date: "January", description: "World's largest free literary festival", venue: "Diggi Palace" }
      ],
      experiences: [
        "Elephant ride at Amber Fort",
        "Hot air balloon over the city",
        "Heritage walk in Pink City",
        "Royal dining at palace hotels",
        "Puppet show at Chokhi Dhani"
      ]
    },
    "Jodhpur": {
      name: "Jodhpur",
      tagline: "The Blue City",
      description: "Blue houses & mighty fort",
      heroImage: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2RocHVyJTIwYmx1ZSUyMGNpdHklMjBmb3J0fGVufDF8fHx8MTc1NzUxOTI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-blue-700 to-indigo-700",
      rating: 4.6,
      hotels: [
        {
          name: "Umaid Bhawan Palace",
          price: 50000,
          location: "Palace Road",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          features: ["Heritage Palace", "Museum", "Luxury", "Gardens"]
        },
        {
          name: "Zostel Jodhpur",
          price: 800,
          location: "Near Clock Tower",
          rating: 4.1,
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
          features: ["Hostel", "Budget", "Social", "Blue City View"]
        }
      ],
      transportation: [
        { type: "Local Transport", options: ["Auto Rickshaw", "City Bus", "Taxi"], priceRange: "₹8-10/km" },
        { type: "Bike Rentals", options: ["Pulsar", "Royal Enfield", "Activa"], priceRange: "₹300-600/day" },
        { type: "Car Rentals", options: ["Maruti", "Toyota", "Mahindra"], priceRange: "₹1100-2200/day" }
      ],
      attractions: [
        {
          name: "Mehrangarh Fort",
          description: "One of India's largest forts with panoramic city views",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          timings: "9 AM - 5 PM",
          entryFee: "₹100 for Indians, ₹600 for Foreigners"
        },
        {
          name: "Blue City Viewpoint",
          description: "Best views of the blue painted houses",
          image: "https://images.unsplash.com/photo-1643906264382-615af6f4d6f4?w=400",
          timings: "24 hours",
          entryFee: "Free"
        }
      ],
      food: [
        { name: "Indique", type: "Rooftop", specialty: "Continental with fort view", location: "Pal Haveli", rating: 4.5 },
        { name: "Jhankar Choti Haveli", type: "Heritage", specialty: "Rajasthani cuisine", location: "Makrana Mohalla", rating: 4.3 }
      ],
      temples: [
        { name: "Chamunda Mataji Temple", significance: "Goddess temple atop Mehrangarh", timings: "6 AM - 8 PM", location: "Mehrangarh Fort" }
      ],
      markets: [
        { name: "Clock Tower Market", speciality: "Spices & handicrafts", timings: "9 AM - 9 PM", location: "Ghantaghar" },
        { name: "Mochi Bazaar", speciality: "Mojaris (traditional shoes)", timings: "10 AM - 8 PM", location: "Old City" }
      ],
      events: [
        { name: "Rajasthan International Folk Festival", date: "October", description: "Music festival at Mehrangarh", venue: "Mehrangarh Fort" }
      ],
      experiences: [
        "Blue city walking tour",
        "Sunset at Mehrangarh Fort",
        "Zip-lining at Mehrangarh",
        "Traditional puppet show",
        "Desert camping near city"
      ]
    },
    "Jaisalmer": {
      name: "Jaisalmer",
      tagline: "The Golden City",
      description: "Desert fort & sand dunes",
      heroImage: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGUlMjBzdW5uZXR8ZW58MXx8fHwxNzU3NTE3ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-yellow-600 to-orange-600",
      rating: 4.5,
      hotels: [
        {
          name: "Suryagarh Resort",
          price: 25000,
          location: "Sam Road",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          features: ["Desert Resort", "Spa", "Cultural Shows", "Pool"]
        },
        {
          name: "Hotel Tokyo Palace",
          price: 1500,
          location: "Near Fort",
          rating: 4.0,
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
          features: ["Budget", "Fort View", "Rooftop", "Traditional"]
        }
      ],
      transportation: [
        { type: "Desert Transport", options: ["Camel Cart", "Jeep Safari", "Auto"], priceRange: "₹200-500/hour" },
        { type: "Bike Rentals", options: ["Royal Enfield", "Pulsar", "Activa"], priceRange: "₹400-800/day" },
        { type: "Car Rentals", options: ["SUV", "Sedan", "Tempo Traveller"], priceRange: "₹1500-3500/day" }
      ],
      attractions: [
        {
          name: "Golden Fort (Sonar Qila)",
          description: "Living fort with people still residing inside",
          image: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?w=400",
          timings: "9 AM - 6 PM",
          entryFee: "₹30 for Indians, ₹250 for Foreigners"
        },
        {
          name: "Sam Sand Dunes",
          description: "Desert dunes perfect for sunset and camel safari",
          image: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?w=400",
          timings: "24 hours (Best: Sunset)",
          entryFee: "Entry free, Activities extra"
        }
      ],
      food: [
        { name: "Desert Boy's Dhani", type: "Desert Camp", specialty: "Desert dining experience", location: "Sam Dunes", rating: 4.2 },
        { name: "The Trio", type: "Rooftop", specialty: "Multi-cuisine with fort view", location: "Fort Road", rating: 4.4 }
      ],
      temples: [
        { name: "Laxminath Temple", significance: "Ancient Jain temple", timings: "6 AM - 12 PM, 3 PM - 6 PM", location: "Inside Golden Fort" }
      ],
      markets: [
        { name: "Sadar Bazaar", speciality: "Leather goods & carpets", timings: "9 AM - 9 PM", location: "Near Railway Station" },
        { name: "Pansari Bazaar", speciality: "Traditional items", timings: "10 AM - 8 PM", location: "Inside Fort" }
      ],
      events: [
        { name: "Desert Festival", date: "February", description: "Cultural celebration in desert", venue: "Sam Dunes" }
      ],
      experiences: [
        "Camel safari at Sam Dunes",
        "Desert camping under stars",
        "Sunset at Gadisar Lake",
        "Folk music at desert camps",
        "Paragliding over dunes"
      ]
    },
    "Pushkar": {
      name: "Pushkar",
      tagline: "The Holy City",
      description: "Sacred lake & camel fair",
      heroImage: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNoa2FyJTIwbGFrZSUyMHJhamFzdGhhbiUyMHRlbXBsZXxlbnwxfHx8fDE3NTc1MTkyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-purple-600 to-pink-600",
      rating: 4.4,
      hotels: [
        {
          name: "Ananta Spa & Resort",
          price: 8000,
          location: "Village Khari",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          features: ["Spa Resort", "Desert View", "Pool", "Wellness"]
        },
        {
          name: "Zostel Pushkar",
          price: 600,
          location: "Near Brahma Temple",
          rating: 4.0,
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
          features: ["Hostel", "Backpacker", "Social", "Lake View"]
        }
      ],
      transportation: [
        { type: "Local Transport", options: ["Cycle Rickshaw", "Walking", "Taxi"], priceRange: "₹50-200" },
        { type: "Bike Rentals", options: ["Scooty", "Pulsar", "Royal Enfield"], priceRange: "₹250-500/day" },
        { type: "Car Rentals", options: ["Maruti", "Innova"], priceRange: "₹1000-2000/day" }
      ],
      attractions: [
        {
          name: "Pushkar Lake",
          description: "Sacred lake surrounded by ghats",
          image: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?w=400",
          timings: "24 hours",
          entryFee: "Free"
        },
        {
          name: "Brahma Temple",
          description: "One of the few temples dedicated to Lord Brahma",
          image: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?w=400",
          timings: "6:30 AM - 1:30 PM, 3 PM - 9 PM",
          entryFee: "Free"
        }
      ],
      food: [
        { name: "Cafe Lake View", type: "Cafe", specialty: "Israeli & Continental", location: "Near Lake", rating: 4.3 },
        { name: "Honey & Spice", type: "Rooftop", specialty: "Multi-cuisine", location: "Choti Basti", rating: 4.2 }
      ],
      temples: [
        { name: "Brahma Temple", significance: "World's few Brahma temples", timings: "6:30 AM - 1:30 PM, 3 PM - 9 PM", location: "Near Pushkar Lake" },
        { name: "Savitri Temple", significance: "Hilltop temple with panoramic views", timings: "6 AM - 8 PM", location: "Ratnagiri Hill" }
      ],
      markets: [
        { name: "Pushkar Bazaar", speciality: "Spiritual items & handicrafts", timings: "9 AM - 9 PM", location: "Main Market" }
      ],
      events: [
        { name: "Pushkar Camel Fair", date: "November", description: "World's largest camel fair", venue: "Pushkar Ground" },
        { name: "Kartik Purnima", date: "November", description: "Holy festival at lake", venue: "Pushkar Lake" }
      ],
      experiences: [
        "Sacred bath in Pushkar Lake",
        "Sunrise from Savitri Temple",
        "Camel fair experience",
        "Desert safari",
        "Spiritual meditation sessions"
      ]
    },
    "Mount Abu": {
      name: "Mount Abu",
      tagline: "The Hill Station",
      description: "Cool retreat & temples",
      heroImage: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudCUyMGFidSUyMGhpbGwlMjBzdGF0aW9u&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-green-600 to-emerald-600",
      rating: 4.3,
      hotels: [
        {
          name: "Hilltone Resort",
          price: 4000,
          location: "Dilwara Road",
          rating: 4.2,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
          features: ["Hill Resort", "Garden", "Pool", "Valley View"]
        },
        {
          name: "Hotel Hillock",
          price: 1200,
          location: "Nakki Lake",
          rating: 3.9,
          image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
          features: ["Budget", "Lake View", "Restaurant", "AC"]
        }
      ],
      transportation: [
        { type: "Hill Transport", options: ["Local Bus", "Taxi", "Share Jeep"], priceRange: "₹50-300" },
        { type: "Bike Rentals", options: ["Scooty", "Pulsar"], priceRange: "₹300-600/day" },
        { type: "Car Rentals", options: ["Maruti", "Innova"], priceRange: "₹1200-2500/day" }
      ],
      attractions: [
        {
          name: "Dilwara Temples",
          description: "Exquisite Jain temples with intricate marble carvings",
          image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400",
          timings: "6 AM - 6 PM",
          entryFee: "Free (No photography inside)"
        },
        {
          name: "Nakki Lake",
          description: "Artificial lake perfect for boating",
          image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400",
          timings: "6 AM - 6 PM",
          entryFee: "Boating: ₹100-200"
        }
      ],
      food: [
        { name: "Arbuda Restaurant", type: "Multi-cuisine", specialty: "Gujarati & Rajasthani", location: "Nakki Lake Road", rating: 4.1 },
        { name: "Chacha Cafe", type: "Cafe", specialty: "Fast food & shakes", location: "Mall Road", rating: 4.0 }
      ],
      temples: [
        { name: "Dilwara Temples", significance: "Ancient Jain temples with marble art", timings: "6 AM - 6 PM", location: "2.5 km from Mount Abu" },
        { name: "Guru Shikhar", significance: "Highest peak in Rajasthan", timings: "6 AM - 6 PM", location: "15 km from Mount Abu" }
      ],
      markets: [
        { name: "Nakki Lake Market", speciality: "Woolen clothes & souvenirs", timings: "9 AM - 9 PM", location: "Near Nakki Lake" }
      ],
      events: [
        { name: "Summer Festival", date: "May", description: "Cultural programs and competitions", venue: "Various venues" }
      ],
      experiences: [
        "Boating at Nakki Lake",
        "Sunset from Sunset Point",
        "Trekking to Guru Shikhar",
        "Temple architecture tour",
        "Peaceful hill station walks"
      ]
    }
  };

  const city = cityData[cityName] || cityData["Udaipur"];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, 
        { role: "user", content: chatInput },
        { role: "assistant", content: `I understand you're asking about "${chatInput}". Let me help you with that! For ${cityName}, I can assist with bookings, recommendations, or any specific information you need. What would you like to do next?` }
      ]);
      setChatInput("");
    }
  };

  const handleBookingClick = (type: "hotel" | "transport" | "restaurant", item?: any) => {
    setBookingModal({ isOpen: true, type, item });
  };

  const handleNavigateToMap = () => {
    onNavigateToSection?.("map");
  };

  const handleNavigateToSection = (section: string) => {
    onNavigateToSection?.(section);
  };

  const openGoogleMaps = (destination: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(destination + " " + cityName)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const sections = [
    { id: "overview", label: "Overview", icon: MapPin },
    { id: "hotels", label: "Hotels", icon: Building2 },
    { id: "transport", label: "Transport", icon: Car },
    { id: "attractions", label: "Attractions", icon: Camera },
    { id: "food", label: "Food", icon: Utensils },
    { id: "temples", label: "Temples", icon: Church },
    { id: "markets", label: "Shopping", icon: ShoppingBag },
    { id: "events", label: "Events", icon: Calendar },
    { id: "safety", label: "Safety", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${city.color} opacity-80`}></div>
        
        {/* Header Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              ← Back to Cities
            </Button>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={handleNavigateToMap}
              >
                🗺️ Open Map
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={() => handleNavigateToSection("safety")}
              >
                🛡️ Safety
              </Button>
            </div>
          </div>
        </div>

        {/* City Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              {city.name}
            </h1>
            <p className="text-xl mb-2 opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {city.tagline}
            </p>
            <p className="text-lg mb-4 opacity-80">
              {city.description}
            </p>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {city.rating} Rating
              </Badge>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => handleBookingClick("hotel")}
                >
                  🏨 Book Hotels
                </Button>
                <Button 
                  size="sm" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => handleBookingClick("transport")}
                >
                  🚖 Book Transport
                </Button>
                <Button 
                  size="sm" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsItineraryModalOpen(true)}
                >
                  🎯 Add to Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top 5 Must-Do Experiences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  Top 5 Must-Do Experiences in {city.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {city.experiences.map((experience, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-800">{experience}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center p-6">
                <Building2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold">Hotels</h3>
                <p className="text-sm text-gray-600">{city.hotels.length}+ Options</p>
              </Card>
              <Card className="text-center p-6">
                <Camera className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold">Attractions</h3>
                <p className="text-sm text-gray-600">{city.attractions.length}+ Places</p>
              </Card>
              <Card className="text-center p-6">
                <Utensils className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="font-semibold">Restaurants</h3>
                <p className="text-sm text-gray-600">{city.food.length}+ Options</p>
              </Card>
              <Card className="text-center p-6">
                <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold">Safety</h3>
                <p className="text-sm text-gray-600">24/7 Support</p>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Hotels Section */}
        {activeSection === "hotels" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Hotels & Stays in {city.name}</h2>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                View All Hotels
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.hotels.map((hotel, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <Badge className="bg-green-100 text-green-800">
                        <Star className="w-3 h-3 mr-1" />
                        {hotel.rating}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hotel.location}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600 flex items-center">
                        <IndianRupee className="w-5 h-5" />
                        {hotel.price.toLocaleString()}
                        <span className="text-sm text-gray-600 ml-1">/night</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-blue-600"
                        onClick={() => handleBookingClick("hotel", hotel)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Transportation Section */}
        {activeSection === "transport" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Transportation in {city.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {city.transportation.map((transport, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {transport.type.includes("Cab") || transport.type.includes("Car") ? (
                      <Car className="w-8 h-8 text-blue-500" />
                    ) : transport.type.includes("Bike") ? (
                      <Bike className="w-8 h-8 text-green-500" />
                    ) : (
                      <Navigation className="w-8 h-8 text-purple-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{transport.type}</h3>
                      <p className="text-sm text-gray-600">{transport.priceRange}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {transport.options.map((option, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>{option}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBookingClick("transport", { name: option, type: transport.type })}
                        >
                          Book
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Live Fare Calculator */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Live Fare Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input placeholder="Pickup Location" />
                <Input placeholder="Drop Location" />
                <select className="p-2 border rounded-md">
                  <option>Select Vehicle</option>
                  <option>Auto Rickshaw</option>
                  <option>Car</option>
                  <option>Bike</option>
                </select>
                <Button className="bg-gradient-to-r from-green-500 to-green-600">
                  Calculate Fare
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Attractions Section */}
        {activeSection === "attractions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Places to Visit in {city.name}</h2>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-purple-600"
                onClick={() => setIsItineraryModalOpen(true)}
              >
                Create Itinerary
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.attractions.map((attraction, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <ImageWithFallback
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-2">{attraction.name}</h3>
                      <p className="text-gray-600 mb-4">{attraction.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{attraction.timings}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-green-500" />
                          <span>{attraction.entryFee}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setIsItineraryModalOpen(true)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Itinerary
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-blue-500 to-blue-600"
                          onClick={() => openGoogleMaps(attraction.name)}
                        >
                          <Route className="w-4 h-4 mr-1" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Food Section */}
        {activeSection === "food" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Food & Restaurants in {city.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.food.map((restaurant, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600">{restaurant.type}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <Star className="w-3 h-3 mr-1" />
                      {restaurant.rating}
                    </Badge>
                  </div>
                  <p className="text-amber-600 font-medium mb-2">{restaurant.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {restaurant.location}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-500 to-red-500"
                      onClick={() => handleBookingClick("restaurant", restaurant)}
                    >
                      Reserve Table
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openGoogleMaps(restaurant.name)}
                    >
                      Get Directions
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Temples Section */}
        {activeSection === "temples" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Temples & Spiritual Places in {city.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.temples.map((temple, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <Church className="w-8 h-8 text-orange-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{temple.name}</h3>
                      <p className="text-gray-600 mb-3">{temple.significance}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{temple.timings}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span>{temple.location}</span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3 bg-gradient-to-r from-orange-500 to-red-500">
                        Add to Spiritual Tour
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Markets Section */}
        {activeSection === "markets" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Markets & Shopping in {city.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.markets.map((market, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <ShoppingBag className="w-8 h-8 text-purple-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{market.name}</h3>
                      <p className="text-amber-600 font-medium mb-2">{market.speciality}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{market.timings}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span>{market.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-purple-500 to-pink-500"
                          onClick={() => openGoogleMaps(market.name)}
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Get Directions
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setActiveSection("shopping-guide")}
                        >
                          <BookOpen className="w-4 h-4 mr-1" />
                          Shopping Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Shopping Tips */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-purple-500" />
                Smart Shopping Tips for {city.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm">• Best time to shop: Evening after 5 PM</p>
                  <p className="text-sm">• Always bargain - start at 50% of quoted price</p>
                  <p className="text-sm">• Check quality before buying</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">• Buy authentic items from government stores</p>
                  <p className="text-sm">• Ask for bills for warranty claims</p>
                  <p className="text-sm">• Carry cash for better deals</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Events Section */}
        {activeSection === "events" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Events & Festivals in {city.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.events.map((event, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-8 h-8 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{event.date}</p>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                          Book Tickets
                        </Button>
                        <Button size="sm" variant="outline">
                          More Info
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Safety Section */}
        {activeSection === "safety" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Safety & Emergency Information for {city.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Emergency Contacts */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-500" />
                  Emergency Contacts
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Police</span>
                    <a href="tel:100" className="text-blue-600 font-medium">100</a>
                  </div>
                  <div className="flex justify-between">
                    <span>Ambulance</span>
                    <a href="tel:108" className="text-blue-600 font-medium">108</a>
                  </div>
                  <div className="flex justify-between">
                    <span>Fire Brigade</span>
                    <a href="tel:101" className="text-blue-600 font-medium">101</a>
                  </div>
                  <div className="flex justify-between">
                    <span>Tourist Helpline</span>
                    <a href="tel:1363" className="text-blue-600 font-medium">1363</a>
                  </div>
                </div>
              </Card>

              {/* SOS Button */}
              <Card className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-4">Emergency SOS</h3>
                <Button className="w-full h-20 bg-gradient-to-r from-red-500 to-red-600 text-xl font-bold hover:from-red-600 hover:to-red-700">
                  🚨 SOS HELP
                </Button>
                <p className="text-sm text-gray-600 mt-2">Press for immediate assistance</p>
              </Card>

              {/* Safety Tips */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Safety Tips
                </h3>
                <div className="space-y-2 text-sm">
                  <p>• Keep copies of important documents</p>
                  <p>• Inform someone about your itinerary</p>
                  <p>• Use verified taxi services</p>
                  <p>• Stay hydrated and carry water</p>
                  <p>• Avoid isolated areas at night</p>
                </div>
              </Card>
            </div>

            {/* Safe/Unsafe Zones */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Area Safety Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">✅ Safe Areas (Well-lit & Patrolled)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Main tourist areas</li>
                    <li>• Hotel zones</li>
                    <li>• Major markets</li>
                    <li>• Government buildings area</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-600 mb-2">⚠️ Exercise Caution</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Remote areas after dark</li>
                    <li>• Isolated temples/monuments</li>
                    <li>• Unofficial guide services</li>
                    <li>• Unregistered accommodations</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Shopping Guide Section */}
        {activeSection === "shopping-guide" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Shopping Guide for {city.name}</h2>
              <Button 
                variant="outline"
                onClick={() => setActiveSection("markets")}
              >
                ← Back to Markets
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shopping Tips */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-purple-500" />
                  Smart Shopping Tips
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-medium">Best Shopping Hours</h4>
                      <p className="text-gray-600">Visit markets after 5 PM when it's cooler and more lively</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-medium">Bargaining Strategy</h4>
                      <p className="text-gray-600">Start at 40-50% of the quoted price and negotiate upward</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-medium">Payment Methods</h4>
                      <p className="text-gray-600">Carry cash for better deals, cards accepted in larger stores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <div>
                      <h4 className="font-medium">Quality Check</h4>
                      <p className="text-gray-600">Inspect items carefully, ask for authenticity certificates</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* What to Buy */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Must-Buy Items in {city.name}</h3>
                <div className="space-y-4">
                  {[
                    { item: "Miniature Paintings", price: "₹500-5000", description: "Authentic Rajasthani art" },
                    { item: "Block Print Textiles", price: "₹200-2000", description: "Traditional fabrics & clothing" },
                    { item: "Silver Jewelry", price: "₹800-8000", description: "Handcrafted ornaments" },
                    { item: "Mojaris (Shoes)", price: "₹300-1500", description: "Traditional leather footwear" },
                    { item: "Handicrafts", price: "₹100-3000", description: "Wooden & metal crafts" }
                  ].map((product) => (
                    <div key={product.item} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{product.item}</h4>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Trusted Stores */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Government Certified & Trusted Stores</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Rajasthan Government Emporium", location: "Main Market", specialty: "Authentic handicrafts with guarantee" },
                  { name: "Khadi Gramodyog", location: "City Center", specialty: "Handloom textiles & khadi" },
                  { name: "Central Cottage Industries", location: "Tourist Area", specialty: "Quality crafts with fixed prices" }
                ].map((store) => (
                  <div key={store.name} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{store.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">📍 {store.location}</p>
                    <p className="text-sm text-amber-600">{store.specialty}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => openGoogleMaps(store.name)}
                    >
                      Get Directions
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Booking Modals */}
      <BookingModal 
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, type: "hotel" })}
        type={bookingModal.type}
        item={bookingModal.item}
        cityName={cityName}
      />

      <ItineraryModal 
        isOpen={isItineraryModalOpen}
        onClose={() => setIsItineraryModalOpen(false)}
        cityName={cityName}
      />

      {/* AI Chatbot */}
      {isAIChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl border z-50">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
            <h3 className="font-semibold">AI Guide for {city.name}</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsAIChatOpen(false)}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me about hotels, food, places..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Floating AI Assistant Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsAIChatOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      </motion.div>
    </div>
  );
}