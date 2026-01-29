import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Search, 
  Car, 
  Bike, 
  MapPin, 
  Users, 
  Fuel, 
  ShieldCheck,
  Star,
  CreditCard,
  Smartphone,
  Banknote,
  Phone,
  CheckCircle,
  Download,
  MessageSquare,
  Bot,
  Send,
  ArrowLeft
} from "lucide-react";
import { AISpeaker } from "./AISpeaker";

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: "car" | "cab" | "bike" | "scooter";
  city: string;
  image: string;
  pricePerDay: number;
  fuel: string;
  transmission: string;
  withDriver: boolean;
  maxPassengers?: number;
  features: string[];
  rating: number;
  availability: boolean;
  driverInfo?: {
    name: string;
    phone: string;
    rating: number;
    experience: string;
  };
}

interface CityDetails {
  name: string;
  hotels: Array<{
    name: string;
    price: string;
    rating: number;
    image: string;
  }>;
  cafes: Array<{
    name: string;
    cuisine: string;
    rating: number;
    image: string;
  }>;
  drivers: Array<{
    name: string;
    phone: string;
    rating: number;
    carType: string;
    experience: string;
  }>;
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Swift Dzire - Sedan",
    brand: "Maruti Suzuki",
    model: "Swift Dzire",
    type: "cab",
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=90",
    pricePerDay: 1800,
    fuel: "Included",
    transmission: "Manual",
    withDriver: true,
    maxPassengers: 4,
    features: ["AC Cab", "Max 4 Passengers", "Luggage 2 Bags"],
    rating: 4.5,
    availability: true,
    driverInfo: {
      name: "Rajesh Kumar",
      phone: "+91 98765-43210",
      rating: 4.7,
      experience: "8 years"
    }
  },
  {
    id: "2",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    type: "bike",
    city: "Udaipur",
    image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=1200&q=90",
    pricePerDay: 1200,
    fuel: "Self-fill",
    transmission: "Manual",
    withDriver: false,
    features: ["Helmet Included", "Self-Drive Only"],
    rating: 4.8,
    availability: true
  },
  {
    id: "3",
    name: "Honda Activa 5G",
    brand: "Honda",
    model: "Activa 5G",
    type: "scooter",
    city: "Jodhpur",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=90",
    pricePerDay: 600,
    fuel: "Self-fill",
    transmission: "Automatic",
    withDriver: false,
    features: ["Helmet Included", "Pickup from Market Area"],
    rating: 4.3,
    availability: true
  },
  {
    id: "4",
    name: "Mahindra XUV 700",
    brand: "Mahindra",
    model: "XUV 700",
    type: "car",
    city: "Jaisalmer",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=90",
    pricePerDay: 2500,
    fuel: "Full Tank",
    transmission: "Automatic",
    withDriver: false,
    maxPassengers: 7,
    features: ["7 Seater", "Desert Ready", "GPS Included"],
    rating: 4.6,
    availability: true
  },
  {
    id: "5",
    name: "BMW 3 Series - Luxury",
    brand: "BMW",
    model: "3 Series",
    type: "car",
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=90",
    pricePerDay: 3500,
    fuel: "Full Tank",
    transmission: "Automatic",
    withDriver: true,
    maxPassengers: 4,
    features: ["Luxury Interior", "Professional Chauffeur", "Premium Sound"],
    rating: 4.9,
    availability: true,
    driverInfo: {
      name: "Arjun Singh",
      phone: "+91 98765-43214",
      rating: 4.9,
      experience: "12 years"
    }
  },
  {
    id: "6",
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    model: "Innova Crysta",
    type: "cab",
    city: "Udaipur",
    image: "https://images.unsplash.com/photo-1611651186988-df178277f048?w=1200&q=90",
    pricePerDay: 2200,
    fuel: "Included",
    transmission: "Manual",
    withDriver: true,
    maxPassengers: 7,
    features: ["AC Van", "Max 7 Passengers", "Large Luggage Space"],
    rating: 4.4,
    availability: true,
    driverInfo: {
      name: "Kishore Raj",
      phone: "+91 98765-43212",
      rating: 4.8,
      experience: "10 years"
    }
  },
  {
    id: "7",
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    model: "Pulsar NS200",
    type: "bike",
    city: "Jodhpur",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&q=90",
    pricePerDay: 800,
    fuel: "Self-fill",
    transmission: "Manual",
    withDriver: false,
    features: ["Sports Bike", "Helmet Included", "City Ride"],
    rating: 4.2,
    availability: true
  },
  {
    id: "8",
    name: "TVS Jupiter",
    brand: "TVS",
    model: "Jupiter",
    type: "scooter",
    city: "Pushkar",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=1200&q=90",
    pricePerDay: 500,
    fuel: "Self-fill",
    transmission: "Automatic",
    withDriver: false,
    features: ["Lightweight", "Easy Parking", "Fuel Efficient"],
    rating: 4.1,
    availability: true
  },
  {
    id: "9",
    name: "Scorpio N - SUV",
    brand: "Mahindra",
    model: "Scorpio N",
    type: "car",
    city: "Mount Abu",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=90",
    pricePerDay: 2800,
    fuel: "Full Tank",
    transmission: "Manual",
    withDriver: false,
    maxPassengers: 7,
    features: ["Hill Station Ready", "4WD", "Spacious"],
    rating: 4.5,
    availability: true
  },
  {
    id: "10",
    name: "Maruti Ertiga",
    brand: "Maruti Suzuki",
    model: "Ertiga",
    type: "cab",
    city: "Jaisalmer",
    image: "https://images.unsplash.com/photo-1552519507-0a4b025d95e7?w=1200&q=90",
    pricePerDay: 2000,
    fuel: "Included",
    transmission: "Manual",
    withDriver: true,
    maxPassengers: 6,
    features: ["6 Seater", "Desert Tours", "AC Vehicle"],
    rating: 4.3,
    availability: true,
    driverInfo: {
      name: "Mahesh Choudhary",
      phone: "+91 98765-43215",
      rating: 4.5,
      experience: "9 years"
    }
  }
];

const cityDetails: Record<string, CityDetails> = {
  "Jaipur": {
    name: "Jaipur",
    hotels: [
      { name: "Taj Jai Mahal Palace", price: "₹8,500/night", rating: 4.8, image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?w=300" },
      { name: "Samode Haveli", price: "₹6,200/night", rating: 4.7, image: "https://images.unsplash.com/photo-1512552288940-3a300922a275?w=300" },
      { name: "Hotel Pearl Palace", price: "₹2,500/night", rating: 4.3, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300" }
    ],
    cafes: [
      { name: "Peacock Rooftop Restaurant", cuisine: "Rajasthani", rating: 4.5, image: "https://images.unsplash.com/photo-1669043962012-a5b8496cd664?w=300" },
      { name: "LMB (Laxmi Misthan Bhandar)", cuisine: "Sweets & Snacks", rating: 4.6, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300" },
      { name: "Tapri Central", cuisine: "Tea & Snacks", rating: 4.4, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300" }
    ],
    drivers: [
      { name: "Rajesh Kumar", phone: "+91 98765-43210", rating: 4.7, carType: "Swift Dzire", experience: "8 years" },
      { name: "Mohan Singh", phone: "+91 98765-43211", rating: 4.5, carType: "Innova Crysta", experience: "6 years" },
      { name: "Arjun Singh", phone: "+91 98765-43214", rating: 4.9, carType: "BMW 3 Series", experience: "12 years" }
    ]
  },
  "Udaipur": {
    name: "Udaipur",
    hotels: [
      { name: "Lake Palace Hotel", price: "₹12,000/night", rating: 4.9, image: "https://images.unsplash.com/photo-1596392816303-8c9e8bc30d80?w=300" },
      { name: "Jagat Niwas Palace", price: "₹4,500/night", rating: 4.6, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300" },
      { name: "Hotel Lakend", price: "₹3,200/night", rating: 4.2, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300" }
    ],
    cafes: [
      { name: "Ambrai Restaurant", cuisine: "Multi-cuisine", rating: 4.7, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300" },
      { name: "Jheel's Ginger Coffee Bar", cuisine: "Cafe", rating: 4.4, image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300" },
      { name: "Millets of Mewar", cuisine: "Healthy Food", rating: 4.3, image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=300" }
    ],
    drivers: [
      { name: "Kishore Raj", phone: "+91 98765-43212", rating: 4.8, carType: "Innova Crysta", experience: "10 years" },
      { name: "Suresh Choudhary", phone: "+91 98765-43213", rating: 4.6, carType: "Scorpio", experience: "7 years" }
    ]
  },
  "Jodhpur": {
    name: "Jodhpur",
    hotels: [
      { name: "Umaid Bhawan Palace", price: "₹15,000/night", rating: 4.9, image: "https://images.unsplash.com/photo-1631119509103-3ba7cea5b82c?w=300" },
      { name: "Ajit Bhawan", price: "₹5,500/night", rating: 4.5, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300" },
      { name: "The Blue House", price: "₹2,800/night", rating: 4.1, image: "https://images.unsplash.com/photo-1587895191051-f3aa6b40b7d0?w=300" }
    ],
    cafes: [
      { name: "Clock Tower Cafe", cuisine: "Continental", rating: 4.4, image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300" },
      { name: "Indique Restaurant", cuisine: "Rooftop Dining", rating: 4.6, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300" },
      { name: "Stepwell Cafe", cuisine: "Local Cuisine", rating: 4.2, image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=300" }
    ],
    drivers: [
      { name: "Bhanu Singh", phone: "+91 98765-43216", rating: 4.6, carType: "Swift Dzire", experience: "9 years" },
      { name: "Gajendra Singh", phone: "+91 98765-43217", rating: 4.4, carType: "Ertiga", experience: "7 years" }
    ]
  },
  "Jaisalmer": {
    name: "Jaisalmer",
    hotels: [
      { name: "Suryagarh", price: "₹18,000/night", rating: 4.8, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300" },
      { name: "Hotel Rang Mahal", price: "₹4,200/night", rating: 4.4, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300" },
      { name: "Desert Haveli", price: "₹3,500/night", rating: 4.2, image: "https://images.unsplash.com/photo-1512552288940-3a300922a275?w=300" }
    ],
    cafes: [
      { name: "The Trio Restaurant", cuisine: "Multi-cuisine", rating: 4.5, image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=300" },
      { name: "Desert Boy's Dhani", cuisine: "Desert Cuisine", rating: 4.3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300" },
      { name: "Jaisal Treat Restaurant", cuisine: "Rajasthani", rating: 4.1, image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=300" }
    ],
    drivers: [
      { name: "Mahesh Choudhary", phone: "+91 98765-43215", rating: 4.5, carType: "Ertiga", experience: "9 years" },
      { name: "Ravi Kumar", phone: "+91 98765-43218", rating: 4.7, carType: "XUV 700", experience: "8 years" }
    ]
  },
  "Pushkar": {
    name: "Pushkar",
    hotels: [
      { name: "Ananta Spa & Resort", price: "₹7,500/night", rating: 4.6, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300" },
      { name: "Hotel Pushkar Palace", price: "₹3,800/night", rating: 4.3, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300" }
    ],
    cafes: [
      { name: "Rainbow Cafe", cuisine: "Israeli & Continental", rating: 4.4, image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300" },
      { name: "Sunset Cafe", cuisine: "Multi-cuisine", rating: 4.2, image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=300" }
    ],
    drivers: [
      { name: "Dinesh Sharma", phone: "+91 98765-43219", rating: 4.3, carType: "Innova", experience: "6 years" }
    ]
  },
  "Mount Abu": {
    name: "Mount Abu",
    hotels: [
      { name: "Hotel Hilltone", price: "₹5,200/night", rating: 4.4, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300" },
      { name: "Sterling Mount Abu", price: "₹4,800/night", rating: 4.2, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300" }
    ],
    cafes: [
      { name: "Arbuda Restaurant", cuisine: "Multi-cuisine", rating: 4.3, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300" },
      { name: "Jodhpur Bhojanalaya", cuisine: "Rajasthani", rating: 4.1, image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=300" }
    ],
    drivers: [
      { name: "Prakash Jain", phone: "+91 98765-43220", rating: 4.5, carType: "Scorpio N", experience: "11 years" }
    ]
  }
};

interface CarsAndBikesPageProps {
  onBack?: () => void;
}

export function CarsAndBikesPage({ onBack }: CarsAndBikesPageProps) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [transmission, setTransmission] = useState("");
  const [withDriver, setWithDriver] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCityDetails, setShowCityDetails] = useState(false);
  const [selectedCityDetails, setSelectedCityDetails] = useState<CityDetails | null>(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your AI travel assistant. How can I help you with vehicle booking today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  
  // Booking form states
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("18:00");
  const [pickupLocation, setPickupLocation] = useState("");
  const [needDriver, setNeedDriver] = useState("no");
  const [numTravelers, setNumTravelers] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("");

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (!selectedCity || vehicle.city === selectedCity) &&
      (!selectedType || vehicle.type === selectedType) &&
      (!priceRange || checkPriceRange(vehicle.pricePerDay, priceRange)) &&
      (!transmission || vehicle.transmission.toLowerCase() === transmission.toLowerCase()) &&
      (!withDriver || (withDriver === "yes" ? vehicle.withDriver : !vehicle.withDriver)) &&
      (!searchQuery || vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) || vehicle.city.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  function checkPriceRange(price: number, range: string): boolean {
    switch (range) {
      case "budget": return price < 1000;
      case "mid": return price >= 1000 && price <= 2500;
      case "premium": return price > 2500;
      default: return true;
    }
  }

  const handleBookNow = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = () => {
    const id = `RJRIDE${Math.floor(Math.random() * 100000)}`;
    setBookingId(id);
    setShowBookingForm(false);
    setShowBookingConfirmation(true);
  };

  const handleCityClick = (cityName: string) => {
    const details = cityDetails[cityName];
    if (details) {
      setSelectedCityDetails(details);
      setShowCityDetails(true);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = { id: Date.now(), text: newMessage, sender: "user" };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response based on message content
    setTimeout(() => {
      let responseText = "";
      const message = newMessage.toLowerCase();
      
      if (message.includes("jaipur") || message.includes("pink city")) {
        responseText = "Great choice! For Jaipur, I recommend our BMW 3 Series (₹3,500/day) for luxury or Swift Dzire (₹1,800/day) for budget. Both come with experienced drivers. Would you like me to book one?";
      } else if (message.includes("udaipur") || message.includes("lake")) {
        responseText = "Udaipur is perfect for bike tours! Our Royal Enfield Classic 350 (₹1,200/day) is very popular, or try the Innova Crysta (₹2,200/day) for family trips. Which one interests you?";
      } else if (message.includes("bike") || message.includes("royal enfield")) {
        responseText = "Our bikes are perfect for exploring! Royal Enfield Classic 350 in Udaipur (₹1,200/day) and Bajaj Pulsar NS200 in Jodhpur (₹800/day) are top picks. Helmets included!";
      } else if (message.includes("car") || message.includes("sedan")) {
        responseText = "For cars, I recommend BMW 3 Series (luxury, ₹3,500/day), XUV 700 (family/desert, ₹2,500/day), or Swift Dzire (budget, ₹1,800/day). All include fuel and driver options.";
      } else if (message.includes("budget") || message.includes("cheap")) {
        responseText = "Budget-friendly options: TVS Jupiter scooter (₹500/day), Honda Activa (₹600/day), or Bajaj Pulsar bike (₹800/day). All include helmets and are perfect for city exploration!";
      } else if (message.includes("luxury") || message.includes("premium")) {
        responseText = "For luxury travel: BMW 3 Series (₹3,500/day) in Jaipur with professional chauffeur, or Mahindra XUV 700 (₹2,500/day) for desert adventures. Both include premium services.";
      } else if (message.includes("desert") || message.includes("jaisalmer")) {
        responseText = "Desert adventures in Jaisalmer! XUV 700 (₹2,500/day) is perfect for sand dunes with 4WD capability, or Ertiga (₹2,000/day) for group travel. Both are desert-ready!";
      } else {
        responseText = "I understand you're looking for vehicle options. Based on your query, I recommend checking our Royal Enfield bikes in Udaipur or our sedan cabs in Jaipur. Would you like me to show you specific options?";
      }
      
      const aiResponse = { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: "bot" 
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-4">
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

      {/* Hero Banner */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center cars-hero-bg">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl mb-4"
          >
            Ride Your Adventure in <span className="text-amber-400">Rajasthan</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Book self-drive cars, chauffeur-driven cabs, or rental bikes – anytime, anywhere.
          </motion.p>
        </div>
        
        {/* AI Speaker for Cars & Bikes */}
        <AISpeaker message="Need a Royal Enfield in Jaisalmer or a sedan for Jaipur? Tell me your plan, I'll book it instantly." />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filter Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter City / Vehicle Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jaipur">Jaipur</SelectItem>
                  <SelectItem value="Udaipur">Udaipur</SelectItem>
                  <SelectItem value="Jodhpur">Jodhpur</SelectItem>
                  <SelectItem value="Jaisalmer">Jaisalmer</SelectItem>
                  <SelectItem value="Pushkar">Pushkar</SelectItem>
                  <SelectItem value="Mount Abu">Mount Abu</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="cab">Cab</SelectItem>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="scooter">Scooter</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (&lt;₹1000/day)</SelectItem>
                  <SelectItem value="mid">Mid (₹1000-₹2500)</SelectItem>
                  <SelectItem value="premium">Premium (₹2500+)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger>
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>

              <Select value={withDriver} onValueChange={setWithDriver}>
                <SelectTrigger>
                  <SelectValue placeholder="With Driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-amber-500">
                    ⭐ {vehicle.rating}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {vehicle.type === "car" && <Car className="h-4 w-4 text-blue-500" />}
                    {vehicle.type === "cab" && <Car className="h-4 w-4 text-green-500" />}
                    {vehicle.type === "bike" && <Bike className="h-4 w-4 text-red-500" />}
                    {vehicle.type === "scooter" && <Bike className="h-4 w-4 text-purple-500" />}
                    <span className="text-sm text-gray-500 capitalize">{vehicle.type}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{vehicle.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    <span className="font-medium text-gray-700">{vehicle.brand}</span> {vehicle.model}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{vehicle.city}</span>
                  </div>
                  
                  <div className="text-2xl text-amber-600 mb-3">
                    ₹{vehicle.pricePerDay.toLocaleString()}/day
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Fuel: {vehicle.fuel}</span>
                    </div>
                    {vehicle.maxPassengers && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Max {vehicle.maxPassengers} Passengers</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {vehicle.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleBookNow(vehicle)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleCityClick(vehicle.city)}
                      className="px-3"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Special Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <Bot className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg mb-2">AI Trip Planner</h3>
            <p className="text-sm text-gray-600">Get personalized city tour suggestions with your vehicle booking</p>
          </Card>
          
          <Card className="text-center p-6">
            <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg mb-2">Safety First</h3>
            <p className="text-sm text-gray-600">Live tracking, driver verification, and 24/7 support</p>
          </Card>
          
          <Card className="text-center p-6">
            <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg mb-2">City Pack Offers</h3>
            <p className="text-sm text-gray-600">All-inclusive packages with vehicle + attractions</p>
          </Card>
          
          <Card className="text-center p-6">
            <Fuel className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg mb-2">Eco-Friendly Options</h3>
            <p className="text-sm text-gray-600">Electric scooters and EV cars available</p>
          </Card>
        </div>
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Your Vehicle</DialogTitle>
          </DialogHeader>
          
          {selectedVehicle && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
                <img 
                  src={selectedVehicle.image} 
                  alt={selectedVehicle.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{selectedVehicle.name}</h3>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{selectedVehicle.brand}</span> · {selectedVehicle.model}
                  </p>
                  <p className="text-sm text-gray-600">{selectedVehicle.city}</p>
                  <p className="text-xl text-amber-600">₹{selectedVehicle.pricePerDay}/day</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Pickup Date</Label>
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date: Date | undefined) => {
                      setPickupDate(date);
                      // Auto-adjust dropoff if it's before new pickup
                      if (date && dropoffDate && dropoffDate <= date) {
                        const newDropoff = new Date(date);
                        newDropoff.setDate(newDropoff.getDate() + 1);
                        setDropoffDate(newDropoff);
                      }
                    }}
                    disabled={(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label>Drop-off Date</Label>
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={setDropoffDate}
                    disabled={(date: Date) => {
                      const today = new Date(new Date().setHours(0, 0, 0, 0));
                      if (date < today) return true;
                      if (pickupDate && date <= pickupDate) return true;
                      return false;
                    }}
                    className="rounded-md border"
                  />
                  {dropoffDate && pickupDate && dropoffDate <= pickupDate && (
                    <p className="text-sm text-red-500 mt-1">Drop-off must be after pickup date</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pickup Time</Label>
                  <Input 
                    type="time" 
                    value={pickupTime} 
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Drop-off Time</Label>
                  <Input 
                    type="time" 
                    value={dropoffTime} 
                    onChange={(e) => setDropoffTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Pickup Location</Label>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="station">Railway Station</SelectItem>
                    <SelectItem value="airport">Airport</SelectItem>
                    <SelectItem value="custom">Custom Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedVehicle.withDriver && (
                <div>
                  <Label>Need Driver?</Label>
                  <RadioGroup value={needDriver} onValueChange={setNeedDriver}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="driver-yes" />
                      <Label htmlFor="driver-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="driver-no" />
                      <Label htmlFor="driver-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div>
                <Label>Number of Travelers</Label>
                <Select value={numTravelers} onValueChange={setNumTravelers}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        UPI
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking">Net Banking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Cash on Delivery
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={handleConfirmBooking}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                disabled={!paymentMethod}
              >
                Confirm Booking
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* City Details Modal */}
      <Dialog open={showCityDetails} onOpenChange={setShowCityDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCityDetails?.name} - Complete Guide</DialogTitle>
          </DialogHeader>
          
          {selectedCityDetails && (
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="cafes">Cafes & Restaurants</TabsTrigger>
                <TabsTrigger value="drivers">Drivers & Cabs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hotels" className="space-y-4">
                {selectedCityDetails.hotels.map((hotel, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg">{hotel.name}</h3>
                        <p className="text-amber-600">{hotel.price}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>{hotel.rating}</span>
                        </div>
                      </div>
                      <Button>Book Hotel</Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="cafes" className="space-y-4">
                {selectedCityDetails.cafes.map((cafe, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <img 
                        src={cafe.image} 
                        alt={cafe.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg">{cafe.name}</h3>
                        <p className="text-gray-600">{cafe.cuisine}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>{cafe.rating}</span>
                        </div>
                      </div>
                      <Button>Reserve Table</Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="drivers" className="space-y-4">
                {selectedCityDetails.drivers.map((driver, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl">
                        {driver.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg">{driver.name}</h3>
                        <p className="text-gray-600">{driver.carType}</p>
                        <p className="text-sm text-gray-500">{driver.experience} experience</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>{driver.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{driver.phone}</p>
                        <Button className="mt-2">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Driver
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Modal */}
      <Dialog open={showBookingConfirmation} onOpenChange={setShowBookingConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Booking Confirmed! ✅</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <p className="text-lg">Booking ID: <span className="text-amber-600">#{bookingId}</span></p>
              {selectedVehicle && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Vehicle:</strong> {selectedVehicle.name}</p>
                  <p><strong>City:</strong> {selectedVehicle.city}</p>
                  <p><strong>Date:</strong> {pickupDate?.toDateString()}</p>
                  <p><strong>Time:</strong> {pickupTime} - {dropoffTime}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button 
                onClick={() => setShowBookingConfirmation(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Button */}
      <Button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* AI Chat Modal */}
      <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
        <DialogContent className="max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-amber-500" />
              AI Travel Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-96">
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-800 border'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about vehicles, bookings, or cities..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}