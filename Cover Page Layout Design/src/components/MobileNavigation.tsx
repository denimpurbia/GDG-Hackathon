import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  Home,
  Map,
  Hotel,
  Car,
  Utensils,
  Camera,
  Shield,
  User,
  Menu,
  Bot,
  Sparkles,
  Phone,
  Mountain,
  Coffee,
  Bike,
  Search,
  Bell,
  MapPin
} from "lucide-react";

interface MobileNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onProfileClick: () => void;
  onServiceCitySelect: (service: string, city: string) => void;
  notificationCount?: number;
}

const bottomNavItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "interactive-map", icon: Map, label: "Explore" },
  { id: "hotels", icon: Hotel, label: "Hotels" },
  { id: "cars", icon: Car, label: "Rides" },
  { id: "safety", icon: Shield, label: "Safety" }
];

const quickServices = [
  { id: "hotels", icon: Hotel, label: "Hotels", color: "bg-blue-500" },
  { id: "cars", icon: Car, label: "Cars", color: "bg-green-500" },
  { id: "bikes", icon: Bike, label: "Bikes", color: "bg-purple-500" },
  { id: "cafes", icon: Coffee, label: "Cafes", color: "bg-orange-500" },
  { id: "food", icon: Utensils, label: "Food", color: "bg-red-500" },
  { id: "attractions", icon: Camera, label: "Places", color: "bg-indigo-500" }
];

const popularCities = [
  "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", 
  "Ajmer", "Pushkar", "Mount Abu", "Bikaner"
];

export function MobileNavigation({ 
  currentView, 
  onViewChange, 
  onProfileClick, 
  onServiceCitySelect,
  notificationCount = 0 
}: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === activeService) {
      setActiveService(null);
    } else {
      setActiveService(serviceId);
    }
  };

  const handleCitySelect = (city: string) => {
    if (activeService) {
      onServiceCitySelect(activeService, city);
      setActiveService(null);
      setIsMenuOpen(false);
    }
  };

  // Make top bar transparent for home page
  const isHomePage = currentView === "home";
  const topBarClasses = isHomePage 
    ? "sticky top-0 z-40 bg-transparent px-4 py-3 flex items-center justify-between"
    : "sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between";

  return (
    <>
      {/* Top App Bar - Mobile */}
      <div className={topBarClasses}>
        <div className="flex items-center gap-3">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className={`p-2 ${isHomePage ? 'text-white hover:bg-white/20' : ''}`}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <div className="text-2xl">🏰</div>
                  <div>
                    <div className="text-lg font-bold text-amber-600" style={{ fontFamily: "Georgia, serif" }}>
                      Explore Rajasthan
                    </div>
                    <div className="text-sm text-gray-600">Where Royalty Meets Adventure</div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Quick Services */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Quick Services
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickServices.map((service) => (
                    <motion.div
                      key={service.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleServiceClick(service.id)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        activeService === service.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${service.color} flex items-center justify-center mb-2`}>
                        <service.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-medium">{service.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* City Selection - Shows when service is selected */}
              <AnimatePresence>
                {activeService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Select City
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {popularCities.map((city) => (
                        <motion.button
                          key={city}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCitySelect(city)}
                          className="p-2 text-sm bg-gray-100 hover:bg-amber-100 rounded-lg text-left transition-colors"
                        >
                          {city}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Menu */}
              <div className="mt-6 space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Navigate</h3>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onViewChange("interactive-map");
                    setIsMenuOpen(false);
                  }}
                >
                  <Map className="w-4 h-4 mr-3" />
                  Interactive Map
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onViewChange("safety");
                    setIsMenuOpen(false);
                  }}
                >
                  <Shield className="w-4 h-4 mr-3" />
                  Safety Tools
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onViewChange("support");
                    setIsMenuOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-3" />
                  Support
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onProfileClick();
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* App Title */}
          <div>
            <div className={`text-lg font-bold ${isHomePage ? 'text-white' : 'text-amber-600'}`} style={{ fontFamily: "Georgia, serif" }}>
              Explore Rajasthan
            </div>
            <div className={`text-xs -mt-1 ${isHomePage ? 'text-white/90' : 'text-gray-600'}`}>Your Royal Journey</div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className={`relative p-2 ${isHomePage ? 'text-white hover:bg-white/20' : ''}`}>
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-red-500">
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-2 ${isHomePage ? 'text-white hover:bg-white/20' : ''}`}
            onClick={onProfileClick}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-amber-600' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-amber-600' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Padding for Fixed Navigation */}
      <div className="h-20" />
    </>
  );
}