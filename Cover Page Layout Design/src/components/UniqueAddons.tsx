import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Package, 
  Calendar, 
  MapPin, 
  Coins, 
  ArrowRight, 
  Sparkles,
  Gift,
  Users,
  Camera,
  Heart,
  UtensilsCrossed
} from "lucide-react";

export function UniqueAddons() {
  const cityPacks = [
    {
      city: "Jaipur",
      duration: "2 Days",
      price: "₹7,999",
      originalPrice: "₹12,000",
      includes: ["Heritage hotel stay", "Private car & driver", "Fort entrance tickets", "Traditional dinner show"],
      image: "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU3NTE3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      popular: true
    },
    {
      city: "Udaipur",
      duration: "3 Days",
      price: "₹12,999",
      originalPrice: "₹18,000",
      includes: ["Lake palace view hotel", "Boat rides included", "Sunset point visits", "Rooftop dining experience"],
      image: "https://images.unsplash.com/photo-1598762838642-cc15c1382f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwaG90ZWwlMjByYWphc3RoYW58ZW58MXx8fHwxNzU3NTE3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      city: "Jaisalmer",
      duration: "2 Days",
      price: "₹9,999",
      originalPrice: "₹14,500",
      includes: ["Desert camp stay", "Camel safari included", "Cultural evening program", "Golden fort guided tour"],
      image: "https://images.unsplash.com/photo-1645093603488-9d5a1050733a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGUlMjBzdW5uZXR8ZW58MXx8fHwxNzU3NTE3ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const liveEvents = [
    {
      name: "Pushkar Camel Fair",
      date: "Nov 25-30, 2024",
      location: "Pushkar",
      status: "Live Now",
      description: "World's largest camel trading fair",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Jaipur Literature Festival",
      date: "Jan 18-22, 2025",
      location: "Jaipur",
      status: "Upcoming",
      description: "Asia's largest literary festival",
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Teej Festival",
      date: "Aug 15-20, 2024",
      location: "Jaipur",
      status: "Past Event",
      description: "Monsoon celebration for women",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Desert Festival",
      date: "Feb 10-13, 2025",
      location: "Jaisalmer",
      status: "Upcoming",
      description: "Cultural extravaganza in the desert",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const hiddenGems = [
    {
      title: "Secret Stepwell in Jaipur",
      location: "Hidden near Amber Fort",
      difficulty: "Easy to find",
      visitors: "12 people visited this week",
      image: "https://images.unsplash.com/photo-1718528565888-18e2d9239b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU3NTE3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Hidden Lake near Udaipur",
      location: "15km from city center",
      difficulty: "Moderate trek",
      visitors: "8 people visited this week",
      image: "https://images.unsplash.com/photo-1730741366303-1252444c6af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNoa2FyJTIwbGFrZSUyMHJhamFzdGhhbiUyMHRlbXBsZXxlbnwxfHx8fDE3NTc1MTkyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* One-Click City Pack Booking */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Package className="w-10 h-10 text-amber-600" />
              One-Click City Pack Booking
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Save time and money with our all-inclusive city packages. 
              Hotel + Transportation + Activities + Food - everything included!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cityPacks.map((pack, index) => (
              <motion.div
                key={pack.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={pack.image}
                        alt={pack.city}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {pack.popular && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        Most Popular
                      </Badge>
                    )}
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{pack.city}</h3>
                      <p className="text-white/90">{pack.duration} Complete Package</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-black text-gray-900">{pack.price}</span>
                        <span className="text-lg text-gray-400 line-through ml-2">{pack.originalPrice}</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Save 30%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {pack.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                      Book Complete Package
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Festival & Events Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-10 h-10 text-purple-600" />
              Live Festivals & Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Book passes and join guided tours for Rajasthan's most colorful festivals and cultural events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveEvents.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        className={`bg-gradient-to-r ${event.color} text-white`}
                      >
                        {event.status}
                      </Badge>
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50"
                    >
                      {event.status === 'Live Now' ? 'Book Passes' : 'Get Notified'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hidden Gems Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Camera className="w-10 h-10 text-green-600" />
              Trending Hidden Gems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover secret spots that only locals know about, verified by our community of travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hiddenGems.map((gem, index) => (
              <motion.div
                key={gem.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={gem.image}
                        alt={gem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Hidden Gem
                        </Badge>
                        <Heart className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{gem.title}</h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {gem.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {gem.visitors}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-600">{gem.difficulty}</span>
                        <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700">
                          Get Directions <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travel Rewards Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Coins className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                      Travel Rewards Program
                    </h3>
                    <p className="text-purple-100 text-lg">
                      Earn coins with every booking & unlock free rides, meals, and exclusive experiences!
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">500</div>
                    <div className="text-sm text-purple-200">Hotel Booking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">200</div>
                    <div className="text-sm text-purple-200">Cab Ride</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">100</div>
                    <div className="text-sm text-purple-200">Table Booking</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white px-3 py-1">
                  <Gift className="w-4 h-4 mr-1" />
                  Free camel ride = 1000 coins
                </Badge>
                <Badge className="bg-white/20 text-white px-3 py-1">
                  <UtensilsCrossed className="w-4 h-4 mr-1" />
                  Free meal = 800 coins
                </Badge>
                <Badge className="bg-white/20 text-white px-3 py-1">
                  <Camera className="w-4 h-4 mr-1" />
                  Photo tour = 1200 coins
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}