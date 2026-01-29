import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Hotel, 
  Car, 
  Bike, 
  Coffee, 
  UtensilsCrossed, 
  Castle, 
  MapPin, 
  ShoppingBag, 
  UserCheck, 
  Shield, 
  Bot, 
  Phone,
  ChevronDown,
  Search,
  User,
  Calendar,
  Users,
  Clock
} from "lucide-react";

interface AdvancedNavigationProps {
  onProfileClick: () => void;
  onServiceCitySelect?: (service: string, city: string) => void;
}

export function AdvancedNavigation({ onProfileClick, onServiceCitySelect }: AdvancedNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showCitySelector, setShowCitySelector] = useState(false);

  const rajasthanCities = [
    "Udaipur", "Jaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Mount Abu"
  ];

  const navItems = [
    {
      id: "hotels",
      label: "Hotels",
      icon: Hotel,
      dropdown: [
        { label: "Luxury Hotels", desc: "5-star palaces & resorts" },
        { label: "Budget Stays", desc: "Affordable accommodations" },
        { label: "Heritage Havelis & Palaces", desc: "Royal heritage properties" },
        { label: "Resorts & Camps", desc: "Desert camps & lake resorts" },
        { label: "Browse by City", desc: "Select your destination", isCitySelector: true },
        { label: "Booking Form", desc: "Date | Guests | Rooms", isForm: true }
      ]
    },
    {
      id: "cabs",
      label: "Cabs & Cars",
      icon: Car,
      dropdown: [
        { label: "Book a Cab", desc: "City & Outstation rides" },
        { label: "Car Rentals", desc: "Self-drive options" },
        { label: "SUV / Sedan / Hatchback", desc: "Choose your vehicle" },
        { label: "Driver on Demand", desc: "Professional drivers" },
        { label: "Browse by City", desc: "Select your destination", isCitySelector: true }
      ]
    },
    {
      id: "bikes",
      label: "Bikes & Scooters",
      icon: Bike,
      dropdown: [
        { label: "Rent a Bike", desc: "Royal Enfield, Activa, Scooty" },
        { label: "Price per Day/Hour", desc: "Flexible rental periods" },
        { label: "Pickup & Drop Locations", desc: "Convenient locations" },
        { label: "Browse by City", desc: "Select your destination", isCitySelector: true }
      ]
    },
    {
      id: "cafes",
      label: "Cafes & Restaurants",
      icon: Coffee,
      dropdown: [
        { label: "Rooftop Cafes", desc: "Sky-high dining experience" },
        { label: "Heritage Restaurants", desc: "Dine in palaces" },
        { label: "Lakeside Dining", desc: "Udaipur special" },
        { label: "Browse by City", desc: "Select your destination", isCitySelector: true },
        { label: "Table Reservation", desc: "Date | Time | People", isForm: true }
      ]
    },
    {
      id: "food",
      label: "Food & Culture",
      icon: UtensilsCrossed,
      dropdown: [
        { label: "Rajasthani Thalis", desc: "Authentic local cuisine" },
        { label: "Street Food Tours", desc: "Guided food experiences" },
        { label: "Festival Food Specials", desc: "Seasonal delicacies" },
        { label: "Cultural Shows & Folk Music", desc: "Live performances" },
        { label: "Browse by City", desc: "Select your destination", isCitySelector: true }
      ]
    },
    {
      id: "attractions",
      label: "Attractions",
      icon: Castle,
      dropdown: [
        { label: "Forts & Palaces", desc: "Historical monuments" },
        { label: "Lakes & Gardens", desc: "Natural beauty spots" },
        { label: "Desert Safaris & Hot Air Balloons", desc: "Adventure activities" },
        { label: "Hidden Gems Explorer", desc: "Off-beat destinations" },
        { label: "Browse by City", desc: "Select your destination", isCitySelector: true }
      ]
    },

    {
      id: "shopping",
      label: "Shopping",
      icon: ShoppingBag,
      dropdown: [
        { label: "Local Handicrafts", desc: "Authentic crafts" },
        { label: "Jewelry & Gems", desc: "Traditional ornaments" },
        { label: "Textiles & Blue Pottery", desc: "Rajasthani specialties" },
        { label: "Online Souvenir Store", desc: "Pre-order & pickup" }
      ]
    },
    {
      id: "guides",
      label: "Guides & Tours",
      icon: UserCheck,
      dropdown: [
        { label: "Hire Local Guide", desc: "Expert local knowledge" },
        { label: "Audio Tours", desc: "AI Voice guidance" },
        { label: "Group Tours & Custom Packages", desc: "Tailored experiences" }
      ]
    },
    {
      id: "safety",
      label: "Safety Tools",
      icon: Shield,
      dropdown: [
        { label: "SOS Emergency Button", desc: "Instant help" },
        { label: "Tourist Police & Helpline", desc: "Emergency contacts" },
        { label: "Hospitals & Pharmacies Nearby", desc: "Medical assistance" },
        { label: "AI Safety Tips", desc: "Best time & do's/don'ts" }
      ]
    },
    {
      id: "ai",
      label: "AI Travel Buddy",
      icon: Bot,
      dropdown: [
        { label: "Chat with AI Assistant", desc: "24/7 help" },
        { label: "Voice Translator", desc: "Hindi ↔ English ↔ Foreign" },
        { label: "Instant Q&A", desc: "Hotels, Places, Food" }
      ]
    },
    {
      id: "support",
      label: "Support",
      icon: Phone,
      dropdown: [
        { label: "24/7 Live Chat", desc: "Instant assistance" },
        { label: "Call Center", desc: "Phone support" },
        { label: "FAQs", desc: "Common questions" },
        { label: "Feedback & Ratings", desc: "Share your experience" }
      ]
    }
  ];

  const handleDropdownEnter = (itemId: string) => {
    setActiveDropdown(itemId);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setShowCitySelector(false);
    setSelectedService(null);
  };

  const handleCitySelect = (city: string) => {
    if (selectedService && onServiceCitySelect) {
      onServiceCitySelect(selectedService, city);
    }
    setActiveDropdown(null);
    setShowCitySelector(false);
    setSelectedService(null);
  };

  const handleServiceItemClick = (item: any, serviceId: string) => {
    if (item.isCitySelector) {
      setSelectedService(serviceId);
      setShowCitySelector(true);
    } else if (item.isForm) {
      // Handle booking form
    } else {
      // Handle other dropdown items
    }
  };

  const BookingForm = ({ type }: { type: string }) => (
    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
      <h4 className="font-medium text-gray-900">{type === "hotels" ? "Quick Hotel Booking" : "Table Reservation"}</h4>
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Check-in" type="date" className="text-xs" />
        <Input placeholder="Check-out" type="date" className="text-xs" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Guests" type="number" className="text-xs" />
        <Input placeholder={type === "hotels" ? "Rooms" : "Time"} className="text-xs" />
      </div>
      <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
        {type === "hotels" ? "Search Hotels" : "Reserve Table"}
      </Button>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <span className="text-gray-900 font-bold text-xl">Explore Rajasthan</span>
              <p className="text-xs text-gray-600">Where Royalty Meets Adventure</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.id)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 px-3 py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {!showCitySelector || selectedService !== item.id ? (
                            item.dropdown.map((dropdownItem, index) => (
                              <div key={index}>
                                {dropdownItem.isForm ? (
                                  <BookingForm type={item.id} />
                                ) : (
                                  <button 
                                    className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                                    onClick={() => handleServiceItemClick(dropdownItem, item.id)}
                                  >
                                    <div className="font-medium text-gray-900 text-sm">
                                      {dropdownItem.label}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                      {dropdownItem.desc}
                                    </div>
                                  </button>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="space-y-1">
                              <div className="p-2 border-b border-gray-200">
                                <h4 className="font-medium text-gray-900 text-sm">Select City</h4>
                                <p className="text-xs text-gray-600">Choose your destination for {item.label}</p>
                              </div>
                              {rajasthanCities.map((city, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleCitySelect(city)}
                                  className="w-full p-2 rounded-lg hover:bg-amber-50 transition-colors text-left flex items-center justify-between"
                                >
                                  <span className="text-sm text-gray-900">{city}</span>
                                  <span className="text-xs text-amber-600">View {item.label}</span>
                                </button>
                              ))}
                              <button
                                onClick={() => setShowCitySelector(false)}
                                className="w-full p-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                ← Back to menu
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search city, hotel, attraction..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border-0 focus:bg-white"
              />
            </div>

            {/* Profile Button */}
            <Button
              onClick={onProfileClick}
              variant="outline"
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              className="lg:hidden text-gray-700"
            >
              <div className="w-5 h-5 flex flex-col justify-center">
                <span className="block w-full h-0.5 bg-current mb-1"></span>
                <span className="block w-full h-0.5 bg-current mb-1"></span>
                <span className="block w-full h-0.5 bg-current"></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="px-4">
                      <div className="flex items-center gap-3 py-2 text-gray-700">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}