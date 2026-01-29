import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { PremiumImage } from "./PremiumImage";
import { 
  Search, 
  Hotel, 
  Car, 
  UtensilsCrossed, 
  MapPin, 
  MessageCircle,
  Sparkles
} from "lucide-react";

interface HeroBannerProps {
  onProfileClick: () => void;
  onServiceClick: (service: string) => void;
}

export function HeroBanner({ onProfileClick, onServiceClick }: HeroBannerProps) {
  const quickActions = [
    {
      icon: Search,
      label: "Search",
      sublabel: "City / Hotel / Attraction",
      color: "from-blue-600 to-blue-700",
      action: () => alert("Search coming soon!")
    },
    {
      icon: Hotel,
      label: "Book Hotel",
      sublabel: "Palace to Budget Stays",
      color: "from-green-600 to-green-700",
      action: () => onServiceClick("hotels")
    },
    {
      icon: Car,
      label: "Book Ride",
      sublabel: "Cabs, Cars & Bikes",
      color: "from-purple-600 to-purple-700",
      action: () => onServiceClick("cars")
    },
    {
      icon: UtensilsCrossed,
      label: "Reserve Table",
      sublabel: "Cafes & Restaurants",
      color: "from-orange-600 to-orange-700",
      action: () => onServiceClick("cafes")
    },
    {
      icon: MapPin,
      label: "Explore Cities",
      sublabel: "Jaipur, Udaipur & More",
      color: "from-amber-600 to-amber-700",
      action: () => document.getElementById('featured-cities')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Premium Image */}
      <div className="absolute inset-0 z-0">
        <PremiumImage
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=85"
          alt="Rajasthan Desert Landscape"
          containerClassName="w-full h-full"
          aspectRatio="auto"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 pt-32">
        <div className="text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Explore Rajasthan –{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Where Royalty Meets Adventure
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            Book hotels, rides, food, activities & more. Plan your trip with our AI-powered travel buddy.
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className="group cursor-pointer h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
                      onClick={action.action}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-white text-sm mb-1">{action.label}</h3>
                        <p className="text-white/70 text-xs">{action.sublabel}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* AI Speaker Popup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-white/80 font-medium">AI Travel Assistant</p>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-white text-lg leading-relaxed">
                      "Hello traveler 👋 Which city are you exploring today? Jaipur, Udaipur, Jodhpur, or Jaisalmer?"
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"].map((city) => (
                        <button
                          key={city}
                          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-colors"
                          onClick={() => alert(`Exploring ${city}!`)}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => document.getElementById('ai-planner')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="text-lg px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Plan with AI
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onProfileClick}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 rounded-xl border-2 border-white/60 text-white hover:bg-white/20 font-medium shadow-2xl hover:shadow-white/25 transition-all duration-300 backdrop-blur-sm hover:border-white"
              >
                Create Account
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}