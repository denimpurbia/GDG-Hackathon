import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Hotel, 
  Car, 
  Bike, 
  Coffee, 
  UserCheck, 
  Package,
  Sparkles,
  Shield,
  Users,
  Leaf
} from "lucide-react";

interface QuickBookingProps {
  onServiceClick: (service: string) => void;
}

export function QuickBooking({ onServiceClick }: QuickBookingProps) {
  const quickServices = [
    {
      icon: Hotel,
      label: "Hotels",
      description: "Palace stays to budget rooms",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      icon: Car,
      label: "Cabs",
      description: "Private cars with drivers",
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      icon: Bike,
      label: "Bikes",
      description: "Royal Enfield to scooters",
      color: "from-orange-600 to-orange-700",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
    {
      icon: Coffee,
      label: "Cafes",
      description: "Reserve tables instantly",
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      icon: UserCheck,
      label: "Guides",
      description: "Local heritage experts",
      color: "from-amber-600 to-amber-700",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700"
    }
  ];

  const advancedFeatures = [
    {
      icon: Package,
      title: "City Pack Booking",
      description: "All-in-one bundles: hotel + cab + attractions + food",
      example: "Udaipur City Pack ₹5,999",
      badge: "Save 30%",
      color: "from-indigo-600 to-purple-600"
    },
    {
      icon: Sparkles,
      title: "Festival Integration",
      description: "Live updates: Pushkar Fair, Teej Festival, Literature Fest",
      example: "Book Pushkar Fair passes",
      badge: "Live Now",
      color: "from-pink-600 to-rose-600"
    },
    {
      icon: Shield,
      title: "Smart Safety Kit",
      description: "SOS button + AI safety tips + health support",
      example: "24/7 emergency assistance",
      badge: "Free",
      color: "from-red-600 to-red-700"
    },
    {
      icon: Users,
      title: "Social Travel Connect",
      description: "Meet other travelers visiting the same city",
      example: "5 people visiting Jaisalmer",
      badge: "Join Group",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Score",
      description: "Green hotels, EV cabs, sustainable travel options",
      example: "Eco Score: 8.5/10",
      badge: "Green",
      color: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Quick Booking Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Quick Booking Services
          </h2>
          <p className="text-xl text-gray-600">
            Book everything you need in just one click
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {quickServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => onServiceClick(service.label.toLowerCase())}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${service.textColor}`} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{service.label}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Advanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Advanced Travel Features
          </h2>
          <p className="text-lg text-gray-600">
            Revolutionary features that no other platform offers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full cursor-pointer transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-medium rounded-full">
                        {feature.badge}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-800">
                        Example: {feature.example}
                      </p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:text-white transition-all duration-300"
                    >
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Gamified Rewards Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                🎮 Gamified Travel Rewards
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Every booking earns travel coins! Unlock discounts, free experiences, 
                and exclusive perks. No other platform gamifies travel like we do.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  🏨 Hotel booking = 100 coins
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  🐪 Free camel ride = 500 coins
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  🍽️ Free café meal = 300 coins
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}