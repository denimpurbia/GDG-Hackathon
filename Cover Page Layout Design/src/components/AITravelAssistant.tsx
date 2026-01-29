import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion, AnimatePresence } from "motion/react";
import { API_BASE_URL, getApiUrl } from "../config/api";
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Hotel, 
  Car, 
  Utensils, 
  Castle, 
  Shield, 
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Star,
  Languages,
  Volume2,
  VolumeX,
  Settings,
  User,
  Zap,
  Brain,
  Globe,
  Headphones,
  Navigation,
  BookOpen,
  Wallet,
  Heart,
  Phone,
  ChevronRight,
  Sparkles,
  Bot,
  ArrowLeft
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
  bookingOptions?: any[];
}

interface AITravelAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}



const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'raj', name: 'राजस्थानी (Rajasthani)', flag: '🏴' }
];

const quickActions = [
  { id: 'hotels', name: 'Hotels', icon: Hotel, color: 'bg-blue-500', description: 'Find & Book Rooms' },
  { id: 'rides', name: 'Rides', icon: Car, color: 'bg-green-500', description: 'Cars, Bikes, Scooters' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-red-500', description: 'Cafés, Restaurants' },
  { id: 'attractions', name: 'Attractions', icon: Castle, color: 'bg-purple-500', description: 'Tours & Entry Info' },
  { id: 'safety', name: 'Safety', icon: Shield, color: 'bg-orange-500', description: 'SOS & Emergency Help' },
  { id: 'payments', name: 'Payments', icon: CreditCard, color: 'bg-indigo-500', description: 'Secure Booking' }
];

const sampleQueries = [
  "Udaipur",
  "Jaipur city",
  "Jodhpur",
  "Forts",
  "Jaisalmer",
  "Pushkar?"
];

export function AITravelAssistant({ isOpen, onClose }: AITravelAssistantProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [languageConfirmed, setLanguageConfirmed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTab, setCurrentTab] = useState('chat');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const confirmLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setLanguageConfirmed(true);
    
    const selectedLang = languages.find(lang => lang.code === langCode);
    const welcomeMessages = {
      'en': "Hello! I'm Jarvis, your personal travel assistant. I'm here to help you explore Rajasthan. What can I do for you today?",
      'hi': "नमस्ते! मैं जार्विस हूं, आपका व्यक्तिगत यात्रा सहायक। मैं आपको राजस्थान की खोज में मदद करने के लिए यहां हूं। आज मैं आपके लिए क्या कर सकता हूं?",
      'raj': "खम्मा घणी! म्हैं जार्विस हूं, थारो निजी यात्रा सहायक। म्हैं थानै राजस्थान री सैर करावण में मदद करूंगो। आज म्हैं थारै कैं कर सकूं?"
    };

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: welcomeMessages[langCode as keyof typeof welcomeMessages],
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        langCode === 'en' ? "Plan my trip" : langCode === 'hi' ? "मेरी यात्रा की योजना बनाएं" : "मारी यात्रा रो नक्शो बणाओ",
        langCode === 'en' ? "Book hotel" : langCode === 'hi' ? "होटल बुक करें" : "होटल बुक करो",
        langCode === 'en' ? "Find attractions" : langCode === 'hi' ? "आकर्षण खोजें" : "दर्शनीय स्थान खोजो",
        langCode === 'en' ? "Safety help" : langCode === 'hi' ? "सुरक्षा सहायता" : "सुरक्षा री मदद"
      ]
    };

    setMessages([welcomeMessage]);
    
    // Text-to-speech for welcome message
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(welcomeMessage.text);
      utterance.lang = langCode === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };


  const handleSendMessage = async (text: string) => {
  if (!text.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text,
    sender: 'user',
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsTyping(true);

  try {
    // First, check if backend is reachable via health check
    const healthUrl = getApiUrl('api/health');
    console.log("🏥 Checking backend health:", healthUrl);
    
    try {
      const healthResponse = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      
      if (!healthResponse.ok) {
        throw new Error(`Health check failed: ${healthResponse.status}`);
      }
      console.log("✅ Backend is reachable");
    } catch (healthError: any) {
      console.error("❌ Backend health check failed:", healthError);
      throw new Error(`Backend server is not reachable. Please make sure it's running on http://localhost:3001. Error: ${healthError.message}`);
    }

    // Use helper function to get correct API URL (handles Vite proxy)
    const apiUrl = getApiUrl('api/ai');
    console.log("🤖 Calling Jarvis API:", apiUrl, "with prompt:", text);
    console.log("📡 Full request:", {
      url: apiUrl,
      method: 'POST',
      body: { prompt: text }
    });
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ prompt: text }),
      signal: AbortSignal.timeout(30000) // 30 second timeout for AI response
    });

    console.log("📡 Jarvis API response status:", response.status, response.statusText);

    if (!response.ok) {
      let errorText = '';
      try {
        errorText = await response.text();
        console.error("❌ Jarvis API error response:", response.status, errorText);
      } catch (e) {
        errorText = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Jarvis API success:", data);
    
    const aiResponse: Message = {
      id: Date.now().toString(),
      text: data.response || data.message || "I'm here to help!",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: data.suggestions || [],
      bookingOptions: data.bookingOptions || []
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);

    // Optional: Text-to-speech for AI response
    if (isSpeaking && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(aiResponse.text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  } catch (error: any) {
    console.error("❌ Failed to fetch AI response:", error);
    console.error("❌ Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    setIsTyping(false);
    
    // Determine user-friendly error message
    let errorMsg = "Sorry, I'm having trouble connecting right now.";
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      errorMsg = "Request timed out. The server might be slow or unreachable. Please try again.";
    } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError') || error.message?.includes('not reachable')) {
      errorMsg = "Cannot connect to the server. Please:\n1. Make sure the backend is running (npm run start from project root)\n2. Check that it's on http://localhost:3001\n3. Check the backend terminal for errors";
    } else if (error.message?.includes('API error')) {
      errorMsg = error.message;
    } else if (error.message) {
      errorMsg = error.message;
    }
    
    // Show error message to user
    const errorMessage: Message = {
      id: Date.now().toString(),
      text: errorMsg,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: ["Try again", "Check backend server", "Refresh page"],
      bookingOptions: []
    };
    setMessages(prev => [...prev, errorMessage]);
  }
};
  // const handleSendMessage = async (text: string) => {
  //   if (!text.trim()) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     text,
  //     sender: 'user',
  //     timestamp: new Date()
  //   };

  //   setMessages(prev => [...prev, userMessage]);
  //   setInputValue('');
  //   setIsTyping(true);

  //   // Simulate AI processing delay
  //   setTimeout(() => {
  //     const aiResponse = generateAIResponse(text);
  //     setMessages(prev => [...prev, aiResponse]);
  //     setIsTyping(false);
      
  //     // Text-to-speech for AI response
  //     if (isSpeaking && 'speechSynthesis' in window) {
  //       const utterance = new SpeechSynthesisUtterance(aiResponse.text);
  //       utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
  //       speechSynthesis.speak(utterance);
  //     }
  //   }, 1500);
  // };

  
   const generateAIResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
  let response = '';
    let suggestions: string[] = [];
    let bookingOptions: any[] = [];

    // Language-specific responses
    const responses = {
      'en': {
        hotel: "I found some great hotels for you! Here are the top options in Udaipur:",
        itinerary: "Perfect! I suggest:\n\nDay 1: Amber Fort → Hawa Mahal → City Palace → Rooftop Dinner at Tattoo Café\nDay 2: Nahargarh Fort Sunrise → Johri Bazaar Shopping → Chokhi Dhani Village Experience\n\nShall I book hotels & cab package for you?",
        weather: "The weather in Rajasthan is currently pleasant with temperatures around 25°C. Perfect for sightseeing!",
        safety: "I've activated your safety features. Your live location is being shared with your emergency contacts. Stay safe!",
        default: "I'm here to help you with anything related to your Rajasthan trip! Ask me about hotels, attractions, food, or safety."
      },
      'hi': {
        hotel: "मैंने आपके लिए कुछ बेहतरीन होटल ढूंढे हैं! यहाँ उदयपुर के शीर्ष विकल्प हैं:",
        itinerary: "बहुत बढ़िया! मैं सुझाता हूं:\n\nदिन 1: अंबर किला → हवा महल → सिटी पैलेस → टैटू कैफे में रूफटॉप डिनर\nदिन 2: नाहरगढ़ किला सूर्योदय → जौहरी बाजार शॉपिंग → चोखी धानी गांव अनुभव\n\nक्या मैं होटल और कैब पैकेज बुक कर दूं?",
        weather: "राजस्थान में मौसम वर्तमान में सुहावना है, तापमान लगभग 25°C है। दर्शनीय स्थलों की यात्रा के लिए एकदम सही!",
        safety: "मैंने आपकी सुरक्षा सुविधाएं सक्रिय कर दी हैं। आपका लाइव स्थान आपके आपातकालीन संपर्कों के साथ साझा किया जा रहा है।",
        default: "मैं आपकी राजस्थान यात्रा से संबंधित किसी भी चीज़ में आपकी मदद करने के लिए यहाँ हूँ! मुझसे होटल, आकर्षण, भोजन या सुरक्षा के बारे में पूछें।"
      },
      'raj': {
        hotel: "म्हैं थारै खातर घणा बढ़िया होटल लाध्या हैं! आ हैं उदयपुर रा सबतै अच्छा विकल्प:",
        itinerary: "राम राम! म्हैं सुझाऊं हूं:\n\nदिन 1: अंबर किलो → हवा महल → सिटी पैलेस → टैटू कैफे में छत पर खाणो\nदिन 2: नाहरगढ़ किलो सूरज उगतै वखत → जौहरी बाजार → चोखी धानी\n\nम्हैं होटल अर गाड़ी रो पैकेज बुक कर दूं?",
        weather: "राजस्थान में इस वखत मौसम घणो सुहावनो है, तापमान 25°C रै आसपास है। घूमण-फिरण खातर एकदम सही!",
        safety: "म्हैं थारी सुरक्षा री सुविधावां चालू कर दी हैं। थारो लाइव ठिकाणो थारै आपातकालीन संपर्कां कै साथै साझो कर्यो जा रह्यो है।",
        default: "म्हैं थारी राजस्थान यात्रा सूं जुड़ी किसी बी बात में थारी मदद करण खातर हूं! मन्नै होटल, दर्शनीय स्थान, खाणो या सुरक्षा रै बारै में बुझो।"
      }
    };

    const currentLangResponses = responses[selectedLanguage as keyof typeof responses] || responses.en;

    if (lowerInput.includes('hotel') || lowerInput.includes('होटल') || lowerInput.includes('धर्मशाला')) {
      response = currentLangResponses.hotel;
      bookingOptions = [
        { name: "Jagat Niwas Palace", price: "₹3,200", rating: 4.5, location: "Lake Pichola" },
        { name: "Lake Palace", price: "₹32,500", rating: 4.9, location: "Lake Pichola" },
        { name: "Fateh Practice", price: "₹8,500", rating: 4.6, location: "Fateh Sagar" }
      ];
    } else if (lowerInput.includes('itinerary') || lowerInput.includes('plan') || lowerInput.includes('योजना') || lowerInput.includes('नक्शो')) {
      response = currentLangResponses.itinerary;
    } else if (lowerInput.includes('weather') || lowerInput.includes('मौसम')) {
      response = currentLangResponses.weather;
    } else if (lowerInput.includes('safety') || lowerInput.includes('help') || lowerInput.includes('सुरक्षा') || lowerInput.includes('मदद')) {
      response = currentLangResponses.safety;
    } else {
      response = currentLangResponses.default;
    }

    // Add language-appropriate suggestions
    if (selectedLanguage === 'hi') {
      suggestions = ["होटल बुक करें", "आकर्षण खोजें", "भोजन ढूंढें", "सुरक्षा सहायता"];
    } else if (selectedLanguage === 'raj') {
      suggestions = ["होटल बुक करो", "दर्शनीय स्थान", "खाणो ढूंढो", "सुरक्षा मदद"];
    } else {
      suggestions = ["Book Hotel", "Find Attractions", "Search Food", "Safety Help"];
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      suggestions,
      bookingOptions
    };
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSendMessage(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleQuickAction = (actionId: string) => {
    const queries = {
      'en': {
        hotels: "Show me hotels in Udaipur",
        rides: "I need a cab for city tour",
        food: "Find restaurants near me",
        attractions: "What are the top attractions in Jaipur?",
        safety: "Activate safety features",
        payments: "Show my booking payments"
      },
      'hi': {
        hotels: "मुझे उदयपुर में होटल दिखाएं",
        rides: "मुझे शहर की यात्रा के लिए कैब चाहिए",
        food: "मेरे पास रेस्टोरेंट खोजें",
        attractions: "जयपुर के शीर्ष आकर्षण क्या हैं?",
        safety: "सुरक्षा सुविधाएं सक्रिय करें",
        payments: "मेरे बुकिंग भुगतान दिखाएं"
      },
      'raj': {
        hotels: "मन्नै उदयपुर में होटल दिखाओ",
        rides: "मन्नै शहर घूमण खातर गाड़ी चाहिए",
        food: "मारै कनै खाणो खोजो",
        attractions: "जयपुर रा मुख्य दर्शनीय स्थान कुण सा हैं?",
        safety: "सुरक्षा सुविधावां चालू करो",
        payments: "मारा बुकिंग भुगतान दिखाओ"
      }
    };

    const currentQueries = queries[selectedLanguage as keyof typeof queries] || queries.en;
    const query = currentQueries[actionId as keyof typeof currentQueries];
    if (query) {
      handleSendMessage(query);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-2 border-blue-400/50 overflow-hidden">
        {/* Accessibility: Hidden title and description for screen readers */}
        <DialogHeader className="sr-only">
          <DialogTitle>Jarvis AI Travel Assistant</DialogTitle>
          <DialogDescription>
            Interactive AI assistant for travel planning, hotel bookings, and Rajasthan tourism information
          </DialogDescription>
        </DialogHeader>
        
        {/* Jarvis-style background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>

        {!languageConfirmed ? (
          /* Language Selection Screen */
          <div className="relative z-10 p-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Jarvis-style AI avatar */}
              <div className="mx-auto w-24 h-24 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse flex items-center justify-center">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border border-cyan-400 animate-ping"></div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">
                  <span className="text-blue-400">JARVIS</span> Travel Assistant
                </h1>
                <p className="text-cyan-200">Your Personal AI Travel Companion</p>
                <p className="text-gray-300 text-sm">Please select your preferred language to continue</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {languages.map((lang) => (
                  <motion.div
                    key={lang.code}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => confirmLanguage(lang.code)}
                      className="w-full h-20 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-400/50 hover:border-blue-400 text-white hover:bg-blue-600/30 transition-all duration-300"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{lang.flag}</div>
                        <div className="font-medium">{lang.name}</div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Main AI Assistant Interface */
          <div className="relative z-10 h-[80vh] flex flex-col">
            {/* Header */}
            <DialogHeader className="border-b border-blue-400/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center animate-pulse">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-blue-400 text-xl">JARVIS</DialogTitle>
                    <DialogDescription className="text-cyan-200 text-sm">Your Personal Travel Companion</DialogDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/50">
                    {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    className="text-cyan-400 hover:text-white hover:bg-blue-600/30"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-cyan-400 hover:text-white hover:bg-red-600/30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 flex">
              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="flex-1 flex flex-col">
                  <TabsList className="grid grid-cols-3 bg-slate-800/50 border-b border-blue-400/30 rounded-none">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-200">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="itinerary" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-200">
                      {/* <Calendar className="w-4 h-4 mr-2" /> */}
                      Itinerary
                    </TabsTrigger>
                    <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-blue-200">
                      {/* <User className="w-4 h-4 mr-2" /> */}
                      Dashboard
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="chat" className="flex-1 flex flex-col m-0 h-0">
                    {/* Messages Area */}
                    <div className="flex-1 flex flex-col m-0 h-0">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md ${
                              message.sender === 'user' 
                                ? 'bg-blue-600/30 border border-blue-400/50' 
                                : 'bg-slate-800/50 border border-cyan-400/50'
                            } rounded-lg p-3 max-h-80 overflow-y-auto`}>
                              <p className="text-white text-sm whitespace-pre-line">{message.text}</p>
                              {message.suggestions && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleSendMessage(suggestion)}
                                      className="text-xs bg-transparent border-blue-400/30 text-blue-200 hover:bg-blue-600/20"
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              )}
                              {message.bookingOptions && (
                                <div className="mt-3 space-y-2">
                                  {message.bookingOptions.map((option, index) => (
                                    <div key={index} className="bg-slate-700/50 rounded p-2 border border-blue-400/30">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <p className="text-blue-200 font-medium text-sm">{option.name}</p>
                                          <p className="text-cyan-300 text-xs">{option.location}</p>
                                          <div className="flex items-center gap-2 mt-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-yellow-300 text-xs">{option.rating}</span>
                                            <span className="text-green-400 text-sm font-medium">{option.price}</span>
                                          </div>
                                        </div>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                          Book Now
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-slate-800/50 border border-cyan-400/50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100ms"></div>
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200ms"></div>
                              </div>
                              <span className="text-cyan-200 text-sm">Jarvis is thinking...</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Sample Queries */}
                    {messages.length <= 1 && (
                      <div className="p-4 border-t border-blue-400/30">
                        <p className="text-cyan-200 text-sm mb-3">Try these sample queries:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {sampleQueries.slice(0, 4).map((query, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              // size="sm"
                              onClick={() => handleSendMessage(query)}
                              className="w-full text-left justify-start bg-transparent border-blue-400/30 text-blue-200 hover:bg-blue-600/20 text-xs"
                            >
                              {query}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t border-blue-400/30">
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                            placeholder={selectedLanguage === 'hi' ? "अपना संदेश टाइप करें..." : selectedLanguage === 'raj' ? "अपणो संदेश लिखो..." : "Type your message..."}
                            className="bg-slate-800/50 border-blue-400/30 text-white placeholder-gray-400 focus:border-blue-400"
                          />
                          {isListening && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={toggleVoiceMode}
                          variant="outline"
                          size="sm"
                          className={`border-blue-400/30 ${isVoiceMode ? 'bg-red-600/30 text-red-300' : 'text-blue-300'} hover:bg-blue-600/20`}
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                        <Button
                          onClick={() => handleSendMessage(inputValue)}
                          disabled={!inputValue.trim()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="itinerary" className="flex-1 p-4 m-0">
                    <div className="space-y-4">
                      <h3 className="text-blue-200 text-lg font-medium">My Travel Itinerary</h3>
                      <div className="space-y-3">
                        {[
                          { day: 1, title: "Arrival in Jaipur", activities: ["Check into Rambagh Palace", "Hawa Mahal visit", "Local market tour"] },
                          { day: 2, title: "Jaipur Exploration", activities: ["Amber Fort", "City Palace", "Jantar Mantar"] },
                          { day: 3, title: "Travel to Udaipur", activities: ["Morning departure", "City Palace Udaipur", "Lake Pichola boat ride"] }
                        ].map((day) => (
                          <Card key={day.day} className="bg-slate-800/50 border border-blue-400/30">
                            <CardHeader className="pb-2">
                              <h4 className="text-cyan-200 font-medium">Day {day.day}: {day.title}</h4>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-1">
                                {day.activities.map((activity, index) => (
                                  <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3 text-blue-400" />
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="dashboard" className="flex-1 p-4 m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-slate-800/50 border border-blue-400/30">
                        <CardHeader>
                          <h4 className="text-blue-200 font-medium flex items-center gap-1">
                            {/* <BookOpen className="w-2 h-2" /> */}
                            Bookings
                          </h4>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="text-gray-300">Hotels: 2 bookings</div>
                            <div className="text-gray-300">Rides: 1 active</div>
                            <div className="text-gray-300">Restaurants: 3 reservations</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border border-blue-400/30">
                        <CardHeader>
                          <h4 className="text-blue-200 font-medium flex items-center gap-2">
                            {/* <Wallet className="w-4 h-4" /> */}
                            Expenses
                          </h4>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="text-gray-300">Total spent: ₹12,450</div>
                            <div className="text-gray-300">Budget remaining: ₹7,550</div>
                            <div className="text-green-400">On track!</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border border-blue-400/30">
                        <CardHeader>
                          <h4 className="text-blue-200 font-medium flex items-center gap-2">
                            <Heart className="w-2 h-2" />
                            Safety Status
                          </h4>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="text-green-400">✓ Live tracking active</div>
                            <div className="text-green-400">✓ Emergency contacts set</div>
                            <div className="text-blue-400"> Safe zone: Jaipur</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border border-blue-400/30">
                        <CardHeader>
                          <h4 className="text-blue-200 font-medium flex items-center gap-2">
                            {/* <Sparkles className="w-4 h-4" /> */}
                            AI Insights
                          </h4>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="text-cyan-300">Best time to visit Mehrangarh: 4 PM</div>
                            <div className="text-yellow-300">Festival nearby: Pushkar Fair</div>
                            <div className="text-blue-300">Weather: Perfect for sightseeing</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="w-64 border-l border-blue-400/30 p-4">
                <h3 className="text-cyan-200 font-medium mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      onClick={() => handleQuickAction(action.id)}
                      variant="outline"
                      className="w-full justify-start bg-transparent border-blue-400/30 text-white hover:bg-blue-600/20"
                    >
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">{action.name}</div>
                        <div className="text-xs text-gray-400">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}