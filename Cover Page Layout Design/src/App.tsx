import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "./components/ui/button";
import { MobileNavigation } from "./components/MobileNavigation";
import { MobileHero } from "./components/MobileHero";
import { MobileFeaturedCities } from "./components/MobileFeaturedCities";
import { MobileFloatingActions } from "./components/MobileFloatingActions";
import { MobilePullToRefresh } from "./components/MobilePullToRefresh";
import { PremiumMapSection } from "./components/PremiumMapSection";
import { HotelsPage } from "./components/HotelsPage";
import { CarsAndBikesPage } from "./components/CarsAndBikesPage";
import { CafesAndRestaurantsPage } from "./components/CafesAndRestaurantsPage";
import { FoodAndCulturePage } from "./components/FoodAndCulturePage";
import { AttractionsPage } from "./components/AttractionsPage";
import { SupportPage } from "./components/SupportPage";
import { MapDashboard } from "./components/MapDashboard";
import { SafetyPage } from "./components/SafetyPage";
import { AITravelAssistant } from "./components/AITravelAssistant";
import { CityDashboard } from "./components/CityDashboard";
import { RajasthanCitiesMap } from "./components/RajasthanCitiesMap";
import { InteractiveRajasthanMap } from "./components/InteractiveRajasthanMap";
import { ServiceCityDetails } from "./components/ServiceCityDetails";
import { ProfilePage } from "./components/ProfileModal";
import { JourneyRoadmap } from "./components/JourneyRoadmap";
import { Bot, Sparkles } from "lucide-react";
import { API_BASE_URL } from "./config/api";
import { supabase } from "./config/supabaseClient";

export default function App() {
  console.log("📱 App component rendering...");
  
  const [currentView, setCurrentView] = useState("home");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [journeyData, setJourneyData] = useState<{ startCity: string; endCity: string } | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  console.log("📍 Current view:", currentView);

  // Supabase auth: ensure login/signup shown before main app
  useEffect(() => {
    let isMounted = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        setSession(data.session ?? null);
        setAuthLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setSession(null);
        setAuthLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Attractions API integration
  const [attractions, setAttractions] = useState<any[]>([]);
  const [attractionsLoading, setAttractionsLoading] = useState(false);
  const [attractionsError, setAttractionsError] = useState<string | null>(null);

  // Always register this hook (no conditional hooks!)
  useEffect(() => {
    if (currentView === "attractions") {
      setAttractionsLoading(true);
      setAttractionsError(null);
      fetch(`${API_BASE_URL}/api/attractions`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch attractions");
          return res.json();
        })
        .then((data) => setAttractions(data))
        .catch((err) => setAttractionsError(err.message))
        .finally(() => setAttractionsLoading(false));
    }
  }, [currentView]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">Loading your experience...</p>
      </div>
    );
  }

  // If not logged in, always show auth screen first
  if (!session) {
    return <ProfilePage onBack={() => {}} />;
  }

  // Handle refresh functionality
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("App refreshed!");
  };

  // Profile Page View
  if (currentView === "profile") {
    return (
      <ProfilePage onBack={() => setCurrentView("home")} />
    );
  }

  // Journey Roadmap View
  if (currentView === "roadmap" && journeyData) {
    return (
      <div className="min-h-screen">
        <JourneyRoadmap
          startCity={journeyData.startCity}
          endCity={journeyData.endCity}
          onBack={() => {
            setCurrentView("home");
            setJourneyData(null);
          }}
          onBookServices={(service, city) => {
            setSelectedService(service);
            setSelectedCity(city);
            setCurrentView("service-city-details");
          }}
        />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Service City Details View
  if (
    currentView === "service-city-details" &&
    selectedService &&
    selectedCity
  ) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <ServiceCityDetails
          serviceName={selectedService}
          cityName={selectedCity}
          onBack={() => {
            setCurrentView(selectedService.toLowerCase());
            setSelectedCity(null);
            setSelectedService(null);
          }}
          onNavigateToMap={() => setCurrentView("map")}
          onNavigateToSafety={() => setCurrentView("safety")}
        />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Interactive Rajasthan Map View (Second Slide)
  if (currentView === "interactive-map") {
    return (
      <div className="min-h-screen">
        <InteractiveRajasthanMap
          onBack={() => setCurrentView("home")}
          onCitySelect={(cityName) => {
            setSelectedCity(cityName);
            setCurrentView("city");
          }}
          onNavigateToSection={(section) => {
            if (section === "map") {
              setCurrentView("map");
            } else if (section === "safety") {
              setCurrentView("safety");
            } else if (section === "hotels") {
              setCurrentView("hotels");
            } else if (section === "cars") {
              setCurrentView("cars");
            } else if (section === "attractions") {
              setCurrentView("attractions");
            } else {
              setCurrentView(section as any);
            }
          }}
        />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />
      </div>
    );
  }

  // City Dashboard View
  if (currentView === "city" && selectedCity) {
    return (
      <div className="min-h-screen">
        <CityDashboard
          cityName={selectedCity}
          onBack={() => {
            setCurrentView("interactive-map");
            setSelectedCity(null);
          }}
          onNavigateToSection={(section) => {
            if (section === "map") {
              setCurrentView("map");
            } else if (section === "safety") {
              setCurrentView("safety");
            } else {
              setCurrentView(section as any);
            }
          }}
        />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Rajasthan Cities Map View
  if (currentView === "all-cities") {
    return (
      <div className="min-h-screen">
        <RajasthanCitiesMap
          onCitySelect={(cityName) => {
            setSelectedCity(cityName);
            setCurrentView("city");
          }}
          onBack={() => setCurrentView("home")}
        />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Map Dashboard View
  if (currentView === "map") {
    return (
      <div className="min-h-screen">
        <MapDashboard onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Safety Page View
  if (currentView === "safety") {
    return (
      <div className="min-h-screen">
        <SafetyPage onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Hotels Page View
  if (currentView === "hotels") {
    return (
      <div className="min-h-screen">
        <HotelsPage onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Cars & Bikes Page View
  if (currentView === "cars" || currentView === "bikes") {
    return (
      <div className="min-h-screen">
        <CarsAndBikesPage onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Cafes & Restaurants Page View
  if (currentView === "cafes") {
    return (
      <div className="min-h-screen">
        <CafesAndRestaurantsPage onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Food & Culture Page View
  if (currentView === "food") {
    return (
      <div className="min-h-screen">
        <FoodAndCulturePage onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Attractions Page View (API integration here)
  if (currentView === "attractions") {
    return (
      <div className="min-h-screen">
        <AttractionsPage onBack={() => setCurrentView("home")} />

        {/* --- Fetched Attractions List --- */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Fetched Attractions</h2>
          {attractionsLoading && <div>Loading...</div>}
          {attractionsError && <div className="text-red-500">Error: {attractionsError}</div>}
          <ul className="list-disc pl-6">
            {attractions.map((item: any) => (
              <li key={item.id || item._id}>{item.name}</li>
            ))}
          </ul>
        </div>
        {/* --- End Fetched Attractions List --- */}

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Support Page View
  if (currentView === "support") {
    return (
      <div className="min-h-screen">
        <SupportPage onBack={() => setCurrentView("home")} />

        {/* AI Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />

        {/* Floating AI Assistant Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAIAssistantOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl border-2 border-blue-400 animate-pulse hover:animate-none transition-all duration-300"
          >
            <Bot className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      </div>
    );
  }

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
    setCurrentView("city");
  };

  const handleViewAllCities = () => {
    setCurrentView("interactive-map");
  };

  const handleServiceCitySelect = (
    service: string,
    city: string,
  ) => {
    setSelectedService(service);
    setSelectedCity(city);
    setCurrentView("service-city-details");
  };

  return (
    <MobilePullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen relative bg-gray-50">
        <div className="absolute right-4 top-4 z-[60] rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Frontend is working
        </div>
        {/* Hero Banner Section - Moved before navigation for home page */}
        <MobileHero
          onDiscoverPlaces={() =>
            document
              .getElementById("featured-cities")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onBookJourney={() => setCurrentView("interactive-map")}
          onQuickSearch={(query) => {
            console.log("Search query:", query);
          }}
          onServiceClick={(service) => {
            if (service === "hotels") {
              setCurrentView("hotels");
            } else if (service === "cars") {
              setCurrentView("cars");
            } else if (service === "food") {
              setCurrentView("cafes");
            } else if (service === "places") {
              setCurrentView("attractions");
            }
          }}
          onLocationClick={() => setCurrentView("interactive-map")}
        />

        {/* Mobile Navigation - Positioned absolutely for home page */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <MobileNavigation
            currentView={currentView}
            onViewChange={setCurrentView}
            onProfileClick={() => setCurrentView("profile")}
            onServiceCitySelect={handleServiceCitySelect}
            notificationCount={3}
          />
        </div>

        {/* Featured Cities Section */}
        <div id="featured-cities">
          <MobileFeaturedCities
            onCityClick={handleCityClick}
            onViewAllCities={handleViewAllCities}
          />
        </div>

        {/* Premium Interactive Map Section */}
        <PremiumMapSection />

        {/* Mobile-Optimized Quick Services */}
        <div className="px-6 py-8 bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-georgia">
              Book in <span className="text-amber-600">One Tap</span>
            </h2>
            <p className="text-gray-600 font-poppins">
              Everything you need for your Rajasthan adventure
            </p>
          </div>

          {/* Primary Services - Flexible Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("hotels")}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white cursor-pointer flex flex-col items-center text-center min-h-fit"
            >
              <div className="text-2xl mb-1">🏨</div>
              <h3 className="font-semibold text-base mb-1">Hotels</h3>
              <p className="text-xs opacity-90 leading-tight">Palace stays & budget rooms</p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("cars")}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white cursor-pointer flex flex-col items-center text-center min-h-fit"
            >
              <div className="text-2xl mb-1">🚗</div>
              <h3 className="font-semibold text-base mb-1">Cars & Bikes</h3>
              <p className="text-xs opacity-90 leading-tight">Self-drive & chauffeur</p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("cafes")}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white cursor-pointer flex flex-col items-center text-center min-h-fit"
            >
              <div className="text-2xl mb-1">🍽️</div>
              <h3 className="font-semibold text-base mb-1">Dining</h3>
              <p className="text-xs opacity-90 leading-tight">Cafes & restaurants</p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("attractions")}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white cursor-pointer flex flex-col items-center text-center min-h-fit"
            >
              <div className="text-2xl mb-1">🏰</div>
              <h3 className="font-semibold text-base mb-1">Places</h3>
              <p className="text-xs opacity-90 leading-tight">Forts & attractions</p>
            </motion.div>
          </div>

          {/* Secondary Services - Content-Fit Horizontal Scroll */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">More Services</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView("food")}
                className="flex-shrink-0 bg-gradient-to-br from-red-400 to-red-500 rounded-lg px-4 py-3 text-white cursor-pointer flex flex-col items-center text-center w-fit"
              >
                <div className="text-xl mb-1">🍛</div>
                <h4 className="font-semibold text-sm whitespace-nowrap">Food Culture</h4>
                <p className="text-xs opacity-90 whitespace-nowrap">Local cuisine</p>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Shopping guide coming soon!")}
                className="flex-shrink-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg px-4 py-3 text-white cursor-pointer flex flex-col items-center text-center w-fit"
              >
                <div className="text-xl mb-1">🛍️</div>
                <h4 className="font-semibold text-sm whitespace-nowrap">Shopping</h4>
                <p className="text-xs opacity-90 whitespace-nowrap">Markets & crafts</p>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Guides & Tours coming soon!")}
                className="flex-shrink-0 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg px-4 py-3 text-white cursor-pointer flex flex-col items-center text-center w-fit"
              >
                <div className="text-xl mb-1">👨‍🏫</div>
                <h4 className="font-semibold text-sm whitespace-nowrap">Guides</h4>
                <p className="text-xs opacity-90 whitespace-nowrap">Local experts</p>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView("safety")}
                className="flex-shrink-0 bg-gradient-to-br from-red-500 to-red-600 rounded-lg px-4 py-3 text-white cursor-pointer flex flex-col items-center text-center w-fit"
              >
                <div className="text-xl mb-1">🛡️</div>
                <h4 className="font-semibold text-sm whitespace-nowrap">Safety</h4>
                <p className="text-xs opacity-90 whitespace-nowrap">SOS & support</p>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView("support")}
                className="flex-shrink-0 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg px-4 py-3 text-white cursor-pointer flex flex-col items-center text-center w-fit"
              >
                <div className="text-xl mb-1">📞</div>
                <h4 className="font-semibold text-sm whitespace-nowrap">Support</h4>
                <p className="text-xs opacity-90 whitespace-nowrap">24/7 help</p>
              </motion.div>
            </div>
          </div>

          {/* Featured Action Button */}
          <Button
            onClick={() => setCurrentView("interactive-map")}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-semibold mb-4 flex items-center justify-center gap-2"
          >
            <span className="text-lg">🗺️</span>
            <span>Explore Interactive Map</span>
          </Button>

          {/* Quick Access Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => setIsAIAssistantOpen(true)}
              variant="outline"
              className="flex-1 min-w-fit py-2.5 px-3 border-2 border-blue-200 hover:bg-blue-50 text-blue-700 flex items-center justify-center gap-2"
            >
              <span className="text-base">🤖</span>
              <span className="text-sm font-medium">AI Travel Buddy</span>
            </Button>
            <Button
              onClick={() => setCurrentView("safety")}
              variant="outline"
              className="flex-1 min-w-fit py-2.5 px-3 border-2 border-red-200 hover:bg-red-50 text-red-700 flex items-center justify-center gap-2"
            >
              <span className="text-base">🚨</span>
              <span className="text-sm font-medium">Emergency SOS</span>
            </Button>
          </div>
        </div>

        {/* Mobile Floating Actions */}
        <MobileFloatingActions
          onBookJourney={() =>  setCurrentView("interactive-map")}
          onAIAssistantOpen={() => setIsAIAssistantOpen(true)}
          onSafetyOpen={() => setCurrentView("safety")}
          onSupportOpen={() => setCurrentView("support")}
          onEmergencyCall={() => {
            window.open("tel:+911234567890");
          }}
          isAIAssistantOpen={isAIAssistantOpen}
        />

        {/* AI Travel Assistant Popup */}
        <AITravelAssistant
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
        />
      </div>
    </MobilePullToRefresh>
  );
}