import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Check, 
  Car, 
  Bike, 
  Building2,
  Utensils,
  IndianRupee,
  Clock,
  Star
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "hotel" | "transport" | "restaurant" | "itinerary";
  item?: any;
  cityName: string;
}

export function BookingModal({ isOpen, onClose, type, item, cityName }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Guest Details
    name: "",
    email: "",
    phone: "",
    
    // Hotel Booking
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
    
    // Transport Booking
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    vehicleType: "",
    duration: "full-day",
    
    // Restaurant Booking
    reservationDate: "",
    reservationTime: "",
    partySize: 2,
    specialRequests: "",
    
    // Payment
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    
    // Preferences
    preferences: [] as string[]
  });

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBookingConfirm = () => {
    setIsBookingConfirmed(true);
    setTimeout(() => {
      setIsBookingConfirmed(false);
      onClose();
      setStep(1);
    }, 3000);
  };

  const calculateTotal = () => {
    if (type === "hotel" && item) {
      const nights = bookingData.checkIn && bookingData.checkOut ? 
        Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 3600 * 24)) : 1;
      return item.price * bookingData.rooms * nights;
    }
    if (type === "transport") {
      const rates: Record<string, number> = {
        "auto": 300,
        "taxi": 800,
        "bike": 400,
        "car": 1200,
        "suv": 2000
      };
      return rates[bookingData.vehicleType] || 800;
    }
    if (type === "restaurant") {
      return bookingData.partySize * 500; // Average per person
    }
    return 0;
  };

  if (isBookingConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your {type} booking in {cityName} has been confirmed. 
              Check your email for confirmation details.
            </p>
            <div className="text-sm text-gray-500">
              Booking ID: #{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "hotel" && <Building2 className="w-5 h-5" />}
            {type === "transport" && <Car className="w-5 h-5" />}
            {type === "restaurant" && <Utensils className="w-5 h-5" />}
            Book {type === "hotel" ? "Hotel" : type === "transport" ? "Transport" : "Table"} in {cityName}
            {item && ` - ${item.name}`}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {num}
              </div>
              {num < 3 && <div className={`w-12 h-0.5 ${step > num ? 'bg-amber-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Service Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{type === "hotel" ? "Stay Details" : type === "transport" ? "Trip Details" : "Reservation Details"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {type === "hotel" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="checkIn">Check-in Date</Label>
                            <Input
                              id="checkIn"
                              type="date"
                              value={bookingData.checkIn}
                              onChange={(e) => handleInputChange("checkIn", e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="checkOut">Check-out Date</Label>
                            <Input
                              id="checkOut"
                              type="date"
                              value={bookingData.checkOut}
                              onChange={(e) => handleInputChange("checkOut", e.target.value)}
                              min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="rooms">Rooms</Label>
                            <Select value={bookingData.rooms.toString()} onValueChange={(value) => handleInputChange("rooms", parseInt(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1,2,3,4,5].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num} Room{num > 1 ? 's' : ''}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="adults">Adults</Label>
                            <Select value={bookingData.adults.toString()} onValueChange={(value) => handleInputChange("adults", parseInt(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1,2,3,4,5,6].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num} Adult{num > 1 ? 's' : ''}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="children">Children</Label>
                            <Select value={bookingData.children.toString()} onValueChange={(value) => handleInputChange("children", parseInt(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[0,1,2,3,4].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num} Child{num > 1 ? 'ren' : num === 1 ? '' : 'ren'}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {type === "transport" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="pickupLocation">Pickup Location</Label>
                            <Input
                              id="pickupLocation"
                              placeholder="Enter pickup address"
                              value={bookingData.pickupLocation}
                              onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="dropLocation">Drop Location</Label>
                            <Input
                              id="dropLocation"
                              placeholder="Enter destination"
                              value={bookingData.dropLocation}
                              onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="pickupDate">Pickup Date</Label>
                            <Input
                              id="pickupDate"
                              type="date"
                              value={bookingData.pickupDate}
                              onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="pickupTime">Pickup Time</Label>
                            <Input
                              id="pickupTime"
                              type="time"
                              value={bookingData.pickupTime}
                              onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="vehicleType">Vehicle Type</Label>
                            <Select value={bookingData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Auto Rickshaw (₹300/day)</SelectItem>
                                <SelectItem value="taxi">Taxi (₹800/day)</SelectItem>
                                <SelectItem value="bike">Bike Rental (₹400/day)</SelectItem>
                                <SelectItem value="car">Car Rental (₹1200/day)</SelectItem>
                                <SelectItem value="suv">SUV (₹2000/day)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Select value={bookingData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="half-day">Half Day (4 hours)</SelectItem>
                                <SelectItem value="full-day">Full Day (8 hours)</SelectItem>
                                <SelectItem value="multi-day">Multi Day</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {type === "restaurant" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="reservationDate">Reservation Date</Label>
                            <Input
                              id="reservationDate"
                              type="date"
                              value={bookingData.reservationDate}
                              onChange={(e) => handleInputChange("reservationDate", e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="reservationTime">Time</Label>
                            <Select value={bookingData.reservationTime} onValueChange={(value) => handleInputChange("reservationTime", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"].map(time => (
                                  <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="partySize">Party Size</Label>
                            <Select value={bookingData.partySize.toString()} onValueChange={(value) => handleInputChange("partySize", parseInt(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1,2,3,4,5,6,7,8].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num} Person{num > 1 ? 's' : ''}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="specialRequests">Special Requests</Label>
                            <Input
                              id="specialRequests"
                              placeholder="Dietary restrictions, etc."
                              value={bookingData.specialRequests}
                              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Personal Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={bookingData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Ground Floor", "AC Required", "Window View", "WiFi", "Parking", 
                        "Pet Friendly", "Early Check-in", "Late Check-out"
                      ].map((pref) => (
                        <Button
                          key={pref}
                          variant={bookingData.preferences.includes(pref) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const prefs = bookingData.preferences.includes(pref)
                              ? bookingData.preferences.filter(p => p !== pref)
                              : [...bookingData.preferences, pref];
                            handleInputChange("preferences", prefs);
                          }}
                        >
                          {pref}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Payment Method</Label>
                      <div className="flex gap-4 mt-2">
                        {["card", "upi", "wallet"].map((method) => (
                          <Button
                            key={method}
                            variant={bookingData.paymentMethod === method ? "default" : "outline"}
                            onClick={() => handleInputChange("paymentMethod", method)}
                          >
                            {method === "card" && <CreditCard className="w-4 h-4 mr-2" />}
                            {method === "card" ? "Credit/Debit Card" : method === "upi" ? "UPI" : "Wallet"}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {bookingData.paymentMethod === "card" && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={bookingData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={bookingData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={bookingData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {bookingData.paymentMethod === "upi" && (
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@paytm"
                          onChange={(e) => handleInputChange("upiId", e.target.value)}
                        />
                      </div>
                    )}

                    {bookingData.paymentMethod === "wallet" && (
                      <div>
                        <Label>Select Wallet</Label>
                        <Select onValueChange={(value) => handleInputChange("wallet", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose wallet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paytm">Paytm</SelectItem>
                            <SelectItem value="phonepe">PhonePe</SelectItem>
                            <SelectItem value="googlepay">Google Pay</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {item && (
                  <div className="space-y-2">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.location && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    )}
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  {type === "hotel" && (
                    <>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>{bookingData.checkIn || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>{bookingData.checkOut || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{bookingData.adults} Adults, {bookingData.children} Children</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rooms:</span>
                        <span>{bookingData.rooms}</span>
                      </div>
                    </>
                  )}

                  {type === "transport" && (
                    <>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{bookingData.pickupDate || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{bookingData.pickupTime || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehicle:</span>
                        <span>{bookingData.vehicleType || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{bookingData.duration}</span>
                      </div>
                    </>
                  )}

                  {type === "restaurant" && (
                    <>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{bookingData.reservationDate || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{bookingData.reservationTime || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Party Size:</span>
                        <span>{bookingData.partySize} people</span>
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Total Amount:</span>
                    <span className="flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">*Includes all taxes and fees</p>
                </div>

                <Button
                  className="w-full"
                  onClick={step === 3 ? handleBookingConfirm : handleNextStep}
                  disabled={
                    (step === 1 && type === "hotel" && (!bookingData.checkIn || !bookingData.checkOut)) ||
                    (step === 1 && type === "transport" && (!bookingData.pickupLocation || !bookingData.vehicleType)) ||
                    (step === 1 && type === "restaurant" && (!bookingData.reservationDate || !bookingData.reservationTime)) ||
                    (step === 2 && (!bookingData.name || !bookingData.email || !bookingData.phone))
                  }
                >
                  {step === 3 ? "Confirm Booking" : "Continue"}
                </Button>

                {step > 1 && (
                  <Button variant="outline" className="w-full" onClick={handlePrevStep}>
                    Back
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Itinerary Planning Modal
interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
}

export function ItineraryModal({ isOpen, onClose, cityName }: ItineraryModalProps) {
  const [itineraryData, setItineraryData] = useState({
    days: 3,
    budget: "mid-range",
    interests: [] as string[],
    travelers: 2,
    accommodation: "hotel",
    transportation: "car"
  });

  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    
    // Mock itinerary generation
    setTimeout(() => {
      setGeneratedItinerary({
        title: `${itineraryData.days}-Day ${cityName} Adventure`,
        totalCost: itineraryData.budget === "budget" ? 15000 : itineraryData.budget === "mid-range" ? 35000 : 75000,
        days: Array.from({ length: itineraryData.days }, (_, i) => ({
          day: i + 1,
          activities: [
            { time: "9:00 AM", activity: `Visit ${cityName} Palace`, cost: 500 },
            { time: "12:00 PM", activity: "Traditional lunch", cost: 800 },
            { time: "3:00 PM", activity: "Local market exploration", cost: 200 },
            { time: "6:00 PM", activity: "Sunset viewing", cost: 0 },
            { time: "8:00 PM", activity: "Cultural show", cost: 1200 }
          ]
        }))
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your {cityName} Itinerary</DialogTitle>
        </DialogHeader>

        {!generatedItinerary ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Number of Days</Label>
                <Select value={itineraryData.days.toString()} onValueChange={(value) => setItineraryData(prev => ({ ...prev, days: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7].map(day => (
                      <SelectItem key={day} value={day.toString()}>{day} Day{day > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Number of Travelers</Label>
                <Select value={itineraryData.travelers.toString()} onValueChange={(value) => setItineraryData(prev => ({ ...prev, travelers: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Person{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Budget Range</Label>
              <div className="flex gap-4 mt-2">
                {[
                  { id: "budget", label: "Budget (₹10k-20k)", desc: "Basic stays, local food" },
                  { id: "mid-range", label: "Mid-range (₹25k-50k)", desc: "Good hotels, mixed dining" },
                  { id: "luxury", label: "Luxury (₹60k+)", desc: "Premium stays, fine dining" }
                ].map((option) => (
                  <Button
                    key={option.id}
                    variant={itineraryData.budget === option.id ? "default" : "outline"}
                    className="flex-1 h-auto p-4 flex flex-col"
                    onClick={() => setItineraryData(prev => ({ ...prev, budget: option.id }))}
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs opacity-70">{option.desc}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Your Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Heritage & History", "Photography", "Food & Culture", "Adventure", 
                  "Shopping", "Nature", "Spiritual", "Nightlife", "Art & Crafts", "Architecture"
                ].map((interest) => (
                  <Button
                    key={interest}
                    variant={itineraryData.interests.includes(interest) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const interests = itineraryData.interests.includes(interest)
                        ? itineraryData.interests.filter(i => i !== interest)
                        : [...itineraryData.interests, interest];
                      setItineraryData(prev => ({ ...prev, interests }));
                    }}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerateItinerary} 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating Your Perfect Itinerary..." : "Generate AI-Powered Itinerary"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{generatedItinerary.title}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>{itineraryData.days} Days</span>
                <span>•</span>
                <span>{itineraryData.travelers} Travelers</span>
                <span>•</span>
                <span className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {generatedItinerary.totalCost.toLocaleString()} Total
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {generatedItinerary.days.map((day: any) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle>Day {day.day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.activities.map((activity: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <span className="font-medium">{activity.time}</span>
                              <p className="text-sm text-gray-600">{activity.activity}</p>
                            </div>
                          </div>
                          <span className="flex items-center text-sm">
                            <IndianRupee className="w-3 h-3 mr-1" />
                            {activity.cost}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600">
                Book This Itinerary
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setGeneratedItinerary(null)}>
                Modify Itinerary
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}