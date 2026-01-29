import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users, Clock, Sparkles, Edit3 } from "lucide-react";

export function AITripPlanner() {
  const [plannerInput, setPlannerInput] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI planning with delay
    setTimeout(() => {
      const mockPlan = {
        destination: "Jaipur",
        duration: "3 days",
        travelers: "Family",
        itinerary: [
          {
            day: 1,
            title: "Royal Heritage Day",
            activities: [
              { time: "9:00 AM", activity: "Check-in at Rambagh Palace", cost: "₹15,000", type: "hotel" },
              { time: "11:00 AM", activity: "Visit Amber Fort with guided tour", cost: "₹2,500", type: "attraction" },
              { time: "2:00 PM", activity: "Lunch at 1135 AD Restaurant", cost: "₹3,000", type: "food" },
              { time: "4:00 PM", activity: "City Palace & Museum tour", cost: "₹1,500", type: "attraction" },
              { time: "7:00 PM", activity: "Dinner at Chokhi Dhani village", cost: "₹4,000", type: "food" }
            ]
          },
          {
            day: 2,
            title: "Culture & Shopping Day",
            activities: [
              { time: "9:00 AM", activity: "Hot Air Balloon ride", cost: "₹7,000", type: "adventure" },
              { time: "12:00 PM", activity: "Johari Bazaar shopping tour", cost: "₹5,000", type: "shopping" },
              { time: "3:00 PM", activity: "Hawa Mahal visit & photography", cost: "₹500", type: "attraction" },
              { time: "6:00 PM", activity: "Rooftop dinner at Peacock Rooftop", cost: "₹2,500", type: "food" }
            ]
          },
          {
            day: 3,
            title: "Relaxation & Departure",
            activities: [
              { time: "10:00 AM", activity: "Jal Mahal boat ride", cost: "₹1,200", type: "attraction" },
              { time: "1:00 PM", activity: "Farewell lunch at Suvarna Mahal", cost: "₹4,500", type: "food" },
              { time: "4:00 PM", activity: "Check-out & airport transfer", cost: "₹800", type: "transport" }
            ]
          }
        ],
        totalCost: "₹47,500",
        hotels: ["Rambagh Palace - ₹15,000/night"],
        transport: ["Private car with driver - ₹2,500/day"],
        tips: [
          "Book advance tickets for Amber Fort",
          "Carry cash for local markets",
          "Best time to visit is early morning",
          "Don't miss the sunset at Nahargarh Fort"
        ]
      };
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
    }, 2000);
  };

  const editActivity = (dayIndex: number, activityIndex: number) => {
    alert(`Edit activity: ${generatedPlan.itinerary[dayIndex].activities[activityIndex].activity}`);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'attraction': return '🏛️';
      case 'food': return '🍽️';
      case 'adventure': return '🎈';
      case 'shopping': return '🛍️';
      case 'transport': return '🚗';
      default: return '📍';
    }
  };

  return (
    <section id="ai-planner" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl font-black text-gray-900">
              AI-Powered Personal Itinerary Builder
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us your travel plans and get a complete personalized itinerary with hotels, attractions, 
            food spots, and perfect timing – all powered by AI.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Plan Your Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="trip-details">Describe your trip</Label>
                  <Input
                    id="trip-details"
                    placeholder="I'm going to Jaipur for 3 days with family..."
                    value={plannerInput}
                    onChange={(e) => setPlannerInput(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration</Label>
                    <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">3 days</span>
                    </div>
                  </div>
                  <div>
                    <Label>Travelers</Label>
                    <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Family</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={generatePlan}
                  disabled={isGenerating || !plannerInput}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Creating Your Plan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate AI Plan
                    </div>
                  )}
                </Button>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>✨ No big platform has a real AI planner</strong> - they only give lists. 
                    Our AI creates personalized day-by-day plans with real-time adjustments!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Plan Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {generatedPlan ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Personalized Plan</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {generatedPlan.totalCost}
                    </Badge>
                  </CardTitle>
                  <p className="text-gray-600">
                    {generatedPlan.destination} • {generatedPlan.duration} • {generatedPlan.travelers}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="itinerary" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                      <TabsTrigger value="hotels">Hotels</TabsTrigger>
                      <TabsTrigger value="tips">Tips</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="itinerary" className="space-y-4 mt-4">
                      {generatedPlan.itinerary.map((day: any, dayIndex: number) => (
                        <div key={dayIndex} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Day {day.day}: {day.title}
                          </h4>
                          <div className="space-y-3">
                            {day.activities.map((activity: any, actIndex: number) => (
                              <div key={actIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                  <div>
                                    <p className="font-medium">{activity.activity}</p>
                                    <p className="text-sm text-gray-600">{activity.time}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{activity.cost}</Badge>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => editActivity(dayIndex, actIndex)}
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="hotels" className="mt-4">
                      <div className="space-y-3">
                        {generatedPlan.hotels.map((hotel: string, index: number) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg">
                            <p className="font-medium">{hotel}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tips" className="mt-4">
                      <div className="space-y-2">
                        {generatedPlan.tips.map((tip: string, index: number) => (
                          <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm">💡 {tip}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      Book This Complete Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Your personalized AI plan will appear here</p>
                  <p className="text-sm mt-2">Enter your trip details and click "Generate AI Plan"</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}