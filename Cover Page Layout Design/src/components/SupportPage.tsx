import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Headphones, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Book,
  CreditCard,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
  Globe,
  ArrowLeft
} from "lucide-react";
import { AISpeaker } from "./AISpeaker";

const supportCategories = [
  { id: "booking", name: "Booking Help", icon: Book, color: "from-blue-500 to-cyan-500" },
  { id: "payment", name: "Payment Issues", icon: CreditCard, color: "from-green-500 to-emerald-500" },
  { id: "travel", name: "Travel Support", icon: MapPin, color: "from-purple-500 to-pink-500" },
  { id: "emergency", name: "Emergency Help", icon: Shield, color: "from-red-500 to-orange-500" },
  { id: "feedback", name: "Feedback", icon: Star, color: "from-yellow-500 to-amber-500" },
  { id: "account", name: "Account Help", icon: Users, color: "from-indigo-500 to-blue-500" }
];

const quickHelp = [
  {
    question: "How to cancel my booking?",
    answer: "You can cancel your booking up to 24 hours before check-in from your profile dashboard.",
    category: "booking"
  },
  {
    question: "Is my payment secure?",
    answer: "Yes, we use bank-grade encryption and secure payment gateways for all transactions.",
    category: "payment"
  },
  {
    question: "What if I need help during travel?",
    answer: "Our 24/7 travel support team is available via phone, chat, or emergency SOS button.",
    category: "travel"
  },
  {
    question: "How do I get a refund?",
    answer: "Refunds are processed according to our cancellation policy, typically within 5-7 business days.",
    category: "booking"
  }
];

const Review = [
  {
    name: "krit jain",
    speciality: "Rajasthan Tours",
    // languages: ["English", "Hindi", "Rajasthani"],
    // rating: 4.9,
    userReview: "⭐⭐⭐⭐ A fantastic way to see Rajasthan!I used Explore Rajasthan to everything for my recent trip—hotels, cars, and even a few tours. The website was incredibly easy to use and all the options were well-organized. It made planning my vacation so much simpler. I'll definitely be using it again",
    image: "../images/krit.jpg"
  },
  {
    name: "Denim purbia",
    // role: "Booking Expert",
    speciality: "Hotels & Transport",
    // languages: ["English", "Hindi", "German"],
    // rating: 4.8,
    userReview: "⭐⭐⭐⭐⭐ Flawless Car Rental ServiceBooking a car through the site was a breeze. We needed a reliable ride for our family, and the vehicle we got was clean and comfortable. The whole process was handled professionally and on time. Highly recommend!",
    image: "../images/denim.jpg"
  },
  {
    name: "trishta prajapat",
    // role: "Emergency Coordinator",
    speciality: "Safety & Emergency",
    // languages: ["English", "Hindi", "French"],
    // rating: 4.9,
    userReview: "⭐⭐⭐⭐⭐ A fantastic way to see Rajasthan!I used Explore Rajasthan to everything for my recent trip—hotels, cars, and even a few tours. The website was incredibly easy to use and all the options were well-organized. It made planning my vacation so much simpler. I'll definitely be using it again",
    image: "../images/trishta.jpg"
  }
];

interface SupportPageProps {
  onBack?: () => void;
}

export function SupportPage({ onBack }: SupportPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("booking");
  const [selectedTab, setSelectedTab] = useState("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "booking"
  });

  const handleSubmitTicket = () => {
    if (supportForm.name && supportForm.email && supportForm.message) {
      alert(`Support ticket submitted successfully! We'll get back to you within 2 hours.`);
      setSupportForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "booking"
      });
    }
  };

  const handleStartChat = () => {
    alert("Live chat starting... You'll be connected to our support team shortly!");
  };

  const filteredHelp = searchQuery 
    ? quickHelp.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickHelp.filter(item => selectedCategory === "all" || item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* AI Speaker for Support */}
      <AISpeaker message="Need help? I'm here 24/7! Ask me about bookings, payments, travel tips, or any issues. Human support is also just a click away!" />

      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 py-4">
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

      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl mb-4"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}
            >
              <Headphones className="inline-block w-16 h-16 mr-4 text-blue-400" />
              24/7 Support
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              We're here to help - Real humans + AI assistance for every traveler
            </motion.p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm opacity-90">Instant help available</p>
              <Button 
                variant="outline" 
                className="mt-4 bg-white text-blue-600 hover:bg-blue-50"
                onClick={handleStartChat}
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Phone className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Support</h3>
              <p className="text-sm opacity-90">+91-1800-RAJASTHAN</p>
              <Button variant="outline" className="mt-4 bg-white text-green-600 hover:bg-green-50">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Emergency SOS</h3>
              <p className="text-sm opacity-90">24/7 emergency help</p>
              <Button variant="outline" className="mt-4 bg-white text-purple-600 hover:bg-purple-50">
                SOS Help
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm opacity-90">help@rajasthan.com</p>
              <Button variant="outline" className="mt-4 bg-white text-orange-600 hover:bg-orange-50">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="help">Quick Help</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="team">Reviewers</TabsTrigger>
            <TabsTrigger value="status">Service Status</TabsTrigger>
          </TabsList>

          {/* Quick Help */}
          <TabsContent value="help">
            {/* Support Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                What can we help you with?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedCategory === "all" ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium text-sm">All Topics</h3>
                  </CardContent>
                </Card>
                {supportCategories.map((category) => (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-medium text-sm">{category.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search Help */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search help topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* FAQ Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHelp.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{item.question}</h3>
                          <p className="text-gray-600 text-sm">{item.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Contact Form */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Create Support Ticket</h3>
                  <p className="text-gray-600">We'll get back to you within 2 hours</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name *</label>
                      <Input
                        value={supportForm.name}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <Input
                        type="email"
                        value={supportForm.email}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                      value={supportForm.phone}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={supportForm.category}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      {supportCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Input
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Message *</label>
                    <Textarea
                      value={supportForm.message}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your issue in detail..."
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmitTicket}
                  >
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Response Times</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Live Chat</span>
                        <Badge className="bg-green-600">Instant</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone Support</span>
                        <Badge className="bg-blue-600">Immediate</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Email/Ticket</span>
                        <Badge className="bg-orange-600">2 hours</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency SOS</span>
                        <Badge className="bg-red-600">Instant</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Support Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Live Chat & Phone</span>
                        <span>24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Support</span>
                        <span>24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency SOS</span>
                        <span>24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Media</span>
                        <span>9 AM - 9 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Support Team */}
          <TabsContent value="team">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Feedback that helps us get better
              </h2>
              <p className="text-gray-600 mb-6">Real stories from our happy customers</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Review.map((member, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold mb-1">{member.name}</h3>
                      {/* <p className="text-sm text-gray-600 mb-2">{member.role}</p> */}
                      <Badge className="mb-3">{member.speciality}</Badge>
                      
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {/* <span className="text-sm">{member.rating}</span> */}
                        <span className="text-xs text-black-500">{member.userReview}</span>
                      </div>
                      
                      {/* <div className="text-sm">
                        <p className="text-gray-600 mb-2">Languages:</p>
                        <div className="flex flex-wrap gap-1 justify-center"> */}
                          {/* {member.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))} */}
                        {/* </div>
                      </div> */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Service Status */}
          <TabsContent value="status">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">System Status</h3>
                  <p className="text-gray-600">All systems operational</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: "Booking System", status: "operational", uptime: "99.9%" },
                      { service: "Payment Gateway", status: "operational", uptime: "99.8%" },
                      { service: "Maps & Navigation", status: "operational", uptime: "99.9%" },
                      { service: "Live Chat", status: "operational", uptime: "100%" },
                      { service: "AI Assistant", status: "operational", uptime: "99.7%" },
                      { service: "Emergency SOS", status: "operational", uptime: "100%" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium">{item.service}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{item.uptime} uptime</span>
                          <Badge className="bg-green-600">Operational</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Recent Updates</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Enhanced AI Assistant</p>
                        <p className="text-gray-600">Improved response accuracy and multilingual support</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Payment Security Update</p>
                        <p className="text-gray-600">Added additional encryption for payment processing</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}