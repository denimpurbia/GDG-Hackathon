import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { motion } from "motion/react";
import { 
  Shield, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  Users, 
  Heart, 
  Hospital, 
  Car, 
  MessageCircle,
  Mic,
  Navigation,
  Clock,
  CheckCircle,
  UserCheck,
  Camera,
  Wifi,
  Lock,
  Bell,
  Share2,
  Eye,
  Star,
  Map,
  Headphones,
  Volume2,
  Settings,
  Info,
  Plus,
  Trash2,
  Edit3,
  ArrowLeft
} from "lucide-react";
import { AISpeaker } from "./AISpeaker";

// Mock data for safety features
const defaultEmergencyServices = [
  { id: 1, name: "Police", number: "100", icon: "🚔", type: "emergency", description: "Law enforcement emergency" },
  { id: 2, name: "Ambulance", number: "108", icon: "🚑", type: "medical", description: "Medical emergency services" },
  { id: 3, name: "Tourist Police", number: "1363", icon: "🏛️", type: "tourist", description: "Tourist assistance & safety" },
  { id: 4, name: "Fire Service", number: "101", icon: "🚒", type: "emergency", description: "Fire & rescue services" },
  { id: 5, name: "Women Helpline", number: "1091", icon: "👩", type: "helpline", description: "Women safety & support" },
  { id: 6, name: "Child Helpline", number: "1098", icon: "👶", type: "helpline", description: "Child safety & welfare" },
  { id: 7, name: "Railway Police", number: "182", icon: "🚂", type: "emergency", description: "Railway security" },
  { id: 8, name: "Road Accident", number: "1073", icon: "🚗", type: "emergency", description: "Road accident emergency" }
];

const safetyTips = {
  "Jaipur": [
    "Avoid crowded areas near Hawa Mahal during peak hours",
    "Use verified auto-rickshaws or pre-booked cabs",
    "Keep copies of important documents",
    "Bargain respectfully at local markets"
  ],
  "Udaipur": [
    "Be cautious near lake areas during monsoon",
    "Book verified boat rides at City Palace",
    "Avoid isolated areas around Fateh Sagar Lake at night",
    "Use official taxi services for hill station trips"
  ],
  "Jodhpur": [
    "Mehrangarh Fort has steep steps - wear proper footwear",
    "Stay hydrated in the desert climate",
    "Use sunscreen and wear light-colored clothing",
    "Avoid street vendors near Clock Tower at night"
  ],
  "Jaisalmer": [
    "Desert safari bookings should be verified",
    "Carry extra water during camel rides",
    "Inform hotel about desert camping plans",
    "Weather can change quickly - pack accordingly"
  ]
};

const verifiedGuides = [
  {
    id: 1,
    name: "Rajesh Kumar",
    city: "Jaipur",
    specialty: "Heritage Tours",
    rating: 4.8,
    verified: true,
    languages: ["English", "Hindi", "German"],
    price: "₹2,500/day"
  },
  {
    id: 2,
    name: "Priya Sharma",
    city: "Udaipur",
    specialty: "Lake Tours",
    rating: 4.9,
    verified: true,
    languages: ["English", "Hindi", "French"],
    price: "₹2,800/day"
  },
  {
    id: 3,
    name: "Mohammed Ali",
    city: "Jaisalmer",
    specialty: "Desert Safari",
    rating: 4.7,
    verified: true,
    languages: ["English", "Hindi", "Arabic"],
    price: "₹3,000/day"
  }
];

interface SafetyPageProps {
  onBack?: () => void;
}

export function SafetyPage({ onBack }: SafetyPageProps) {
  const [selectedCity, setSelectedCity] = useState("Jaipur");
  const [personalEmergencyContacts, setPersonalEmergencyContacts] = useState([
    { id: 1, name: "Mom", number: "+91 98765 43210", relationship: "Mother" },
    { id: 2, name: "Dad", number: "+91 98765 43211", relationship: "Father" },
  ]);
  const [sosActivated, setSosActivated] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [voiceActivated, setVoiceActivated] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showTipsDialog, setShowTipsDialog] = useState(false);
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [newContact, setNewContact] = useState({ name: "", number: "", relationship: "" });
  const [editingContact, setEditingContact] = useState(null);

  const handleSOS = () => {
    setSosActivated(true);
    setShowEmergencyDialog(true);
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('SOS Location:', latitude, longitude);
          
          // Send SOS alerts to all emergency contacts
          personalEmergencyContacts.forEach(contact => {
            const message = `🚨 EMERGENCY ALERT 🚨\n\n${contact.name}, I need help!\n\nLocation: https://maps.google.com/?q=${latitude},${longitude}\n\nTime: ${new Date().toLocaleString()}\n\nPlease respond immediately!`;
            
            // On mobile, this would open SMS app
            const smsLink = `sms:${contact.number}?body=${encodeURIComponent(message)}`;
            console.log('Sending SOS to:', contact.name, contact.number);
            
            // For demonstration, show alert
            setTimeout(() => {
              alert(`SOS alert prepared for ${contact.name}\n\nIn production, this would automatically send SMS and share your live location.`);
            }, 500);
          });
          
          // Auto-reset after 10 seconds
          setTimeout(() => {
            setSosActivated(false);
          }, 10000);
        },
        (error) => {
          console.error('Location error:', error);
          alert('Unable to get your location. SOS will still notify your contacts.');
          setTimeout(() => {
            setSosActivated(false);
          }, 10000);
        }
      );
    } else {
      alert('Geolocation not supported. SOS will still notify your contacts.');
      setTimeout(() => {
        setSosActivated(false);
      }, 10000);
    }
  };

  const handleLocationShare = () => {
    setLocationSharing(!locationSharing);
    
    if (!locationSharing) {
      // Start location sharing
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
            
            // Prepare location share message
            const message = `📍 I'm sharing my live location with you for safety.\n\nCurrent Location: ${locationUrl}\n\nTime: ${new Date().toLocaleString()}\n\nI'll update you when I reach my destination.`;
            
            alert(`Live location sharing started!\n\nYour location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\n\nIn production, this would:\n• Send real-time location to emergency contacts\n• Track your movement\n• Alert contacts if you deviate from route\n• Auto-stop when you reach destination`);
          },
          (error) => {
            console.error('Location error:', error);
            alert('Unable to access location. Please enable location services.');
            setLocationSharing(false);
          }
        );
      } else {
        alert('Geolocation not supported by your device.');
        setLocationSharing(false);
      }
    } else {
      alert("Location sharing stopped.\n\nYour contacts have been notified.");
    }
  };

  const handleVoiceCommand = () => {
    setVoiceActivated(true);
    
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voice command:', transcript);
        
        // Process voice commands
        if (transcript.includes('help') || transcript.includes('emergency') || transcript.includes('sos')) {
          handleSOS();
          alert(`Voice Command Recognized: "${transcript}"\n\n🚨 Emergency SOS activated!`);
        } else if (transcript.includes('police')) {
          handleEmergencyCall('100', 'Police');
        } else if (transcript.includes('ambulance') || transcript.includes('medical')) {
          handleEmergencyCall('108', 'Ambulance');
        } else if (transcript.includes('location') || transcript.includes('share')) {
          handleLocationShare();
        } else {
          alert(`Voice command received: "${transcript}"\n\nTry saying:\n• "Help Me" - Emergency SOS\n• "Call Police" - Dial 100\n• "Call Ambulance" - Dial 108\n• "Share Location" - Share live location`);
        }
        
        setVoiceActivated(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        alert('Voice command error. Please try again.');
        setVoiceActivated(false);
      };
      
      recognition.start();
      
      // Timeout after 5 seconds
      setTimeout(() => {
        recognition.stop();
        setVoiceActivated(false);
      }, 5000);
    } else {
      // Fallback for browsers without speech recognition
      setTimeout(() => {
        setVoiceActivated(false);
        alert("Voice Help Feature:\n\nSay any of these commands:\n• 'Help Me' → Triggers SOS\n• 'Call Police' → Dials 100\n• 'Call Ambulance' → Dials 108\n• 'Share Location' → Shares live GPS\n\n(Speech recognition not supported on this device)");
      }, 1500);
    }
  };

  const handleEmergencyCall = (number: string, service: string) => {
    if (confirm(`Do you want to call ${service}?\n\nThis will dial ${number} immediately.`)) {
      // Initiate actual phone call on mobile
      window.location.href = `tel:${number}`;
    }
  };

  // Emergency Contact Management Functions
  const handleAddContact = () => {
    if (newContact.name && newContact.number) {
      const contact = {
        id: Date.now(),
        name: newContact.name,
        number: newContact.number,
        relationship: newContact.relationship || "Friend"
      };
      setPersonalEmergencyContacts(prev => [...prev, contact]);
      setNewContact({ name: "", number: "", relationship: "" });
      setShowAddContactDialog(false);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContact({ 
      name: contact.name, 
      number: contact.number, 
      relationship: contact.relationship 
    });
    setShowAddContactDialog(true);
  };

  const handleUpdateContact = () => {
    if (editingContact && newContact.name && newContact.number) {
      setPersonalEmergencyContacts(prev => 
        prev.map(contact => 
          contact.id === editingContact.id 
            ? { ...contact, name: newContact.name, number: newContact.number, relationship: newContact.relationship }
            : contact
        )
      );
      setEditingContact(null);
      setNewContact({ name: "", number: "", relationship: "" });
      setShowAddContactDialog(false);
    }
  };

  const handleDeleteContact = (contactId) => {
    setPersonalEmergencyContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleCallPersonalContact = (contact) => {
    if (confirm(`Call ${contact.name} (${contact.relationship})?\n\n${contact.number}`)) {
      window.location.href = `tel:${contact.number}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      {/* AI Speaker for Safety */}
      <AISpeaker message="Don't worry, I am your travel guardian. In case of emergency, just say 'Help Me' and I'll guide you instantly." />

      {/* Back Button */}
      {onBack && (
        <div className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 px-6 py-4">
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
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1645093603488-9d5a1050733a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGUlMjBzdW5uZXR8ZW58MXx8fHwxNzU3NTE3ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        {/* Safety Shield Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
          <Shield className="w-32 h-32 text-white" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl mb-4"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}
            >
              Travel Safe, Explore Free
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl mb-8"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}
            >
              24/7 safety support, live tracking, AI-powered guidance, and verified assistance for every traveler.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Safety Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Safety Dashboard</TabsTrigger>
            <TabsTrigger value="features">Safety Features</TabsTrigger>
            <TabsTrigger value="guides">Verified Guides</TabsTrigger>
            <TabsTrigger value="tips">Safety Tips</TabsTrigger>
          </TabsList>

          {/* Emergency Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Emergency Controls */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      My Safety Tools
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* SOS Button */}
                    <div className="bg-white p-6 rounded-lg border-2 border-red-300">
                      <div className="text-center">
                        <Button
                          onClick={handleSOS}
                          disabled={sosActivated}
                          className={`w-32 h-32 rounded-full text-white text-xl font-bold ${
                            sosActivated 
                              ? "bg-red-700 animate-pulse" 
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {sosActivated ? "SENDING..." : "SOS"}
                        </Button>
                        <p className="mt-4 text-sm text-gray-600">
                          {sosActivated 
                            ? "Emergency alert sent! Help is on the way." 
                            : "Press for immediate emergency assistance"
                          }
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={handleLocationShare}
                        variant={locationSharing ? "default" : "outline"}
                        className="flex items-center gap-2 p-6"
                      >
                        <Share2 className="w-5 h-5" />
                        {locationSharing ? "Stop Sharing" : "Share Live Location"}
                      </Button>
                      
                      <Button
                        onClick={handleVoiceCommand}
                        variant="outline"
                        className="flex items-center gap-2 p-6"
                        disabled={voiceActivated}
                      >
                        <Mic className={`w-5 h-5 ${voiceActivated ? "animate-pulse" : ""}`} />
                        {voiceActivated ? "Listening..." : "Voice Help"}
                      </Button>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {defaultEmergencyServices.map((contact) => (
                        <Button
                          key={contact.id}
                          onClick={() => handleEmergencyCall(contact.number, contact.name)}
                          variant="outline"
                          className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-red-50 hover:border-red-300 transition-all"
                          title={contact.description}
                        >
                          <span className="text-3xl">{contact.icon}</span>
                          <span className="text-xs font-semibold text-center">{contact.name}</span>
                          <span className="text-xs font-mono font-bold text-red-600">{contact.number}</span>
                        </Button>
                      ))}
                    </div>
                    
                    {/* Emergency Instructions */}
                    <Alert>
                      <AlertDescription>
                        <div className="text-sm">
                          <strong>⚠️ Emergency Instructions:</strong>
                          <ul className="mt-2 ml-4 space-y-1">
                            <li>• Press SOS button for immediate help</li>
                            <li>• Click any emergency number to call directly</li>
                            <li>• Share your live location with trusted contacts</li>
                            <li>• Use voice commands: "Help Me", "Call Police"</li>
                          </ul>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>

              {/* My Emergency Contacts */}
              <div>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      My Emergency Contacts
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {personalEmergencyContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center gap-3 p-3 border rounded-lg group hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{contact.name}</p>
                              <Badge variant="secondary" className="text-xs">
                                {contact.relationship}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">{contact.number}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleCallPersonalContact(contact)}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => handleEditContact(contact)}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => {
                        setEditingContact(null);
                        setNewContact({ name: "", number: "", relationship: "" });
                        setShowAddContactDialog(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Emergency Contact
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Quick Commands */}
                <Card className="mt-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Headphones className="w-5 h-5" />
                      AI Quick Commands
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium">Voice Commands:</p>
                        <ul className="text-xs text-gray-600 mt-1 space-y-1">
                          <li>• "Call Police" → Auto dials</li>
                          <li>• "I feel unsafe" → Shares location</li>
                          <li>• "Help Me" → Triggers SOS</li>
                          <li>• "Find hospital" → Shows nearest medical</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Key Safety Features */}
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Live Location Tracking */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Location Tracking</h3>
                      <Badge variant="secondary" className="mt-1">Active</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Share live GPS with family & friends
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Real-time ride updates (cab/bike)
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      AI off-route alerts
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>AI Alert:</strong> "You are heading off-route. Do you want me to contact the driver or nearest helpdesk?"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* SOS Emergency Button */}
              <Card className="border-2 border-red-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">SOS Emergency Button</h3>
                      <Badge variant="destructive" className="mt-1">Critical</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">One-tap emergency button sends live location + ID details to:</p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span>🚔</span>
                      Nearest Police Station
                    </li>
                    <li className="flex items-center gap-2">
                      <span>🚑</span>
                      Emergency Helpline
                    </li>
                    <li className="flex items-center gap-2">
                      <span>👨‍👩‍👧</span>
                      Family Members
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      Works even in low-network mode with SMS fallback
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Verified Guides & Drivers */}
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Verified Guides & Drivers</h3>
                      <Badge variant="secondary" className="mt-1">KYC Verified</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      All guides KYC verified
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      ID verified badge + reviews
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      "Book Safe Guide" option
                    </li>
                  </ul>
                  <Button size="sm" className="w-full mt-4">
                    View Verified Guides
                  </Button>
                </CardContent>
              </Card>

              {/* Health & Medical Support */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Health & Medical Support</h3>
                      <Badge variant="secondary" className="mt-1">24/7</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <Hospital className="w-4 h-4 text-purple-500" />
                      Nearest hospitals & pharmacies
                    </li>
                    <li className="flex items-center gap-2">
                      <Map className="w-4 h-4 text-purple-500" />
                      Medical stores list with map
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      Travel insurance integration
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-700">
                      <strong>AI Suggestion:</strong> "Nearest 24/7 Pharmacy is 2 km away."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Rating */}
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Safety Rating System</h3>
                      <Badge variant="secondary" className="mt-1">Verified</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Every hotel/restaurant has safety badges:</p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      "Safe Stay / Safe Dine" badge
                    </li>
                    <li className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-green-500" />
                      CCTV verified
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      Tourist-friendly staff
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Voice-Activated Safety */}
              <Card className="border-2 border-yellow-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Volume2 className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Voice-Activated Safety</h3>
                      <Badge variant="secondary" className="mt-1">AI Powered</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Just say "Help Me" to trigger SOS</p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-yellow-500" />
                      Voice command recognition
                    </li>
                    <li className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-yellow-500" />
                      Instant alert system
                    </li>
                    <li className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-yellow-500" />
                      Works offline with saved commands
                    </li>
                  </ul>
                  <Button 
                    size="sm" 
                    className="w-full mt-4" 
                    onClick={handleVoiceCommand}
                    disabled={voiceActivated}
                  >
                    {voiceActivated ? "Listening..." : "Test Voice Command"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verified Guides */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedGuides.map((guide) => (
                <Card key={guide.id} className="border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{guide.name}</h3>
                        <p className="text-sm text-gray-600">{guide.city} • {guide.specialty}</p>
                      </div>
                      {guide.verified && (
                        <Badge className="bg-green-600 text-white">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{guide.rating}</span>
                        <span className="text-sm text-gray-500">(247 reviews)</span>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Languages:</p>
                        <div className="flex flex-wrap gap-1">
                          {guide.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-green-600">{guide.price}</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Book Safe Guide
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Safety Tips */}
          <TabsContent value="tips">
            <div className="space-y-6">
              {/* City Selector */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">City-wise Travel Safety Tips</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {Object.keys(safetyTips).map((city) => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? "default" : "outline"}
                        onClick={() => setSelectedCity(city)}
                        className="flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        {city}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Safety Tips for {selectedCity}</h3>
                      <ul className="space-y-2">
                        {safetyTips[selectedCity].map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          <strong>AI Safety Alert:</strong> It's 10 PM in {selectedCity}. Do you want me to call a verified cab instead of a local auto?
                        </AlertDescription>
                      </Alert>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">General Tips</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Keep emergency contacts handy</li>
                          <li>• Share your itinerary with family</li>
                          <li>• Use verified transport only</li>
                          <li>• Keep copies of important documents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Safety Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Festival & Crowd Safety</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Pushkar Fair: Stay in groups, watch belongings</li>
                      <li>• Diwali celebrations: Avoid crowded markets late</li>
                      <li>• Holi festivals: Use natural colors only</li>
                      <li>• Desert festivals: Carry extra water and sun protection</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Women Traveler Safety</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Travel in groups when possible</li>
                      <li>• Use women-only train compartments</li>
                      <li>• Book verified female guides</li>
                      <li>• Share live location with trusted contacts</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Emergency Contact Dialog */}
      <Dialog open={showAddContactDialog} onOpenChange={setShowAddContactDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              {editingContact ? "Edit Emergency Contact" : "Add Emergency Contact"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Name *</Label>
              <Input
                id="contact-name"
                placeholder="e.g., Mom, Dad, Sister, John"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-number">Phone Number *</Label>
              <Input
                id="contact-number"
                placeholder="+91 98765 43210"
                value={newContact.number}
                onChange={(e) => setNewContact(prev => ({ ...prev, number: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-relationship">Relationship</Label>
              <select
                id="contact-relationship"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newContact.relationship}
                onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
              >
                <option value="">Select relationship...</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Spouse">Spouse</option>
                <option value="Sibling">Sibling</option>
                <option value="Child">Child</option>
                <option value="Friend">Friend</option>
                <option value="Colleague">Colleague</option>
                <option value="Doctor">Doctor</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> This contact will receive emergency alerts when you activate SOS or share your live location.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddContactDialog(false);
                  setEditingContact(null);
                  setNewContact({ name: "", number: "", relationship: "" });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={editingContact ? handleUpdateContact : handleAddContact}
                disabled={!newContact.name || !newContact.number}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {editingContact ? "Update Contact" : "Add Contact"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Alert Sent
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm">Your emergency alert has been sent to:</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <span>🚔</span>
                <span className="text-sm">Nearest Police Station</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <span>🚑</span>
                <span className="text-sm">Emergency Medical Services</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <span>👨‍👩‍👧</span>
                <span className="text-sm">Your Emergency Contacts</span>
              </div>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Help is on the way. Stay calm and stay where you are if it's safe to do so.
              </AlertDescription>
            </Alert>
            
            <Button onClick={() => setShowEmergencyDialog(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}